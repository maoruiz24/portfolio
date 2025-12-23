"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-24">
            {/* Background decoration */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px]" />
            </div>

            <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider uppercase border border-primary/20 bg-primary/5 rounded-full text-primary">
                        Senior Full-Stack Engineer
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold font-display tracking-tight mb-6"
                >
                    I build scalable SaaS platforms—from <span className="text-gradient">UI to APIs to cloud.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed"
                >
                    End-to-end ownership. Focused on performance optimization, multi-tenant architectures, and reliable cloud delivery.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
                >
                    <Button asChild size="lg" className="h-12 px-8 text-lg font-medium group">
                        <Link href="/projects">
                            View Projects
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="h-12 px-8 text-lg font-medium">
                        <Link href="/contact">Contact Me</Link>
                    </Button>
                    <Button asChild variant="ghost" size="lg" className="h-12 px-8 text-lg font-medium">
                        <a href="/Resume-IvanRuiz.pdf" target="_blank">Download Resume</a>
                    </Button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex items-center justify-center space-x-8"
                >
                    <a href={siteConfig.links.github} target="_blank" rel="noreferrer" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                        <Github className="h-6 w-6" />
                        <span className="font-medium">GitHub</span>
                    </a>
                    <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                        <Linkedin className="h-6 w-6" />
                        <span className="font-medium">LinkedIn</span>
                    </a>
                    <a href={siteConfig.links.email} className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                        <Mail className="h-6 w-6" />
                        <span className="font-medium">Email</span>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
