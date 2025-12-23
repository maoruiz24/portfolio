"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Experience", href: "/experience" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-xl font-bold font-display tracking-tight hover:text-primary transition-colors">
                        {siteConfig.name}
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary relative py-1",
                                pathname === item.href ? "text-primary" : "text-muted-foreground"
                            )}
                        >
                            {item.name}
                            {pathname === item.href && (
                                <motion.div
                                    layoutId="nav-underline"
                                    className="absolute bottom-0 left-0 h-0.5 w-full bg-primary"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                        </Link>
                    ))}
                    <div className="flex items-center space-x-4 ml-4 border-l pl-8">
                        <a href={siteConfig.links.github} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary">
                            <Github className="h-5 w-5" />
                        </a>
                        <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary">
                            <Linkedin className="h-5 w-5" />
                        </a>
                    </div>
                </nav>

                {/* Mobile Nav */}
                <div className="md:hidden">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="flex flex-col">
                            <div className="flex flex-col space-y-6 mt-12">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "text-lg font-medium transition-colors hover:text-primary",
                                            pathname === item.href ? "text-primary" : "text-muted-foreground"
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="flex items-center space-x-6 mt-auto pb-8">
                                <a href={siteConfig.links.github} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary">
                                    <Github className="h-6 w-6" />
                                </a>
                                <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary">
                                    <Linkedin className="h-6 w-6" />
                                </a>
                                <a href={siteConfig.links.email} className="text-muted-foreground hover:text-primary">
                                    <Mail className="h-6 w-6" />
                                </a>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
