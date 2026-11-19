import { siteConfig } from "@/lib/site";

export default function JsonLd() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: siteConfig.name,
        jobTitle: siteConfig.title,
        url: siteConfig.url,
        email: "mailto:" + siteConfig.email,
        address: {
            "@type": "PostalAddress",
            addressLocality: "Mississauga",
            addressRegion: "ON",
            addressCountry: "CA",
        },
        sameAs: [siteConfig.links.linkedin, siteConfig.links.github],
        description: siteConfig.seo.description,
        knowsAbout: [
            "Full-stack development",
            ".NET",
            "C#",
            "React",
            "React Native",
            "Node.js",
            "SQL Server",
            "Database performance tuning",
            "API design",
            "Legacy system modernization",
            "Offline-first mobile apps",
            "Multi-tenant SaaS",
            "CI/CD",
            "Azure DevOps",
            "AI-assisted software development",
            "LLM integration",
        ],
        knowsLanguage: ["en", "es"],
    };

    return (
        <script
            type="application/ld+json"
            // JSON.stringify output is escaped for "<" to keep the script tag safe.
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
        />
    );
}
