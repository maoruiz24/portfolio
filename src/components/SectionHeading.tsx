import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    className?: string;
    centered?: boolean;
    as?: "h1" | "h2";
}

export default function SectionHeading({
    eyebrow,
    title,
    subtitle,
    className,
    centered = false,
    as: Heading = "h2",
}: SectionHeadingProps) {
    return (
        <Reveal className={cn("mb-12 max-w-3xl space-y-4", centered && "mx-auto text-center", className)}>
            {eyebrow && <p className="eyebrow">{`// ${eyebrow}`}</p>}
            <Heading
                className={cn(
                    "font-display font-bold tracking-tight text-balance",
                    Heading === "h1" ? "text-4xl md:text-6xl" : "text-3xl md:text-5xl"
                )}
            >
                {title}
            </Heading>
            {subtitle && <p className="text-lg text-muted-foreground text-pretty md:text-xl">{subtitle}</p>}
        </Reveal>
    );
}
