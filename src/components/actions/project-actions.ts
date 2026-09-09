import { Projects } from "@/data/projects";

export async function getProjects() {
    return Projects;
}

export async function getFeaturedProjects() {
    const list = [...Projects];
    list.sort((a, b) => Number(b.serial) - Number(a.serial));
    return list.slice(0, 3);
}

export async function getProjectById(projectId: string) {
    try {
        const project = Projects.find((p) => p._id === projectId);
        if (!project) {
            throw new Error("Failed to fetch project");
        }
        return project;
    } catch (error) {
        console.error("Error fetching project:", error);
        throw error;
    }
}
