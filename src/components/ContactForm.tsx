"use client";

import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/lib/site";

/** No backend: builds a mailto: link and opens the visitor's email client. */
export default function ContactForm() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const name = String(data.get("name") ?? "");
        const company = String(data.get("company") ?? "");
        const subject = String(data.get("subject") ?? "");
        const message = String(data.get("message") ?? "");
        const body = "Name: " + name + (company ? "\nCompany: " + company : "") + "\n\n" + message;
        window.location.href =
            "mailto:" + siteConfig.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border border-border bg-card p-6 md:p-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                        Name
                    </label>
                    <Input id="name" name="name" autoComplete="name" required placeholder="Your name" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-medium">
                        Company <span className="text-muted-foreground">(optional)</span>
                    </label>
                    <Input id="company" name="company" autoComplete="organization" placeholder="Where you work" />
                </div>
            </div>
            <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                </label>
                <Input id="subject" name="subject" required placeholder="Senior AI Engineer role, interview request…" />
            </div>
            <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                    Message
                </label>
                <Textarea
                    id="message"
                    name="message"
                    required
                    className="min-h-40"
                    placeholder="Tell me about the role and the team…"
                />
            </div>
            <Button type="submit" size="lg" className="w-full">
                Send message <Send className="size-4" />
            </Button>
            <p className="text-center text-xs text-muted-foreground">Opens your email client with the message pre-filled.</p>
        </form>
    );
}
