import type { MetadataRoute } from "next";
import { homeProjectSlugs, projects } from "@/lib/data/projects";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = siteConfig.url;
    const lastModified = new Date();

    const routes = ["", "/projects", "/experience", "/about", "/resume", "/contact"].map((route) => ({
        url: baseUrl + route,
        lastModified,
        priority: route === "" ? 1 : 0.8,
    }));

    const projectUrls = projects.map((project) => ({
        url: baseUrl + "/projects/" + project.slug,
        lastModified,
        priority: homeProjectSlugs.includes(project.slug) ? 0.7 : 0.5,
    }));

    return [...routes, ...projectUrls];
}
