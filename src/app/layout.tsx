import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
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
    title: {
        default: siteConfig.name,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
            <body suppressHydrationWarning={true} data-new-gr-c-s-check-loaded="14.1224.0" cz-shortcut-listen="true" data-gr-ext-installed="" className={cn("font-sans antialiased", fontSans.variable, fontHeading.variable)}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    {children}
                    <ModalProvider />
                </ThemeProvider>
            </body>
        </html>
    );
}
