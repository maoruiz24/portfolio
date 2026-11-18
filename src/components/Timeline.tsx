import { MapPin } from "lucide-react";
import Reveal from "@/components/Reveal";
import type { Experience } from "@/lib/data/experience";
import { cn } from "@/lib/utils";

interface TimelineProps {
    items: Experience[];
    /** Compact mode shows only the summary and the first bullets (home page). */
    compact?: boolean;
}

export default function Timeline({ items, compact = false }: TimelineProps) {
    return (
        <ol className="relative space-y-12 border-l border-border pl-6 md:pl-10">
            {items.map((exp, i) => (
                <Reveal as="li" key={exp.company} delay={i * 0.05} className="relative">
                    <span
                        aria-hidden
                        className={cn(
                            "absolute -left-[31px] top-1.5 size-3 rounded-full border-2 border-background md:-left-[47px]",
                            i === 0 ? "bg-primary ring-4 ring-primary/20" : "bg-muted-foreground/60"
                        )}
                    />
                    <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                        <h3 className="font-display text-xl font-bold md:text-2xl">
                            {exp.role} <span className="text-primary">@ {exp.company}</span>
                        </h3>
                        <p className="font-mono text-xs text-muted-foreground">{exp.period}</p>
                    </div>
                    <p className="mt-1 inline-flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="size-3.5" />
                        {exp.location}
                    </p>
                    <p className="mt-4 max-w-3xl text-foreground/90">{exp.summary}</p>
                    {!compact && <p className="mt-2 max-w-3xl text-sm italic text-muted-foreground">{exp.context}</p>}

                    <ul className="mt-5 max-w-3xl space-y-2.5">
                        {(compact ? exp.bullets.slice(0, 3) : exp.bullets).map((b) => (
                            <li key={b} className="flex gap-3 text-muted-foreground">
                                <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-primary" />
                                <span>{b}</span>
                            </li>
                        ))}
                    </ul>

                    {!compact && (
                        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tech stack">
                            {exp.stack.map((tech) => (
                                <li key={tech} className="rounded-md bg-muted px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                                    {tech}
                                </li>
                            ))}
                        </ul>
                    )}
                </Reveal>
            ))}
        </ol>
    );
}
