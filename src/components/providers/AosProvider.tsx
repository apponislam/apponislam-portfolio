"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import aos from "aos";

export function AosProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    useEffect(() => {
        // Defer AOS initialization past initial paint to eliminate forced reflows during page load
        const timer = setTimeout(() => {
            aos.init({
                duration: 800,
                once: true,
                easing: "ease-out-cubic",
            });
        }, 120);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Refresh AOS on client-side route changes
        const timer = setTimeout(() => {
            aos.refresh();
        }, 100);
        return () => clearTimeout(timer);
    }, [pathname]);

    return <>{children}</>;
}
