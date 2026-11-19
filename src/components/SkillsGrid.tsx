import { Bot, CheckCircle2, Cloud, Database, LayoutTemplate, Network, Server } from "lucide-react";
import Reveal from "@/components/Reveal";
import { skillGroups, type SkillGroup } from "@/lib/data/skills";
import { cn } from "@/lib/utils";

const icons: Record<SkillGroup["icon"], React.ComponentType<{ className?: string }>> = {
    server: Server,
    network: Network,
    database: Database,
    layout: LayoutTemplate,
    cloud: Cloud,
    bot: Bot,
    check: CheckCircle2,
};

export default function SkillsGrid() {
    return (
        <div className="space-y-5">
            <p className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                    <span className="rounded-md border border-border bg-background px-2 py-0.5 text-xs text-foreground">Solid</span>
                    production experience
                </span>
                <span className="inline-flex items-center gap-2">
                    <span className="rounded-md border border-dashed border-border px-2 py-0.5 text-xs">Dashed</span>
                    personal R&amp;D projects
                </span>
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
                {skillGroups.map((group, i) => {
                    const Icon = icons[group.icon];
                    return (
                        <Reveal
                            key={group.name}
                            delay={(i % 3) * 0.06}
                            className={cn(
                                "flex flex-col rounded-xl border bg-card p-5 md:p-6",
                                group.highlight ? "border-primary/40" : "border-border",
                                // A lone card in the last row spans the full width instead of leaving gaps.
                                i === skillGroups.length - 1 && skillGroups.length % 3 === 1 && "md:col-span-2 lg:col-span-3",
                                i === skillGroups.length - 1 && skillGroups.length % 2 === 1 && "md:col-span-2"
                            )}
                        >
                            <div className="mb-3 flex items-center gap-3">
                                <span
                                    className={cn(
                                        "flex size-9 shrink-0 items-center justify-center rounded-lg",
                                        group.highlight ? "bg-primary text-primary-foreground" : "bg-muted text-primary"
                                    )}
                                >
                                    <Icon className="size-5" />
                                </span>
                                <h3 className="font-display text-lg font-bold">{group.name}</h3>
                            </div>
                            <ul className="flex flex-wrap gap-1.5" aria-label={group.name + " — production experience"}>
                                {group.items.map((item) => (
                                    <li key={item} className="rounded-md border border-border bg-background px-2 py-1 text-xs text-foreground/90">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            {group.lab && (
                                <ul className="mt-2 flex flex-wrap gap-1.5" aria-label={group.name + " — personal R&D"}>
                                    {group.lab.map((item) => (
                                        <li key={item} className="rounded-md border border-dashed border-border px-2 py-1 text-xs text-muted-foreground">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <p className="mt-auto pt-4 text-sm text-muted-foreground">
                                <span className="font-mono text-xs text-primary">used in → </span>
                                {group.proof}
                            </p>
                        </Reveal>
                    );
                })}
            </div>
        </div>
    );
}
