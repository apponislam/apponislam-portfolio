import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { SocialLinks } from "./config/social";
import CustomTooltip from "./custom-tooltips";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
    return (
        <footer className={cn("container mx-auto", className)}>
            <div className="container flex items-center justify-center gap-8 mt-10 py-10 md:h-24">
                {SocialLinks.map((item, ind) => (
                    <CustomTooltip icon={item.icon} text={item.username} key={ind}>
                        <Link
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${item.name} (${item.username})`}
                            title={`${item.name} (${item.username})`}
                            className={cn(
                                buttonVariants({
                                    variant: "ghost",
                                    size: "sm",
                                }),
                                "h-10 w-10 p-2"
                            )}
                        >
                            <item.icon className="h-5 w-5" aria-hidden="true" />
                            <span className="sr-only">{item.name} ({item.username})</span>
                        </Link>
                    </CustomTooltip>
                ))}
            </div>
        </footer>
    );
}
