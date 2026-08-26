import Link from "next/link";
import React from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn, formatDate } from "@/lib/utils";
import apponislam from "../../../../../public/apponislam.png";
import ChipContainer from "@/components/chip-container";
import ProjectsDescription from "@/components/exp-desc";
import { Projects, ProjectsInterface } from "@/components/config/projects";
import { siteConfig } from "@/components/config/site";
import { Metadata } from "next";
import ProjectLinksDropdown from "@/components/project-links-dropdown";
import ProjectImageSlider from "@/components/project-image-slider";

type Props = {
    params: Promise<{ expId: string }>;
};

export async function generateStaticParams() {
    return Projects.map((project) => ({
        expId: project._id,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { expId } = await params;
    const post = Projects.find((project) => project._id === expId);

    if (!post) {
        return {
            title: "Project Not Found",
        };
    }

    const ogImage = post.images && post.images.length > 0 ? post.images[0] : siteConfig.ogImage;

    return {
        title: post.companyName,
        description: post.shortDescription,
        alternates: {
            canonical: `${siteConfig.url}/projects/${post._id}`,
        },
        openGraph: {
            title: `${post.companyName} | Appon Islam Portfolio`,
            description: post.shortDescription,
            url: `${siteConfig.url}/projects/${post._id}`,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: post.companyName,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `${post.companyName} | Appon Islam Portfolio`,
            description: post.shortDescription,
            images: [ogImage],
        },
    };
}

type Params = Promise<{ expId: string }>;

const githubUsername = "apponislam";

async function getProjectById(expId: string) {
    const project = Projects.find((p) => p._id === expId);
    if (!project) {
        throw new Error("Failed to fetch project");
    }
    return project;
}

export default async function ProjectsPage({ params }: { params: Params }) {
    const { expId } = await params;

    let exp: ProjectsInterface;

    try {
        exp = await getProjectById(expId);
    } catch (err) {
        console.log(err);
        redirect("/projects");
    }

    return (
        <article className="container relative max-w-3xl py-6 lg:py-10 mx-auto">
            <Link href="/projects" className={cn(buttonVariants({ variant: "ghost" }), "absolute -left-50 top-14 hidden xl:inline-flex")}>
                <Icons.chevronLeft className="mr-2 h-4 w-4" />
                All Projects
            </Link>
            <div>
                <time dateTime={exp.startDate} className="block text-sm text-muted-foreground">
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                </time>
                <div className="flex flex-wrap items-center justify-between gap-4 mt-2">
                    <h1 className="font-heading text-4xl leading-tight lg:text-5xl">{exp.companyName}</h1>
                    <ProjectLinksDropdown project={exp} />
                </div>

                <div className="mt-4">
                    <ChipContainer textArr={exp.category} />
                </div>

                <div className="mt-5 flex space-x-4 border-t border-muted pt-4">
                    <Link href={`https://github.com/${githubUsername}`} className="flex items-center space-x-2 text-sm">
                        <Image src={apponislam} alt={"Appon"} width={42} height={42} className="rounded-full bg-white" />
                        <div className="flex-1 text-left leading-tight">
                            <p className="font-medium">{"Appon Islam"}</p>
                            <p className="text-[12px] text-muted-foreground">@{githubUsername}</p>
                        </div>
                    </Link>
                </div>
            </div>

            <ProjectImageSlider images={exp.images} companyName={exp.companyName} />

            <div className="mb-7 ">
                <h2 className="inline-block font-heading text-3xl leading-tight lg:text-3xl mb-2">Tech Stack</h2>
                <ChipContainer textArr={exp.techStack} />
            </div>

            <div className="mb-7 ">
                <h2 className="inline-block font-heading text-3xl leading-tight lg:text-3xl mb-2">Description</h2>
                <ProjectsDescription paragraphs={exp.descriptionDetails.paragraphs} bullets={exp.descriptionDetails.bullets} />
            </div>

            {exp.warning && (
                <div className="my-6 p-4 rounded-lg border border-amber-500/20 bg-amber-500/5 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-start gap-3 text-sm animate-in fade-in duration-200">
                    <Icons.warning className="h-5 w-5 shrink-0 mt-0.5" />
                    <div>
                        <span className="font-bold block mb-0.5">Warning / Note</span>
                        <p className="leading-relaxed">{exp.warning}</p>
                    </div>
                </div>
            )}

            <hr className="mt-12" />
            <div className="flex justify-center py-6 lg:py-10">
                <Link href="/projects" className={cn(buttonVariants({ variant: "ghost" }))}>
                    <Icons.chevronLeft className="mr-2 h-4 w-4" />
                    All Projects
                </Link>
            </div>
        </article>
    );
}
