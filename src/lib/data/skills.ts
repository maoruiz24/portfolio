export interface Skill {
    name: string;
    category: "Frontend" | "Mobile" | "Backend" | "Data" | "Cloud/DevOps" | "Quality/Process";
    badges: string[];
    proof: string;
}

export const skills: Skill[] = [
    {
        name: "Frontend",
        category: "Frontend",
        badges: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
        proof: "Modern UI systems with high accessibility and performance (A11y, Core Web Vitals).",
    },
    {
        name: "Mobile",
        category: "Mobile",
        badges: ["React Native", "Expo", "iOS", "Android"],
        proof: "Cross-platform engineering for high-traffic apps (10,000+ concurrent users).",
    },
    {
        name: "Backend",
        category: "Backend",
        badges: [".NET Core", "Node.js", "C#", "REST APIs", "Microservices"],
        proof: "Scalable architecture with multi-tenant isolation and subdomain-based routing.",
    },
    {
        name: "Data",
        category: "Data",
        badges: ["PostgreSQL", "MongoDB", "SQL Server", "Prisma", "Redis"],
        proof: "Designing complex multi-schema databases and distributed caching layers.",
    },
    {
        name: "Cloud/DevOps",
        category: "Cloud/DevOps",
        badges: ["Azure", "AWS", "Docker", "Kubernetes", "CI/CD"],
        proof: "Cost-aware scaling from homelab to cloud environments.",
    },
    {
        name: "Quality/Process",
        category: "Quality/Process",
        badges: ["Jest", "Scrum", "Azure DevOps", "Observability"],
        proof: "Impact-driven delivery with 35% improvement in time-to-market.",
    },
];
