export interface Experience {
    company: string;
    role: string;
    location: string;
    period: string;
    /** One-line description of the company / context. */
    context: string;
    /** Short pitch shown on cards and timeline headers. */
    summary: string;
    /** Achievement bullets — used on the site and in the résumé. */
    bullets: string[];
    stack: string[];
}

export const experiences: Experience[] = [
    {
        company: "Nology Solutions",
        role: "Senior Software Developer",
        location: "Mississauga, ON, Canada",
        period: "Apr 2022 – Present",
        context:
            "Maker of DeliverySuite, a multi-tenant logistics SaaS: courier/last-mile TMS, WMS and a driver mobile app.",
        summary:
            "Lead developer across web, mobile, API and database for a production logistics SaaS — and the person who brought agentic AI into the team's engineering workflow.",
        bullets: [
            "Own and modernize a multi-tenant logistics SaaS (TMS + WMS) used by dispatchers, billing staff and warehouse teams at carrier companies: 1,250+ commits across ASP.NET, jQuery/DevExtreme, SQL Server and React Native.",
            "Built an AI-assisted legacy-migration workflow in Claude Code — 9 custom subagents, repo skills, slash commands, a SQL Server MCP connection and persistent memory (Engram MCP) — that ports legacy handlers operation by operation into .NET 10 with tests.",
            "Architected three independently deployable .NET 10 Clean Architecture APIs (CQRS, MediatR, Dapper, JWT) with 96 xUnit tests, preserving legacy contracts so the shipped mobile app keeps working.",
            "Built and shipped the DeliverySuite Driver app (React Native/Expo) to the App Store and Google Play: 45 releases from v1.0 to v1.7.6, 7 Expo SDK upgrades, proof of delivery, barcode scanning and background GPS.",
            "Designed an offline-first SQLite outbox that replaced two capped in-memory queues (250/200 items) that silently dropped driver actions and GPS points — rows are deleted only on server confirmation.",
            "Rebuilt WMS inbound/outbound order flows (FIFO allocation, lot/serial handling, kit validation, transactional shipping), fixed an inventory-availability defect and repaired 190+ inconsistent records, each with backup and rollback scripts.",
            "Replaced Crystal Reports with a template-driven HTML/PDF engine (Handlebars, Paged.js, headless-browser rendering): new reports need zero C# changes.",
            "Traced a 14-second UI freeze to ~500 forced browser layouts and shipped targeted fixes; earlier optimization work made the core SaaS ~35% faster.",
        ],
        stack: [
            "C#",
            ".NET 10",
            "ASP.NET",
            "SQL Server",
            "React Native",
            "Expo",
            "TypeScript",
            "DevExtreme",
            "Firebase",
            "Claude Code",
            "MCP",
            "Azure DevOps",
        ],
    },
    {
        company: "ETB",
        role: "Senior Software Engineer",
        location: "Bogotá, Colombia",
        period: "Nov 2013 – Nov 2021",
        context:
            "Colombia's oldest telecommunications company: fiber, 4G, digital TV and enterprise telco services nationwide.",
        summary:
            "Designed customer-facing and internal platforms for millions of telecom customers, from mobile self-service to the company CRM.",
        bullets: [
            "Redesigned the customer self-service platform (React Native, React, Redux, Node.js, MongoDB) to support ~10,000 concurrent users, raising customer satisfaction by 25%.",
            "Designed and built the company CRM (C# MVC, MongoDB) over two years — cut training time, increased fiber-installation effectiveness by 50% and contributed to a 30% sales increase.",
            "Helped implement a Node.js microservices backend on Kubernetes (Azure) connecting front ends with Azure Blob Storage and enterprise web services.",
            "Built a Xamarin app that let field technicians manage customer schedules and appointments.",
            "Selected infrastructure for new applications through proofs of concept and documented architecture decisions for the company's project portfolio.",
        ],
        stack: ["C#", ".NET", "React", "React Native", "Node.js", "MongoDB", "Azure", "Kubernetes", "Xamarin"],
    },
    {
        company: "Indra Colombia",
        role: "Technical Leader",
        location: "Bogotá, Colombia",
        period: "Feb 2009 – Oct 2013",
        context: "Multinational technology and consulting company.",
        summary:
            "Led the development team serving Telefónica, owning delivery, quality and mentoring.",
        bullets: [
            "Directed the development team for the Telefónica account, reducing time-to-market and cutting development costs by 35%.",
            "Built and maintained 80+ production applications and features in .NET, Java, Unix processes, SQL Server and Oracle that powered the client's sales processes.",
            "Created a QA team that reduced the client's testing time, and trained developers on new technologies.",
        ],
        stack: [".NET", "Java", "SQL Server", "Oracle", "Unix"],
    },
];
