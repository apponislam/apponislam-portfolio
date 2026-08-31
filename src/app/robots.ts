import { MetadataRoute } from "next";
import { siteConfig } from "@/components/config/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/admin/", "/api/", "/private/"],
        },
        sitemap: `${siteConfig.url}/sitemap.xml`,
    };
}
