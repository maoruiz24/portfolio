import type { Metadata } from "next";
import { Download, Mail, MapPin } from "lucide-react";
import { Github, Linkedin } from "@/components/brand-icons";
import ContactForm from "@/components/ContactForm";
import CopyEmailButton from "@/components/CopyEmailButton";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
    title: "Contact",
    description: "Get in touch with Ivan Ruiz about Senior Full-Stack and Senior Software Engineer roles in the GTA or remote.",
    alternates: { canonical: "/contact" },
};

const channels = [
    { icon: Mail, label: "Email", value: siteConfig.email, href: siteConfig.links.email },
    { icon: Linkedin, label: "LinkedIn", value: "in/maoruiz24", href: siteConfig.links.linkedin },
    { icon: Github, label: "GitHub", value: "maoruiz24", href: siteConfig.links.github },
    { icon: MapPin, label: "Location", value: siteConfig.location },
];

export default function ContactPage() {
    return (
        <div className="container-page py-10 md:py-16">
            <SectionHeading
                as="h1"
                eyebrow="contact"
                title="Let's talk about your team."
                subtitle={siteConfig.availability + ". I usually reply within a day."}
            />

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-10">
                <div className="space-y-5">
                    <ul className="space-y-3">
                        {channels.map((c) => {
                            const content = (
                                <>
                                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <c.icon className="size-5" />
                                    </span>
                                    <span className="min-w-0">
                                        <span className="block text-xs uppercase tracking-wider text-muted-foreground">{c.label}</span>
                                        <span className="break-all font-medium">{c.value}</span>
                                    </span>
                                </>
                            );
                            return (
                                <li key={c.label}>
                                    {c.href ? (
                                        <a
                                            href={c.href}
                                            target={c.href.startsWith("http") ? "_blank" : undefined}
                                            rel="noreferrer"
                                            className="flex min-w-0 items-center gap-4 rounded-xl border border-border bg-card p-3.5 transition-colors hover:border-primary/50 md:p-4"
                                        >
                                            {content}
                                        </a>
                                    ) : (
                                        <div className="flex min-w-0 items-center gap-4 rounded-xl border border-border bg-card p-3.5 md:p-4">{content}</div>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <CopyEmailButton className="sm:flex-1" />
                        <Button size="lg" variant="secondary" asChild className="sm:flex-1">
                            <a href={siteConfig.resumePdf} download>
                                <Download className="size-4" /> Résumé
                            </a>
                        </Button>
                    </div>
                </div>
                <ContactForm />
            </div>
        </div>
    );
}
