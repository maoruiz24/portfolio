import Link from "next/link";
import { ArrowDown, ArrowRight, Download, Mail, MapPin } from "lucide-react";
import { Github, Linkedin } from "@/components/brand-icons";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

/** The layers I work across, each with what I actually do there. Desktop-only visual. */
const layers = [
    { name: "Interface", tech: "React · React Native · Next.js", work: "Web and mobile apps, offline-first sync" },
    { name: "API", tech: ".NET / C# · Node.js", work: "Clean Architecture, CQRS, REST contracts" },
    { name: "Data", tech: "SQL Server · PostgreSQL", work: "Query and index tuning, data integrity" },
    { name: "Delivery", tech: "Azure DevOps · Expo EAS · Docker · Kubernetes", work: "CI/CD, store releases, monitoring" },
];

/*
 * Server-rendered and not animated on purpose: the first screen must be visible immediately,
 * with or without JavaScript and regardless of motion preferences.
 */
export default function Hero() {
    return (
        <section className="relative overflow-hidden">
            <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
            <div
                aria-hidden
                className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[880px] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]"
            />

            <div className="container-page relative grid items-center gap-10 py-8 md:py-12 lg:grid-cols-[1.2fr_1fr] lg:py-16">
                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-muted-foreground">
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
                    </div>

                    <p className="mt-5 font-mono text-sm text-muted-foreground">Hi, I&apos;m {siteConfig.name}</p>
                    <h1 className="mt-2 font-display text-[2.15rem] font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-[3.4rem]">
                        {/* Non-breaking hyphen keeps "Full-Stack" on one line. */}
                        {siteConfig.title.replace("-", "‑")}
                        <span className="mt-2 block text-xl leading-snug text-gradient sm:text-2xl lg:text-3xl">{siteConfig.headline}</span>
                    </h1>
                    <p className="mt-4 max-w-xl text-base text-muted-foreground text-pretty sm:text-lg">{siteConfig.intro}</p>

                    <ul className="mt-4 flex flex-wrap gap-1.5 lg:hidden" aria-label="Core stack">
                        {siteConfig.specialties.map((s) => (
                            <li key={s} className="rounded-md border border-border bg-card px-2 py-1 font-mono text-xs text-foreground/85">
                                {s}
                            </li>
                        ))}
                    </ul>

                    <div className="mt-6 flex flex-wrap items-center gap-2 sm:gap-3">
                        <Button size="lg" asChild>
                            <Link href="/projects">
                                View case studies
                                <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <a href={siteConfig.resumePdf} download>
                                <Download className="size-4" />
                                Résumé
                            </a>
                        </Button>
                        <Button size="lg" variant="ghost" asChild>
                            <Link href="/contact">
                                <Mail className="size-4" />
                                Contact
                            </Link>
                        </Button>
                        <div className="flex items-center">
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
                    </div>
                </div>

                <figure
                    className="hidden min-w-0 rounded-xl border border-border bg-card/80 p-5 shadow-2xl shadow-primary/5 backdrop-blur lg:block"
                    aria-label="The layers I work across, from interface to delivery"
                >
                    <figcaption className="eyebrow mb-4">{"// across the stack"}</figcaption>
                    <ol>
                        {layers.map((layer, i) => (
                            <li key={layer.name}>
                                <div className="grid grid-cols-[88px_1fr] items-center gap-3 rounded-lg border border-border bg-background/70 px-3 py-2.5">
                                    <span className="font-mono text-[11px] uppercase tracking-wider text-primary">{layer.name}</span>
                                    <span className="min-w-0">
                                        <span className="block text-sm font-medium leading-snug">{layer.tech}</span>
                                        <span className="block text-xs leading-snug text-muted-foreground">{layer.work}</span>
                                    </span>
                                </div>
                                {i < layers.length - 1 && <ArrowDown aria-hidden className="mx-auto my-1 size-3.5 text-primary/60" />}
                            </li>
                        ))}
                    </ol>
                </figure>
            </div>
        </section>
    );
}
