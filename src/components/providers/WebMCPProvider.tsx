"use client";

import { useEffect } from "react";
import { siteConfig } from "@/components/config/site";
import { featuredProjects } from "@/components/config/projects";
import { skillsData } from "@/data/skills";

export function WebMCPProvider({ children }: { children?: React.ReactNode }) {
    useEffect(() => {
        if (typeof window === "undefined") return;

        const modelContext = navigator.modelContext || (document as any).modelContext;
        if (!modelContext || typeof modelContext.registerTool !== "function") {
            return;
        }

        const controller = new AbortController();

        try {
            // 1. Developer Profile Tool
            modelContext.registerTool(
                {
                    name: "getDeveloperProfile",
                    description: "Retrieve profile summary, technical expertise, and contact information for Appon Islam.",
                    inputSchema: {
                        type: "object",
                        properties: {},
                    },
                    execute: async () => ({
                        name: siteConfig.name,
                        title: siteConfig.title,
                        description: siteConfig.description,
                        location: siteConfig.location,
                        status: siteConfig.statusText,
                        email: siteConfig.email,
                        phone: siteConfig.phone,
                        links: siteConfig.links,
                    }),
                },
                { signal: controller.signal }
            );

            // 2. Featured Projects Tool
            modelContext.registerTool(
                {
                    name: "getFeaturedProjects",
                    description: "Retrieve a curated list of featured full-stack web development projects built by Appon Islam.",
                    inputSchema: {
                        type: "object",
                        properties: {
                            filterCategory: {
                                type: "string",
                                description: "Optional filter for project category (e.g., 'Full Stack', 'Web Dev')",
                            },
                        },
                    },
                    execute: async (input: { filterCategory?: string }) => {
                        const filtered = input?.filterCategory
                            ? featuredProjects.filter((p) => p.category.includes(input.filterCategory!))
                            : featuredProjects;

                        return filtered.map((p) => ({
                            id: p._id,
                            name: p.companyName,
                            category: p.category,
                            shortDescription: p.shortDescription,
                            techStack: p.techStack,
                            demoUrl: p.links.demo?.url,
                            frontendRepo: p.links.githubFrontend?.url,
                            backendRepo: p.links.githubBackend?.url,
                        }));
                    },
                },
                { signal: controller.signal }
            );

            // 3. Technical Skills Tool
            modelContext.registerTool(
                {
                    name: "getTechnicalSkills",
                    description: "Retrieve technical proficiencies, frameworks, programming languages, and databases mastered by Appon Islam.",
                    inputSchema: {
                        type: "object",
                        properties: {},
                    },
                    execute: async () =>
                        skillsData.map((s) => ({
                            name: s.name,
                            description: s.description,
                            rating: s.rating,
                        })),
                },
                { signal: controller.signal }
            );
        } catch (err) {
            // Gracefully ignore if the browser or runtime restricts tool registration
            console.debug("WebMCP registration skipped:", err);
        }

        return () => {
            controller.abort();
        };
    }, []);

    return <>{children}</>;
}
