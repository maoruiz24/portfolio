import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProjectNotFound() {
    return (
        <div className="container mx-auto px-4 py-24 min-h-[60vh] flex flex-col items-center justify-center text-center">
            <div className="space-y-6 max-w-md">
                <h1 className="text-6xl font-bold text-primary">404</h1>
                <h2 className="text-3xl font-bold">Project Not Found</h2>
                <p className="text-muted-foreground">
                    The project you're looking for doesn't exist or has been moved.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                    <Button asChild variant="default">
                        <Link href="/projects">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Projects
                        </Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/">
                            <Home className="mr-2 h-4 w-4" />
                            Home
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
