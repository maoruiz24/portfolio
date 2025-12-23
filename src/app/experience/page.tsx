"use client";

import SectionHeading from "@/components/SectionHeading";
import Timeline from "@/components/Timeline";
import { experiences } from "@/lib/data/experience";
import { siteConfig } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Layers, Zap, Database, Globe, Shield, Terminal } from "lucide-react";

const competencies = [
    { icon: Globe, label: "Full-Stack Delivery" },
    { icon: Zap, label: "Performance Tuning" },
    { icon: Database, label: "Scalable APIs" },
    { icon: Layers, label: "Cloud Readiness" },
    { icon: Shield, label: "Multi-tenant Design" },
    { icon: Terminal, label: "Team Leadership" },
];

export default function ExperiencePage() {
    return (
        <div className="container mx-auto px-4 md:px-8 py-24">
            <SectionHeading
                title="Experience"
                subtitle="A snapshot of my professional journey and the impact I've made across different industries."
            />

            {/* Competencies Summary */}
            <div className="mb-24">
                <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                    <Terminal className="h-5 w-5 text-primary" />
                    Core Competencies
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {competencies.map((item) => (
                        <Card key={item.label} className="bg-card/50 border-muted/50 hover:border-primary/30 transition-colors py-6 text-center">
                            <CardContent className="p-0 space-y-3">
                                <div className="mx-auto w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                    <item.icon className="h-6 w-6 text-primary" />
                                </div>
                                <p className="text-sm font-bold tracking-tight">{item.label}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Timeline */}
            <Timeline experiences={experiences} />

            {/* Education Section */}
            <div className="mt-32">
                <SectionHeading
                    title="Education"
                    subtitle="Foundations in engineering and management."
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="bg-card/50 border-muted/50 p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold">Specialization in Project Management</h3>
                                <p className="text-muted-foreground">Universidad EAN</p>
                            </div>
                            <Badge variant="secondary">2016</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Focused on software delivery lifecycles, resource optimization, and strategic alignment.</p>
                    </Card>
                    <Card className="bg-card/50 border-muted/50 p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold">BSc Systems Engineering</h3>
                                <p className="text-muted-foreground">Universidad Central</p>
                            </div>
                            <Badge variant="secondary">2013</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Core computer science foundations, algorithms, data structures, and software architecture.</p>
                    </Card>
                </div>
            </div>
        </div>
    );
}
