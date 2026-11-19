import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowLeft, ArrowRight, CheckCircle2, ExternalLink, Scale, Sparkles } from "lucide-react";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import FlowDiagram from "@/components/FlowDiagram";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { categoryLabels, projectLinks, projects } from "@/lib/data/projects";
import { siteConfig } from "@/lib/site";

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

function Section({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
    return (
        <Reveal as="section" className={className}>
            <h2 className="eyebrow mb-4">{"// " + label}</h2>
            {children}
        </Reveal>
    );
}

export default async function ProjectDetailPage({ params }: Props) {
    const { slug } = await params;
    const index = projects.findIndex((p) => p.slug === slug);
    if (index === -1) notFound();

    const project = projects[index];
    const next = projects[(index + 1) % projects.length];
    const related = projects
        .filter((p) => p.slug !== project.slug && (p.category === project.category || (project.ai && p.ai)))
        .slice(0, 2);
    const links = projectLinks(project);
    const overview = project.overview;
    const glance = overview
        ? [
              { label: "What it is", value: overview.product },
              { label: "My role", value: overview.role },
              { label: "Problem solved", value: overview.problem },
              { label: "Outcome", value: overview.outcome },
          ]
        : [];
    const status = overview?.status
        ? [
              { label: "Delivered", value: overview.status.delivered, tone: "text-primary border-primary/30 bg-primary/5" },
              { label: "In progress", value: overview.status.inProgress, tone: "text-signal border-signal/30 bg-signal/5" },
              { label: "Planned", value: overview.status.planned, tone: "text-muted-foreground border-border bg-muted/40" },
          ].filter((x) => x.value)
        : [];
    const pageUrl = siteConfig.url + "/projects/" + project.slug;
    const structuredData = [
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
                { "@type": "ListItem", position: 2, name: "Work", item: siteConfig.url + "/projects" },
                { "@type": "ListItem", position: 3, name: project.title, item: pageUrl },
            ],
        },
        {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: project.title,
            description: project.summary,
            url: pageUrl,
            author: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
            keywords: project.stack.join(", "),
        },
    ];

    return (
        <article className="pb-16 md:pb-24">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
            />
            <header className="relative overflow-hidden border-b border-border/60">
                <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
                <div className="container-page relative py-8 md:py-14">
                    <Link
                        href="/projects"
                        className="group mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                        All projects
                    </Link>
                    <div className="mb-4 flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
                        <span>{project.org}</span>
                        <span aria-hidden>·</span>
                        <span>{project.period}</span>
                        <span className="rounded-full border border-border px-2 py-0.5">{categoryLabels[project.category]}</span>
                        {project.ai && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-primary">
                                <Sparkles className="size-3" /> AI
                            </span>
                        )}
                        {project.status && <span className="rounded-full bg-signal/15 px-2 py-0.5 text-signal">{project.status}</span>}
                    </div>
                    <h1 className="max-w-4xl font-display text-[2rem] font-bold leading-tight tracking-tight text-balance sm:text-4xl md:text-5xl">
                        {project.title}
                    </h1>
                    <p className="mt-4 max-w-3xl text-base text-muted-foreground text-pretty sm:text-lg">
                        {overview ? project.tagline : project.summary}
                    </p>

                    {links.length > 0 && (
                        <div className="mt-5 flex flex-wrap items-center gap-2 sm:gap-3">
                            {links.map((l, i) => (
                                <Button key={l.href} variant={i === 0 ? "default" : "outline"} asChild>
                                    <a href={l.href} target="_blank" rel="noreferrer">
                                        {l.label} <ExternalLink className="size-4" />
                                    </a>
                                </Button>
                            ))}
                            <span className="text-sm text-muted-foreground">
                                {project.category === "enterprise" ? "Public store listings" : "Personal R&D project"}
                            </span>
                        </div>
                    )}

                    {glance.length > 0 && (
                        <dl className="mt-6 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
                            {glance.map((g) => (
                                <div key={g.label} className="bg-card p-4 md:p-5">
                                    <dt className="eyebrow">{g.label}</dt>
                                    <dd className="mt-1.5 text-sm leading-relaxed text-foreground/90 md:text-base">{g.value}</dd>
                                </div>
                            ))}
                        </dl>
                    )}

                    {status.length > 0 && (
                        <ul className="mt-3 grid gap-2 text-sm md:grid-cols-3" aria-label="Project status">
                            {status.map((st) => (
                                <li key={st.label} className={"rounded-lg border p-3 " + st.tone}>
                                    <span className="font-mono text-[11px] uppercase tracking-wider">{st.label}</span>
                                    <span className="mt-1 block text-foreground/85">{st.value}</span>
                                </li>
                            ))}
                        </ul>
                    )}

                    {project.metrics.length > 0 && (
                        <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-6 md:grid-cols-4 md:gap-6">
                            {project.metrics.map((m) => (
                                <div key={m.label}>
                                    <dt className="sr-only">{m.label}</dt>
                                    <dd className="font-display text-xl font-bold text-primary sm:text-2xl md:text-3xl">{m.value}</dd>
                                    <dd className="mt-1 text-sm text-muted-foreground">{m.label}</dd>
                                </div>
                            ))}
                        </dl>
                    )}
                </div>
            </header>

            <div className="container-page grid grid-cols-1 gap-10 pt-10 md:pt-14 lg:grid-cols-[1fr_280px]">
                <div className="min-w-0 space-y-10 md:space-y-14">
                    {project.features && (
                        <Section label="key capabilities">
                            <ul className="grid gap-3 sm:grid-cols-2">
                                {project.features.map((f) => (
                                    <li key={f} className="flex gap-3 rounded-lg border border-border bg-card p-4 text-sm">
                                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>
                        </Section>
                    )}

                    {project.gallery && project.gallery.length > 0 && (
                        <Section label="screenshots">
                            <div className="grid gap-4 sm:grid-cols-2">
                                {project.gallery.map((img) => (
                                    <figure key={img.src} className="overflow-hidden rounded-xl border border-border bg-card">
                                        <Image
                                            src={img.src}
                                            alt={img.alt}
                                            width={img.width}
                                            height={img.height}
                                            sizes="(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw"
                                            className="h-auto w-full"
                                        />
                                        {img.caption && <figcaption className="border-t border-border p-3 text-sm text-muted-foreground">{img.caption}</figcaption>}
                                    </figure>
                                ))}
                            </div>
                        </Section>
                    )}

                    <Section label="the problem">
                        <p className="text-base leading-relaxed text-foreground/90 sm:text-lg">{project.problem}</p>
                    </Section>

                    {project.responsibilities && (
                        <Section label="my responsibilities">
                            <ul className="space-y-2.5">
                                {project.responsibilities.map((r) => (
                                    <li key={r} className="flex gap-3 text-muted-foreground">
                                        <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-primary" />
                                        <span>{r}</span>
                                    </li>
                                ))}
                            </ul>
                        </Section>
                    )}

                    {project.architecture && (
                        <Section label="technical architecture">
                            <ArchitectureDiagram architecture={project.architecture} />
                        </Section>
                    )}

                    {project.decisions && (
                        <Section label="key decisions & trade-offs">
                            <div className="grid gap-4 md:grid-cols-2">
                                {project.decisions.map((d) => (
                                    <div key={d.title} className="rounded-xl border border-border bg-card p-5">
                                        <h3 className="font-display text-lg font-bold leading-snug">{d.title}</h3>
                                        <p className="mt-2 text-sm text-muted-foreground">{d.why}</p>
                                        <p className="mt-3 flex gap-2 border-t border-border pt-3 text-sm">
                                            <Scale className="mt-0.5 size-4 shrink-0 text-signal" />
                                            <span>
                                                <span className="font-medium">Trade-off: </span>
                                                <span className="text-muted-foreground">{d.tradeoff}</span>
                                            </span>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </Section>
                    )}

                    {project.challenges && (
                        <Section label="challenges">
                            <ul className="space-y-3">
                                {project.challenges.map((c) => (
                                    <li key={c} className="flex gap-3">
                                        <AlertTriangle className="mt-0.5 size-5 shrink-0 text-signal" />
                                        <span className="leading-relaxed text-muted-foreground">{c}</span>
                                    </li>
                                ))}
                            </ul>
                        </Section>
                    )}

                    <Section label="implementation">
                        {project.flow && <FlowDiagram steps={project.flow} label="flow" className="mb-4" />}
                        {project.extraFlows?.map((f) => (
                            <FlowDiagram key={f.label} steps={f.steps} label={f.label} className="mb-4" />
                        ))}
                        <div className="h-2" aria-hidden />
                        <ol className="space-y-4">
                            {project.approach.map((step, i) => (
                                <li key={step} className="flex gap-4">
                                    <span className="mt-0.5 font-mono text-sm text-primary">{String(i + 1).padStart(2, "0")}</span>
                                    <span className="leading-relaxed text-muted-foreground">{step}</span>
                                </li>
                            ))}
                        </ol>
                    </Section>

                    <Section label="results & impact">
                        <ul className="space-y-3">
                            {project.impact.map((item) => (
                                <li key={item} className="flex gap-3">
                                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                                    <span className="leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </Section>

                    <Reveal as="section" className="rounded-xl border border-primary/30 bg-primary/5 p-5 md:p-6">
                        <h2 className="eyebrow mb-3">{"// lessons learned"}</h2>
                        <p className="text-base leading-relaxed sm:text-lg">{project.learning}</p>
                    </Reveal>
                </div>

                <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
                    <div className="rounded-xl border border-border bg-card p-6">
                        <h2 className="eyebrow mb-4">{"// technologies"}</h2>
                        <ul className="flex flex-wrap gap-1.5">
                            {project.stack.map((tech) => (
                                <li key={tech} className="rounded-md bg-muted px-2 py-1 font-mono text-xs text-muted-foreground">
                                    {tech}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {links.map((l) => (
                        <a
                            key={l.href}
                            href={l.href}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-5 text-sm transition-colors hover:border-primary/50"
                        >
                            <span className="min-w-0">
                                <span className="block text-xs uppercase tracking-wider text-muted-foreground">Public evidence</span>
                                <span className="font-medium">{l.label}</span>
                            </span>
                            <ExternalLink className="size-4 shrink-0 text-primary" />
                        </a>
                    ))}
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
                <section className="container-page mt-16 md:mt-24">
                    <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                        <h2 className="font-display text-2xl font-bold md:text-3xl">Related work</h2>
                        <Link href={"/projects/" + next.slug} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
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
