import { Variants } from "framer-motion";

export const fadeIn: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
};

export const staggerContainer = (staggerChildren: number, delayChildren = 0): Variants => ({
    initial: {},
    animate: {
        transition: {
            staggerChildren,
            delayChildren,
        },
    },
});

export const slideIn = (direction: "left" | "right" | "up" | "down", type: any, delay: number, duration: number): Variants => ({
    hidden: {
        x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
        y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0,
    },
    show: {
        x: 0,
        y: 0,
        transition: {
            type,
            delay,
            duration,
            ease: "easeOut",
        },
    },
});

export const sectionReveal: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.21, 0.47, 0.32, 0.98]
        }
    },
};
