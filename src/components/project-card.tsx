"use client";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import ChipContainer from "./chip-container";
import { ProjectsInterface } from "./config/projects";
import { Badge } from "./ui/badge";
import aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { optimizeCloudinaryUrl } from "@/lib/utils";
import CustomTooltip from "./custom-tooltips";

interface ProjectCardProps {
    project: ProjectsInterface;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    useEffect(() => {
        aos.init();
    }, []);

    return (
        <div className="relative p-6 max-w-sm bg-white border border-gray-200 rounded-lg dark:bg-transparent dark:border-gray-700 flex flex-col h-full justify-between" data-aos="fade-up" data-aos-anchor-placement="top-bottom">
            <div className="relative w-full h-50 shrink-0">
                <Image className="rounded-lg border border-gray-200 dark:border-gray-700 object-cover" src={optimizeCloudinaryUrl(project.companyLogoImg, 600)} alt="img" fill priority />
                {/* <Image className="rounded-lg border border-gray-200 dark:border-gray-700 object-cover" src="https://i.imgur.com/dVdYArw.jpeg" alt="img" fill /> */}
            </div>
            <div className="pt-5 space-y-3 flex-1 flex flex-col">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{project.companyName}</h5>
                <p className="line-clamp-3 font-normal text-gray-700 dark:text-gray-400">{project.shortDescription}</p>
                <div className="flex gap-2 flex-wrap">
                    <ChipContainer textArr={project.category} />
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                    {project.techStack.slice(0, 4).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                        </Badge>
                    ))}
                    {project.techStack.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                            {project.techStack.length - 4}+
                        </Badge>
                    )}
                </div>
                <div className="mt-auto pt-3">
                    <Link href={`/projects/${project._id}`}>
                        <Button variant={"default"}>
                            Read more
                            <Icons.chevronRight className="w-4 ml-1" />
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="absolute bottom-4 right-4">
                <CustomTooltip text={project.type} icon={project.type === "Personal Project" ? Icons.userFill : Icons.work}>
                    <div className="dark:border-gray-700 p-3 rounded-full bg-white border dark:bg-gray-950 border-gray-200 cursor-help select-none">{project.type === "Personal Project" ? <Icons.userFill className="h-4 w-4" /> : <Icons.work className="h-4 w-4" />}</div>
                </CustomTooltip>
            </div>
        </div>
    );
}
