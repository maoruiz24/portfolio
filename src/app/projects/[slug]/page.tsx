import { notFound } from "next/navigation";
import { projects } from "@/lib/data/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import { ArrowLeft, Calendar, Tag, Layers, Database, Zap, Lightbulb, Briefcase } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export async function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) return { title: "Project Not Found" };

    return {
        title: project.title,
        description: project.description,
    };
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
    const project = projects.find((p) => p.slug === params.slug);

    if (!project) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 md:px-8 py-24">
            <Link
                href="/projects"
                className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-12 group"
            >
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to projects
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="lg:col-span-2 space-y-12">
                    {/* Header */}
                    <section>
                        <div className="flex flex-wrap gap-2 mb-6">
                            <Badge variant="secondary" className="bg-primary/10 text-primary">{project.category}</Badge>
                            <Badge variant="outline">{project.year}</Badge>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold font-display tracking-tight mb-6">
                            {project.title}
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            {project.longDescription}
                        </p>
                    </section>

                    {/* Featured Image */}
                    <div className="aspect-video relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 to-purple-500/10 border border-muted/20">
                        <div className="absolute inset-0 flex items-center justify-center text-primary/20 font-bold text-4xl">
                            PROJECT SHOWCASE
                        </div>
                        {/* 
             <Image 
                src={project.image} 
                alt={project.title} 
                fill 
                className="object-cover"
             />
             */}
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <Layers className="h-6 w-6 text-primary" />
                                The Problem
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {project.problem}
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <Database className="h-6 w-6 text-primary" />
                                Our Approach
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {project.approach}
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <Zap className="h-6 w-6 text-primary" />
                                Impact & Outcomes
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {project.impact}
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <Lightbulb className="h-6 w-6 text-primary" />
                                What I Learned
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {project.learning}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <div className="sticky top-32 space-y-8">
                        <div className="p-8 rounded-3xl bg-muted/30 border border-muted/50 space-y-6">
                            <div>
                                <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Tech Stack</h4>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map(tag => (
                                        <Badge key={tag} variant="secondary" className="bg-background">{tag}</Badge>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-6 border-t border-muted/50">
                                <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Role</h4>
                                <p className="font-medium flex items-center gap-2">
                                    <Briefcase className="h-4 w-4 text-primary" />
                                    Senior Full-Stack Engineer
                                </p>
                            </div>

                            <div className="pt-6 border-t border-muted/50">
                                <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Date</h4>
                                <p className="font-medium flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-primary" />
                                    {project.year}
                                </p>
                            </div>

                            <Button className="w-full h-12 text-lg" disabled>
                                Live Demo Soon
                            </Button>
                        </div>

                        <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10 space-y-4">
                            <h4 className="font-bold">Interested in the tech?</h4>
                            <p className="text-sm text-muted-foreground">
                                I'm happy to discuss the architecture and trade-offs of this project.
                            </p>
                            <Button asChild variant="link" className="p-0 h-auto">
                                <Link href="/contact" className="flex items-center text-primary">
                                    Get in touch <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
