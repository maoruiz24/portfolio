import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = siteConfig.name + " — " + siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "72px",
                    background: "#0d1017",
                    backgroundImage:
                        "radial-gradient(circle at 50% -20%, rgba(96, 165, 250, 0.3), transparent 55%)",
                    color: "#f2f4f7",
                    fontFamily: "sans-serif",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: 28, color: "#9aa3b2" }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 56,
                            height: 56,
                            borderRadius: 12,
                            background: "#60a5fa",
                            color: "#0d1017",
                            fontWeight: 700,
                        }}
                    >
                        IR
                    </div>
                    iruiz.dev
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>{siteConfig.name}</div>
                    <div style={{ fontSize: 44, color: "#60a5fa" }}>{siteConfig.title}</div>
                    <div style={{ fontSize: 30, color: "#c7cdd6", maxWidth: 1000 }}>{siteConfig.tagline}</div>
                    <div style={{ fontSize: 26, color: "#9aa3b2", maxWidth: 1000 }}>
                        Web and mobile apps, APIs, databases and CI/CD · 15+ years in production
                    </div>
                </div>
                <div style={{ display: "flex", fontSize: 24, color: "#9aa3b2" }}>{siteConfig.location}</div>
            </div>
        ),
        size
    );
}
