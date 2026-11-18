"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export default function CopyEmailButton({ className }: { className?: string }) {
    const [copied, setCopied] = useState(false);

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(siteConfig.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            window.location.href = siteConfig.links.email;
        }
    };

    return (
        <Button variant="outline" size="lg" onClick={copyEmail} className={className} aria-live="polite">
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            {copied ? "Email copied" : siteConfig.email}
        </Button>
    );
}
