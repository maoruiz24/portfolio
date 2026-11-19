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
    const content = (
        <>
            {eyebrow && <p className="eyebrow">{`// ${eyebrow}`}</p>}
            <Heading
                className={cn(
                    "font-display font-bold leading-tight tracking-tight text-balance",
                    Heading === "h1" ? "text-[2.1rem] sm:text-4xl md:text-5xl" : "text-[1.7rem] sm:text-3xl md:text-4xl"
                )}
            >
                {title}
            </Heading>
            {subtitle && <p className="text-base text-muted-foreground text-pretty sm:text-lg">{subtitle}</p>}
        </>
    );
    const classes = cn("mb-8 max-w-3xl space-y-3 md:mb-10", centered && "mx-auto text-center", className);

    // Page titles render immediately: an h1 should never wait for an animation to become visible.
    if (Heading === "h1") return <div className={classes}>{content}</div>;
    return <Reveal className={classes}>{content}</Reveal>;
}
