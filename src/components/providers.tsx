"use client";

import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "@/components/theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            {/* Honors the OS "reduce motion" setting for every framer-motion animation. */}
            <MotionConfig reducedMotion="user">{children}</MotionConfig>
        </ThemeProvider>
    );
}
