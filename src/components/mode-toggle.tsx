"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export function ModeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();

    const handleToggle = () => {
        if (theme === "system") {
            setTheme(resolvedTheme === "dark" ? "light" : "dark");
        } else {
            setTheme(theme === "dark" ? "light" : "dark");
        }
    };

    return (
        <Button variant="ghost" size="sm" className="h-8 w-8 px-0" onClick={handleToggle} aria-label="Toggle theme">
            <Icons.sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" aria-hidden="true" />
            <Icons.moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" aria-hidden="true" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
