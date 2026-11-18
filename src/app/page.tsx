import Link from "next/link";
import { ArrowRight, Bot, Boxes, Server, Smartphone } from "lucide-react";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import FlowDiagram from "@/components/FlowDiagram";
import Timeline from "@/components/Timeline";
import SkillsGrid from "@/components/SkillsGrid";
import CopyEmailButton from "@/components/CopyEmailButton";
import { Button } from "@/components/ui/button";
import { experiences } from "@/lib/data/experience";
import { homeProjectSlugs, projects } from "@/lib/data/projects";
import { siteConfig } from "@/lib/site";

const pillars = [
    {
        icon: Server,
        title: "Backend architecture",
        body: ".NET, Node.js and SQL Server systems designed for change: Clean Architecture, CQRS, independently deployable APIs, tested endpoints and incremental modernization of legacy code.",
    },
    {
        icon: Boxes,
        title: "Enterprise SaaS",
        body: "Multi-tenant logistics software serving ~200 business customers — performance tuning, data integrity, safe migrations and continuous delivery on a live product.",
    },
    {
        icon: Smartphone,
        title: "Mobile engineering",
        body: "A React Native driver app built from the ground up and published on both stores: offline-first sync, background GPS, barcode scanning and proof of delivery.",
    },
    {
        icon: Bot,
        title: "AI-assisted engineering",
        body: "Claude Code and Codex workflows with custom subagents, skills and MCP — plus LLM features built with guardrails: structured outputs, RAG, fallback chains and human review.",
    },
];

const workflow = projects.find((p) => p.slug === "agentic-engineering-workflow");
const migration = projects.find((p) => p.slug === "enterprise-api-modernization");

export default function Home() {
    const homeProjects = homeProjectSlugs
        .map((slug) => projects.find((p) => p.slug === slug))
        .filter((p) => p !== undefined);

    return (
        <>
            <Hero />

            {/* Proof strip */}
            <section aria-label="Highlights" className="border-y border-border/60 bg-card/40">
                <dl className="container-page grid grid-cols-2 gap-y-8 py-10 md:grid-cols-4">
                    {siteConfig.stats.map((s, i) => (
                        <Reveal key={s.label} delay={i * 0.06} className="px-2 text-center md:border-l md:border-border md:first:border-l-0">
                            <dt className="sr-only">{s.label}</dt>
                            <dd className="font-display text-3xl font-bold text-primary md:text-4xl">{s.value}</dd>
                            <dd className="mt-1 text-sm text-muted-foreground">{s.label}</dd>
                        </Reveal>
                    ))}
                </dl>
            </section>

            {/* What I bring */}
            <section className="container-page py-24">
                <SectionHeading
                    eyebrow="what I bring"
                    title="Production engineering depth, modern tooling."
                    subtitle="My differentiator: 17 years of shipping production systems, combined with modern backend architecture, mobile apps and practical AI-assisted development."
                />
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {pillars.map((p, i) => (
                        <Reveal key={p.title} delay={(i % 2) * 0.08} className="rounded-xl border border-border bg-card p-6">
                            <p.icon className="size-6 text-primary" />
                            <h3 className="mt-4 font-display text-xl font-bold">{p.title}</h3>
                            <p className="mt-2 text-muted-foreground">{p.body}</p>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* How I build with AI */}
            <section className="relative border-y border-border/60 bg-card/30 py-24">
                <div className="container-page">
                    <SectionHeading
                        eyebrow="how I build with AI"
                        title="Agents with guardrails, not autocomplete."
                        subtitle="I design the process the agents follow: narrow roles, explicit artifacts between steps, tests and independent review."
                    />
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {migration?.flow && (
                            <Reveal className="space-y-4">
                                <h3 className="font-display text-xl font-bold">At work: migrating a legacy backend</h3>
                                <p className="text-muted-foreground">
                                    A read-only analyst subagent inventories each legacy handler; a migrator ports one operation at a time into
                                    .NET 10 CQRS with tests; a tracker keeps humans and agents in sync. SQL Server MCP and persistent memory give
                                    the agents real context.
                                </p>
                                <FlowDiagram steps={migration.flow} label="migrate-legacy skill" />
                                <Link href={"/projects/" + migration.slug} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                                    Read the case study <ArrowRight className="size-4" />
                                </Link>
                            </Reveal>
                        )}
                        {workflow?.flow && (
                            <Reveal delay={0.08} className="space-y-4">
                                <h3 className="font-display text-xl font-bold">Everywhere: spec-driven development</h3>
                                <p className="text-muted-foreground">
                                    In Claude Code and Codex, each phase runs as its own subagent. A four-lens review panel plus a refuter
                                    challenges every change, two blind judges gate critical ones, and Engram MCP gives agents durable memory.
                                </p>
                                <FlowDiagram steps={workflow.flow} label="sdd pipeline" />
                                <Link href={"/projects/" + workflow.slug} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                                    See the workflow <ArrowRight className="size-4" />
                                </Link>
                            </Reveal>
                        )}
                    </div>
                </div>
            </section>

            {/* Selected work */}
            <section className="container-page py-24">
                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <SectionHeading
                        eyebrow="selected work"
                        title="Case studies"
                        subtitle="Enterprise engineering at Nology Solutions and ETB, plus personal R&D products with architecture diagrams and trade-offs."
                        className="mb-0"
                    />
                    <Button variant="outline" asChild className="self-start md:self-auto">
                        <Link href="/projects">
                            All {projects.length} projects <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                </div>
                <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {homeProjects.map((project, i) => (
                        <Reveal as="li" key={project.slug} delay={(i % 3) * 0.06}>
                            <ProjectCard project={project} />
                        </Reveal>
                    ))}
                </ul>
            </section>

            {/* Experience */}
            <section className="border-y border-border/60 bg-card/30 py-24">
                <div className="container-page">
                    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                        <SectionHeading eyebrow="experience" title="17 years, three companies, one constant: shipping." className="mb-0" />
                        <Button variant="outline" asChild className="self-start md:self-auto">
                            <Link href="/experience">
                                Full experience <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                    </div>
                    <div className="mt-12">
                        <Timeline items={experiences} compact />
                    </div>
                </div>
            </section>

            {/* Skills */}
            <section className="container-page py-24">
                <SectionHeading
                    eyebrow="toolbox"
                    title="Skills, with receipts."
                    subtitle="Every group links back to something I built and shipped."
                />
                <SkillsGrid />
            </section>

            {/* CTA */}
            <section className="container-page pb-24">
                <Reveal className="relative overflow-hidden rounded-2xl border border-primary/30 bg-card p-8 text-center md:p-14">
                    <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-primary/20 blur-[100px]" />
                    <p className="eyebrow relative">{"// let's talk"}</p>
                    <h2 className="relative mt-4 font-display text-3xl font-bold tracking-tight text-balance md:text-5xl">
                        Looking for a senior engineer who ships?
                    </h2>
                    <p className="relative mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">{siteConfig.availability}.</p>
                    <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
