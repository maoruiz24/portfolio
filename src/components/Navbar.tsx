"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Download, Menu } from "lucide-react";
import { Github, Linkedin } from "@/components/brand-icons";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Work", href: "/projects" },
    { name: "Experience", href: "/experience" },
    { name: "About", href: "/about" },
    { name: "Résumé", href: "/resume" },
    { name: "Contact", href: "/contact" },
];

function isActive(pathname: string, href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
}

export default function Navbar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/75 backdrop-blur-md print:hidden">
            <div className="container-page flex h-16 items-center justify-between">
                <Link href="/" className="group flex items-center gap-2 font-mono text-sm" aria-label={siteConfig.name + " — home"}>
                    <span className="flex size-8 items-center justify-center rounded-md bg-primary font-bold text-primary-foreground">
                        IR
                    </span>
                    <span className="text-muted-foreground transition-colors group-hover:text-foreground">
                        {siteConfig.shortName}
                        <span className="text-primary">.dev</span>
                    </span>
                </Link>

                <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
                    {navItems.map((item) => {
                        const active = isActive(pathname, item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                aria-current={active ? "page" : undefined}
                                className={cn(
                                    "relative rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-foreground",
                                    active ? "text-foreground" : "text-muted-foreground"
                                )}
                            >
                                {active && (
                                    <motion.span
                                        layoutId="nav-pill"
                                        className="absolute inset-0 -z-10 rounded-md bg-muted"
                                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                                    />
                                )}
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="hidden items-center gap-1 md:flex">
                    <Button variant="ghost" size="icon" asChild>
                        <a href={siteConfig.links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                            <Github className="size-5" />
                        </a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                        <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                            <Linkedin className="size-5" />
                        </a>
                    </Button>
                    <ThemeToggle />
                    <Button size="sm" className="ml-2" asChild>
                        <a href={siteConfig.resumePdf} download>
                            <Download className="size-4" />
                            Résumé
                        </a>
                    </Button>
                </div>

                <div className="flex items-center gap-1 md:hidden">
                    <ThemeToggle />
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" aria-label="Open menu">
                                <Menu className="size-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="flex flex-col gap-0 p-6">
                            <SheetTitle className="font-mono text-sm text-muted-foreground">
                                {siteConfig.shortName}
                                <span className="text-primary">.dev</span>
                            </SheetTitle>
                            <nav aria-label="Mobile" className="mt-10 flex flex-col gap-2">
                                {[{ name: "Home", href: "/" }, ...navItems].map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setOpen(false)}
                                        className={cn(
                                            "rounded-md px-3 py-2 text-lg font-medium transition-colors hover:bg-muted",
                                            isActive(pathname, item.href) ? "text-primary" : "text-muted-foreground"
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                            <div className="mt-auto space-y-4">
                                <Button className="w-full" asChild>
                                    <a href={siteConfig.resumePdf} download>
                                        <Download className="size-4" />
                                        Download résumé
                                    </a>
                                </Button>
                                <div className="flex justify-center gap-2">
                                    <Button variant="ghost" size="icon" asChild>
                                        <a href={siteConfig.links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                                            <Github className="size-5" />
                                        </a>
                                    </Button>
                                    <Button variant="ghost" size="icon" asChild>
                                        <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                                            <Linkedin className="size-5" />
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
