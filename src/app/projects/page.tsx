import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import ProjectsExplorer from "@/components/ProjectsExplorer";

export const metadata: Metadata = {
    title: "Work",
    description:
        "Case studies: AI-assisted legacy migration, a multi-provider LLM gateway, human-in-the-loop LLM pipelines, an offline-first driver app, WMS modernization and a self-hosted Kubernetes homelab.",
    alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
    return (
        <div className="container-page py-16 md:py-24">
            <SectionHeading
                as="h1"
                eyebrow="work"
                title="Case studies"
                subtitle="Production work at Nology Solutions, AI engineering from my personal R&D lab, and highlights from earlier in my career."
            />
            <ProjectsExplorer />
        </div>
    );
}
