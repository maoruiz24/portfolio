import Link from "next/link";
import { ArrowRight, Bot, Database, LayoutTemplate, Rocket, Server, Sparkles } from "lucide-react";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import Timeline from "@/components/Timeline";
import SkillsGrid from "@/components/SkillsGrid";
import CopyEmailButton from "@/components/CopyEmailButton";
import { Button } from "@/components/ui/button";
import { experiences } from "@/lib/data/experience";
import { homeProjectSlugs, projects } from "@/lib/data/projects";
import { siteConfig } from "@/lib/site";

/** What I solve — no metrics here; the proof strip and case studies carry the numbers. */
const capabilities = [
    {
        icon: LayoutTemplate,
        title: "Web & mobile products",
        body: "React and Next.js interfaces, and a React Native app built from scratch for iOS and Android — designed for weak networks, background GPS and offline work.",
    },
    {
        icon: Server,
        title: "APIs & architecture",
        body: ".NET/C# and Node.js services with Clean Architecture and CQRS, split where release cycles differ, and migrated off legacy code without breaking existing clients.",
    },
    {
        icon: Database,
        title: "Data & performance",
        body: "SQL Server modeling, stored procedures, indexes and transactions — plus profiling to find whether a slow page is the database, the server or the browser.",
    },
    {
        icon: Rocket,
        title: "Delivery & operations",
        body: "Git and Azure DevOps workflows, store releases with Expo EAS, Docker and Kubernetes, and crash monitoring and field diagnostics after launch.",
    },
];

const llmWork = [
    "Model fallback chains and a circuit breaker shared across instances",
    "RAG over pgvector with a semantic cache",
    "Schema-validated structured outputs (Zod, Pydantic)",
    "Per-call token and cost logging",
    "LLM review followed by human approval before anything is published",
];

