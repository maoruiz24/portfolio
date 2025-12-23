"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { sectionReveal } from "@/lib/motion";

interface SectionHeadingProps {
    title: string;
    subtitle?: string;
    className?: string;
    centered?: boolean;
}

export default function SectionHeading({ title, subtitle, className, centered = false }: SectionHeadingProps) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionReveal}
            className={cn(
                "mb-12 space-y-4",
                centered && "text-center",
                className
            )}
        >
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight">
                {title}
            </h2>
            {subtitle && (
                <p className={cn(
                    "text-lg md:text-xl text-muted-foreground",
                    centered && "max-w-2xl mx-auto"
                )}>
                    {subtitle}
                </p>
            )}
            <div className={cn(
                "h-1.5 w-20 bg-primary rounded-full",
                centered && "mx-auto"
            )} />
        </motion.div>
    );
}
