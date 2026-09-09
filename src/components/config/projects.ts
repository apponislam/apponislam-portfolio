import { projects, type Project } from "@/data/projects";

export type ProjectsInterface = Project;

export const Projects: ProjectsInterface[] = projects;

export const featuredProjects = Projects.slice(0, 3);
