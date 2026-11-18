"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    as?: "div" | "li" | "section";
}

/** Fades content up once when it scrolls into view. Lets pages stay Server Components. */
export default function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
    const Component = motion[as];
    return (
        <Component
            className={cn(className)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
            {children}
        </Component>
    );
}
