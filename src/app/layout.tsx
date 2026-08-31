import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Providers from "@/components/providers/ReduxProvider";
import { siteConfig } from "@/components/config/site";
import { cn } from "@/lib/utils";
import { ModalProvider } from "@/utils/modal-provider";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

const fontHeading = localFont({
    src: "../assets/fonts/CalSans-SemiBold.woff2",
    variable: "--font-heading",
});

export const metadata: Metadata = {
    metadataBase: new URL(siteConfig.url),
    title: {
        default: siteConfig.title || siteConfig.name,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: [
        "Appon Islam",
        "Full Stack Developer",
        "Software Engineer",
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "Portfolio",
    ],
    authors: [
        {
            name: siteConfig.name,
            url: siteConfig.url,
        },
    ],
    creator: siteConfig.name,
    openGraph: {
        type: "website",
        locale: "en_US",
        url: siteConfig.url,
        title: siteConfig.title || siteConfig.name,
        description: siteConfig.description,
        siteName: siteConfig.name,
        images: [
            {
                url: siteConfig.ogImage,
                width: 1200,
                height: 630,
                alt: siteConfig.name,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: siteConfig.title || siteConfig.name,
        description: siteConfig.description,
        images: [siteConfig.ogImage],
        creator: "@appon2003",
    },
    icons: {
        icon: "/favicon.ico",
    },
    alternates: {
        canonical: siteConfig.url,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: siteConfig.name,
        url: siteConfig.url,
        image: siteConfig.ogImage,
        sameAs: [
            siteConfig.links.github,
            siteConfig.links.linkedin,
            siteConfig.links.twitter,
        ],
        jobTitle: "Full Stack Developer",
        worksFor: {
            "@type": "Organization",
            name: "Freelance / Self-Employed",
        },
        address: {
            "@type": "PostalAddress",
            addressLocality: "Dhaka",
            addressCountry: "Bangladesh",
        },
        email: siteConfig.email,
        telephone: siteConfig.phone,
        description: siteConfig.description,
    };

    return (
        <html lang="en" suppressHydrationWarning={true}>
            <body suppressHydrationWarning={true} data-new-gr-c-s-check-loaded="14.1224.0" cz-shortcut-listen="true" data-gr-ext-installed="" className={cn("font-sans antialiased", fontSans.variable, fontHeading.variable)}>
                <script
                    id="json-ld"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <Providers>
                        {children}
                        <ModalProvider />
                    </Providers>
                </ThemeProvider>
            </body>
        </html>
    );
}
