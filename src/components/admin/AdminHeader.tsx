"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Norican } from "next/font/google";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/components/config/site";
import { Icons } from "@/components/icons";
import { MobileNav } from "@/components/mobile-nav";
import NavRightMenu from "@/components/nav-right-menu";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logOut, currentUser, currentToken } from "@/redux/features/auth/authSlice";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { ChangePasswordModal } from "@/components/admin/ChangePasswordModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { KeyRound, LogOut, ShieldCheck } from "lucide-react";

const norican = Norican({
    weight: ["400"],
    style: ["normal"],
    subsets: ["latin"],
    display: "swap",
});

export function AdminHeader() {
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const token = useAppSelector(currentToken);
    const user = useAppSelector(currentUser);
    const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
    const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);
    const [isChangePasswordOpen, setIsChangePasswordOpen] = React.useState<boolean>(false);

    React.useEffect(() => {
        setShowMobileMenu(false);
    }, [pathname]);

    const handleLogout = async () => {
        try {
            await logout().unwrap();
        } catch (error) {
            console.error("Logout API error:", error);
        } finally {
            dispatch(logOut());
        }
    };

    const getInitials = (name?: string, email?: string) => {
        if (name) {
            const parts = name.trim().split(" ");
            if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
            return name.slice(0, 2).toUpperCase();
        }
        if (email) return email.slice(0, 2).toUpperCase();
        return "A";
    };

    const adminNavItems = [
        { title: "Dashboard", href: "/dashboard" },
        { title: "Messages", href: "/dashboard/contacts" },
        { title: "Analytics", href: "/dashboard/analytics" },
        { title: "Activity", href: "/dashboard/activity" },
    ];

    return (
        <header className="container z-50 bg-background mx-auto">
            <div className="flex h-20 items-center justify-between py-6">
                <div className="flex gap-6 md:gap-10">
                    <Link href="/dashboard" className="hidden items-center space-x-2 md:flex">
                        <span className={cn(norican.className, "text-2xl")}>{siteConfig.name}</span>
                    </Link>

                    {token && (
                        <nav className="hidden gap-6 md:flex">
                            {adminNavItems.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className={cn("flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm", pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href)) ? "text-foreground font-bold" : "text-foreground/60")}
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </nav>
                    )}

                    {token && (
                        <button className="flex items-center space-x-2 md:hidden" onClick={() => setShowMobileMenu(!showMobileMenu)}>
                            {showMobileMenu ? <Icons.close /> : <Icons.menu />}
                            <span className="font-bold">Menu</span>
                        </button>
                    )}
                    {token && showMobileMenu && <MobileNav items={adminNavItems} />}
                </div>

                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="relative h-10 w-10 rounded-full p-0 border border-primary/20 hover:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/40 cursor-pointer transition-all overflow-hidden"
                                    >
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={user.profileImage} alt={user.name || "User"} />
                                            <AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">
                                                {getInitials(user.name, user.email)}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56 p-2 shadow-xl border-border/60">
                                    <DropdownMenuLabel className="font-normal p-2">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-semibold leading-none text-foreground">{user.name || "Admin User"}</p>
                                            <p className="text-xs leading-none text-muted-foreground truncate">{user.email}</p>
                                            {user.role && (
                                                <div className="pt-1.5 flex items-center gap-1 text-[11px] font-medium text-primary">
                                                    <ShieldCheck className="h-3 w-3" />
                                                    <span className="uppercase tracking-wider">{user.role}</span>
                                                </div>
                                            )}
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={() => setIsChangePasswordOpen(true)}
                                        className="cursor-pointer font-medium p-2.5 rounded-lg gap-2"
                                    >
                                        <KeyRound className="h-4 w-4 text-muted-foreground" />
                                        <span>Change Password</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={handleLogout}
                                        disabled={isLoggingOut}
                                        className="text-red-500 focus:text-red-500 focus:bg-red-500/10 dark:focus:bg-red-500/20 cursor-pointer font-medium p-2.5 rounded-lg gap-2"
                                    >
                                        {isLoggingOut ? (
                                            <Icons.spinner className="h-4 w-4 animate-spin text-red-500" />
                                        ) : (
                                            <LogOut className="h-4 w-4 text-red-500" />
                                        )}
                                        <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <ChangePasswordModal
                                open={isChangePasswordOpen}
                                onOpenChange={setIsChangePasswordOpen}
                            />
                        </>
                    ) : (
                        <Link href="/dashboard/login">
                            <Button size="sm">Login</Button>
                        </Link>
                    )}
                    <NavRightMenu />
                </div>
            </div>
        </header>
    );
}
