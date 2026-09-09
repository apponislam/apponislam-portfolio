"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Project, ProjectLink } from "@/data/projects";
import { Icons } from "./icons";
import CustomTooltip from "./custom-tooltips";
import { buttonVariants } from "./ui/button";

interface ProjectLinksDropdownProps {
    project: Project;
    align?: "left" | "right" | "auto";
}

export default function ProjectLinksDropdown({ project, align = "auto" }: ProjectLinksDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [detectedAlign, setDetectedAlign] = useState<"left" | "right">("right");
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const windowWidth = window.innerWidth;
            // Auto-detect: if space on right is limited (< 180px) or button is on right half of screen, align right
            if (windowWidth - rect.left < 180 || rect.left > windowWidth / 2) {
                setDetectedAlign("right");
            } else {
                setDetectedAlign("left");
            }
        }
    }, [isOpen]);

    const effectiveAlign = align === "auto" ? detectedAlign : align;

    // Helper function to extract link properties
    const extractLink = (linkObj?: ProjectLink) => {
        if (!linkObj) return undefined;
        return {
            url: linkObj.url,
            disabled: linkObj.disabled,
            isPrivate: linkObj.private,
            exists: true,
        };
    };

    const links = project.links || {};

    const liveInfo = extractLink(links.live);
    const demoInfo = extractLink(links.demo);
    const githubFrontendInfo = extractLink(links.githubFrontend);
    const githubBackendInfo = extractLink(links.githubBackend);
    const githubAppInfo = extractLink(links.githubApp);
    const googleStoreInfo = extractLink(links.googleStore);
    const appleStoreInfo = extractLink(links.appleStore);
    const driveAppInfo = extractLink(links.driveApp);

    const getTooltipText = (info: ReturnType<typeof extractLink>, defaultAction: string) => {
        if (!info) return "";
        if (info.disabled && info.isPrivate) {
            return `Private link & disabled (${defaultAction} unavailable)`;
        }
        if (info.disabled) {
            return `Link is currently disabled (${defaultAction} unavailable)`;
        }
        if (info.isPrivate) {
            return `Private access (${defaultAction} requires special access)`;
        }
        return defaultAction;
    };

    const rawProjectLinks = [
        liveInfo && {
            ...liveInfo,
            label: "Live Site",
            icon: Icons.globe,
            tooltip: getTooltipText(liveInfo, "Visit live site"),
            colorClass: "hover:text-emerald-500 hover:border-emerald-500/30 hover:bg-emerald-500/5 dark:hover:bg-emerald-500/10",
        },
        demoInfo && {
            ...demoInfo,
            label: "Demo",
            icon: Icons.externalLink,
            tooltip: getTooltipText(demoInfo, "View live demo"),
            colorClass: "hover:text-indigo-500 hover:border-indigo-500/30 hover:bg-indigo-500/5 dark:hover:bg-indigo-500/10",
        },
        githubFrontendInfo && {
            ...githubFrontendInfo,
            label: "Frontend Repo",
            icon: Icons.gitHub,
            tooltip: getTooltipText(githubFrontendInfo, "View frontend source code"),
            colorClass: "hover:text-cyan-500 hover:border-cyan-500/30 hover:bg-cyan-500/5 dark:hover:bg-cyan-500/10",
        },
        githubBackendInfo && {
            ...githubBackendInfo,
            label: "Backend Repo",
            icon: Icons.gitHub,
            tooltip: getTooltipText(githubBackendInfo, "View backend source code"),
            colorClass: "hover:text-rose-500 hover:border-rose-500/30 hover:bg-rose-500/5 dark:hover:bg-rose-500/10",
        },
        githubAppInfo && {
            ...githubAppInfo,
            label: "App Repo",
            icon: Icons.gitHub,
            tooltip: getTooltipText(githubAppInfo, "View mobile app source code"),
            colorClass: "hover:text-amber-500 hover:border-amber-500/30 hover:bg-amber-500/5 dark:hover:bg-amber-500/10",
        },
        googleStoreInfo && {
            ...googleStoreInfo,
            label: "Play Store",
            icon: Icons.smartphone,
            tooltip: getTooltipText(googleStoreInfo, "Download on Google Play Store"),
            colorClass: "hover:text-purple-500 hover:border-purple-500/30 hover:bg-purple-500/5 dark:hover:bg-purple-500/10",
        },
        appleStoreInfo && {
            ...appleStoreInfo,
            label: "App Store",
            icon: Icons.smartphone,
            tooltip: getTooltipText(appleStoreInfo, "Download on Apple App Store"),
            colorClass: "hover:text-sky-500 hover:border-sky-500/30 hover:bg-sky-500/5 dark:hover:bg-sky-500/10",
        },
        driveAppInfo && {
            ...driveAppInfo,
            label: "Drive APK",
            icon: Icons.smartphone,
            tooltip: getTooltipText(driveAppInfo, "Download APK from Google Drive"),
            colorClass: "hover:text-amber-500 hover:border-amber-500/30 hover:bg-amber-500/5 dark:hover:bg-amber-500/10",
        },
    ];

    const projectLinks = rawProjectLinks.filter((link): link is NonNullable<typeof link> => Boolean(link));

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
                    "absolute top-full mt-2 flex flex-col gap-2 bg-background/95 backdrop-blur-md border border-muted p-2 rounded-xl shadow-lg transition-all duration-200 z-50 min-w-44 max-w-[calc(100vw-2rem)]",
                    effectiveAlign === "left" ? "left-0 right-auto" : "right-0 left-auto",
                    isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none",
                )}
            >
                {projectLinks.map((link) => {
                    const isDisabled = link.disabled || link.isPrivate || !link.url;
                    const content = (
                        <div
                            className={cn(
                                buttonVariants({ variant: "outline", size: "sm" }),
                                "flex items-center gap-1.5 border border-muted bg-background/50 text-foreground/80 transition-all duration-200 shadow-xs rounded-full px-3.5 py-1.5 text-xs font-semibold w-full justify-start whitespace-nowrap",
                                isDisabled ? "opacity-60 bg-muted/20 border-dashed cursor-not-allowed text-muted-foreground" : "hover:text-foreground hover:bg-accent/50 cursor-pointer",
                                !isDisabled && link.colorClass,
                            )}
                        >
                            <link.icon className="h-3.5 w-3.5 shrink-0" />
                            <span className={cn("truncate", isDisabled && "line-through opacity-70")}>{link.label}</span>
                            <div className="ml-auto flex items-center gap-1">
                                {link.disabled && <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-muted/80 text-muted-foreground border border-muted-foreground/20">None</span>}
                                {link.isPrivate && <span className="text-[10px] uppercase font-mono px-1 py-0.2 rounded bg-muted/80 text-muted-foreground border border-muted-foreground/20">Private</span>}
                            </div>
                        </div>
                    );

                    if (isDisabled) {
                        return (
                            <CustomTooltip key={link.label} text={link.tooltip}>
                                <div className="w-full cursor-not-allowed">{content}</div>
                            </CustomTooltip>
                        );
                    }

                    return (
                        <CustomTooltip key={link.label} text={link.tooltip}>
                            <Link href={link.url!} target="_blank" onClick={() => setIsOpen(false)} className="block w-full">
                                {content}
                            </Link>
                        </CustomTooltip>
                    );
                })}
            </div>
        </div>
    );
}
