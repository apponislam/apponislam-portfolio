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
import { logOut, currentUser } from "@/redux/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

const norican = Norican({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export function AdminHeader() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const user = useAppSelector(currentUser);
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  React.useEffect(() => {
    setShowMobileMenu(false);
  }, [pathname]);

  const adminNavItems = [
    { title: "Dashboard", href: "/admin/dashboard" },
    { title: "Messages", href: "/admin/contacts" },
    { title: "Analytics", href: "/admin/analytics" },
    { title: "Activity", href: "/admin/activity" },
  ];

  return (
    <header className="container z-50 bg-background mx-auto">
      <div className="flex h-20 items-center justify-between py-6">
        <div className="flex gap-6 md:gap-10">
          <Link href="/admin/dashboard" className="hidden items-center space-x-2 md:flex">
            <span className={cn(norican.className, "text-2xl")}>{siteConfig.name}</span>
          </Link>

          <nav className="hidden gap-6 md:flex">
            {adminNavItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                  pathname.startsWith(item.href) ? "text-foreground font-bold" : "text-foreground/60"
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          <button
            className="flex items-center space-x-2 md:hidden"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <Icons.close /> : <Icons.menu />}
            <span className="font-bold">Menu</span>
          </button>
          {showMobileMenu && <MobileNav items={adminNavItems} />}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <User className="h-4 w-4" />
                <span>{user.name || user.email}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => dispatch(logOut())}
                className="flex items-center gap-1.5"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          ) : (
            <Link href="/auth/login">
              <Button size="sm">Login</Button>
            </Link>
          )}
          <NavRightMenu />
        </div>
      </div>
    </header>
  );
}
