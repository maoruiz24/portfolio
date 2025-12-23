import { siteConfig } from "@/lib/site";

export default function JsonLd() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": siteConfig.name,
        "jobTitle": siteConfig.title,
        "url": "https://ivanruiz.dev",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Mississauga",
            "addressRegion": "ON",
            "addressCountry": "CA"
        },
        "email": siteConfig.email,
        "sameAs": [
            siteConfig.links.linkedin,
            siteConfig.links.github
        ],
        "description": siteConfig.seo.description,
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Direct",
            "email": siteConfig.email
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
