import { pagesConfig } from "@/components/config/pages";
import PageHeader from "@/components/page-header";
import { Metadata } from "next";
import React from "react";
import ProjectCard from "@/components/project-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectsInterface } from "@/components/config/projects";
import { getProjects } from "@/components/actions/project-actions";
import { Icons } from "@/components/icons";
export const metadata: Metadata = {
    title: "Projects",
    description: "Explore my portfolio of web applications, open-source projects, and professional software developments built with Next.js, React, Node.js, and TypeScript.",
};

const renderContent = async (tabVal: string) => {
    let expArr: ProjectsInterface[] = await getProjects();
    expArr.sort((a, b) => Number(b._id) - Number(a._id));

    if (tabVal === "personal") {
        expArr = expArr.filter((val) => val.type === "Personal Project");
    } else if (tabVal === "professional") {
        expArr = expArr.filter((val) => val.type === "Professional");
    }

    if (expArr.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <Icons.warning className="h-10 w-10 text-muted-foreground/60 mb-3" />
                <p className="text-lg font-medium text-foreground">No projects found</p>
                <p className="text-sm text-muted-foreground mt-1">There are no projects listed under this category at the moment.</p>
            </div>
        );
    }

    return (
        <div className="mx-auto grid justify-center gap-4 md:w-full lg:grid-cols-3 2xl:w-300 py-8">
            {expArr.map((exp) => (
                <ProjectCard key={exp._id} project={exp} />
            ))}
        </div>
    );
};

const ProjectsPage = () => {
    return (
        <>
            <PageHeader title={pagesConfig.projects.title} description={pagesConfig.projects.description} />
            <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid max-w-120 grid-cols-3">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    <TabsTrigger value="professional">Professional</TabsTrigger>
                </TabsList>
                <div className="w-full">
                    <TabsContent value="all" className="w-full">
                        {renderContent("all")}
                    </TabsContent>
                    <TabsContent value="professional">{renderContent("professional")}</TabsContent>
                    <TabsContent value="personal">{renderContent("personal")}</TabsContent>
                </div>
            </Tabs>
        </>
    );
};

export default ProjectsPage;
