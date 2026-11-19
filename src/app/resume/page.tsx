import type { Metadata } from "next";
import { Download } from "lucide-react";
import PrintButton from "@/components/PrintButton";
import { Button } from "@/components/ui/button";
import { experiences } from "@/lib/data/experience";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
    title: "Résumé",
    description: "Résumé of Ivan Ruiz — Senior Full-Stack Engineer: .NET/C#, React, React Native, Node.js, SQL Server and CI/CD.",
    alternates: { canonical: "/resume" },
};

/*
 * Single-column, ATS-friendly résumé. The "paper" is always light so the PDF looks the same
 * regardless of the site theme. The PDF in /public is generated from this page (see CLAUDE.md).
 */

const skillLines: { label: string; value: string }[] = [
    {
        label: "Backend",
        value: "C#, .NET / .NET 10, ASP.NET Core Web API, Node.js, REST APIs, Clean Architecture, CQRS/MediatR, Dapper, JWT, Java (earlier career)",
    },
    {
        label: "Frontend & Mobile",
        value: "React, React Native, Expo/EAS, TypeScript, JavaScript, Redux Toolkit, jQuery/DevExtreme, Xamarin (earlier career)",
    },
    {
        label: "Data",
        value: "SQL Server (T-SQL, stored procedures, query and index optimization, transactions), Oracle, MongoDB, SQLite",
    },
    {
        label: "Cloud & Delivery",
        value: "Azure DevOps, Git, CI/CD, Expo EAS (App Store / Google Play releases), Docker, Kubernetes, Azure, AWS, Firebase; xUnit, Jest",
    },
    {
        label: "Architecture",
        value: "Multi-tenant SaaS, API design, microservices, legacy modernization, offline-first sync, performance profiling",
    },
    {
        label: "AI in Engineering",
        value: "Claude Code and Codex with custom agents, skills and MCP for code exploration, migration, tests and review; LLM integration (R&D)",
    },
    {
        label: "Personal R&D",
        value: "NestJS, Python/FastAPI, PostgreSQL (pgvector, PostGIS), Redis, Next.js, RAG, Proxmox, k3s, GitHub Actions, Playwright, k6",
    },
];

const rdProjects: { name: string; url?: string; detail: string }[] = [
    {
        name: "HelloTCF",
        url: "hellotcf.com",
        detail:
            "French exam practice platform (Next.js, PostgreSQL/pgvector, k3s) with AI-assisted grading and a speaking examiner; provider-agnostic LLM layer with fallback chains, a shared circuit breaker and per-call cost logging.",
    },
    {
        name: "FarmilyGo",
        url: "farmilygo.com",
        detail:
            "Farm marketplace: Turborepo monorepo with Next.js web, Expo mobile and a NestJS API on PostgreSQL (PostGIS, pgvector); Playwright E2E and k6 load tests.",
    },
    {
        name: "Homelab platform",
        detail:
            "Two Proxmox nodes behind an OPNsense firewall, a 3-node k3s cluster with push-to-deploy CI/CD, dedicated PostgreSQL, Redis and MinIO, and daily backups with two off-site copies.",
    },
];

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="mt-5 print:mt-3.5">
            <h2 className="break-after-avoid border-b border-zinc-300 pb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-blue-800">
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
                    <p className="mt-0.5 text-base font-medium text-blue-800">{siteConfig.title} | {siteConfig.tagline}</p>
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
                                <ul className="mt-1.5 list-disc space-y-1 pl-5 marker:text-blue-700 print:space-y-0.5">
                                    {exp.bullets.map((b) => (
                                        <li key={b} className="break-inside-avoid">{b}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </ResumeSection>

                <ResumeSection title="Selected Personal R&D Projects">
                    <ul className="list-disc space-y-1 pl-5 marker:text-blue-700">
                        {rdProjects.map((p) => (
                            <li key={p.name}>
                                <span className="font-semibold text-zinc-900">{p.name}</span>
                                {p.url && <span className="text-zinc-600"> ({p.url})</span>}: {p.detail}
                            </li>
                        ))}
                    </ul>
                    <p className="mt-1.5 text-zinc-600">Case studies: {site}/projects</p>
                </ResumeSection>

                <ResumeSection title="Education & Certifications">
                    <ul className="space-y-0.5">
                        {siteConfig.education.map((e) => (
                            <li key={e.degree}>
                                <span className="font-semibold text-zinc-900">{e.degree}</span> — {e.school}, {e.location} ({e.year})
                            </li>
                        ))}
                        {siteConfig.certifications.map((c) => (
                            <li key={c.name}>
                                <span className="font-semibold text-zinc-900">{c.name}</span> — {c.issuer} ({c.year})
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
