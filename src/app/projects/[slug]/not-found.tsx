import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProjectNotFound() {
    return (
        <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
            <p className="eyebrow">{"// 404"}</p>
            <h1 className="mt-4 font-display text-4xl font-bold md:text-5xl">Project not found</h1>
            <p className="mt-4 max-w-md text-muted-foreground">
                The project you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <Button asChild className="mt-8">
                <Link href="/projects">
                    <ArrowLeft className="size-4" /> Back to projects
                </Link>
            </Button>
        </div>
    );
}
