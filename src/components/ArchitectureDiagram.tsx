import { ArrowDown } from "lucide-react";
import type { Architecture } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

/**
 * High-level architecture rendered as stacked layers (top = closest to the user).
 * Pure HTML/CSS so it stays legible in both themes and on narrow screens.
 */
export default function ArchitectureDiagram({ architecture, className }: { architecture: Architecture; className?: string }) {
    const { caption, layers, notes } = architecture;

    return (
        <figure className={cn("rounded-xl border border-border bg-card p-5 md:p-6", className)}>
            <figcaption className="eyebrow mb-5">{"// " + caption}</figcaption>
            <ol className="space-y-0" aria-label={caption}>
                {layers.map((layer, i) => (
                    <li key={layer.name}>
                        <div className="grid gap-3 md:grid-cols-[150px_1fr] md:items-center">
                            <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{layer.name}</p>
                            <ul
                                className={cn(
                                    "flex flex-wrap gap-2 rounded-lg border border-dashed p-2.5",
                                    i === 0 ? "border-primary/40 bg-primary/5" : "border-border bg-background/60"
                                )}
                            >
                                {layer.nodes.map((node) => (
                                    <li
                                        key={node.label}
                                        className="min-w-0 rounded-md border border-border bg-card px-3 py-1.5 shadow-sm"
                                    >
                                        <span className="block text-sm font-medium leading-snug">{node.label}</span>
                                        {node.detail && (
                                            <span className="block text-xs leading-snug text-muted-foreground">{node.detail}</span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {i < layers.length - 1 && (
                            <div aria-hidden className="grid md:grid-cols-[150px_1fr]">
                                <span className="hidden md:block" />
                                <ArrowDown className="mx-auto my-1.5 size-4 text-primary/70" />
                            </div>
                        )}
                    </li>
                ))}
            </ol>
            {notes && notes.length > 0 && (
                <ul className="mt-5 space-y-1.5 border-t border-border pt-4">
                    {notes.map((note) => (
                        <li key={note} className="flex gap-2 text-sm text-muted-foreground">
                            <span aria-hidden className="font-mono text-primary">→</span>
                            <span>{note}</span>
                        </li>
                    ))}
                </ul>
            )}
        </figure>
    );
}
