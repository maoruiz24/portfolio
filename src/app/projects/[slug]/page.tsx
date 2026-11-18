import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import FlowDiagram from "@/components/FlowDiagram";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { groupLabels, projects } from "@/lib/data/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
    return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);
    if (!project) return { title: "Project not found" };

    return {
        title: project.title,
        description: project.summary,
        alternates: { canonical: "/projects/" + project.slug },
        openGraph: { title: project.title, description: project.tagline },
    };
}

export default async function ProjectDetailPage({ params }: Props) {
    const { slug } = await params;
    const index = projects.findIndex((p) => p.slug === slug);
    if (index === -1) notFound();

    const project = projects[index];
    const next = projects[(index + 1) % projects.length];
    const related = projects
        .filter((p) => p.slug !== project.slug && (p.group === project.group || (project.ai && p.ai)))
        .slice(0, 2);

    return (
        <article className="pb-24">
            <header className="relative overflow-hidden border-b border-border/60">
                <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
                <div className="container-page relative py-12 md:py-20">
                    <Link
                        href="/projects"
                        className="group mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                        All projects
                    </Link>
                    <div className="mb-5 flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
                        <span>{project.org}</span>
                        <span aria-hidden>·</span>
                        <span>{project.period}</span>
                        <span className="rounded-full border border-border px-2 py-0.5">{groupLabels[project.group]}</span>
                        {project.ai && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-primary">
                                <Sparkles className="size-3" /> AI
                            </span>
                        )}
                        {project.status && (
                            <span className="rounded-full bg-signal/15 px-2 py-0.5 text-signal">{project.status}</span>
                        )}
                    </div>
                    <h1 className="max-w-4xl font-display text-4xl font-bold leading-tight tracking-tight text-balance md:text-6xl">
                        {project.title}
                    </h1>
                    <p className="mt-6 max-w-3xl text-lg text-muted-foreground text-pretty md:text-xl">{project.summary}</p>

                    {project.metrics.length > 0 && (
                        <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-8 md:grid-cols-4">
                            {project.metrics.map((m) => (
                                <div key={m.label}>
                                    <dt className="sr-only">{m.label}</dt>
                                    <dd className="font-display text-3xl font-bold text-primary md:text-4xl">{m.value}</dd>
                                    <dd className="mt-1 text-sm text-muted-foreground">{m.label}</dd>
                                </div>
                            ))}
                        </dl>
                    )}
                </div>
            </header>

            <div className="container-page grid grid-cols-1 gap-12 pt-16 lg:grid-cols-[1fr_280px]">
                <div className="min-w-0 space-y-14">
                    {project.flow && (
                        <Reveal>
                            <FlowDiagram steps={project.flow} label="how it works" />
                        </Reveal>
                    )}

                    <Reveal as="section" className="space-y-4">
                        <h2 className="eyebrow">{"// the problem"}</h2>
                        <p className="text-lg leading-relaxed text-foreground/90">{project.problem}</p>
                    </Reveal>

                    <Reveal as="section" className="space-y-5">
                        <h2 className="eyebrow">{"// what I built"}</h2>
                        <ol className="space-y-4">
                            {project.approach.map((step, i) => (
                                <li key={step} className="flex gap-4">
                                    <span className="mt-0.5 font-mono text-sm text-primary">{String(i + 1).padStart(2, "0")}</span>
                                    <span className="leading-relaxed text-muted-foreground">{step}</span>
                                </li>
                            ))}
                        </ol>
                    </Reveal>

                    <Reveal as="section" className="space-y-5">
                        <h2 className="eyebrow">{"// impact"}</h2>
                        <ul className="space-y-3">
                            {project.impact.map((item) => (
                                <li key={item} className="flex gap-3">
                                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                                    <span className="leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </Reveal>

                    <Reveal as="section" className="rounded-xl border border-primary/30 bg-primary/5 p-6">
                        <h2 className="eyebrow mb-3">{"// what I learned"}</h2>
                        <p className="text-lg leading-relaxed">{project.learning}</p>
                    </Reveal>
                </div>

                <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
                    <div className="rounded-xl border border-border bg-card p-6">
                        <h2 className="eyebrow mb-4">{"// stack"}</h2>
                        <ul className="flex flex-wrap gap-1.5">
                            {project.stack.map((tech) => (
                                <li key={tech} className="rounded-md bg-muted px-2 py-1 font-mono text-xs text-muted-foreground">
                                    {tech}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="rounded-xl border border-border bg-card p-6">
                        <p className="font-medium">Want the details?</p>
                        <p className="mt-2 text-sm text-muted-foreground">
                            I&apos;m happy to walk through the architecture and trade-offs in an interview.
                        </p>
                        <Button asChild className="mt-4 w-full">
                            <Link href="/contact">Get in touch</Link>
                        </Button>
                    </div>
                </aside>
            </div>

            {related.length > 0 && (
                <section className="container-page mt-24">
                    <div className="mb-8 flex items-end justify-between gap-4">
                        <h2 className="font-display text-2xl font-bold md:text-3xl">Related work</h2>
                        <Link
                            href={"/projects/" + next.slug}
                            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                        >
                            Next: {next.title} <ArrowRight className="size-4" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {related.map((p) => (
                            <ProjectCard key={p.slug} project={p} />
                        ))}
                    </div>
                </section>
            )}
        </article>
    );
}
