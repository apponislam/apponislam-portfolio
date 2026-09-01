"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useTrackPageViewMutation } from "@/redux/features/page-analytics/pageAnalyticsApi";

export default function AnalyticsTracker({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [trackPageView] = useTrackPageViewMutation();
    const lastTrackedPath = useRef<string | null>(null);

    useEffect(() => {
        if (!pathname) return;

        // Skip tracking internal admin dashboard pages
        if (pathname.startsWith("/dashboard")) return;

        // Prevent duplicate tracking for the exact same path in strict mode
        if (lastTrackedPath.current === pathname) return;
        lastTrackedPath.current = pathname;

        const referrer = typeof document !== "undefined" ? document.referrer : "";

        trackPageView({
            path: pathname,
            referrer: referrer || undefined,
        })
            .unwrap()
            .catch(() => {
                // Silently handle any tracking errors
            });
    }, [pathname, trackPageView]);

    return <>{children}</>;
}
