"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, Trash2 } from "lucide-react";
import { useGuestChat } from "@/hooks/useGuestChat";
import { ChatMessageList } from "./ChatMessageList";
import { ChatInput } from "./ChatInput";
import apponImg from "../../../public/appon.webp";

interface ChatModalProps {
    isOpen: boolean;
    onClose: () => void;
    isOnline?: boolean | null;
}
export const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose, isOnline }) => {
    const [showConfirmClear, setShowConfirmClear] = useState(false);
    const {
        messages,
        isStreaming,
        isLoadingHistory,
        hasMoreOlder,
        isLoadingOlder,
        loadOlderMessages,
        isOnline: hookIsOnline,
        sendMessage,
        stopStreaming,
        clearChat,
    } = useGuestChat();

    // Use online status from hook if available, fallback to prop
    const onlineStatus = hookIsOnline ?? isOnline;

    const handleCloseModal = () => {
        if (isStreaming) {
            stopStreaming();
        }
        onClose();
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                handleCloseModal();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, isStreaming]);

    const handleClearChat = async () => {
        await clearChat();
        setShowConfirmClear(false);
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div
            role="dialog"
            aria-label="Appon's AI Assistant"
            aria-modal="true"
            className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-6 z-50 flex flex-col w-full h-full sm:w-102.5 sm:h-150 sm:rounded-2xl bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150"
        >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-zinc-900/40 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xs">
                            <Image src={apponImg} alt="Appon Islam" width={32} height={32} className="w-full h-full object-cover" />
                        </div>
                        <span
                            className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full ring-2 ring-white dark:ring-zinc-950 ${onlineStatus === true ? "bg-emerald-500" : onlineStatus === false ? "bg-rose-500" : "bg-amber-500"}`}
                            title={onlineStatus === true ? "Online" : onlineStatus === false ? "Offline" : "Checking status"}
                        />
                    </div>

                    <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                            <h3 className="font-heading font-semibold text-sm leading-tight text-zinc-900 dark:text-zinc-100">Appon&apos;s AI Assistant</h3>
                        </div>
                        <span className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight">
                            {onlineStatus === true ? "Online • Llama 3.2" : onlineStatus === false ? "Offline • Llama 3.2" : "Connecting • Llama 3.2"}
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
                        onClick={handleCloseModal}
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
                hasMoreOlder={hasMoreOlder}
                isLoadingOlder={isLoadingOlder}
                onLoadOlder={loadOlderMessages}
                onSelectPrompt={sendMessage}
            />

            {/* Input Footer */}
            <ChatInput onSendMessage={sendMessage} onStopStreaming={stopStreaming} isStreaming={isStreaming} disabled={isLoadingHistory} />
        </div>
    );
};
