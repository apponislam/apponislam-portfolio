import { MetadataRoute } from "next";
import { siteConfig } from "@/components/config/site";
import { Projects } from "@/components/config/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = siteConfig.url;

    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${baseUrl}/projects`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/skills`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
    ];

    const projectRoutes: MetadataRoute.Sitemap = Projects.map((project) => ({
        url: `${baseUrl}/projects/${project._id}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
    }));

    return [...staticRoutes, ...projectRoutes];
}
