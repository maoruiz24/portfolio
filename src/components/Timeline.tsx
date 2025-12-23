"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Experience } from "@/lib/data/experience";
import SectionHeading from "@/components/SectionHeading";
import { Briefcase, MapPin, Calendar, CheckCircle2 } from "lucide-react";

interface TimelineProps {
    experiences: Experience[];
}

export default function Timeline({ experiences }: TimelineProps) {
    return (
        <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary/30 before:to-transparent">
            {experiences.map((exp, index) => (
                <motion.div
                    key={`${exp.company}-${index}`}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                >
                    {/* Dot */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-primary bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        <Briefcase className="h-5 w-5 text-primary" />
                    </div>

                    {/* Content Card */}
                    <div className="w-[calc(100%-4rem)] md:w-[45%] p-4 md:p-6 rounded-xl border border-muted/20 bg-card/50 backdrop-blur-sm shadow-sm hover:border-primary/30 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                            <h3 className="text-xl font-bold">{exp.role}</h3>
                            <Badge variant="secondary" className="w-fit">{exp.period}</Badge>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                            <div className="flex items-center gap-1">
                                <Briefcase className="h-4 w-4" />
                                {exp.company}
                            </div>
                            <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {exp.location}
                            </div>
                        </div>

                        <ul className="space-y-3 mb-6">
                            {exp.bullets.map((bullet, i) => (
                                <li key={i} className="flex gap-3 text-sm md:text-base leading-relaxed text-muted-foreground">
                                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                    <span>{bullet}</span>
                                </li>
                            ))}
                        </ul>

                        {exp.impact && (
                            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                                <p className="text-sm font-semibold text-primary mb-1">Impact Callout</p>
                                <p className="text-sm italic text-foreground">{exp.impact}</p>
                            </div>
                        )}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
