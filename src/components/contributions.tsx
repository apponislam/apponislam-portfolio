import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ProjectContribution } from "@/data/projects";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ContributionsProps {
    contributions?: ProjectContribution[];
}

export default function Contributions({ contributions }: ContributionsProps) {
    if (!contributions || contributions.length === 0) return null;

    return (
        <TooltipProvider>
            <div className="mt-5 flex flex-wrap gap-4 border-t border-muted pt-4">
                {contributions.map((contributor, idx) => {
                    const profileImg = contributor.profileImage || "/appon.webp";
                    const linkedinUrl = contributor.linkedinUsername ? `https://linkedin.com/in/${contributor.linkedinUsername}` : "#";

                    const hasHighlights = contributor.highlights && contributor.highlights.length > 0;

                    return (
                        <Tooltip key={idx} delayDuration={100}>
                            <TooltipTrigger asChild>
                                <Link href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-sm hover:opacity-90 transition-all group p-1.5 rounded-lg hover:bg-accent/40 border border-transparent hover:border-muted">
                                    <Image src={profileImg} alt={contributor.name} width={42} height={42} className="rounded-full bg-white object-cover border border-muted group-hover:scale-105 transition-transform" />
                                    <div className="flex-1 text-left leading-tight">
                                        <p className="font-medium group-hover:text-primary transition-colors">{contributor.name}</p>
                                        <p className="text-[12px] text-muted-foreground">{contributor.role}</p>
                                    </div>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="top" align="start" className="max-w-xs p-3.5 bg-background/95 backdrop-blur-md border border-muted text-foreground shadow-xl rounded-xl">
                                {hasHighlights ? (
                                    <div className="space-y-1">
                                        <p className="text-[11px] font-semibold text-muted-foreground">Key Highlights:</p>
                                        <ul className="text-xs space-y-1 pl-3.5 list-disc text-foreground/90">
                                            {contributor.highlights.map((highlight, hIdx) => (
                                                <li key={hIdx}>{highlight}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : (
                                    <p className="text-xs text-muted-foreground italic">Contributed to project architecture & implementation.</p>
                                )}
                            </TooltipContent>
                        </Tooltip>
                    );
                })}
            </div>
        </TooltipProvider>
    );
}
