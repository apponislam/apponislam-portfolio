"use client";

import React, { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { Copy, Check, User } from "lucide-react";
import { ChatMessage } from "@/hooks/useGuestChat";
import { ChatQuickPrompts } from "./ChatQuickPrompts";
import apponImg from "../../../public/appon.webp";

interface ChatMessageListProps {
    messages: ChatMessage[];
    isStreaming: boolean;
    isLoadingHistory: boolean;
    hasMoreOlder?: boolean;
    isLoadingOlder?: boolean;
    onLoadOlder?: () => Promise<number | void>;
    onSelectPrompt: (promptText: string) => void;
}

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

function CodeBlock({ language, value }: { language: string; value: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy code:", err);
        }
    };

    return (
        <div className="relative my-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-100 overflow-hidden text-xs font-mono">
            <div className="flex items-center justify-between px-3.5 py-1.5 bg-zinc-900/90 border-b border-zinc-800 text-[11px] text-zinc-400">
                <span className="font-medium lowercase tracking-wide">{language || "code"}</span>
                <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md hover:text-zinc-100 hover:bg-zinc-800 transition-colors cursor-pointer text-[11px]"
                    aria-label={copied ? "Copied code" : "Copy code"}
                >
                    {copied ? (
                        <>
                            <Check className="w-3 h-3 text-emerald-400" aria-hidden="true" />
                            <span className="text-emerald-400 font-medium">Copied</span>
                        </>
                    ) : (
                        <>
                            <Copy className="w-3 h-3" aria-hidden="true" />
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>
            <pre className="p-3.5 overflow-x-auto leading-relaxed scrollbar-thin">
                <code>{value}</code>
            </pre>
        </div>
    );
}

export const ChatMessageList: React.FC<ChatMessageListProps> = ({
    messages,
    isStreaming,
    isLoadingHistory,
    hasMoreOlder = false,
    isLoadingOlder = false,
    onLoadOlder,
    onSelectPrompt,
}) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const topSentinelRef = useRef<HTMLDivElement>(null);

    // Scroll anchoring refs
    const prevScrollHeightRef = useRef<number>(0);
    const prevScrollTopRef = useRef<number>(0);
    const isPrependingOlderRef = useRef<boolean>(false);
    const isInitialMountRef = useRef<boolean>(true);
    const isNearBottomRef = useRef<boolean>(true);

    // Trigger loading older messages with scroll anchoring
    const handleLoadOlder = useCallback(async () => {
        const container = scrollContainerRef.current;
        if (!container || isLoadingOlder || !hasMoreOlder || !onLoadOlder || isStreaming) return;

        // Snapshot scroll geometry prior to older items prepending
        prevScrollHeightRef.current = container.scrollHeight;
        prevScrollTopRef.current = container.scrollTop;
        isPrependingOlderRef.current = true;

        const count = await onLoadOlder();
        if (!count || count === 0) {
            isPrependingOlderRef.current = false;
        }
    }, [hasMoreOlder, isLoadingOlder, isStreaming, onLoadOlder]);

    // Handle scroll events to detect top proximity and user scroll position
    const handleScroll = useCallback(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        // Check if user is near the bottom (within 120px)
        const distanceFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
        isNearBottomRef.current = distanceFromBottom < 120;

        // Lazy load older messages when scrolled close to the top
        if (container.scrollTop < 60 && hasMoreOlder && !isLoadingOlder && !isStreaming) {
            handleLoadOlder();
        }
    }, [handleLoadOlder, hasMoreOlder, isLoadingOlder, isStreaming]);

    // IntersectionObserver for top sentinel element (smooth lazy loading on scroll up)
    useEffect(() => {
        const sentinel = topSentinelRef.current;
        const container = scrollContainerRef.current;
        if (!sentinel || !container || !hasMoreOlder || isLoadingOlder || isStreaming) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting) {
                    handleLoadOlder();
                }
            },
            {
                root: container,
                threshold: 0.1,
                rootMargin: "60px 0px 0px 0px",
            }
        );

        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [handleLoadOlder, hasMoreOlder, isLoadingOlder, isStreaming]);

    // Maintain scroll anchoring when older messages prepend, or scroll to bottom on new messages
    useIsomorphicLayoutEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        // Case A: Older messages prepended -> preserve user's view without jumping
        if (isPrependingOlderRef.current) {
            const newScrollHeight = container.scrollHeight;
            const delta = newScrollHeight - prevScrollHeightRef.current;
            container.scrollTop = prevScrollTopRef.current + delta;
            isPrependingOlderRef.current = false;
            return;
        }

        // Case B: First load with messages -> scroll immediately to bottom (latest message)
        if (isInitialMountRef.current) {
            if (messages.length > 0) {
                container.scrollTop = container.scrollHeight;
                isInitialMountRef.current = false;
            }
            return;
        }

        // Case C: New message or streaming token -> auto-scroll if user is pinned near bottom
        if (isNearBottomRef.current || isStreaming) {
            messagesEndRef.current?.scrollIntoView({ behavior: isStreaming ? "auto" : "smooth" });
        }
    }, [messages, isStreaming]);

    if (isLoadingHistory) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-3 text-zinc-500 text-xs">
                <div className="w-6 h-6 rounded-full border-2 border-zinc-300 dark:border-zinc-700 border-t-zinc-900 dark:border-t-zinc-100 animate-spin" />
                <span>Loading messages...</span>
            </div>
        );
    }

    if (messages.length === 0) {
        return (
            <div className="flex-1 overflow-y-auto">
                <ChatQuickPrompts onSelectPrompt={onSelectPrompt} disabled={isStreaming} />
            </div>
        );
    }

    return (
        <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto p-4 space-y-4 text-sm scrollbar-thin"
        >
            {/* Top sentinel for lazy loading older messages when scrolling top */}
            <div ref={topSentinelRef} className="w-full flex items-center justify-center min-h-[4px]">
                {isLoadingOlder && (
                    <div className="flex items-center gap-2 py-2 text-xs text-zinc-500 animate-in fade-in-50 duration-150">
                        <div className="w-3.5 h-3.5 rounded-full border-2 border-zinc-400 dark:border-zinc-600 border-t-zinc-900 dark:border-t-zinc-100 animate-spin" />
                        <span>Loading older messages...</span>
                    </div>
                )}
                {!hasMoreOlder && messages.length > 0 && (
                    <div className="py-1 text-[11px] text-zinc-400 dark:text-zinc-600 font-medium select-none">
                        Beginning of conversation
                    </div>
                )}
            </div>

            {messages.map((msg, index) => {
                const isUser = msg.role === "user";
                const isLast = index === messages.length - 1;
                const isGeneratingCurrent = !isUser && isLast && isStreaming;

                return (
                    <div
                        key={msg.id || `${msg.role}-${msg.createdAt || index}`}
                        className={`flex gap-2.5 ${isUser ? "justify-end" : "justify-start"} animate-in fade-in-50 duration-150`}
                    >
                        {!isUser && (
                            <div className="w-7 h-7 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800 shrink-0 mt-0.5 shadow-xs">
                                <Image src={apponImg} alt="Appon AI" width={28} height={28} className="w-full h-full object-cover" />
                            </div>
                        )}

                        <div
                            className={`relative max-w-[85%] rounded-2xl px-4 py-2.5 shadow-xs ${
                                isUser
                                    ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900 rounded-tr-xs ml-auto"
                                    : "bg-zinc-100/90 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 text-zinc-900 dark:text-zinc-100 rounded-tl-xs"
                            }`}
                        >
                            {isUser ? (
                                <p className="whitespace-pre-wrap wrap-break-word text-[13px] leading-relaxed">{msg.content}</p>
                            ) : (
                                <div className="text-[13px] leading-relaxed wrap-break-word space-y-2">
                                    {msg.content ? (
                                        <ReactMarkdown
                                            components={{
                                                a: ({ href, children }) => (
                                                    <a
                                                        href={href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="font-medium underline underline-offset-4 decoration-zinc-400 dark:decoration-zinc-500 hover:decoration-zinc-900 dark:hover:decoration-zinc-100 transition-colors"
                                                    >
                                                        {children}
                                                    </a>
                                                ),
                                                code({ inline, className, children, ...props }: any) {
                                                    const match = /language-(\w+)/.exec(className || "");
                                                    const codeText = String(children).replace(/\n$/, "");

                                                    if (!inline && (match || codeText.includes("\n"))) {
                                                        return <CodeBlock language={match ? match[1] : ""} value={codeText} />;
                                                    }

                                                    return (
                                                        <code
                                                            className="px-1.5 py-0.5 rounded-md bg-zinc-200/70 dark:bg-zinc-800 text-[12px] font-mono border border-zinc-300/40 dark:border-zinc-700/40 text-zinc-900 dark:text-zinc-100"
                                                            {...props}
                                                        >
                                                            {children}
                                                        </code>
                                                    );
                                                },
                                                p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
                                                ul: ({ children }) => <ul className="list-disc pl-4 space-y-1 mb-2">{children}</ul>,
                                                ol: ({ children }) => <ol className="list-decimal pl-4 space-y-1 mb-2">{children}</ol>,
                                                li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                                                blockquote: ({ children }) => (
                                                    <blockquote className="border-l-2 border-zinc-400 dark:border-zinc-600 pl-3 my-2 italic text-zinc-600 dark:text-zinc-400">
                                                        {children}
                                                    </blockquote>
                                                ),
                                            }}
                                        >
                                            {msg.content}
                                        </ReactMarkdown>
                                    ) : isGeneratingCurrent ? (
                                        <div className="flex items-center gap-2 py-1 text-zinc-500 text-xs">
                                            <span className="flex gap-1">
                                                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500 animate-bounce [animation-delay:-0.3s]" />
                                                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500 animate-bounce [animation-delay:-0.15s]" />
                                                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500 animate-bounce" />
                                            </span>
                                            <span>Thinking...</span>
                                        </div>
                                    ) : null}

                                    {/* Streaming cursor */}
                                    {isGeneratingCurrent && msg.content && (
                                        <span className="inline-block w-1.5 h-3.5 ml-0.5 bg-zinc-900 dark:bg-zinc-100 align-middle animate-pulse" aria-hidden="true" />
                                    )}
                                </div>
                            )}
                        </div>

                        {isUser && (
                            <div className="w-7 h-7 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                                <User className="w-3.5 h-3.5" aria-hidden="true" />
                            </div>
                        )}
                    </div>
                );
            })}
            <div ref={messagesEndRef} />
        </div>
    );
};
