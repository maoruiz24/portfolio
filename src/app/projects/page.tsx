import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import ProjectsExplorer from "@/components/ProjectsExplorer";

export const metadata: Metadata = {
    title: "Work",
    description:
        "Case studies: an offline-first driver app on both app stores, .NET 10 API modernization, SaaS performance work, warehouse inventory processing, and personal R&D products with LLM features.",
    alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
    return (
        <div className="container-page py-10 md:py-16">
            <SectionHeading
                as="h1"
                eyebrow="work"
                title="Case studies"
                subtitle="Production work at Nology Solutions and ETB, followed by personal R&D products and architecture work. Each case study starts with a short summary."
            />
            <ProjectsExplorer />
        </div>
    );
}
