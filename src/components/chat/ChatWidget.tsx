"use client";

import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { MessageSquare, X, Sparkles } from "lucide-react";
import { getChatApiBaseUrl } from "@/hooks/useGuestChat";

// Dynamically load the chat modal so react-markdown and heavy chat dependencies are excluded from initial page bundle
const ChatModal = dynamic(
    () => import("./ChatModal").then((mod) => mod.ChatModal),
    { ssr: false }
);

export const ChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hasBeenOpened, setHasBeenOpened] = useState(false);
    const [isOnline, setIsOnline] = useState<boolean | null>(null);

    // Preload modal code on hover
    const handlePreload = useCallback(() => {
        import("./ChatModal");
    }, []);

    // Check backend health lazily after initial page paint
    useEffect(() => {
        const timer = setTimeout(async () => {
            try {
                const baseUrl = getChatApiBaseUrl();
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
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    const toggleOpen = () => {
        if (!hasBeenOpened) {
            setHasBeenOpened(true);
        }
        setIsOpen((prev) => !prev);
    };

    return (
        <>
            {/* Lazy-loaded Chat Modal Window */}
            {hasBeenOpened && (
                <ChatModal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    isOnline={isOnline}
                />
            )}

            {/* Floating Trigger Button (56px x 56px with status dot) */}
            <div className="fixed bottom-6 right-6 z-50">
                <button
                    type="button"
                    onClick={toggleOpen}
                    onMouseEnter={handlePreload}
                    onFocus={handlePreload}
                    className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-zinc-950 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950 border border-zinc-800/40 dark:border-zinc-200/50 shadow-xl shadow-black/20 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 focus:ring-offset-2"
                    aria-label={isOpen ? "Close AI chat assistant" : "Ask Appon's AI"}
                    title={isOpen ? "Close AI chat" : "Ask Appon's AI"}
                >
                    {/* 10px Health Status Dot */}
                    <span
                        className={`absolute top-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-white dark:ring-zinc-950 transition-colors ${
                            isOnline === true ? "bg-emerald-500" : isOnline === false ? "bg-rose-500" : "bg-amber-500"
                        }`}
                        title={isOnline === true ? "AI Online" : isOnline === false ? "AI Offline" : "Connecting..."}
                    />

                    {isOpen ? (
                        <X className="w-5 h-5 transition-transform duration-200" aria-hidden="true" />
                    ) : (
                        <div className="relative flex items-center justify-center">
                            <MessageSquare className="w-5 h-5 stroke-[2.2]" aria-hidden="true" />
                            <Sparkles className="w-2.5 h-2.5 text-amber-400 absolute -top-1.5 -right-1.5 animate-pulse" aria-hidden="true" />
                        </div>
                    )}

                    {/* Minimal Tooltip */}
                    {!isOpen && (
                        <span className="pointer-events-none absolute right-full mr-3 px-2.5 py-1 rounded-lg bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 text-xs font-medium whitespace-nowrap opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150 shadow-md border border-zinc-800 dark:border-zinc-300">
                            Ask AI ✨
                        </span>
                    )}
                </button>
            </div>
        </>
    );
};
