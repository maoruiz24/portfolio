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
        "15+ years designing, building and maintaining production software: Senior Software Developer at Nology Solutions, Senior Software Engineer at ETB and Technical Leader at Indra.",
    alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
    return (
        <div className="container-page py-10 md:py-16">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <SectionHeading
                    as="h1"
                    eyebrow="experience"
                    title="15+ years in production software"
                    subtitle="From leading a delivery team for Telefónica to building platforms for a national telecom and owning a B2B2C SaaS in production — web, mobile, API and database."
                    className="mb-0"
                />
                <Button variant="outline" asChild className="self-start md:self-auto">
                    <a href={siteConfig.resumePdf} download>
                        <Download className="size-4" /> Résumé (PDF)
                    </a>
                </Button>
            </div>

            <div className="mt-8 md:mt-12">
                <Timeline items={experiences} />
            </div>

            <div className="mt-14 grid grid-cols-1 gap-4 md:mt-20 md:grid-cols-2 md:gap-6">
                <Reveal className="rounded-xl border border-border bg-card p-6">
                    <h2 className="flex items-center gap-2 font-display text-xl font-bold">
                        <GraduationCap className="size-5 text-primary" /> Education &amp; certifications
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
                        {siteConfig.certifications.map((c) => (
                            <li key={c.name}>
                                <p className="font-medium">{c.name}</p>
                                <p className="text-sm text-muted-foreground">
                                    {c.issuer} · {c.year}
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