export default function Home() {
    const homeProjects = homeProjectSlugs
        .map((slug) => projects.find((p) => p.slug === slug))
        .filter((p) => p !== undefined);

    return (
        <>
            <Hero />

            {/* Proof strip */}
            <section aria-label="Highlights" className="border-y border-border/60 bg-card/40">
                <dl className="container-page grid grid-cols-2 gap-x-4 gap-y-6 py-6 md:grid-cols-4 md:py-8">
                    {siteConfig.stats.map((s) => (
                        <div key={s.label} className="px-1 text-center md:border-l md:border-border md:px-3 md:first:border-l-0">
                            <dt className="sr-only">{s.label}</dt>
                            <dd className="font-display text-2xl font-bold text-primary md:text-3xl">{s.value}</dd>
                            <dd className="mt-1 text-xs leading-snug text-muted-foreground sm:text-sm">{s.label}</dd>
                        </div>
                    ))}
                </dl>
            </section>

            {/* Selected work */}
            <section className="container-page py-14 md:py-20">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                    <SectionHeading
                        eyebrow="selected work"
                        title="Case studies"
                        subtitle="Production software I built and maintain, and a personal R&D product. Each one covers the problem, my role, the decisions and the results."
                        className="mb-0"
                    />
                    <Button variant="outline" asChild className="self-start md:self-auto">
                        <Link href="/projects">
                            All {projects.length} projects <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                </div>
                <ul className="mt-8 grid grid-cols-1 gap-5 md:mt-10 md:grid-cols-2 lg:grid-cols-3">
                    {homeProjects.map((project, i) => (
                        <Reveal as="li" key={project.slug} delay={i * 0.05}>
                            <ProjectCard project={project} />
                        </Reveal>
                    ))}
                </ul>
            </section>

            {/* What I bring */}
            <section className="border-y border-border/60 bg-card/30 py-14 md:py-20">
                <div className="container-page">
                    <SectionHeading
                        eyebrow="what I bring"
                        title="Engineering that carries across industries"
                        subtitle="Logistics and telecom are where I proved it. The same skills apply to any product with real users, real data and a release to plan."
                    />
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
                        {capabilities.map((c, i) => (
                            <Reveal key={c.title} delay={(i % 2) * 0.05} className="rounded-xl border border-border bg-card p-5 md:p-6">
                                <div className="flex items-center gap-3">
                                    <c.icon className="size-5 shrink-0 text-primary" />
                                    <h3 className="font-display text-lg font-bold md:text-xl">{c.title}</h3>
                                </div>
                                <p className="mt-2 text-muted-foreground">{c.body}</p>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Experience */}
            <section className="container-page py-14 md:py-20">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                    <SectionHeading eyebrow="experience" title="15+ years of building and delivering production software" className="mb-0" />
                    <Button variant="outline" asChild className="self-start md:self-auto">
                        <Link href="/experience">
                            Full experience <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                </div>
                <div className="mt-8 md:mt-10">
                    <Timeline items={experiences} compact />
                </div>
            </section>

            {/* Skills */}
            <section className="border-y border-border/60 bg-card/30 py-14 md:py-20">
                <div className="container-page">
                    <SectionHeading
                        eyebrow="toolbox"
                        title="Skills and where I used them"
                        subtitle="Each group points to concrete work. Production experience and personal R&D are marked separately."
                    />
                    <SkillsGrid />
                </div>
            </section>

            {/* AI, in proportion */}
            <section className="container-page py-14 md:py-20">
                <SectionHeading
                    eyebrow="ai, with judgment"
                    title="How I use AI"
                    subtitle="Two different things: tools that help me write and review code, and LLM features inside products. I keep them apart."
                />
                <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-2">
                    <Reveal className="flex flex-col rounded-xl border border-border bg-card p-5 md:p-6">
                        <div className="flex items-center gap-3">
                            <Bot className="size-5 shrink-0 text-primary" />
                            <h3 className="font-display text-lg font-bold md:text-xl">AI-assisted development</h3>
                        </div>
                        <p className="mt-1 font-mono text-xs text-muted-foreground">Daily, at work and in R&amp;D</p>
                        <p className="mt-3 text-muted-foreground">
                            I use Claude Code and Codex to explore unfamiliar code, inventory legacy handlers, draft tests and review diffs. The
                            agents work in small, checkable steps; I review every change, and the tests decide what merges.
                        </p>
                        <Link
                            href="/projects/enterprise-api-modernization"
                            className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-primary hover:underline"
                        >
                            See it in the API modernization <ArrowRight className="size-4" />
                        </Link>
                    </Reveal>
                    <Reveal delay={0.05} className="flex flex-col rounded-xl border border-border bg-card p-5 md:p-6">
                        <div className="flex items-center gap-3">
                            <Sparkles className="size-5 shrink-0 text-primary" />
                            <h3 className="font-display text-lg font-bold md:text-xl">LLM features I have built</h3>
                        </div>
                        <p className="mt-1 font-mono text-xs text-muted-foreground">Personal R&amp;D products</p>
                        <ul className="mt-3 space-y-1.5">
                            {llmWork.map((item) => (
                                <li key={item} className="flex gap-3 text-muted-foreground">
                                    <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-primary" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-auto flex flex-wrap gap-x-5 gap-y-1 pt-4 text-sm font-medium">
                            <Link href="/projects/hellotcf" className="inline-flex items-center gap-1 text-primary hover:underline">
                                HelloTCF <ArrowRight className="size-4" />
                            </Link>
                            <Link href="/projects/human-in-the-loop-content-pipeline" className="inline-flex items-center gap-1 text-primary hover:underline">
                                Human-in-the-loop pipeline <ArrowRight className="size-4" />
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* CTA */}
            <section className="container-page pb-14 md:pb-20">
                <Reveal className="relative overflow-hidden rounded-2xl border border-primary/30 bg-card px-5 py-8 text-center md:p-12">
                    <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-primary/20 blur-[100px]" />
                    <p className="eyebrow relative">{"// let's talk"}</p>
                    <h2 className="relative mt-3 font-display text-2xl font-bold tracking-tight text-balance sm:text-3xl md:text-4xl">
                        Looking for an experienced engineer to help your team?
                    </h2>
                    <p className="relative mx-auto mt-3 max-w-2xl text-muted-foreground md:text-lg">{siteConfig.availability}.</p>
                    <div className="relative mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Button size="lg" asChild>
                            <Link href="/contact">
                                Get in touch <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                        <CopyEmailButton />
                    </div>
                </Reveal>
            </section>
        </>
    );
}
