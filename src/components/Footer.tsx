import Link from "next/link";
import { Mail } from "lucide-react";
import { Github, Linkedin } from "@/components/brand-icons";
import { siteConfig } from "@/lib/site";

const links = [
    { name: "Work", href: "/projects" },
    { name: "Experience", href: "/experience" },
    { name: "About", href: "/about" },
    { name: "Résumé", href: "/resume" },
    { name: "Contact", href: "/contact" },
];

export default function Footer() {
    return (
        <footer className="border-t border-border/60 print:hidden">
            <div className="container-page flex flex-col gap-8 py-12 md:flex-row md:items-start md:justify-between">
                <div className="max-w-sm space-y-3">
                    <p className="font-display text-lg font-bold">{siteConfig.name}</p>
                    <p className="text-sm text-muted-foreground">
                        {siteConfig.title}. {siteConfig.location}.
                    </p>
                </div>
                <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                    {links.map((l) => (
                        <Link key={l.href} href={l.href} className="text-muted-foreground transition-colors hover:text-foreground">
                            {l.name}
                        </Link>
                    ))}
                </nav>
                <div className="flex gap-4">
                    <a href={siteConfig.links.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-muted-foreground transition-colors hover:text-primary">
                        <Github className="size-5" />
                    </a>
                    <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-muted-foreground transition-colors hover:text-primary">
                        <Linkedin className="size-5" />
                    </a>
                    <a href={siteConfig.links.email} aria-label="Email" className="text-muted-foreground transition-colors hover:text-primary">
                        <Mail className="size-5" />
                    </a>
                </div>
            </div>
            <div className="container-page flex flex-col justify-between gap-2 border-t border-border/60 py-6 font-mono text-xs text-muted-foreground md:flex-row">
                <p>© {new Date().getFullYear()} {siteConfig.name}</p>
                <p>Next.js 16 · self-hosted on k3s · built with Claude Code &amp; Codex</p>
            </div>
        </footer>
    );
}
