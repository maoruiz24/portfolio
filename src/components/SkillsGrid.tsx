import { Bot, Brain, CheckCircle2, Cloud, Database, LayoutTemplate, Server } from "lucide-react";
import Reveal from "@/components/Reveal";
import { skillGroups, type SkillGroup } from "@/lib/data/skills";
import { cn } from "@/lib/utils";

const icons: Record<SkillGroup["icon"], React.ComponentType<{ className?: string }>> = {
    brain: Brain,
    bot: Bot,
    server: Server,
    layout: LayoutTemplate,
    database: Database,
    cloud: Cloud,
    check: CheckCircle2,
};

export default function SkillsGrid() {
    return (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group, i) => {
                const Icon = icons[group.icon];
                return (
                    <Reveal
                        key={group.name}
                        delay={(i % 3) * 0.06}
                        className={cn(
                            "flex flex-col rounded-xl border bg-card p-6",
                            group.highlight ? "border-primary/40 lg:col-span-1" : "border-border"
                        )}
                    >
                        <div className="mb-4 flex items-center gap-3">
                            <span
                                className={cn(
                                    "flex size-10 items-center justify-center rounded-lg",
                                    group.highlight ? "bg-primary text-primary-foreground" : "bg-muted text-primary"
                                )}
                            >
                                <Icon className="size-5" />
                            </span>
                            <h3 className="font-display text-lg font-bold">{group.name}</h3>
                        </div>
                        <ul className="flex flex-wrap gap-1.5">
                            {group.items.map((item) => (
                                <li key={item} className="rounded-md border border-border bg-background px-2 py-1 text-xs text-foreground/85">
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p className="mt-auto pt-5 text-sm text-muted-foreground">
                            <span className="font-mono text-xs text-primary">proof → </span>
                            {group.proof}
                        </p>
                    </Reveal>
                );
            })}
        </div>
    );
}
