import type { Metadata } from "next";
import { Download, GraduationCap, Languages } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Timeline from "@/components/Timeline";
import { Button } from "@/components/ui/button";
import { experiences } from "@/lib/data/experience";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
    title: "Experience",
    description:
        "17 years of professional experience: Senior Software Developer at Nology Solutions, Senior Software Engineer at ETB and Technical Leader at Indra.",
    alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
    return (
        <div className="container-page py-16 md:py-24">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <SectionHeading
                    as="h1"
                    eyebrow="experience"
                    title="17 years of shipping"
                    subtitle="From leading a delivery team for Telefónica to owning a logistics SaaS end to end — and bringing AI agents into how it gets built."
                    className="mb-0"
                />
                <Button variant="outline" asChild className="self-start md:self-auto">
                    <a href={siteConfig.resumePdf} download>
                        <Download className="size-4" /> Résumé (PDF)
                    </a>
                </Button>
            </div>

            <div className="mt-16">
                <Timeline items={experiences} />
            </div>

            <div className="mt-24 grid grid-cols-1 gap-6 md:grid-cols-2">
                <Reveal className="rounded-xl border border-border bg-card p-6">
                    <h2 className="flex items-center gap-2 font-display text-xl font-bold">
                        <GraduationCap className="size-5 text-primary" /> Education
                    </h2>
                    <ul className="mt-5 space-y-4">
                        {siteConfig.education.map((e) => (
                            <li key={e.degree}>
                                <p className="font-medium">{e.degree}</p>
                                <p className="text-sm text-muted-foreground">
                                    {e.school} · {e.location} · {e.year}
                                </p>
                            </li>
                        ))}
                    </ul>
                </Reveal>
                <Reveal delay={0.06} className="rounded-xl border border-border bg-card p-6">
                    <h2 className="flex items-center gap-2 font-display text-xl font-bold">
                        <Languages className="size-5 text-primary" /> Languages
                    </h2>
                    <ul className="mt-5 space-y-4">
                        {siteConfig.languages.map((l) => (
                            <li key={l.name}>
                                <p className="font-medium">{l.name}</p>
                                <p className="text-sm text-muted-foreground">{l.level}</p>
                            </li>
                        ))}
                    </ul>
                </Reveal>
            </div>
        </div>
    );
}
