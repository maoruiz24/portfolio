"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Project } from "@/lib/data/projects";

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
        >
            <Link href={`/projects/${project.slug}`}>
                <Card className="overflow-hidden h-full border-muted/20 bg-card/50 backdrop-blur-sm group hover:border-primary/50 transition-colors">
                    <div className="relative aspect-video overflow-hidden">
                        {/* Placeholder image logic since I don't have real images yet */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center text-primary/40 font-bold text-2xl">
                            {project.title}
                        </div>
                        {/* If I had images: 
            <Image 
              src={project.image} 
              alt={project.title} 
              fill 
              className="object-cover transition-transform group-hover:scale-105"
            /> 
            */}
                    </div>
                    <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                                {project.category}
                            </Badge>
                            <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                            {project.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2 text-base">
                            {project.description}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.slice(0, 4).map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                </Badge>
                            ))}
                            {project.tags.length > 4 && (
                                <span className="text-xs text-muted-foreground self-center">
                                    +{project.tags.length - 4} more
                                </span>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </Link>
        </motion.div>
    );
}
