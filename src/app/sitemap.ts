import { MetadataRoute } from "next";
import { projects } from "@/lib/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://ivanruiz.dev";

    const projectUrls = projects.map((project) => ({
        url: `${baseUrl}/projects/${project.slug}`,
        lastModified: new Date(),
    }));

    const routes = ["", "/projects", "/experience", "/about", "/contact"].map(
        (route) => ({
            url: `${baseUrl}${route}`,
            lastModified: new Date(),
        })
    );

    return [...routes, ...projectUrls];
}
