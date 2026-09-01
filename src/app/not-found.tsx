import React from "react";
import "./globals.css";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Custom404() {
    return (
        <div className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-12">
            {/* Ambient background glows */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[140px]" />

            <div className="max-w-md w-full space-y-6">
                {/* 404 Glowing Number */}
                <div className="relative inline-flex items-center justify-center">
                    <span className="font-heading text-8xl sm:text-9xl font-black tracking-widest text-transparent bg-clip-text bg-linear-to-b from-foreground via-foreground/80 to-muted-foreground/30 select-none">404</span>
                </div>

                {/* Text Description */}
                <div className="space-y-2">
                    <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Page Not Found</h1>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">Sorry, the page you are looking for does not exist or has been moved.</p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 w-full">
                    <Link href="/" className={cn(buttonVariants({ size: "default" }), "w-full sm:w-auto px-6 font-semibold shadow-md transition-all hover:scale-[1.02]")}>
                        <Icons.home className="w-4 h-4 mr-2 shrink-0" /> Back to Home
                    </Link>
                    <Link href="/contact" className={cn(buttonVariants({ variant: "outline", size: "default" }), "w-full sm:w-auto px-6 font-semibold transition-all")}>
                        <Icons.mail className="w-4 h-4 mr-2 shrink-0" /> Contact
                    </Link>
                </div>
            </div>
        </div>
    );
}
