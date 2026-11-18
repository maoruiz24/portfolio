import Link from "next/link";
import { ArrowUpRight, Globe, Sparkles } from "lucide-react";
import { categoryLabels, type Project } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
    project: Project;
    className?: string;
}

export default function ProjectCard({ project, className }: ProjectCardProps) {
    const metrics = project.metrics.slice(0, 2);

    return (
        <Link
            href={"/projects/" + project.slug}
            className={cn(
                "group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300",
                "hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                className
            )}
        >
            <div className="mb-5 flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
                <span>{project.org}</span>
                <span aria-hidden>·</span>
                <span>{project.period}</span>
                <span className="ml-auto flex items-center gap-1.5">
                    {project.url && (
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

            <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                {categoryLabels[project.category]}
            </p>
            <h3 className="font-display text-xl font-bold leading-snug tracking-tight text-balance transition-colors group-hover:text-primary md:text-2xl">
                {project.title}
            </h3>
            <p className="mt-3 text-muted-foreground text-pretty">{project.tagline}</p>

            {metrics.length > 0 && (
                <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-5">
                    {metrics.map((m) => (
                        <div key={m.label}>
                            <dt className="sr-only">{m.label}</dt>
                            <dd className="font-display text-xl font-bold text-foreground">{m.value}</dd>
                            <dd className="text-xs leading-snug text-muted-foreground">{m.label}</dd>
                        </div>
                    ))}
                </dl>
            )}

            <div className="mt-auto flex items-end justify-between gap-4 pt-6">
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
