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

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
