import type { Metadata } from "next";
import { Download, Mail, MapPin } from "lucide-react";
import { Github, Linkedin } from "@/components/brand-icons";
import ContactForm from "@/components/ContactForm";
import CopyEmailButton from "@/components/CopyEmailButton";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
    title: "Contact",
    description: "Get in touch with Ivan Ruiz about Senior AI Engineer, Applied AI and Full-Stack AI roles.",
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
        <div className="container-page py-16 md:py-24">
            <SectionHeading
                as="h1"
                eyebrow="contact"
                title="Let's talk about your team."
                subtitle={siteConfig.availability + ". I usually reply within a day."}
            />

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr]">
                <Reveal className="space-y-6">
                    <ul className="space-y-3">
                        {channels.map((c) => {
                            const content = (
                                <>
                                    <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <c.icon className="size-5" />
                                    </span>
                                    <span>
                                        <span className="block text-xs uppercase tracking-wider text-muted-foreground">{c.label}</span>
                                        <span className="font-medium">{c.value}</span>
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
                                            className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/50"
                                        >
                                            {content}
                                        </a>
                                    ) : (
                                        <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">{content}</div>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <CopyEmailButton className="flex-1" />
                        <Button size="lg" variant="secondary" asChild className="flex-1">
                            <a href={siteConfig.resumePdf} download>
                                <Download className="size-4" /> Résumé
                            </a>
                        </Button>
                    </div>
                </Reveal>
                <Reveal delay={0.08}>
                    <ContactForm />
                </Reveal>
            </div>
        </div>
    );
}
