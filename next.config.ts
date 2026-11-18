import type { NextConfig } from "next";

/** Case-study slugs that were renamed — keep old links working. */
const renamedProjects: Record<string, string> = {
  "ai-assisted-legacy-migration": "enterprise-api-modernization",
  "llm-gateway-fallback": "hellotcf",
  "farm-marketplace": "farmilygo",
  "driver-app-offline-first": "deliverysuite-driver",
  "wms-modernization": "wms-inventory-engineering",
  "tms-web-platform": "deliverysuite-saas-modernization",
  "multi-tenant-platform-architecture": "multi-tenant-logistics-prototype",
};

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return Object.entries(renamedProjects).map(([from, to]) => ({
      source: "/projects/" + from,
      destination: "/projects/" + to,
      permanent: true,
    }));
  },
};

export default nextConfig;
