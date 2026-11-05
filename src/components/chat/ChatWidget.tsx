"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MessageSquare, X, Trash2, Sparkles } from "lucide-react";
import { useGuestChat } from "@/hooks/useGuestChat";
import { ChatMessageList } from "./ChatMessageList";
import { ChatInput } from "./ChatInput";
import apponImg from "../../../public/appon.webp";

export const ChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showConfirmClear, setShowConfirmClear] = useState(false);

    const {
        messages,
        isStreaming,
        isLoadingHistory,
        isOnline,
        sendMessage,
        stopStreaming,
        clearChat,
    } = useGuestChat();

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                setIsOpen(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen]);

    const handleClearChat = async () => {
        await clearChat();
        setShowConfirmClear(false);
    };

    return (
        <>
            {/* Chat Modal Window */}
            {isOpen && (
                <div
                    role="dialog"
                    aria-label="AI Chat Assistant"
                    aria-modal="true"
                    className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-6 z-50 flex flex-col w-full h-full sm:w-[410px] sm:h-[600px] sm:rounded-2xl bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-zinc-900/40 backdrop-blur-md">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-8 h-8 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xs">
                                    <Image
                                        src={apponImg}
                                        alt="Appon Islam"
                                        width={32}
                                        height={32}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <span
                                    className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full ring-2 ring-white dark:ring-zinc-950 ${
                                        isOnline === true
                                            ? "bg-emerald-500"
                                            : isOnline === false
                                            ? "bg-rose-500"
                                            : "bg-amber-500"
                                    }`}
                                    title={
                                        isOnline === true
                                            ? "Online"
                                            : isOnline === false
                                            ? "Offline"
                                            : "Checking status"
                                    }
                                />
                            </div>

                            <div className="flex flex-col">
                                <div className="flex items-center gap-1.5">
                                    <h3 className="font-heading font-semibold text-sm leading-tight text-zinc-900 dark:text-zinc-100">
                                        Appon&apos;s AI
                                    </h3>
                                    <span className="inline-block px-1.5 py-0.2 rounded text-[9px] font-mono font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                                        Llama 3.2
                                    </span>
                                </div>
                                <span className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight">
                                    Ask about projects, skills & experience
                                </span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1">
                            {messages.length > 0 && (
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmClear((prev) => !prev)}
                                    className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                                    title="Clear conversation"
                                    aria-label="Clear chat history"
                                >
                                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                                </button>
                            )}

                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                                title="Close"
                                aria-label="Close chat window"
                            >
                                <X className="w-4 h-4" aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                    {/* Clear Confirmation Banner */}
                    {showConfirmClear && (
                        <div className="px-3.5 py-2.5 bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-700 dark:text-zinc-300 animate-in fade-in-50 duration-150">
                            <span>Clear chat messages?</span>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={handleClearChat}
                                    className="px-2.5 py-1 rounded-md bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900 text-[11px] font-medium transition-opacity hover:opacity-90 cursor-pointer"
                                >
                                    Clear
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmClear(false)}
                                    className="px-2.5 py-1 rounded-md bg-zinc-200/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-[11px] font-medium transition-colors hover:bg-zinc-300 dark:hover:bg-zinc-700 cursor-pointer"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Messages Body */}
                    <ChatMessageList
                        messages={messages}
                        isStreaming={isStreaming}
                        isLoadingHistory={isLoadingHistory}
                        onSelectPrompt={sendMessage}
                    />

                    {/* Input Footer */}
                    <ChatInput
                        onSendMessage={sendMessage}
                        onStopStreaming={stopStreaming}
                        isStreaming={isStreaming}
                        disabled={isLoadingHistory}
                    />
                </div>
            )}

            {/* Floating Trigger Button */}
            <div className="fixed bottom-6 right-6 z-50">
                <button
                    type="button"
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="group relative flex items-center justify-center w-13 h-13 rounded-full bg-zinc-950 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950 border border-zinc-800/40 dark:border-zinc-200/50 shadow-xl shadow-black/20 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 focus:ring-offset-2"
                    aria-label={isOpen ? "Close AI chat assistant" : "Ask Appon's AI"}
                    title={isOpen ? "Close AI chat" : "Ask Appon's AI"}
                >
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
