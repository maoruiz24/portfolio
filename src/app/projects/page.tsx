"use client";

import { useState, useMemo } from "react";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/data/projects";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const ALL_TAGS = Array.from(new Set(projects.flatMap(p => p.tags))).sort();

export default function ProjectsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<"Recent" | "Impact" | "A-Z">("Recent");

    const filteredProjects = useMemo(() => {
        return projects
            .filter((project) => {
                const matchesSearch =
                    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    project.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

                const matchesTag = !selectedTag || project.tags.includes(selectedTag);

                return matchesSearch && matchesTag;
            })
            .sort((a, b) => {
                if (sortBy === "A-Z") return a.title.localeCompare(b.title);
                if (sortBy === "Recent") return b.year.localeCompare(a.year);
                // "Impact" is subjective, for this demo we'll use a hidden impact score or just featured first
                if (sortBy === "Impact") {
                    if (a.featured && !b.featured) return -1;
                    if (!a.featured && b.featured) return 1;
                    return 0;
                }
                return 0;
            });
    }, [searchQuery, selectedTag, sortBy]);

    return (
        <div className="container mx-auto px-4 md:px-8 py-24">
            <SectionHeading
                title="Portfolio"
                subtitle="A collection of enterprise projects, SaaS platforms, and technical migrations I've led."
            />

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
                <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search projects, stack, or keywords..."
                        className="pl-10 h-12 bg-card/50"
                        value={searchQuery}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex w-full md:w-auto gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="flex-1 md:flex-none h-12 gap-2">
                                <SlidersHorizontal className="h-4 w-4" />
                                Sort: {sortBy}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSortBy("Recent")}>Most Recent</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSortBy("Impact")}>Impact</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSortBy("A-Z")}>A–Z</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Tag Cloud */}
            <div className="flex flex-wrap gap-2 mb-12">
                <Badge
                    variant={selectedTag === null ? "default" : "outline"}
                    className="cursor-pointer py-1.5 px-4 text-sm transition-all"
                    onClick={() => setSelectedTag(null)}
                >
                    All
                </Badge>
                {ALL_TAGS.map(tag => (
                    <Badge
                        key={tag}
                        variant={selectedTag === tag ? "default" : "outline"}
                        className="cursor-pointer py-1.5 px-4 text-sm transition-all"
                        onClick={() => setSelectedTag(tag)}
                    >
                        {tag}
                    </Badge>
                ))}
            </div>

            {/* Grid */}
            {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.slug} project={project} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-24 border border-dashed rounded-3xl">
                    <p className="text-xl text-muted-foreground">No projects found matching your criteria.</p>
                    <Button
                        variant="link"
                        onClick={() => { setSearchQuery(""); setSelectedTag(null); }}
                        className="mt-4"
                    >
                        Clear all filters
                    </Button>
                </div>
            )}
        </div>
    );
}
