export interface Project {
    slug: string;
    title: string;
    description: string;
    longDescription: string;
    category: "Web" | "Mobile" | "Backend" | "Full-Stack";
    tags: string[];
    image: string;
    problem: string;
    approach: string;
    impact: string;
    learning: string;
    featured: boolean;
    year: string;
}

export const projects: Project[] = [
    {
        slug: "multi-tenant-logistics-saas",
        title: "Multi-tenant Logistics SaaS Platform",
        description: "Enterprise-grade TMS with subdomain-based routing, RBAC, and AI-driven automation.",
        longDescription: "A sophisticated multi-tenant SaaS logistics platform (TMS-like) designed for high scalability and secure tenant isolation. Built with a modern tech stack to handle complex logistics workflows and real-time tracking.",
        category: "Full-Stack",
        tags: ["Next.js 15", "Prisma", "PostgreSQL", "Redis", "RabbitMQ", "Kubernetes", "AI/RAG"],
        image: "/projects/saas-logistics.webp",
        problem: "Logistics companies needed a way to manage their operations in an isolated manner while sharing common infrastructure costs. Scalability and security were paramount.",
        approach: "Implemented a multi-tenant architecture using subdomain-based routing and a shared-database-per-schema isolation strategy. Built the backend with microservices communicating via RabbitMQ and used Redis for caching and session management.",
        impact: "Provides full tenant isolation, role-based access control, and scales efficiently from homelab to cloud, minimizing overhead costs.",
        learning: "Deepened expertise in tenancy boundaries, subdomain routing, and complex database schema migrations for multi-tenant environments.",
        featured: true,
        year: "2024"
    },
    {
        slug: "saas-performance-optimization",
        title: "SaaS Performance Optimization (35% faster)",
        description: "Critical performance tuning of a core SaaS platform at Nology Solutions.",
        longDescription: "A deep-dive optimization project aimed at resolving bottlenecks in a large-scale SaaS application. Involved profiling, database tuning, and frontend refactoring.",
        category: "Web",
        tags: [".NET Core", "SQL Server", "React", "Profiling"],
        image: "/projects/performance.webp",
        problem: "The main SaaS software was experiencing slowdowns, impacting user experience and customer retention.",
        approach: "Conducted thorough profiling of the .NET Core API and SQL Server queries. Optimized slow-running stored procedures, implemented missing indexes, and optimized the React rendering cycle on the frontend.",
        impact: "Achieved a 35% improvement in overall system performance, significantly increasing user satisfaction and reducing server load.",
        learning: "Mastered performance profiling tools and learned the intricacies of SQL Server execution plans at scale.",
        featured: true,
        year: "2023"
    },
    {
        slug: "etb-self-service-platform",
        title: "ETB Self-Service Platform",
        description: "High-traffic platform supporting 10,000+ concurrent users for a major telecom.",
        longDescription: "Redesign and implementation of the flagship self-service platform for ETB, Colombie's leading telecommunications provider.",
        category: "Full-Stack",
        tags: ["React Native", "React", "Node.js", "MongoDB", "Redux"],
        image: "/projects/etb-selfservice.webp",
        problem: "The existing legacy platform could not handle the growing number of concurrent users, leading to frequent downtime and poor user satisfaction.",
        approach: "Rebuilt the platform from the ground up using a modern stack. Used React Native for the mobile app and React/Redux for the web. The backend was powered by Node.js and MongoDB for flexibility and scale.",
        impact: "User satisfaction increased by 25%. The platform successfully managed spikes of 10,000+ concurrent users without downtime.",
        learning: "Hands-on experience in scaling applications for mass-market consumers and managing real-time data synchronization.",
        featured: true,
        year: "2021"
    },
    {
        slug: "react-native-migration",
        title: "React Native + .NET Core Migration",
        description: "Migrating legacy mobile apps to a modern cross-platform codebase.",
        longDescription: "A comprehensive migration project for Nology Solutions, moving old mobile apps to React Native and .NET Core 7.0.",
        category: "Mobile",
        tags: ["React Native", ".NET Core 7.0", "iOS", "Android"],
        image: "/projects/migration.webp",
        problem: "Legacy mobile apps were outdated, hard to maintain, and lacked parity between iOS and Android.",
        approach: "Architected a new cross-platform solution using React Native. Rebuilt the backend using the latest .NET Core 7.0 to provide a robust and secure API for the new mobile clients.",
        impact: "Reduced maintenance costs by 50% and enabled faster feature delivery across both platforms.",
        learning: "Explored the latest features of .NET 7.0 and advanced React Native patterns for enterprise apps.",
        featured: false,
        year: "2023"
    },
    {
        slug: "etb-crm-modernization",
        title: "ETB CRM Modernization",
        description: "Enterprise CRM transformation with C# MVC and MongoDB.",
        longDescription: "A multi-year project to rebuild the core CRM system for ETB, focusing on effectiveness and sales performance.",
        category: "Full-Stack",
        tags: ["C# MVC", "MongoDB", "Enterprise", "Sales"],
        image: "/projects/crm.webp",
        problem: "The old CRM was slow and unintuitive, leading to high training costs and low sales effectiveness.",
        approach: "Developed a modern MVC application integrated with MongoDB for flexible data storage. Focused on UX to reduce clicks and improve agent productivity.",
        impact: "Sales increased by 30%, staff training time was significantly reduced, and overall effectiveness improved by 50%.",
        learning: "Deep understanding of CRM workflows and how to integrate NoSQL databases into enterprise .NET applications.",
        featured: false,
        year: "2018"
    },
    {
        slug: "kubernetes-integration-layer",
        title: "Microservices on Kubernetes Integration",
        description: "Scalable backend integration layer on Azure Kubernetes Service.",
        longDescription: "Building a high-availability microservices layer for ETB to integrate frontend applications with various cloud services.",
        category: "Backend",
        tags: ["Kubernetes", "Azure", "Node.js", "Microservices", "Docker"],
        image: "/projects/kubernetes.webp",
        problem: "The need for a scalable and resilient integration layer between multiple frontend clients and backend web services.",
        approach: "Designed and deployed a microservices layer using Node.js, containerized with Docker and orchestrated with Kubernetes on Azure. Integrated with Azure Blob Storage for media handling.",
        impact: "Created a highly resilient and scalable architecture that served as the backbone for multiple self-service and internal tools.",
        learning: "Gained expert-level knowledge in Kubernetes orchestration, container networking, and cloud-native patterns.",
        featured: false,
        year: "2020"
    }
];
