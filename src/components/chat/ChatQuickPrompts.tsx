"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Code2, FolderGit2, Briefcase, Mail, ArrowUpRight } from "lucide-react";
import apponImg from "../../../public/appon.webp";

interface ChatQuickPromptsProps {
    onSelectPrompt: (promptText: string) => void;
    disabled?: boolean;
}

const QUICK_PROMPTS = [
    {
        title: "Tech Stack & Skills",
        desc: "Frameworks, languages, databases",
        prompt: "What is your tech stack and expertise?",
        icon: Code2,
    },
    {
        title: "Featured Projects",
        desc: "Full-stack apps, architecture, live demos",
        prompt: "Tell me about your featured projects.",
        icon: FolderGit2,
    },
    {
        title: "Experience & Background",
        desc: "Work history and professional roles",
        prompt: "What is your professional experience?",
        icon: Briefcase,
    },
    {
        title: "Hire & Contact",
        desc: "Availability, email, and social links",
        prompt: "How can I contact or hire you?",
        icon: Mail,
    },
];

export const ChatQuickPrompts: React.FC<ChatQuickPromptsProps> = ({ onSelectPrompt, disabled }) => {
    return (
        <div className="flex flex-col items-center justify-center p-5 text-center my-auto space-y-4">
            {/* Minimal Avatar Greeting */}
            <div className="relative">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-zinc-200 dark:border-zinc-800 shadow-md mx-auto">
                    <Image
                        src={apponImg}
                        alt="Appon Islam"
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 shadow-xs">
                    <Sparkles className="w-3 h-3" aria-hidden="true" />
                </div>
            </div>

            <div className="space-y-1">
                <h4 className="font-heading text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                    Ask Appon&apos;s AI
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-[270px] mx-auto leading-relaxed">
                    Trained on my projects, skills, and background. Select a question below or write your own.
                </p>
            </div>

            {/* Clean Prompt Cards */}
            <div className="grid grid-cols-1 gap-2 w-full pt-1">
                {QUICK_PROMPTS.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={idx}
                            type="button"
                            disabled={disabled}
                            onClick={() => onSelectPrompt(item.prompt)}
                            className="group flex items-center justify-between p-3 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/60 dark:bg-zinc-900/40 hover:bg-zinc-100/90 dark:hover:bg-zinc-800/70 hover:border-zinc-300 dark:hover:border-zinc-700 text-left transition-all duration-150 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                <span className="p-2 rounded-lg bg-zinc-200/60 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-950 dark:group-hover:text-zinc-100 transition-colors shrink-0">
                                    <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                                </span>
                                <div className="flex flex-col min-w-0">
                                    <span className="font-medium text-xs text-zinc-900 dark:text-zinc-100 truncate">
                                        {item.title}
                                    </span>
                                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                                        {item.desc}
                                    </span>
                                </div>
                            </div>
                            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
