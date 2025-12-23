export interface Experience {
    company: string;
    role: string;
    location: string;
    period: string;
    bullets: string[];
    impact?: string;
}

export const experiences: Experience[] = [
    {
        company: "Nology Solutions",
        role: "Software Developer",
        location: "Mississauga, Canada",
        period: "Apr 2022 – Present",
        bullets: [
            "Orchestrated the migration of legacy mobile enterprise apps to React Native and .NET Core 7.0, achieving seamless delivery on Android and iOS.",
            "Engineered performance critical updates for core SaaS platforms, resulting in a measurable 35% increase in system responsiveness.",
            "Maintained and modularized complex ASP.NET MVC and SQL Server applications, focus on troubleshooting and feature expansion.",
            "Modernized development lifecycles by implementing source control and task management via Azure DevOps, significantly reducing delivery times."
        ],
        impact: "Boosted system performance by 35% and modernized mobile delivery to multi-platform React Native."
    },
    {
        company: "ETB",
        role: "Senior Software Engineer",
        location: "Bogotá, Colombia",
        period: "Nov 2013 – Nov 2021",
        bullets: [
            "Led the redesign of the flagship self-service platform (web + mobile), scaling to 10,000+ concurrent users with Node.js and MongoDB.",
            "Architected and delivered the ETB CRM using C# MVC and MongoDB over a 2-year lifecycle, reducing staff training time and increasing sales by 30%.",
            "Deploying high-availability microservices on Kubernetes (Azure), integrating cloud storage (Azure Blob) and cross-service authentication.",
            "Championed the shift to modern DevOps practices and documentation, improving team effectiveness by 50%."
        ],
        impact: "Delivered a high-scale CRM and self-service ecosystem serving thousands of users with 30% sales lift."
    },
    {
        company: "Indra Colombia",
        role: "Technical Leader",
        location: "Bogotá, Colombia",
        period: "Feb 2009 – Oct 2013",
        bullets: [
            "Steered the development team for Telefonica, reducing time-to-market and development costs by 35% through efficient resource management.",
            "Managed and maintained a portfolio of 80+ production applications using .NET, Java, and complex Unix-based background processes.",
            "Established a dedicated QA division and mentorship program, drastically reducing defect rates and testing cycles."
        ],
        impact: "Reduced TCO and time-to-market by 35% while managing 80+ production applications."
    }
];
