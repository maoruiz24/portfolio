"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { Github, Linkedin } from "@/components/brand-icons";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

const terminalLines: { prompt?: boolean; text: string; status?: string }[] = [
    { prompt: true, text: "claude /migrate-legacy LoadsHandler" },
    { text: "legacy-analyst   inventory → tracker", status: "done" },
    { text: "migrator         port op → CQRS handler", status: "done" },
    { text: "tests            xUnit suite", status: "pass" },
    { text: "reviewer         contract preserved", status: "ok" },
    { prompt: true, text: "llm-gateway eval --chain grading" },
    { text: "primary model    quota exceeded", status: "open" },
    { text: "backup model     rubric → JSON", status: "valid" },
    { text: "cost + tokens    logged", status: "ok" },
];

export default function Hero() {
    return (
        <section className="relative overflow-hidden">
            <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
            <div
                aria-hidden
                className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[880px] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]"
            />

            <div className="container-page relative grid items-center gap-12 pb-20 pt-16 md:pt-24 lg:grid-cols-[1.15fr_1fr] lg:pb-28">
                <div className="min-w-0 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease }}
                        className="flex flex-wrap items-center gap-3 font-mono text-xs text-muted-foreground"
                    >
                        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-primary">
                            <span className="relative flex size-2">
                                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60 motion-reduce:hidden" />
                                <span className="relative inline-flex size-2 rounded-full bg-primary" />
                            </span>
                            Open to new roles
                        </span>
                        <span className="inline-flex items-center gap-1">
                            <MapPin className="size-3.5" />
                            {siteConfig.location}
                        </span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1, ease }}
                        className="space-y-5"
                    >
                        <p className="font-mono text-sm text-muted-foreground">
                            {siteConfig.name} — <span className="text-foreground">{siteConfig.title}</span>
                        </p>
                        <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
                            I build production software —{" "}
                            <span className="text-gradient">and the AI agents that help build it.</span>
                        </h1>
                        <p className="max-w-xl text-lg text-muted-foreground text-pretty">
                            17 years shipping enterprise systems in .NET, React, React Native and Node. Today I design LLM
                            pipelines with guardrails — RAG, structured outputs, multi-provider fallback and human review —
                            and run an agentic workflow with custom subagents, skills and MCP every day.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2, ease }}
                        className="flex flex-wrap items-center gap-3"
                    >
                        <Button size="lg" asChild>
                            <Link href="/projects">
                                View case studies
                                <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <a href={siteConfig.resumePdf} download>
                                <Download className="size-4" />
                                Download résumé
                            </a>
                        </Button>
                        <div className="flex items-center gap-1 pl-1">
                            <Button variant="ghost" size="icon" asChild>
                                <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                                    <Linkedin className="size-5" />
                                </a>
                            </Button>
                            <Button variant="ghost" size="icon" asChild>
                                <a href={siteConfig.links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                                    <Github className="size-5" />
                                </a>
                            </Button>
                        </div>
                    </motion.div>
                </div>

                <motion.figure
                    initial={{ opacity: 0, y: 24, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.25, ease }}
                    className="min-w-0 overflow-hidden rounded-xl border border-border bg-card/80 shadow-2xl shadow-primary/5 backdrop-blur"
                    aria-label="Illustration: an agentic migration run and an LLM fallback chain"
                >
                    <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                        <span className="size-3 rounded-full bg-[#ff5f57]" />
                        <span className="size-3 rounded-full bg-[#febc2e]" />
                        <span className="size-3 rounded-full bg-[#28c840]" />
                        <span className="ml-3 font-mono text-xs text-muted-foreground">~/work — agents</span>
                    </div>
                    <div className="space-y-1.5 overflow-x-auto p-5 font-mono text-[12.5px] leading-relaxed">
                        {terminalLines.map((line, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -6 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.6 + i * 0.18 }}
                                className={line.prompt ? "pt-2 first:pt-0" : "pl-4"}
                            >
                                {line.prompt ? (
                                    <span>
                                        <span className="text-primary">❯</span> <span className="text-foreground">{line.text}</span>
                                    </span>
                                ) : (
                                    <span className="flex justify-between gap-6 whitespace-pre text-muted-foreground">
                                        <span>{line.text}</span>
                                        <span className={line.status === "open" ? "text-signal" : "text-primary"}>{line.status}</span>
                                    </span>
                                )}
                            </motion.div>
                        ))}
                        <motion.span
                            aria-hidden
                            className="mt-2 inline-block h-4 w-2 bg-primary"
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 1.1, repeat: Infinity }}
                        />
                    </div>
                </motion.figure>
            </div>
        </section>
    );
}
