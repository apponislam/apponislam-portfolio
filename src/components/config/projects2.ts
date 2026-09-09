import { type Project, projects2Data } from "@/data/projects2";

export type ProjectsInterface = Project;

export const Projects: ProjectsInterface[] = projects2Data;

export const featuredProjects = Projects.slice(0, 3);
