"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import { projects, type Project } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

type Filter = "all" | "ai" | "professional" | "lab" | "earlier";

const filters: { id: Filter; label: string; match: (p: Project) => boolean }[] = [
    { id: "all", label: "All", match: () => true },
    { id: "ai", label: "AI & LLM", match: (p) => p.ai },
    { id: "professional", label: "Professional", match: (p) => p.group === "professional" },
    { id: "lab", label: "R&D Lab", match: (p) => p.group === "lab" },
    { id: "earlier", label: "Earlier career", match: (p) => p.group === "earlier" },
];

export default function ProjectsExplorer() {
    const [active, setActive] = useState<Filter>("all");

    const visible = useMemo(() => {
        const f = filters.find((x) => x.id === active) ?? filters[0];
        return projects.filter(f.match);
    }, [active]);

    return (
        <div className="space-y-8">
            <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
                {filters.map((f) => {
                    const count = projects.filter(f.match).length;
                    const selected = active === f.id;
                    return (
                        <button
                            key={f.id}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => setActive(f.id)}
                            className={cn(
                                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                selected
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                            )}
                        >
                            {f.label}
                            <span className={cn("ml-2 font-mono text-xs", selected ? "opacity-80" : "opacity-60")}>{count}</span>
                        </button>
                    );
                })}
            </div>

            <motion.ul layout className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                    {visible.map((project) => (
                        <motion.li
                            key={project.slug}
                            layout
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.97 }}
                            transition={{ duration: 0.25 }}
                        >
                            <ProjectCard project={project} />
                        </motion.li>
                    ))}
                </AnimatePresence>
            </motion.ul>
        </div>
    );
}
