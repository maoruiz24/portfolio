/**
 * Skills, grouped by category.
 * - `items`: used in professional, production work (Nology, ETB, Indra) or daily engineering practice.
 * - `lab`: used only in personal R&D projects — shown separately so nothing implies production
 *   experience that doesn't exist.
 */
export interface SkillGroup {
    name: string;
    /** lucide icon name rendered by the SkillsGrid component. */
    icon: "server" | "network" | "database" | "layout" | "cloud" | "bot" | "check";
    highlight?: boolean;
    items: string[];
    lab?: string[];
    proof: string;
}

export const skillGroups: SkillGroup[] = [
    {
        name: "Backend",
        icon: "server",
        highlight: true,
        items: [".NET / C#", "ASP.NET Core · Web API", "Node.js", "TypeScript", "REST APIs", "SQL stored procedures", "Java (earlier career)"],
        lab: ["NestJS", "Python · FastAPI", "Go"],
        proof: "Three independently deployable .NET 10 APIs with 90+ tests at Nology; Node.js microservices at ETB.",
    },
    {
        name: "Architecture",
        icon: "network",
        items: [
            "Enterprise SaaS",
            "Multi-tenancy",
            "API design",
            "Clean Architecture · CQRS",
            "Microservices",
            "Legacy modernization",
            "Offline-first sync",
        ],
        lab: ["Event-driven (NATS, job queues)", "Hexagonal modular monoliths", "ADRs"],
        proof: "Incremental modernization of a multi-tenant logistics SaaS serving ~200 business customers.",
    },
    {
        name: "Data",
        icon: "database",
        items: ["SQL Server · T-SQL", "Query & index optimization", "Transactions & data integrity", "Oracle", "MongoDB", "SQLite (mobile)"],
        lab: ["PostgreSQL", "Redis", "pgvector · PostGIS", "Prisma"],
        proof: "Selected critical pages from ~12–18 s to 2–3 s through stored-procedure and index tuning.",
    },
    {
        name: "Frontend & Mobile",
        icon: "layout",
        items: ["React", "React Native", "Expo / EAS", "JavaScript · TypeScript", "Redux Toolkit", "jQuery · DevExtreme", "Xamarin (earlier career)"],
        lab: ["Next.js", "TanStack Query · Zustand", "Tailwind CSS"],
        proof: "A driver app built from the ground up, released continuously on both stores since 2023.",
    },
    {
        name: "Cloud & Delivery",
        icon: "cloud",
        items: ["Azure", "AWS", "Docker", "Kubernetes", "Git · Azure DevOps", "CI/CD", "Expo EAS", "Firebase"],
        lab: ["k3s · Proxmox", "OPNsense", "GitHub Actions", "Traefik · cert-manager", "MinIO / S3", "Prometheus"],
        proof: "Kubernetes microservices on Azure at ETB; a self-hosted Proxmox + k3s platform for my R&D work.",
    },
    {
        name: "AI Engineering",
        icon: "bot",
        highlight: true,
        items: ["Claude Code", "Codex", "Custom subagents & skills", "MCP integrations", "Agent workflows", "AI-assisted debugging & migration"],
        lab: ["LLM APIs (Anthropic, OpenAI, Gemini, Groq)", "RAG (pgvector)", "Structured outputs", "LLM-as-judge review", "STT / TTS"],
        proof: "AI-assisted legacy migration at work; LLM features with fallback chains and human review in R&D products.",
    },
    {
        name: "Quality & Leadership",
        icon: "check",
        items: ["xUnit · Jest", "Code review", "Technical leadership", "Mentoring", "QA processes", "Scrum"],
        lab: ["Playwright · Vitest", "k6 load testing"],
        proof: "Led a Telefónica delivery team at Indra and built its QA function.",
    },
];
