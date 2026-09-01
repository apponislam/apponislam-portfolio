"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { currentToken } from "@/redux/features/auth/authSlice";
import { Icons } from "@/components/icons";

const PUBLIC_ROUTES = [
    "/dashboard/login",
    "/dashboard/forgot-password",
    "/dashboard/verify-otp",
    "/dashboard/reset-password",
];

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const token = useAppSelector(currentToken);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(route + "/"));

    useEffect(() => {
        if (!mounted) return;

        if (!isPublicRoute && !token) {
            router.replace("/dashboard/login");
        } else if (isPublicRoute && token) {
            router.replace("/dashboard");
        }
    }, [token, isPublicRoute, pathname, router, mounted]);

    if (!mounted) {
        return (
            <div className="flex justify-center items-center py-32 text-muted-foreground gap-3">
                <Icons.spinner className="animate-spin h-8 w-8 text-primary" />
            </div>
        );
    }

    if (!isPublicRoute && !token) {
        return (
            <div className="flex justify-center items-center py-32 text-muted-foreground gap-3">
                <Icons.spinner className="animate-spin h-8 w-8 text-primary" />
                <span className="font-medium text-lg">Redirecting to login...</span>
            </div>
        );
    }

    if (isPublicRoute && token) {
        return (
            <div className="flex justify-center items-center py-32 text-muted-foreground gap-3">
                <Icons.spinner className="animate-spin h-8 w-8 text-primary" />
                <span className="font-medium text-lg">Redirecting to dashboard...</span>
            </div>
        );
    }

    return <>{children}</>;
}
