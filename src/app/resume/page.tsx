import type { Metadata } from "next";
import { Download } from "lucide-react";
import PrintButton from "@/components/PrintButton";
import { Button } from "@/components/ui/button";
import { experiences } from "@/lib/data/experience";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
    title: "Résumé",
    description: "Résumé of Ivan Ruiz — Senior Software Engineer, AI Engineering.",
    alternates: { canonical: "/resume" },
};

/*
 * Single-column, ATS-friendly résumé. The "paper" is always light so the PDF looks the same
 * regardless of the site theme. The PDF in /public is generated from this page (see CLAUDE.md).
 */

const skillLines: { label: string; value: string }[] = [
    {
        label: "AI Engineering",
        value:
            "LLM applications, agents & tool use, RAG (pgvector, embeddings), structured outputs (Zod, Pydantic), LLM-as-judge review, human-in-the-loop workflows, multi-provider routing & fallback, token/cost tracking, STT/TTS pipelines, prompt versioning; Anthropic Claude, OpenAI, Gemini, Groq, Vercel AI SDK",
    },
    {
        label: "AI-Assisted Development",
        value:
            "Claude Code, custom subagents, skills & slash commands, MCP servers, spec-driven development, multi-agent code review, persistent agent memory (Engram)",
    },
    {
        label: "Backend",
        value:
            "C#, .NET 10, ASP.NET Core, Clean Architecture, CQRS/MediatR, Node.js, NestJS, Python, FastAPI, Go, REST, JWT, microservices, BullMQ, pg-boss, Dramatiq",
    },
    {
        label: "Frontend & Mobile",
        value:
            "TypeScript, React, Next.js, React Native, Expo/EAS, Redux Toolkit, TanStack Query, Zustand, Tailwind CSS, DevExtreme",
    },
    {
        label: "Data",
        value: "SQL Server (T-SQL), PostgreSQL, pgvector, Prisma, Dapper, EF Core, MongoDB, Redis, Oracle",
    },
    {
        label: "Cloud & DevOps",
        value:
            "Docker, Kubernetes (k3s), GitHub Actions, Azure DevOps, Azure, AWS, Firebase, MinIO/S3, Traefik, cert-manager; testing with xUnit, Vitest, Jest, Playwright",
    },
];

const rdProjects: { name: string; detail: string }[] = [
    {
        name: "Multi-provider LLM gateway",
        detail:
            "8 provider adapters behind one interface; admin-configured 3-tier fallback chains; Postgres-persisted circuit breaker; per-call token and cost logging; RAG assistant on pgvector; rubric-based grading of writing and speech.",
    },
    {
        name: "Human-in-the-loop LLM content pipeline",
        detail:
            "Blueprint → LLM generation → schema and rule validation → independent LLM reviewer → human approval of immutable revisions → TTS jobs, with full provenance (model, prompt version, cost). Built in TypeScript (BullMQ) and Python (FastAPI, Pydantic, Dramatiq).",
    },
    {
        name: "Speech evaluation pipeline",
        detail:
            "STT with word timestamps + deterministic fluency metrics + LLM rubric evaluation with validated JSON; hexagonal modular monolith with one port per AI capability and 14 ADRs.",
    },
    {
        name: "Homelab Kubernetes platform",
        detail:
            "3-node k3s cluster with Traefik, cert-manager (Let's Encrypt via Cloudflare DNS-01), private registry and GitHub Actions push-to-deploy; hosts this portfolio.",
    },
];

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="mt-5 print:mt-3.5">
            <h2 className="break-after-avoid border-b border-zinc-300 pb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-800">
                {title}
            </h2>
            <div className="mt-2.5 print:mt-1.5">{children}</div>
        </section>
    );
}

