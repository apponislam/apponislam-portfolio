"use client";

import React, { useState, useRef, useEffect, KeyboardEvent } from "react";
import { ArrowUp, Square } from "lucide-react";

interface ChatInputProps {
    onSendMessage: (text: string) => void;
    onStopStreaming: () => void;
    isStreaming: boolean;
    disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
    onSendMessage,
    onStopStreaming,
    isStreaming,
    disabled = false,
}) => {
    const [input, setInput] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-resize textarea height
    useEffect(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        textarea.style.height = "auto";
        const newHeight = Math.min(Math.max(textarea.scrollHeight, 38), 110);
        textarea.style.height = `${newHeight}px`;
    }, [input]);

    const handleSubmit = () => {
        const trimmed = input.trim();
        if (!trimmed || isStreaming || disabled) return;
        onSendMessage(trimmed);
        setInput("");
        if (textareaRef.current) {
            textareaRef.current.style.height = "38px";
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="p-3 border-t border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/60 backdrop-blur-md">
            <div className="relative flex items-end gap-2 p-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 shadow-2xs focus-within:ring-1 focus-within:ring-zinc-400 dark:focus-within:ring-zinc-600 focus-within:border-zinc-400 dark:focus-within:border-zinc-600 transition-all">
                <textarea
                    ref={textareaRef}
                    rows={1}
                    value={input}
                    disabled={disabled}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={
                        isStreaming
                            ? "AI is thinking..."
                            : disabled
                            ? "Connecting to assistant..."
                            : "Ask a question..."
                    }
                    className="flex-1 max-h-28 resize-none border-0 bg-transparent px-2.5 py-1.5 text-xs sm:text-[13px] text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-hidden leading-relaxed scrollbar-thin"
                />

                <div className="pb-0.5 pr-0.5">
                    {isStreaming ? (
                        <button
                            type="button"
                            onClick={onStopStreaming}
                            className="inline-flex items-center justify-center gap-1.5 h-7 px-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-100 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 text-xs font-medium transition-colors cursor-pointer shadow-xs"
                            title="Stop generation"
                            aria-label="Stop generating response"
                        >
                            <Square className="w-3 h-3 fill-current" aria-hidden="true" />
                            <span className="hidden sm:inline text-[11px]">Stop</span>
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={!input.trim() || disabled}
                            className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-100 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 transition-all duration-150 disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer shadow-xs hover:scale-105 active:scale-95"
                            title="Send message"
                            aria-label="Send message"
                        >
                            <ArrowUp className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
                        </button>
                    )}
                </div>
            </div>

            <p className="mt-1.5 text-center text-[10px] text-zinc-400 dark:text-zinc-500 select-none tracking-tight">
                Powered by Llama 3.2 · Appon Islam Portfolio
            </p>
        </div>
    );
};
