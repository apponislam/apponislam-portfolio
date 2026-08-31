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

        // Prevent duplicate tracking calls for the same route in strict mode
        if (lastTrackedPath.current === pathname) return;
        lastTrackedPath.current = pathname;

        const referrer = typeof document !== "undefined" ? document.referrer : "";

        trackPageView({
            path: pathname,
            referrer,
        }).catch(() => {
            // Silently ignore tracking failures so no errors show up in console or frontend
        });
    }, [pathname, trackPageView]);

    return <>{children}</>;
}
