import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { siteConfig } from "@/lib/site";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"] });

const defaultTitle = siteConfig.name + " | " + siteConfig.title;

export const metadata: Metadata = {
    metadataBase: new URL(siteConfig.url),
    title: {
        default: defaultTitle,
        template: "%s | " + siteConfig.name,
    },
    description: siteConfig.seo.description,
    keywords: siteConfig.seo.keywords,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    alternates: { canonical: "/" },
    openGraph: {
        type: "website",
        locale: "en_CA",
        url: siteConfig.url,
        title: defaultTitle,
        description: siteConfig.seo.description,
        siteName: siteConfig.name,
    },
    twitter: {
        card: "summary_large_image",
        title: defaultTitle,
        description: siteConfig.seo.description,
    },
    icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: dark)", color: "#0d1017" },
        { media: "(prefers-color-scheme: light)", color: "#f8f9fb" },
    ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}
            >
                <a
                    href="#main"
                    className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
                >
                    Skip to content
                </a>
                <JsonLd />
                <Providers>
                    <div className="relative flex min-h-screen flex-col">
                        <Navbar />
                        <main id="main" className="flex-1">
                            {children}
                        </main>
                        <Footer />
                    </div>
                </Providers>
            </body>
        </html>
    );
}
