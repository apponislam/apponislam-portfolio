"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import aos from "aos";
import "aos/dist/aos.css";

export function AosProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    useEffect(() => {
        aos.init({
            duration: 800,
            once: true,
            easing: "ease-out-cubic",
        });
        aos.refresh();
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
