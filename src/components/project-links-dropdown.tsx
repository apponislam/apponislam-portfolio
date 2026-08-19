"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icons } from "./icons";
import { buttonVariants } from "./ui/button";
import CustomTooltip from "./custom-tooltips";
import { Project } from "@/data/projects";

interface ProjectLinksDropdownProps {
    project: Project;
}

export default function ProjectLinksDropdown({ project }: ProjectLinksDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const hasSpecificGithub = !!(project.githubFrontendLink || project.githubBackendLink);
    const hasSpecificWebsite = !!(project.liveLink || project.productionLink);

    const projectLinks = [
        {
            url: project.liveLink,
            label: "Live Demo",
            icon: Icons.globe,
            tooltip: "View live preview/demo website",
            colorClass: "hover:text-emerald-500 hover:border-emerald-500/30 hover:bg-emerald-500/5 dark:hover:bg-emerald-500/10",
        },
        {
            url: hasSpecificWebsite ? undefined : project.websiteLink,
            label: "Website",
            icon: Icons.externalLink,
            tooltip: "Visit the project's website",
            colorClass: "hover:text-indigo-500 hover:border-indigo-500/30 hover:bg-indigo-500/5 dark:hover:bg-indigo-500/10",
        },
        {
            url: project.productionLink,
            label: "Production",
            icon: Icons.externalLink,
            tooltip: "Visit production server",
            colorClass: "hover:text-blue-500 hover:border-blue-500/30 hover:bg-blue-500/5 dark:hover:bg-blue-500/10",
        },
        {
            url: project.appLink,
            label: "App Store",
            icon: Icons.smartphone,
            tooltip: "Download mobile app",
            colorClass: "hover:text-purple-500 hover:border-purple-500/30 hover:bg-purple-500/5 dark:hover:bg-purple-500/10",
        },
        {
            url: hasSpecificGithub ? undefined : project.githubLink,
            label: "GitHub",
            icon: Icons.gitHub,
            tooltip: "View repository on GitHub",
            colorClass: "hover:text-amber-500 hover:border-amber-500/30 hover:bg-amber-500/5 dark:hover:bg-amber-500/10",
        },
        {
            url: project.githubFrontendLink,
            label: "Frontend",
            icon: Icons.gitHub,
            tooltip: "View frontend repository on GitHub",
            colorClass: "hover:text-cyan-500 hover:border-cyan-500/30 hover:bg-cyan-500/5 dark:hover:bg-cyan-500/10",
        },
        {
            url: project.githubBackendLink,
            label: "Backend",
            icon: Icons.gitHub,
            tooltip: "View backend repository on GitHub",
            colorClass: "hover:text-rose-500 hover:border-rose-500/30 hover:bg-rose-500/5 dark:hover:bg-rose-500/10",
        },
    ].filter((link) => !!link.url);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (projectLinks.length === 0) return null;

    return (
        <div ref={containerRef} className="relative shrink-0">
            <style>{`
                @keyframes linksGlow {
                    0% {
                        box-shadow: 0 0 4px rgba(16, 185, 129, 0.2), inset 0 0 2px rgba(16, 185, 129, 0.05);
                        border-color: rgba(16, 185, 129, 0.3);
                    }
                    100% {
                        box-shadow: 0 0 16px rgba(16, 185, 129, 0.55), inset 0 0 4px rgba(16, 185, 129, 0.15);
                        border-color: rgba(16, 185, 129, 0.75);
                    }
                }
                .animate-links-glow {
                    animation: linksGlow 1.5s infinite alternate ease-in-out;
                }
            `}</style>

            {/* Trigger Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen((prev) => !prev);
                }}
                className="flex items-center gap-1.5 border border-emerald-500/30 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-500/10 transition-all duration-300 rounded-full px-3.5 py-1.5 text-xs font-semibold cursor-pointer select-none animate-links-glow"
            >
                <Icons.link className="h-3.5 w-3.5" />
                <span>Links</span>
            </button>

            {/* Vertical Dropdown Tray */}
            <div
                className={cn(
                    "absolute right-0 top-full mt-2 flex flex-col gap-2 bg-background/95 backdrop-blur-md border border-muted p-2 rounded-xl shadow-lg transition-all duration-200 z-50 min-w-40",
                    isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none",
                )}
            >
                {projectLinks.map((link) => (
                    <CustomTooltip key={link.label} text={link.tooltip}>
                        <Link
                            href={link.url!}
                            target="_blank"
                            onClick={() => setIsOpen(false)}
                            className={cn(
                                buttonVariants({ variant: "outline", size: "sm" }),
                                "flex items-center gap-1.5 border border-muted bg-background/50 text-foreground/80 hover:text-foreground hover:bg-accent/50 transition-all duration-200 shadow-xs rounded-full px-3.5 py-1.5 text-xs font-semibold cursor-pointer w-full justify-start",
                                link.colorClass,
                            )}
                        >
                            <link.icon className="h-3.5 w-3.5" />
                            <span>{link.label}</span>
                        </Link>
                    </CustomTooltip>
                ))}
            </div>
        </div>
    );
}
