export interface SkillGroup {
    name: string;
    /** lucide icon name rendered by the SkillsGrid component. */
    icon: "brain" | "bot" | "server" | "layout" | "database" | "cloud" | "check";
    highlight?: boolean;
    items: string[];
    proof: string;
}

export const skillGroups: SkillGroup[] = [
    {
        name: "AI Engineering",
        icon: "brain",
        highlight: true,
        items: [
            "LLM application design",
            "Agents & tool use",
            "RAG (pgvector, embeddings)",
            "Structured outputs (Zod / Pydantic)",
            "LLM-as-judge review",
            "Human-in-the-loop workflows",
            "Multi-provider routing & fallback",
            "Token & cost tracking",
            "STT / TTS pipelines",
            "Prompt versioning",
            "Anthropic Claude · OpenAI · Gemini · Groq",
            "Vercel AI SDK",
        ],
        proof: "LLM gateway with circuit breakers, gated generation pipelines and speech evaluation — see the R&D lab.",
    },
    {
        name: "AI-Assisted Development",
        icon: "bot",
        highlight: true,
        items: [
            "Claude Code",
            "Custom subagents",
            "Skills & slash commands",
            "MCP servers",
            "Spec-driven development",
            "Multi-agent code review",
            "Persistent agent memory (Engram)",
            "CLAUDE.md / AGENTS.md",
        ],
        proof: "9 custom subagents migrating a production .NET backend at work; a full SDD pipeline in my own projects.",
    },
    {
        name: "Backend & Architecture",
        icon: "server",
        items: [
            "C# / .NET 10",
            "ASP.NET Core",
            "Clean Architecture · CQRS",
            "Node.js · NestJS",
            "Python · FastAPI",
            "Go (services)",
            "REST APIs · JWT",
            "Microservices · Modular monoliths",
            "Queues: BullMQ · pg-boss · Dramatiq",
            "Hexagonal architecture · ADRs",
        ],
        proof: "Three independent .NET 10 APIs with 96 tests; hexagonal modular monoliths in TypeScript and Python.",
    },
    {
        name: "Frontend & Mobile",
        icon: "layout",
        items: [
            "React · Next.js",
            "TypeScript",
            "React Native · Expo / EAS",
            "Redux Toolkit · TanStack Query · Zustand",
            "Tailwind CSS · shadcn/ui",
            "DevExtreme · jQuery",
            "Offline-first mobile",
        ],
        proof: "45 store releases of a driver app with offline-first sync and background GPS.",
    },
    {
        name: "Data",
        icon: "database",
        items: [
            "SQL Server · T-SQL",
            "PostgreSQL · pgvector",
            "Prisma · Dapper · EF Core",
            "MongoDB",
            "Redis",
            "Oracle",
            "Safe data migrations & rollbacks",
        ],
        proof: "Production WMS data repairs shipped with backups and rollback scripts.",
    },
    {
        name: "Cloud & Platform",
        icon: "cloud",
        items: [
            "Docker",
            "Kubernetes (k3s)",
            "GitHub Actions · Azure DevOps",
            "Traefik · cert-manager",
            "Azure · AWS",
            "Firebase",
            "MinIO / S3",
            "Observability (Crashlytics, Serilog, ELK)",
        ],
        proof: "A self-hosted 3-node k3s cluster that deploys this site on every push.",
    },
    {
        name: "Quality & Leadership",
        icon: "check",
        items: [
            "xUnit · Vitest · Jest · Playwright",
            "Code review",
            "Technical leadership",
            "Mentoring",
            "Scrum",
            "Project management (specialization)",
        ],
        proof: "Led a Telefónica delivery team at Indra and built its QA function.",
    },
];
