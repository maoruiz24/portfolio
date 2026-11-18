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
            "AI engineering",
            "Large language models",
            "AI agents",
            "Retrieval-augmented generation",
            "Model Context Protocol",
            ".NET",
            "React",
            "React Native",
            "TypeScript",
            "Kubernetes",
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
