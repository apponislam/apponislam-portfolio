import Image from "next/image";
import Link from "next/link";
import apponislam from "../../public/appon.webp";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import ScrollButton from "@/components/ScrollButton";
import { siteConfig } from "@/components/config/site";

export function HeroSection() {
    return (
        <section className="space-y-6 pb-8 pt-6 mb-0 md:pb-12 md:py-20 lg:py-32 h-screen flex items-center justify-center">
            <div className="container flex max-w-5xl flex-col items-center gap-4 text-center -mt-20 mx-auto">
                <div className="relative w-full">
                    <Image
                        src={apponislam}
                        height={100}
                        width={100}
                        priority
                        fetchPriority="high"
                        sizes="(max-width: 768px) 160px, 256px"
                        className="bg-primary rounded-full mb-0 h-auto md:mb-2 w-[60%] max-w-[16rem] border-8 border-primary dark:border-white dark:bg-white mx-auto"
                        alt={`${siteConfig.name}-img`}
                    />
                    {siteConfig.showStatus && (
                        <div className="absolute top-2 left-1/2 translate-x-[15%] md:translate-x-[25%] flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 dark:bg-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.4)] text-[11px] md:text-xs font-bold text-white transition-all duration-300 hover:scale-105">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                            </span>
                            <span>{siteConfig.statusText}</span>
                        </div>
                    )}
                </div>
                <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold">{siteConfig.name}</h1>
                <h3 className="font-heading text-base sm:text-xl md:text-xl lg:text-2xl font-semibold">Full Stack Developer</h3>
                <p className="max-w-2xl leading-normal text-muted-foreground sm:text-lg sm:leading-8 mt-2">{siteConfig.description}</p>

                <div className="grid grid-cols-2 mt-6 items-center justify-center sm:flex-row gap-3">
                    <Link href={siteConfig.links.github} target="_blank" className={cn(buttonVariants({ size: "lg" }), "px-4 md:px-8")}>
                        <Icons.gitHub className="w-4 h-4 mr-2" /> GitHub
                    </Link>
                    <Link
                        href={siteConfig.links.linkedin}
                        target="_blank"
                        className={cn(
                            buttonVariants({
                                variant: "outline",
                                size: "lg",
                            }),
                            "px-4 md:px-8",
                        )}
                    >
                        <Icons.linkedin className="w-4 h-4 mr-2" /> LinkedIn
                    </Link>

                    <Link
                        href={siteConfig.links.resume}
                        target="_blank"
                        className={cn(
                            buttonVariants({
                                variant: "outline",
                                size: "lg",
                            }),
                            "px-4 md:px-8",
                        )}
                    >
                        <Icons.download className="w-4 h-4 mr-2" /> Resume
                    </Link>
                    <Link href={"/contact"} rel="noreferrer" className={cn(buttonVariants({ size: "lg" }), "px-4 md:px-8")}>
                        <Icons.contact className="w-4 h-4 mr-2" /> Contact
                    </Link>
                </div>
                <ScrollButton />
            </div>
        </section>
    );
}
