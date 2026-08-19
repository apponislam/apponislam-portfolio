import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import ProjectCard from "./project-card";
import { getFeaturedProjects } from "./actions/project-actions";
import { pagesConfig } from "./config/pages";
import { ProjectsInterface } from "./config/projects";

export async function FeaturedProjects() {
    const featuredProjects = await getFeaturedProjects();

    return (
        <section id="projects" className="md:container space-y-6 dark:bg-transparent py-10 my-14">
            <div className="mx-auto flex max-w-232 flex-col items-center space-y-4 text-center">
                <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">{pagesConfig.projects.title}</h2>
                <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">{pagesConfig.projects.description}</p>
            </div>

            <div className="mx-auto grid justify-center gap-4 md:w-full lg:grid-cols-3 2xl:w-300">
                {featuredProjects.map((project: ProjectsInterface) => (
                    <ProjectCard key={project._id} project={project} />
                ))}
            </div>

            <Link href="/projects" className="flex justify-center">
                <Button variant={"outline"} className="rounded-xl">
                    <Icons.chevronDown className="mr-2 h-4 w-4" /> View All
                </Button>
            </Link>
        </section>
    );
}
