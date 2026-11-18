import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FlowDiagramProps {
    steps: string[];
    className?: string;
    label?: string;
}

/** Renders a linear pipeline as numbered steps: horizontal on wide screens, wrapping on narrow ones. */
export default function FlowDiagram({ steps, className, label = "Pipeline" }: FlowDiagramProps) {
    return (
        <figure className={cn("rounded-xl border border-border bg-card p-5 md:p-6", className)}>
            <figcaption className="eyebrow mb-4">{"// " + label}</figcaption>
            <ol className="flex flex-wrap items-center gap-y-3">
                {steps.map((step, i) => (
                    <li key={step} className="flex items-center">
                        <span className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm">
                            <span className="font-mono text-xs text-primary">{String(i + 1).padStart(2, "0")}</span>
                            <span className="font-medium">{step}</span>
                        </span>
                        {i < steps.length - 1 && <ChevronRight aria-hidden className="mx-1 size-4 text-muted-foreground" />}
                    </li>
                ))}
            </ol>
        </figure>
    );
}