export default function ResumePage() {
    const site = siteConfig.url.replace("https://", "");

    return (
        <div className="container-page py-10 print:max-w-none print:p-0">
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center print:hidden">
                <p className="text-sm text-muted-foreground">ATS-friendly résumé. Same content as the PDF.</p>
                <div className="flex gap-2">
                    <PrintButton />
                    <Button size="sm" asChild>
                        <a href={siteConfig.resumePdf} download>
                            <Download className="size-4" /> Download PDF
                        </a>
                    </Button>
                </div>
            </div>

            <article className="mx-auto max-w-[8.5in] rounded-lg bg-white px-8 py-10 text-[13px] leading-[1.45] text-zinc-800 shadow-xl ring-1 ring-black/5 md:px-14 print:max-w-none print:rounded-none print:p-0 print:text-[9.5pt] print:leading-[1.38] print:shadow-none print:ring-0">
                <header>
                    <h1 className="font-display text-3xl font-bold tracking-tight text-zinc-900">{siteConfig.name}</h1>
                    <p className="mt-0.5 text-base font-medium text-emerald-800">{siteConfig.title}</p>
                    <p className="mt-2 text-zinc-600">
                        {siteConfig.location} · {siteConfig.phone} ·{" "}
                        <a href={siteConfig.links.email} className="underline-offset-2 hover:underline">
                            {siteConfig.email}
                        </a>
                    </p>
                    <p className="text-zinc-600">
                        <a href={siteConfig.links.linkedin} className="underline-offset-2 hover:underline">
                            linkedin.com/in/maoruiz24
                        </a>{" "}
                        ·{" "}
                        <a href={siteConfig.links.github} className="underline-offset-2 hover:underline">
                            github.com/maoruiz24
                        </a>{" "}
                        ·{" "}
                        <a href={siteConfig.url} className="underline-offset-2 hover:underline">
                            {site}
                        </a>
                    </p>
                </header>

                <ResumeSection title="Summary">
                    <p>{siteConfig.summary}</p>
                </ResumeSection>

                <ResumeSection title="Technical Skills">
                    <ul className="space-y-1">
                        {skillLines.map((s) => (
                            <li key={s.label}>
                                <span className="font-semibold text-zinc-900">{s.label}:</span> {s.value}
                            </li>
                        ))}
                    </ul>
                </ResumeSection>

                <ResumeSection title="Professional Experience">
                    <div className="space-y-4 print:space-y-2.5">
                        {experiences.map((exp) => (
                            <div key={exp.company}>
                                <div className="flex flex-wrap items-baseline justify-between gap-x-4 break-after-avoid">
                                    <h3 className="font-semibold text-zinc-900">
                                        {exp.role}, {exp.company}
                                    </h3>
                                    <p className="text-zinc-600">
                                        {exp.period} · {exp.location}
                                    </p>
                                </div>
                                <p className="italic text-zinc-600">{exp.context}</p>
                                <ul className="mt-1.5 list-disc space-y-1 pl-5 marker:text-emerald-700 print:space-y-0.5">
                                    {exp.bullets.map((b) => (
                                        <li key={b} className="break-inside-avoid">{b}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </ResumeSection>

                <ResumeSection title="Selected AI R&D Projects (personal)">
                    <ul className="list-disc space-y-1 pl-5 marker:text-emerald-700">
                        {rdProjects.map((p) => (
                            <li key={p.name}>
                                <span className="font-semibold text-zinc-900">{p.name}:</span> {p.detail}
                            </li>
                        ))}
                    </ul>
                    <p className="mt-1.5 text-zinc-600">Case studies: {site}/projects</p>
                </ResumeSection>

                <ResumeSection title="Education">
                    <ul className="space-y-0.5">
                        {siteConfig.education.map((e) => (
                            <li key={e.degree}>
                                <span className="font-semibold text-zinc-900">{e.degree}</span> — {e.school}, {e.location} ({e.year})
                            </li>
                        ))}
                    </ul>
                </ResumeSection>

                <ResumeSection title="Languages">
                    <p>{siteConfig.languages.map((l) => l.name + " — " + l.level).join(" · ")}</p>
                </ResumeSection>
            </article>
        </div>
    );
}
