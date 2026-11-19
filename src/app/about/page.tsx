import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
    title: "About",
    description:
        "Ivan Ruiz — a senior software engineer from Bogotá based in Mississauga, focused on AI engineering and agentic development on top of 15+ years of production experience.",
    alternates: { canonical: "/about" },
};

const chapters = [
    {
        years: "2009 – 2013",
        title: "Leading delivery",
        body: "At Indra I led the development team for Telefónica: 80+ production applications in .NET, Java and Oracle, a new QA function and a 35% reduction in development costs.",
    },
    {
        years: "2013 – 2021",
        title: "Building at scale",
        body: "At ETB, Colombia's oldest telecom, I designed the CRM that lifted sales by 30% and a self-service platform for ~10,000 concurrent users, and helped move services to Kubernetes on Azure.",
    },
    {
        years: "2022 – today",
        title: "Owning a product",
        body: "In Canada, at Nology Solutions, I became the lead developer of a multi-tenant logistics SaaS — web, mobile, API and database — shipping a store-published driver app and modernizing the platform to .NET 10.",
    },
    {
        years: "2025 – today",
        title: "Engineering with AI",
        body: "I now run agentic development workflows with Claude Code and Codex — subagents, skills, MCP and persistent memory — at work and in my R&D projects, and build LLM features with guardrails on a self-hosted Kubernetes cluster.",
    },
];

const principles = [
    { title: "Small, verifiable steps", body: "For people and for agents. Every step leaves an artifact: a spec, a test, a tracker row." },
    { title: "Design for failure", body: "Networks drop, models hit quotas, data drifts. Fallbacks, retries and rollbacks are part of the feature." },
    { title: "Humans approve, AI proposes", body: "LLMs draft and review; people own the decisions that matter, with full provenance." },
    { title: "Measure, then optimize", body: "Profiling found a 14-second freeze was 500 browser layouts, not the server. Data beats guesses." },
    { title: "Write decisions down", body: "ADRs, CLAUDE.md and AGENTS.md make knowledge reusable by every teammate — human or agent." },
    { title: "Own it in production", body: "I run what I build, from store releases to my own k3s cluster." },
];

export default function AboutPage() {
    return (
        <div className="container-page py-16 md:py-24">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_320px]">
                <div>
                    <SectionHeading
                        as="h1"
                        eyebrow="about"
                        title="Engineer first. AI multiplier second."
                        subtitle="I'm Ivan — a software engineer from Bogotá, now in Mississauga. I care about systems that work on Monday morning, and lately about the AI agents that help me build them faster without lowering the bar."
                    />
                    <Reveal className="max-w-3xl space-y-5 text-lg leading-relaxed text-muted-foreground">
                        <p>
                            I&apos;ve spent 15+ years shipping software for telecom, logistics and enterprise clients: leading teams, designing
                            platforms and, most recently, owning a production SaaS end to end — from SQL Server stored procedures to a React
                            Native app in both app stores.
                        </p>
                        <p>
                            Over the last year, AI changed how I work. I don&apos;t use it as autocomplete. I design{" "}
                            <span className="text-foreground">processes for agents</span>: narrow subagents with explicit artifacts, skills
                            that encode architecture rules, MCP connections to real systems and independent review before anything merges. On
                            the product side, I build LLM features the way I build any production system — with schemas, fallbacks,
                            observability and humans in the loop.
                        </p>
                        <p>
                            I&apos;m looking for a senior full-stack or software engineering role — including applied AI — on a team that values production
                            experience and wants to build with modern tooling, AI agents included.
                        </p>
                    </Reveal>
                </div>
                <Reveal delay={0.1} className="h-fit rounded-xl border border-border bg-card p-6 lg:sticky lg:top-24">
                    <p className="eyebrow">{"// quick facts"}</p>
                    <dl className="mt-5 space-y-4 text-sm">
                        <div>
                            <dt className="text-muted-foreground">Role</dt>
                            <dd className="font-medium">{siteConfig.title + " · " + siteConfig.tagline}</dd>
                        </div>
                        <div>
                            <dt className="text-muted-foreground">Based in</dt>
                            <dd className="font-medium">{siteConfig.location}</dd>
                        </div>
                        <div>
                            <dt className="text-muted-foreground">Languages</dt>
                            <dd className="font-medium">English (advanced) · Spanish (native)</dd>
                        </div>
                        <div>
                            <dt className="text-muted-foreground">Looking for</dt>
                            <dd className="font-medium">Senior Full-Stack / Software Engineer · Applied AI</dd>
                        </div>
                    </dl>
                    <Button asChild className="mt-6 w-full">
                        <Link href="/contact">
                            Contact me <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                </Reveal>
            </div>

            <section className="mt-24">
                <SectionHeading eyebrow="the path" title="Four chapters" />
                <ol className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {chapters.map((c, i) => (
                        <Reveal as="li" key={c.title} delay={(i % 2) * 0.06} className="rounded-xl border border-border bg-card p-6">
                            <p className="font-mono text-xs text-primary">{c.years}</p>
                            <h3 className="mt-2 font-display text-xl font-bold">{c.title}</h3>
                            <p className="mt-2 text-muted-foreground">{c.body}</p>
                        </Reveal>
                    ))}
                </ol>
            </section>

            <section className="mt-24">
                <SectionHeading eyebrow="principles" title="How I work" />
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {principles.map((p, i) => (
                        <Reveal key={p.title} delay={(i % 3) * 0.06} className="rounded-xl border border-border p-6">
                            <h3 className="font-display text-lg font-bold">{p.title}</h3>
                            <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
                        </Reveal>
                    ))}
                </div>
            </section>
        </div>
    );
}
