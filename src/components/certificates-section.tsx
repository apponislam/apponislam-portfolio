"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { certificatesData } from "@/data/resume";

export function CertificatesSection() {
    if (!certificatesData || certificatesData.length === 0) return null;

    return (
        <div className="space-y-6" data-aos="fade-up">
            <div className="flex items-center gap-3 border-b pb-4 border-border/60">
                <div className="p-2 rounded-lg bg-primary/5 text-primary">
                    <Icons.certificate className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-2xl font-bold tracking-tight">Certifications</h3>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
                {certificatesData.map((item) => (
                    <Card
                        key={item.id}
                        className="p-5 border border-border/50 bg-card/40 dark:bg-transparent backdrop-blur-sm hover:border-primary/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex items-start justify-between gap-2 mb-2">
                                <div>
                                    <h4 className="text-lg font-bold text-foreground hover:text-primary transition-colors duration-300">
                                        {item.title}
                                    </h4>
                                    <p className="text-sm font-semibold text-muted-foreground">{item.issuer}</p>
                                </div>
                                <Badge variant="secondary" className="w-fit h-fit px-3 py-1 text-xs font-semibold rounded-md">
                                    {item.issueDate}
                                </Badge>
                            </div>

                            {item.description && item.description.length > 0 && (
                                <ul className="space-y-1 text-sm text-muted-foreground list-disc pl-4 mt-3">
                                    {item.description.map((desc, idx) => (
                                        <li key={idx} className="leading-relaxed">
                                            {desc}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {item.credentialUrl && (
                            <div className="mt-4 pt-3 border-t border-border/40 flex justify-end">
                                <Link
                                    href={item.credentialUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                                >
                                    <span>Verify Credential</span>
                                    <Icons.externalLink className="h-3.5 w-3.5" />
                                </Link>
                            </div>
                        )}
                    </Card>
                ))}
            </div>
        </div>
    );
}
