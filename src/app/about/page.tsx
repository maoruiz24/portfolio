import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
    title: "About",
    description:
        "Ivan Ruiz — a senior full-stack engineer from Bogotá based in Mississauga, with 15+ years designing, building and maintaining production web, mobile and backend systems.",
    alternates: { canonical: "/about" },
};

const chapters = [
    {
        years: "2009 – 2013",
        title: "Leading a delivery team",
        body: "At Indra I led the development team for the Telefónica account: 80+ production applications and features in .NET, Java and Oracle, a new QA function and a 35% reduction in development costs.",
    },
    {
        years: "2013 – 2021",
        title: "Building for a national telecom",
        body: "At ETB I designed the company CRM and rebuilt the customer self-service platform for ~10,000 concurrent users, and helped move backend services to Kubernetes on Azure.",
    },
    {
        years: "2022 – today",
        title: "Owning a product in production",
        body: "At Nology Solutions I am the main developer of a B2B2C logistics SaaS — web, mobile, API and database. I built its driver app from scratch, made its slowest pages fast and am modernizing it to .NET 10.",
    },
    {
        years: "Alongside",
        title: "Personal R&D",
        body: "I build and run my own products on a self-hosted Kubernetes platform, which is where I work on LLM features: provider fallbacks, RAG, structured outputs and human review.",
    },
];

const principles = [
    { title: "Measure before optimizing", body: "Profiling showed a 14-second freeze was 500 forced browser layouts, not the server. Data beats guesses." },
    { title: "Design for failure", body: "Networks drop, phones kill apps, providers hit quotas. Retries, fallbacks and rollbacks are part of the feature." },
    { title: "Change in small, reversible steps", body: "Migrate one operation at a time, keep the old path available, and prepare a rollback before touching live data." },
    { title: "Stay responsible after launch", body: "Releases, crash reports, field diagnostics and fixes are part of the job, not someone else's problem." },
    { title: "Write decisions down", body: "ADRs, trade-offs and runbooks make knowledge reusable by the whole team." },
    { title: "Use AI with judgment", body: "AI tools speed up exploration, tests and review. Engineers still own the design and approve every change." },
];

export default function AboutPage() {
    return (
        <div className="container-page py-10 md:py-16">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px] lg:gap-12">
                <div>
                    <SectionHeading
                        as="h1"
                        eyebrow="about"
                        title="Engineer first, across the whole stack."
                        subtitle="I'm Ivan — a software engineer from Bogotá, now in Mississauga. I care about software that keeps working on Monday morning, and about leaving systems easier to change than I found them."
                    />
                    <Reveal className="max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                        <p>
                            For 15+ years I&apos;ve designed, built and maintained software for telecom, logistics and enterprise clients:
                            leading a delivery team, designing platforms and, most recently, owning a production SaaS across every layer —
                            from SQL Server stored procedures to a React Native app on both app stores.
                        </p>
                        <p>
                            The work I enjoy most is the hard middle of a product&apos;s life: finding why a page takes 15 seconds, making a
                            mobile app reliable on bad networks, or replacing legacy code without breaking the clients that depend on it.
                        </p>
                        <p>
                            AI is part of my toolset. I use coding agents daily for exploration, tests and review, and I&apos;ve built LLM
                            features in my own products — always with tests, validation and a person approving what matters.
                        </p>
                        <p>
                            I&apos;m looking for a senior full-stack or software engineering role on a team that values production
                            experience and good engineering judgment.
                        </p>
                    </Reveal>
                </div>
                <Reveal delay={0.08} className="h-fit rounded-xl border border-border bg-card p-5 md:p-6 lg:sticky lg:top-24">
                    <p className="eyebrow">{"// quick facts"}</p>
                    <dl className="mt-4 space-y-3 text-sm">
                        <div>
                            <dt className="text-muted-foreground">Role</dt>
                            <dd className="font-medium">{siteConfig.title}</dd>
                        </div>
                        <div>
                            <dt className="text-muted-foreground">Core stack</dt>
                            <dd className="font-medium">{siteConfig.tagline}</dd>
                        </div>
                        <div>
                            <dt className="text-muted-foreground">Based in</dt>
                            <dd className="font-medium">{siteConfig.location}</dd>
                        </div>
                        <div>
                            <dt className="text-muted-foreground">Languages</dt>
                            <dd className="font-medium">English (advanced) · Spanish (native)</dd>
                        </div>
                        <div>
                            <dt className="text-muted-foreground">Looking for</dt>
                            <dd className="font-medium">Senior Full-Stack / Senior Software Engineer · GTA hybrid or remote</dd>
                        </div>
                    </dl>
                    <Button asChild className="mt-5 w-full">
                        <Link href="/contact">
                            Contact me <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                </Reveal>
            </div>

            <section className="mt-14 md:mt-20">
                <SectionHeading eyebrow="the path" title="Career in four parts" />
                <ol className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
                    {chapters.map((c, i) => (
                        <Reveal as="li" key={c.title} delay={(i % 2) * 0.05} className="rounded-xl border border-border bg-card p-5 md:p-6">
                            <p className="font-mono text-xs text-primary">{c.years}</p>
                            <h3 className="mt-2 font-display text-lg font-bold md:text-xl">{c.title}</h3>
                            <p className="mt-2 text-muted-foreground">{c.body}</p>
                        </Reveal>
                    ))}
                </ol>
            </section>

            <section className="mt-14 md:mt-20">
                <SectionHeading eyebrow="principles" title="How I work" />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
                    {principles.map((p, i) => (
                        <Reveal key={p.title} delay={(i % 3) * 0.05} className="rounded-xl border border-border p-5 md:p-6">
                            <h3 className="font-display text-lg font-bold">{p.title}</h3>
                            <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
                        </Reveal>
                    ))}
                </div>
            </section>
        </div>
    );
}
