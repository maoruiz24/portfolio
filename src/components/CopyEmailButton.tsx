"use client";

import { useState } from "react";
import { Copy, Check, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export default function CopyEmailButton() {
    const [copied, setCopied] = useState(false);

    const copyEmail = () => {
        navigator.clipboard.writeText(siteConfig.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col sm:flex-row items-center gap-4 bg-muted/30 p-4 rounded-xl border border-muted/50">
            <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                    <p className="text-xs text-muted-foreground uppercase font-semibold">Ready to chat?</p>
                    <p className="font-medium">{siteConfig.email}</p>
                </div>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
                <Button
                    variant="secondary"
                    onClick={copyEmail}
                    className="flex-1 sm:flex-initial"
                >
                    {copied ? (
                        <>
                            <Check className="mr-2 h-4 w-4" />
                            Copied
                        </>
                    ) : (
                        <>
                            <Copy className="mr-2 h-4 w-4" />
                            Copy Email
                        </>
                    )}
                </Button>
                <Button asChild className="flex-1 sm:flex-initial">
                    <a href={siteConfig.links.email}>Send Message</a>
                </Button>
            </div>
        </div>
    );
}
