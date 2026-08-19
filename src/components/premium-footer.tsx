import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { SocialLinks } from "./config/social";
import CustomTooltip from "./custom-tooltips";

export function PremiumFooter({ className }: React.HTMLAttributes<HTMLElement>) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={cn("border-t border-border/40 bg-background/50 backdrop-blur-md mt-20", className)}>
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center border-b border-border/40 pb-10">
                    {/* Brand / Logo Section */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
                        <Link href="/" className="font-heading text-xl font-bold tracking-tight hover:text-primary transition-colors">
                            Appon Islam
                        </Link>
                        <p className="text-sm text-muted-foreground max-w-xs">Full Stack Developer creating highly optimized, modern, and engaging web solutions.</p>
                    </div>

                    {/* Quick Links Section */}
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium">
                        <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                            Home
                        </Link>
                        <Link href="/skills" className="text-muted-foreground hover:text-foreground transition-colors">
                            Skills
                        </Link>
                        <Link href="/projects" className="text-muted-foreground hover:text-foreground transition-colors">
                            Projects
                        </Link>
                        <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                            Contact
                        </Link>
                    </div>

                    {/* Social Section */}
                    <div className="flex justify-center md:justify-end gap-4">
                        {SocialLinks.map((item, ind) => (
                            <CustomTooltip icon={item.icon} text={item.username} key={ind}>
                                <Link
                                    href={item.link}
                                    target="_blank"
                                    className={cn(
                                        buttonVariants({
                                            variant: "ghost",
                                            size: "sm",
                                        }),
                                        "h-9 w-9 p-0 rounded-full border border-border/60 hover:bg-accent/60 dark:hover:bg-accent/30",
                                    )}
                                >
                                    <item.icon className="h-4 w-4" />
                                </Link>
                            </CustomTooltip>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar: Copyright and Credits */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 text-xs text-muted-foreground">
                    <p>© {currentYear} Appon Islam. All rights reserved.</p>
                    <p>
                        Designed & Developed by{" "}
                        <Link href="https://www.linkedin.com/in/apponislam" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-foreground hover:underline transition-colors duration-200">
                            Appon Islam
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}
