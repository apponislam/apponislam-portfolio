"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { educationData } from "@/data/resume";

export function EducationSection() {
    return (
        <div className="space-y-6" data-aos="fade-up">
            <div className="flex items-center gap-3 border-b pb-4 border-border/60">
                <div className="p-2 rounded-lg bg-primary/5 text-primary">
                    <Icons.education className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-2xl font-bold tracking-tight">Education</h3>
            </div>

            <div className="relative border-l border-border pl-6 space-y-8 ml-3">
                {educationData.map((item) => (
                    <div key={item.id} className="relative group">
                        {/* Timeline Node */}
                        <span className="absolute -left-7.75 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-border bg-background group-hover:border-primary group-hover:bg-primary transition-all duration-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground group-hover:bg-background transition-all duration-300" />
                        </span>

                        {/* Card Content */}
                        <Card className="p-5 border border-border/50 bg-card/40 dark:bg-transparent backdrop-blur-sm group-hover:border-primary/40 group-hover:shadow-md transition-all duration-300">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                                <div>
                                    <h4 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">{item.title}</h4>
                                    <p className="text-sm font-semibold text-muted-foreground">
                                        {item.organization} {item.location && `• ${item.location}`}
                                    </p>
                                </div>
                                <Badge variant="secondary" className="w-fit h-fit px-3 py-1 text-xs font-semibold rounded-md">
                                    {item.duration}
                                </Badge>
                            </div>
                            <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-4">
                                {item.description.map((desc, idx) => (
                                    <li key={idx} className="leading-relaxed">
                                        {desc}
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}
