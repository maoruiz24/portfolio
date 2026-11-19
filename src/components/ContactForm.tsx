"use client";

import { useActionState, useState } from "react";
import { CheckCircle2, Loader2, Send, TriangleAlert } from "lucide-react";
import { sendContactMessage, type ContactState } from "@/app/contact/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const initialState: ContactState = { status: "idle" };

function FieldError({ id, message }: { id: string; message?: string }) {
    if (!message) return null;
    return (
        <p id={id} className="text-sm text-destructive">
            {message}
        </p>
    );
}

export default function ContactForm() {
    const [state, formAction, pending] = useActionState(sendContactMessage, initialState);
    // Captured once on mount; the server rejects submissions that arrive implausibly fast.
    const [startedAt] = useState(() => Date.now());
    const errors = state.fieldErrors ?? {};

    if (state.status === "success") {
        return (
            <div
                role="status"
                className="flex flex-col items-center gap-3 rounded-xl border border-primary/40 bg-card p-10 text-center"
            >
                <CheckCircle2 className="size-10 text-primary" />
                <p className="font-display text-xl font-bold">Message sent</p>
                <p className="text-muted-foreground">{state.message}</p>
            </div>
        );
    }

    return (
        <form action={formAction} className="space-y-5 rounded-xl border border-border bg-card p-6 md:p-8" noValidate>
            {/* Honeypot: hidden from people and assistive tech, often filled by bots. */}
            <div aria-hidden className="absolute -left-[10000px] h-px w-px overflow-hidden">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <input type="hidden" name="startedAt" value={startedAt} />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                        Name
                    </label>
                    <Input
                        id="name"
                        name="name"
                        autoComplete="name"
                        required
                        placeholder="Your name"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    <FieldError id="name-error" message={errors.name} />
                </div>
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                        Email
                    </label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        placeholder="you@company.com"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    <FieldError id="email-error" message={errors.email} />
                </div>
            </div>
            <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium">
                    Company <span className="text-muted-foreground">(optional)</span>
                </label>
                <Input id="company" name="company" autoComplete="organization" placeholder="Where you work" />
            </div>
            <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                </label>
                <Input
                    id="subject"
                    name="subject"
                    required
                    placeholder="Senior Full-Stack Engineer role, interview request…"
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={errors.subject ? "subject-error" : undefined}
                />
                <FieldError id="subject-error" message={errors.subject} />
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
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : undefined}
                />
                <FieldError id="message-error" message={errors.message} />
            </div>

            {state.status === "error" && state.message && (
                <p
                    role="alert"
                    className={cn("flex gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm")}
                >
                    <TriangleAlert className="mt-0.5 size-4 shrink-0 text-destructive" />
                    <span>{state.message}</span>
                </p>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={pending}>
                {pending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                {pending ? "Sending…" : "Send message"}
            </Button>
            <p className="text-center text-xs text-muted-foreground">I usually reply within a day.</p>
        </form>
    );
}
