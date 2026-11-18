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
        company: "Nology Solutions & Systems Inc.",
        role: "Senior Software Developer",
        location: "Mississauga, ON, Canada",
        period: "Apr 2022 – Present",
        context:
            "Maker of DeliverySuite, a multi-tenant logistics SaaS for transportation management, warehouse operations and driver workflows.",
        summary:
            "Main developer across backend, database, web and mobile for a production logistics SaaS used by ~200 business customers — modernizing it to .NET 10 and bringing AI-assisted engineering into the workflow.",
        bullets: [
            "Maintain and modernize DeliverySuite, a multi-tenant logistics SaaS (TMS, WMS and driver workflows) supporting ~200 business customers; 1,250+ commits across C#/ASP.NET, SQL Server, jQuery/DevExtreme and React Native.",
            "Cut selected critical page loads from ~12–18 s to 2–3 s through SQL Server stored-procedure optimization, indexing, database tuning, backend changes and UI modernization.",
            "Architected and built the DeliverySuite Driver app from the ground up (React Native, Expo, .NET), published on the App Store and Google Play with ~500–1,000 recurring users: pickup/delivery workflows, barcode scanning, photo and signature proof of delivery, GPS tracking, push notifications and offline operation.",
            "Designed a persistent SQLite-backed sync mechanism that replaced capped in-memory queues with durable storage and server-acknowledged processing, improving reliability on unstable networks.",
            "Designing three independently deployable .NET 10 APIs (Web/Public, Driver, WMS) with Clean Architecture, CQRS, Dapper, JWT and automated xUnit tests — an incremental, ongoing modernization that preserves legacy contracts.",
            "Rebuilt WMS inbound/outbound flows (FIFO allocation, lot/serial tracking, transactional shipping) and corrected inventory inconsistencies through controlled database changes with backups and rollback scripts.",
            "Designed AI-assisted development workflows in Claude Code — custom subagents, skills and commands, MCP integrations and persistent project memory — for structured legacy migration and debugging (engineering workflow, not customer-facing AI).",
            "Introduced structured Git source control and Azure DevOps workflows, and replaced Crystal Reports with a template-driven HTML/PDF engine that needs no C# changes per report.",
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
            "Designed and built enterprise platforms for a national telecom — from customer self-service apps and backend microservices to the company CRM — and shaped architecture decisions.",
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
