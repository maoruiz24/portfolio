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
                        "radial-gradient(circle at 50% -20%, rgba(94, 234, 180, 0.28), transparent 55%)",
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
                            background: "#5eeab4",
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
                    <div style={{ fontSize: 40, color: "#5eeab4" }}>{siteConfig.title}</div>
                    <div style={{ fontSize: 28, color: "#9aa3b2", maxWidth: 980 }}>
                        LLM systems with guardrails · AI agents & MCP · 17 years shipping production software
                    </div>
                </div>
                <div style={{ display: "flex", fontSize: 24, color: "#9aa3b2" }}>{siteConfig.location}</div>
            </div>
        ),
        size
    );
}
