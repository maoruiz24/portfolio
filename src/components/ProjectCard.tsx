import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Globe, Sparkles } from "lucide-react";
import { categoryLabels, projectLinks, type Project } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
    project: Project;
    className?: string;
}

export default function ProjectCard({ project, className }: ProjectCardProps) {
    const metrics = project.metrics.slice(0, 2);
    // Real screenshots only; cards without one stay typographic.
    const cover = project.gallery?.[0];
    const isPublic = projectLinks(project).length > 0;

    return (
        <Link
            href={"/projects/" + project.slug}
            className={cn(
                "group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card p-5 transition-all duration-300 md:p-6",
                "hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                className
            )}
        >
            {cover && (
                <Image
                    src={cover.src}
                    alt={cover.alt}
                    width={cover.width}
                    height={cover.height}
                    sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
                    className="-mx-5 -mt-5 mb-5 aspect-[16/9] w-[calc(100%+2.5rem)] max-w-none border-b border-border object-cover object-top md:-mx-6 md:-mt-6 md:w-[calc(100%+3rem)]"
                />
            )}
            <p className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-muted-foreground">
                <span>{project.org}</span>
                <span aria-hidden>·</span>
                <span>{project.period}</span>
            </p>
            <div className="mb-2 flex flex-wrap items-center gap-2">
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{categoryLabels[project.category]}</p>
                <span className="ml-auto flex items-center gap-1.5 font-mono text-xs">
                    {isPublic && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-signal/15 px-2 py-0.5 text-signal">
                            <Globe className="size-3" />
                            Live
                        </span>
                    )}
                    {project.ai && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-primary">
                            <Sparkles className="size-3" />
                            AI
                        </span>
                    )}
                </span>
            </div>
            <h3 className="font-display text-xl font-bold leading-snug tracking-tight text-balance transition-colors group-hover:text-primary md:text-2xl">
                {project.title}
            </h3>
            <p className="mt-3 text-muted-foreground text-pretty">{project.tagline}</p>

            {metrics.length > 0 && (
                <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-border pt-4">
                    {metrics.map((m) => (
                        <div key={m.label}>
                            <dt className="sr-only">{m.label}</dt>
                            <dd className="font-display text-xl font-bold text-foreground">{m.value}</dd>
                            <dd className="text-xs leading-snug text-muted-foreground">{m.label}</dd>
                        </div>
                    ))}
                </dl>
            )}

            <div className="mt-auto flex items-end justify-between gap-4 pt-5">
                <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
                    {project.stack.slice(0, 4).map((tech) => (
                        <li key={tech} className="rounded-md bg-muted px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                            {tech}
                        </li>
                    ))}
                </ul>
                <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
            </div>
        </Link>
    );
}
