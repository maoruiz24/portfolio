"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    as?: "div" | "li" | "section";
}

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Fades content up once when it scrolls into view. Lets pages stay Server Components.
 *
 * Content is visible by default: the server HTML never hides anything, so the page reads
 * correctly without JavaScript, in print, in screenshots and for crawlers. Only elements
 * that start below the fold are hidden (before the first paint) and then revealed.
 * With "reduce motion" on, nothing is hidden or animated.
 */
export default function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
    const Component = motion[as];
    const ref = useRef<HTMLElement>(null);
    const reduceMotion = useReducedMotion();
    const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
    const [armed, setArmed] = useState(false);

    useIsomorphicLayoutEffect(() => {
        if (reduceMotion || !ref.current) return;
        if (ref.current.getBoundingClientRect().top > window.innerHeight) setArmed(true);
    }, [reduceMotion]);

    const hidden = armed && !inView;

    return (
        <Component
            // eslint-disable-next-line @typescript-eslint/no-explicit-any -- motion[as] refs differ per tag
            ref={ref as any}
            className={cn(className)}
            initial={false}
            animate={hidden ? { opacity: 0, y: 14 } : { opacity: 1, y: 0 }}
            transition={hidden ? { duration: 0 } : { duration: 0.45, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
            {children}
        </Component>
    );
}
