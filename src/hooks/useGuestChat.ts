"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export interface ChatMessage {
    id?: string;
    role: "user" | "assistant";
    content: string;
    status?: string;
    createdAt?: string;
}

const STORAGE_KEY = "portfolio_chat_session_id";

export function getChatApiBaseUrl(): string {
    const raw = process.env.NEXT_PUBLIC_CHAT_API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:5100";
    const clean = raw.replace(/\/+$/, "");
    return clean.endsWith("/api/v1") ? clean : `${clean}/api/v1`;
}

export function useGuestChat() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [isStreaming, setIsStreaming] = useState(false);
    const [isLoadingHistory, setIsLoadingHistory] = useState(false);
    const [hasMoreOlder, setHasMoreOlder] = useState(false);
    const [isLoadingOlder, setIsLoadingOlder] = useState(false);
    const [isOnline, setIsOnline] = useState<boolean | null>(null);
    const [error, setError] = useState<string | null>(null);

    const abortControllerRef = useRef<AbortController | null>(null);
    const sessionIdRef = useRef<string | null>(null);
    const createSessionPromiseRef = useRef<Promise<string | null> | null>(null);
    const hasInitializedRef = useRef(false);
    const isLoadingOlderRef = useRef<boolean>(false);
    const baseUrl = getChatApiBaseUrl();

    // Check backend & Ollama health
    const checkHealth = useCallback(async () => {
        try {
            const res = await fetch(`${baseUrl}/chat/health`, {
                method: "GET",
                headers: { Accept: "application/json" },
            });
            if (res.ok) {
                const data = await res.json();
                setIsOnline(Boolean(data?.success && (data?.data?.running ?? true)));
            } else {
                setIsOnline(false);
            }
        } catch {
            setIsOnline(false);
        }
    }, [baseUrl]);

    // Create a new session on the server (with deduplication lock)
    const createNewSession = useCallback(async (): Promise<string | null> => {
        // If we already have an active session in memory or localStorage, return it
        if (sessionIdRef.current) {
            return sessionIdRef.current;
        }
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                sessionIdRef.current = stored;
                setSessionId(stored);
                return stored;
            }
        }

        // If a creation request is already in flight, reuse the same promise (prevents 2 parallel calls)
        if (createSessionPromiseRef.current) {
            return createSessionPromiseRef.current;
        }

        createSessionPromiseRef.current = (async () => {
            try {
                const res = await fetch(`${baseUrl}/chat/sessions`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ model: "llama3.2:3b" }),
                });
                if (!res.ok) throw new Error("Failed to create chat session");
                const json = await res.json();
                const newId = json?.data?.sessionId;
                if (newId) {
                    if (typeof window !== "undefined") {
                        localStorage.setItem(STORAGE_KEY, newId);
                    }
                    sessionIdRef.current = newId;
                    setSessionId(newId);
                    return newId;
                }
                return null;
            } catch (err) {
                console.error("Error creating session:", err);
                return null;
            } finally {
                createSessionPromiseRef.current = null;
            }
        })();

        return createSessionPromiseRef.current;
    }, [baseUrl]);

    // Initialize session and fetch history
    const initSession = useCallback(async () => {
        if (typeof window === "undefined") return;
        if (hasInitializedRef.current) return;
        hasInitializedRef.current = true;

        setIsLoadingHistory(true);
        setError(null);

        const existingSessionId = localStorage.getItem(STORAGE_KEY);

        if (existingSessionId) {
            try {
                // Validate session
                const validateRes = await fetch(`${baseUrl}/chat/sessions/${existingSessionId}`, {
                    method: "GET",
                    headers: { Accept: "application/json" },
                });

                if (validateRes.ok) {
                    sessionIdRef.current = existingSessionId;
                    setSessionId(existingSessionId);
                    // Fetch initial latest 20 messages (returned in chronological order)
                    const historyRes = await fetch(
                        `${baseUrl}/chat/sessions/${existingSessionId}/messages?limit=20`,
                        {
                            method: "GET",
                            headers: { Accept: "application/json" },
                        }
                    );

                    if (historyRes.ok) {
                        const historyJson = await historyRes.json();
                        const historyData = historyJson?.data;
                        const historyMeta = historyJson?.meta;

                        if (Array.isArray(historyData)) {
                            const formatted: ChatMessage[] = historyData.map((m: any) => ({
                                id: m._id || m.id,
                                role: m.role,
                                content: m.content,
                                status: m.status,
                                createdAt: m.createdAt,
                            }));

                            setMessages(formatted);
                            setHasMoreOlder(Boolean(historyMeta?.hasMore ?? historyMeta?.hasNext));
                        }
                    }
                    setIsLoadingHistory(false);
                    return;
                } else if (validateRes.status === 404) {
                    localStorage.removeItem(STORAGE_KEY);
                    sessionIdRef.current = null;
                    setSessionId(null);
                }
            } catch (err) {
                console.warn("Session validation failed, will create a new session:", err);
            }
        }

        // If no valid session exists, create a new one
        await createNewSession();
        setIsLoadingHistory(false);
    }, [baseUrl, createNewSession]);

    useEffect(() => {
        checkHealth();
        initSession();

        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [checkHealth, initSession]);

    // Stop current SSE stream
    const stopStreaming = useCallback(() => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
        }
        setIsStreaming(false);
    }, []);

    // Send a message and stream the response
    const sendMessage = useCallback(
        async (userText: string) => {
            const trimmed = userText.trim();
            if (!trimmed || isStreaming) return;

            setError(null);

            // Ensure we have an active session
            let activeSessionId =
                sessionIdRef.current ||
                sessionId ||
                (typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null);

            if (!activeSessionId) {
                activeSessionId = await createNewSession();
                if (!activeSessionId) {
                    setError("Unable to connect to AI assistant. Please try again later.");
                    return;
                }
            }

            // Append user message immediately
            const userMsg: ChatMessage = {
                role: "user",
                content: trimmed,
                createdAt: new Date().toISOString(),
            };

            // Prepare placeholder assistant message
            const assistantMsg: ChatMessage = {
                role: "assistant",
                content: "",
                createdAt: new Date().toISOString(),
            };

            setMessages((prev) => [...prev, userMsg, assistantMsg]);
            setIsStreaming(true);

            // Abort previous if any
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            const controller = new AbortController();
            abortControllerRef.current = controller;

            try {
                const response = await fetch(`${baseUrl}/chat`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "text/event-stream",
                    },
                    body: JSON.stringify({
                        sessionId: activeSessionId,
                        message: trimmed,
                    }),
                    signal: controller.signal,
                });

                if (!response.ok) {
                    const errData = await response.json().catch(() => null);
                    throw new Error(errData?.message || `Chat request failed (${response.status})`);
                }

                if (!response.body) {
                    throw new Error("ReadableStream not supported by server response.");
                }

                const reader = response.body.getReader();
                const decoder = new TextDecoder("utf-8");
                let buffer = "";

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    buffer += decoder.decode(value, { stream: true });
                    const lines = buffer.split("\n");
                    // Keep the last partial line in buffer
                    buffer = lines.pop() ?? "";

                    for (const line of lines) {
                        const trimmedLine = line.trim();
                        if (!trimmedLine || !trimmedLine.startsWith("data:")) continue;

                        const dataStr = trimmedLine.replace(/^data:\s*/, "");
                        if (!dataStr) continue;

                        try {
                            const parsed = JSON.parse(dataStr);

                            if (parsed.error) {
                                throw new Error(parsed.error);
                            }

                            if (parsed.content) {
                                setMessages((prev) => {
                                    if (prev.length === 0) return prev;
                                    const next = [...prev];
                                    const last = next[next.length - 1];
                                    if (last.role === "assistant") {
                                        next[next.length - 1] = {
                                            ...last,
                                            content: last.content + parsed.content,
                                        };
                                    }
                                    return next;
                                });
                            }

                            if (parsed.done) {
                                setIsStreaming(false);
                                abortControllerRef.current = null;
                            }
                        } catch (parseErr) {
                            // If line wasn't complete JSON yet, ignore or handle
                            console.debug("SSE Parse fragment:", parseErr);
                        }
                    }
                }
            } catch (err: any) {
                if (err.name === "AbortError") {
                    // Stopped by user, harmless
                } else {
                    console.error("Chat error:", err);
                    setError(err?.message || "Failed to receive AI response. Please try again.");
                    setMessages((prev) => {
                        const next = [...prev];
                        const last = next[next.length - 1];
                        if (last && last.role === "assistant" && !last.content) {
                            next[next.length - 1] = {
                                ...last,
                                content: "Connection timed out. Please try sending your message again.",
                            };
                        }
                        return next;
                    });
                }
            } finally {
                setIsStreaming(false);
                abortControllerRef.current = null;
            }
        },
        [baseUrl, createNewSession, isStreaming, sessionId],
    );

    // Load previous page of older messages when scrolling to top (cursor-based before lazy load)
    const loadOlderMessages = useCallback(async (): Promise<number> => {
        const currentSessionId = sessionIdRef.current || sessionId;
        if (!currentSessionId || !hasMoreOlder || isLoadingOlderRef.current || isStreaming) {
            return 0;
        }

        // Get the oldest message's createdAt timestamp or id currently in state
        const oldestMsg = messages.length > 0 ? messages[0] : null;
        const beforeCursor = oldestMsg?.createdAt || oldestMsg?.id;
        if (!beforeCursor) {
            setHasMoreOlder(false);
            return 0;
        }

        isLoadingOlderRef.current = true;
        setIsLoadingOlder(true);

        try {
            const encoded = encodeURIComponent(beforeCursor);
            const res = await fetch(
                `${baseUrl}/chat/sessions/${currentSessionId}/messages?limit=20&before=${encoded}`,
                {
                    method: "GET",
                    headers: { Accept: "application/json" },
                }
            );

            if (res.ok) {
                const json = await res.json();
                const olderRaw = json?.data;
                const meta = json?.meta;

                if (Array.isArray(olderRaw) && olderRaw.length > 0) {
                    const formatted: ChatMessage[] = olderRaw.map((m: any) => ({
                        id: m._id || m.id,
                        role: m.role,
                        content: m.content,
                        status: m.status,
                        createdAt: m.createdAt,
                    }));

                    // Backend returns matching older messages in chronological order
                    // Prepend older messages while deduplicating by ID
                    setMessages((prev) => {
                        const existingIds = new Set(prev.map((m) => m.id).filter(Boolean));
                        const uniqueOlder = formatted.filter((m) => !m.id || !existingIds.has(m.id));
                        return [...uniqueOlder, ...prev];
                    });

                    setHasMoreOlder(Boolean(meta?.hasMore ?? meta?.hasNext));
                    return formatted.length;
                } else {
                    setHasMoreOlder(false);
                }
            } else {
                setHasMoreOlder(false);
            }
        } catch (err) {
            console.error("Failed to load older chat messages:", err);
        } finally {
            isLoadingOlderRef.current = false;
            setIsLoadingOlder(false);
        }
        return 0;
    }, [baseUrl, hasMoreOlder, isStreaming, messages, sessionId]);

    // Clear chat and reset session
    const clearChat = useCallback(async () => {
        stopStreaming();
        const currentSessionId = sessionIdRef.current || sessionId;
        if (currentSessionId) {
            try {
                await fetch(`${baseUrl}/chat/sessions/${currentSessionId}`, {
                    method: "DELETE",
                });
            } catch (err) {
                console.error("Error deleting session on server:", err);
            }
        }
        if (typeof window !== "undefined") {
            localStorage.removeItem(STORAGE_KEY);
        }
        sessionIdRef.current = null;
        setSessionId(null);
        setMessages([]);
        setHasMoreOlder(false);
        setIsLoadingOlder(false);
        setError(null);
        await createNewSession();
    }, [baseUrl, createNewSession, sessionId, stopStreaming]);

    return {
        messages,
        sessionId,
        isStreaming,
        isLoadingHistory,
        hasMoreOlder,
        isLoadingOlder,
        loadOlderMessages,
        isOnline,
        error,
        sendMessage,
        stopStreaming,
        clearChat,
        checkHealth,
    };
}
