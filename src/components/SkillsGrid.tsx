"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { skills } from "@/lib/data/skills";
import { staggerContainer, sectionReveal } from "@/lib/motion";

export default function SkillsGrid() {
    return (
        <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
            {skills.map((skill, index) => (
                <motion.div key={skill.name} variants={sectionReveal}>
                    <Card className="h-full border-muted/20 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all group">
                        <CardHeader>
                            <CardTitle className="text-xl font-bold flex items-center justify-between">
                                {skill.name}
                                <div className="h-1.5 w-8 bg-primary/20 group-hover:bg-primary transition-colors rounded-full" />
                            </CardTitle>
                            <CardDescription className="text-sm font-medium text-primary mb-2">
                                {skill.proof}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {skill.badges.map((badge) => (
                                    <Badge key={badge} variant="secondary" className="bg-secondary/50">
                                        {badge}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </motion.div>
    );
}
