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
            "Backend engineering",
            ".NET",
            "C#",
            "SQL Server",
            "Node.js",
            "Enterprise SaaS",
            "Multi-tenant architecture",
            "Legacy system modernization",
            "React Native",
            "AI-assisted software engineering",
            "Claude Code",
            "Model Context Protocol",
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
