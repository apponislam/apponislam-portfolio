import { getMainNav } from "@/components/config/routes";
import { MainNav } from "@/components/main-nav";
import NavRightMenu from "@/components/nav-right-menu";
import { PremiumFooter } from "@/components/premium-footer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Panel | Appon Islam",
    robots: {
        index: false,
        follow: false,
        googleBot: {
            index: false,
            follow: false,
            "max-video-preview": -1,
            "max-image-preview": "none",
            "max-snippet": -1,
        },
    },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const mainNav = await getMainNav();
    return (
        <>
            <div className="container mx-auto">
                <div className="mx-3 md:mx-0">
                    <header className="container z-50 bg-background mx-auto">
                        <div className="flex h-20 items-center justify-between py-6">
                            <MainNav items={mainNav} />
                            <NavRightMenu></NavRightMenu>
                        </div>
                    </header>
                    {children}
                    <PremiumFooter />
                </div>
            </div>
        </>
    );
}
