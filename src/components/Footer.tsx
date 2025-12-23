import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t bg-background/50 backdrop-blur-sm py-12">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="md:col-span-2 space-y-4">
                        <h3 className="text-xl font-bold tracking-tight">{siteConfig.name}</h3>
                        <p className="text-muted-foreground max-w-sm">
                            Senior Full-Stack Engineer specializing in scalable SaaS, high-performance web systems, and cloud architecture.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
                            <li><Link href="/projects" className="text-muted-foreground hover:text-primary transition-colors">Projects</Link></li>
                            <li><Link href="/experience" className="text-muted-foreground hover:text-primary transition-colors">Experience</Link></li>
                            <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Connect</h4>
                        <div className="flex space-x-4">
                            <a href={siteConfig.links.github} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                <Github className="h-5 w-5" />
                            </a>
                            <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </a>
                            <a href={siteConfig.links.email} className="text-muted-foreground hover:text-primary transition-colors">
                                <Mail className="h-5 w-5" />
                            </a>
                        </div>
                        <p className="mt-4 text-sm text-muted-foreground">
                            Mississauga, ON, Canada
                        </p>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
                    <p>© {currentYear} {siteConfig.name}. All rights reserved.</p>
                    <p className="mt-2 md:mt-0">Built with Next.js, TypeScript, and Framer Motion.</p>
                </div>
            </div>
        </footer>
    );
}
