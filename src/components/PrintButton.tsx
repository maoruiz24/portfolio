"use client";

import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrintButton() {
    return (
        <Button size="sm" variant="outline" onClick={() => window.print()}>
            <Printer className="size-4" /> Print
        </Button>
    );
}
