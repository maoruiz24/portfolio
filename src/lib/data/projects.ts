/**
 * Case studies. Content rules (see CLAUDE.md):
 * - Never invent metrics. Every number comes from the owner or verifiable evidence.
 * - Anything outside Nology/ETB/Indra is "Personal R&D": links are fine, but no pricing,
 *   subscriptions, revenue, user counts or business language.
 * - Distinguish implemented, in-progress and planned work explicitly.
 */

export type ProjectCategory = "enterprise" | "product" | "rnd";

export interface ProjectMetric {
    value: string;
    label: string;
}

export interface ArchitectureNode {
    label: string;
    detail?: string;
}

export interface ArchitectureLayer {
    name: string;
    nodes: ArchitectureNode[];
}

export interface Architecture {
    caption: string;
    layers: ArchitectureLayer[];
    /** Short notes rendered under the diagram (data flow, boundaries, status). */
    notes?: string[];
}

export interface Decision {
    title: string;
    why: string;
    tradeoff: string;
}

/** Scan-friendly summary shown at the top of a case study. */
export interface ProjectOverview {
    /** What the product is. */
    product: string;
    /** My contribution and responsibility. */
    role: string;
    /** The problem I solved. */
    problem: string;
    /** Results or reach. */
    outcome: string;
    /** Keep delivered, in-progress and future work clearly apart. */
    status?: { delivered?: string; inProgress?: string; planned?: string };
}

export interface ProjectLink {
    label: string;
    href: string;
}

/**
 * Real screenshot of a personal R&D product, stored in /public/projects/<slug>/.
 * Test data only, no personal information, nothing from Nology products.
 */
export interface ProjectImage {
    src: string;
    alt: string;
    width: number;
    height: number;
    caption?: string;
}

export interface Project {
    slug: string;
    title: string;
    /** Where the work happened, e.g. "Nology Solutions" or "Personal R&D". */
    org: string;
    category: ProjectCategory;
    /** True when LLMs / agents are central to the project. */
    ai: boolean;
    period: string;
    status?: string;
    /** Public URL of a live project (Personal R&D projects only — never Nology internals). */
    url?: string;
    tagline: string;
    summary: string;
    overview?: ProjectOverview;
    /** Public evidence: live site, store listings. */
    links?: ProjectLink[];
    /** Optional screenshots; the first one is used as the card cover. */
    gallery?: ProjectImage[];
    metrics: ProjectMetric[];
    /** Key capabilities — mainly for products. */
    features?: string[];
    problem: string;
    responsibilities?: string[];
    architecture?: Architecture;
    decisions?: Decision[];
    challenges?: string[];
    /** Implementation approach. */
    approach: string[];
    /** Optional linear pipeline rendered as a step diagram. */
    flow?: string[];
    /** Additional labelled step diagrams (e.g. operational procedures). */
    extraFlows?: { label: string; steps: string[] }[];
    impact: string[];
    stack: string[];
    learning: string;
}

export const categoryLabels: Record<ProjectCategory, string> = {
    enterprise: "Enterprise Engineering",
    product: "Personal R&D Products",
    rnd: "Architecture & R&D",
};

export const projects: Project[] = [
    // ── Enterprise Engineering ───────────────────────────────────────────────
    {
        slug: "deliverysuite-driver",
        title: "DeliverySuite Driver: Enterprise Mobile Platform",
        org: "Nology Solutions",
        category: "enterprise",
        ai: false,
        period: "2022 – Present",
        status: "Live on App Store & Google Play",
        tagline: "The iOS and Android app drivers use every shift — architected from scratch and maintained in production since its first store release in 2023.",
        summary:
            "The mobile app carriers' drivers use every shift: accept loads, run pickup and delivery workflows, capture proof of delivery and stream GPS to dispatch. I architected and built it from scratch with React Native, Expo and .NET, and remain responsible for it after launch: store releases, reliability fixes and field diagnostics.",
        overview: {
            product: "DeliverySuite Driver, the iOS and Android app that carriers' drivers use during every shift: loads, pickup and delivery, proof of delivery and GPS tracking.",
            role: "Architected and built it from scratch (React Native, Expo, .NET), and maintain it in production: store releases, the driver backend API, monitoring and field troubleshooting.",
            problem: "Weak connectivity and phones that kill background apps were losing driver actions and GPS points, and a single failed GPS ping could make the app look frozen.",
            outcome: "In daily use by roughly 500–1,000 recurring drivers. Pending work now survives offline periods and app restarts, and field issues can be diagnosed remotely.",
            status: {
                delivered: "Production app on both stores since 2023, SQLite outbox, GPS tracking overhaul, remote diagnostics.",
                inProgress: "Moving the driver backend to the new .NET 10 Driver API.",
            },
        },
        links: [
            { label: "App Store", href: "https://apps.apple.com/ca/app/deliverysuite-driver/id1663881230" },
            { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.nology.deliverysuite" },
        ],
        metrics: [
            { value: "500–1,000", label: "Recurring users" },
            { value: "Since 2023", label: "Continuous releases to both stores" },
            { value: "Offline-first", label: "Durable sync, confirmed by the server" },
            { value: "iOS + Android", label: "Published on both stores" },
        ],
        features: [
            "Pickup and delivery workflows with arrival times and load transfers",
            "Barcode scanning of orders and packages",
            "Proof of delivery with photo and signature capture",
            "Background GPS tracking streamed to dispatch",
            "Push notifications, including silent refresh of the load list",
            "Offline operation with durable, server-acknowledged sync",
        ],
        problem:
            "Drivers work with unreliable connectivity and phones that kill background apps. The original design kept pending actions in capped in-memory queues (250 and 200 items) that silently dropped the oldest driver actions and GPS points, and one failed GPS ping could hold back load refreshes for up to a 5-minute backoff — drivers saw a \"frozen\" app with no loads.",
        responsibilities: [
            "Architecture of the mobile app and its integration with the .NET backend",
            "Feature development, Expo/EAS builds and App Store / Google Play submissions",
            "Maintenance of the driver backend API (auth, loads, attachments, push)",
            "Advanced production troubleshooting: crash analysis, GPS reliability, field diagnostics",
            "Production operations: crash and analytics monitoring, remote device-log collection and store submissions",
        ],
        architecture: {
            caption: "High-level architecture — DeliverySuite Driver",
            layers: [
                { name: "Device", nodes: [{ label: "Driver app", detail: "React Native · Expo · TypeScript" }, { label: "Redux Toolkit + Saga", detail: "workflow state" }] },
                {
                    name: "On-device services",
                    nodes: [
                        { label: "SQLite outbox", detail: "durable queue, photos as files" },
                        { label: "Background geolocation", detail: "native SDK + watchdog" },
                        { label: "Camera · barcode · signature", detail: "proof of delivery" },
                    ],
                },
                {
                    name: "Backend",
                    nodes: [
                        { label: "Driver API (.NET)", detail: "auth, loads, attachments, push" },
                        { label: "Driver API (.NET 10)", detail: "modernization in progress" },
                    ],
                },
                { name: "Data", nodes: [{ label: "SQL Server", detail: "stored procedures" }] },
                {
                    name: "Platform",
                    nodes: [
                        { label: "Firebase", detail: "FCM · Crashlytics · Analytics" },
                        { label: "Expo EAS", detail: "build & submit" },
                        { label: "App Store · Google Play" },
                    ],
                },
            ],
            notes: [
                "Every driver action is written to SQLite first and deleted only after the server confirms it.",
                "GPS points and actions sync independently, so a failed ping no longer blocks load refreshes.",
            ],
        },
        decisions: [
            {
                title: "Durable SQLite outbox instead of in-memory queues",
                why: "Pending work must survive offline periods, app kills and restarts without silent loss.",
                tradeoff: "More moving parts: a local schema to migrate and sync logic to test on real devices.",
            },
            {
                title: "Delete only on server acknowledgment",
                why: "At-least-once delivery is the safe default for proof-of-delivery data.",
                tradeoff: "The server must tolerate duplicates, so endpoints have to be idempotent.",
            },
            {
                title: "Native background-geolocation SDK over expo-location",
                why: "More reliable background tracking and recovery on iOS and Android.",
                tradeoff: "A native dependency that requires custom dev builds and careful cleanup of the old library's background jobs.",
            },
            {
                title: "Photos stored as files, not base64 blobs",
                why: "Keeps queue rows small and avoids memory pressure on low-end devices.",
                tradeoff: "File lifecycle has to be managed alongside the queue rows.",
            },
        ],
        challenges: [
            "Diagnosing the \"app frozen / no loads\" complaint required code analysis plus a 7+ hour live-device test to prove the backoff root cause.",
            "Android out-of-memory crashes after the GPS migration came from leftover OS background jobs of the old library — fixed with a one-time cleanup.",
            "Keeping pace with every major Expo SDK and React Native upgrade while the app stayed in production on both stores.",
        ],
        approach: [
            "Built prototypes first (late 2022), then the production app; first store release in 2023, with continuous releases since.",
            "Overhauled location tracking: native SDK, watchdog, health reporter, iOS recovery and an in-app GPS diagnostics screen.",
            "Designed and released the SQLite outbox, replacing two capped in-memory queues with durable, server-acknowledged processing.",
            "Added silent-push remote refresh and scan-to-take-over load assignment with multi-tenant fallback.",
            "Integrated the app with the .NET backend for authentication, loads, attachments (with text extraction from documents) and push notifications.",
            "Instrumented production with Firebase Crashlytics and Analytics, plus remote device-log upload to diagnose stuck queues in the field.",
            "Reused the same offline patterns in the new WMS mobile app.",
        ],
        flow: ["Driver action", "SQLite outbox", "Sync worker", "Driver API", "Server ack", "Row deleted"],
        impact: [
            "Used by roughly 500–1,000 recurring drivers, with continuous releases to both stores since 2023.",
            "Replaced queues that silently dropped data with durable storage and server-acknowledged processing.",
            "Field issues can now be diagnosed from an in-app GPS diagnostics screen and remote device logs.",
        ],
        stack: ["React Native", "Expo / EAS", "TypeScript", "Redux Toolkit", "Redux-Saga", "expo-sqlite", "Background geolocation", "Firebase", ".NET Web API", "SQL Server"],
        learning:
            "Mobile reliability means designing for failure first: every network call can fail, every OS can kill the app, and every queue needs an explicit acknowledgment.",
    },
    {
        slug: "enterprise-api-modernization",
        title: "Modernizing Legacy APIs with .NET 10",
        org: "Nology Solutions",
        category: "enterprise",
        ai: true,
        period: "2026",
        status: "Ongoing",
        tagline: "Three independently deployable Clean Architecture APIs that replace legacy handlers one operation at a time, without breaking existing clients.",
        summary:
            "I designed the target backend for DeliverySuite — three independently deployable .NET 10 APIs for Web/Public, Driver and WMS — and lead the incremental migration of legacy handlers into them, one operation at a time, with tests and preserved response contracts. AI coding agents help with inventory and porting; every change is tested and reviewed before it merges.",
        overview: {
            product: "The new backend platform for DeliverySuite: Web/Public, Driver and WMS APIs on .NET 10.",
            role: "Designed the architecture and API boundaries, implemented the first endpoints and test suites, and set up the migration process.",
            problem: "Business logic lived in large legacy handlers that multiplex many operations; the platform needed testable APIs without breaking a mobile app already in the stores.",
            outcome: "A tested foundation (90+ xUnit tests) for retiring legacy code incrementally. The new WMS mobile app runs on the new WMS API from day one.",
            status: {
                delivered: "Driver API login and load lists, the WMS API behind the new WMS app, 90+ xUnit tests.",
                inProgress: "Porting the remaining legacy operations, tracked per API.",
                planned: "Moving business logic from stored procedures into the domain with EF Core (phase 2).",
            },
        },
        metrics: [
            { value: "3", label: "Independent .NET 10 APIs" },
            { value: "90+", label: "xUnit tests" },
            { value: "Contract-safe", label: "Legacy responses preserved for live clients" },
            { value: "Ongoing", label: "Incremental migration" },
        ],
        problem:
            "Business logic lived in legacy ASP.NET handlers (the largest around 2,300 and 1,900 lines) and a legacy driver API. The platform needed modern, testable APIs without breaking the mobile app already in the stores — and most of the work fell on a single developer.",
        responsibilities: [
            "Target architecture and API boundaries",
            "Implementation of the first endpoints and the test suites",
            "Design of the AI-assisted migration workflow (agents, skills, trackers)",
        ],
        architecture: {
            caption: "High-level architecture — target API platform",
            layers: [
                {
                    name: "Consumers",
                    nodes: [
                        { label: "DeliverySuite web", detail: "legacy Web Forms" },
                        { label: "Driver app", detail: "React Native" },
                        { label: "WMS mobile app", detail: "Expo" },
                        { label: "Integrations", detail: "public order/tracking + webhook" },
                    ],
                },
                {
                    name: ".NET 10 APIs",
                    nodes: [
                        { label: "Web / Public API" },
                        { label: "Driver API", detail: "legacy contract preserved" },
                        { label: "WMS API" },
                    ],
                },
                {
                    name: "Application",
                    nodes: [
                        { label: "Clean Architecture" },
                        { label: "CQRS · MediatR" },
                        { label: "JWT auth" },
                    ],
                },
                {
                    name: "Data access",
                    nodes: [
                        { label: "Dapper → stored procedures", detail: "phase 1" },
                        { label: "Domain + EF Core", detail: "phase 2 (planned)" },
                    ],
                },
                { name: "Data", nodes: [{ label: "SQL Server" }] },
            ],
            notes: [
                "Strangler-style migration: legacy handlers keep running until each operation is ported and tested.",
                "Status: Driver API serves login and load lists; WMS API backs the new WMS app; the remaining operations are inventoried in trackers.",
            ],
        },
        decisions: [
            {
                title: "Three APIs instead of one",
                why: "Web/Public, Driver and WMS have different consumers and release cadences; a failure in one must not take down the others.",
                tradeoff: "More deployables and some shared-code duplication to manage.",
            },
            {
                title: "Wrap stored procedures with Dapper first",
                why: "Moves endpoints to the new architecture quickly and safely, reusing proven SQL.",
                tradeoff: "Business logic stays in SQL for now; moving it into the domain is a second phase.",
            },
            {
                title: "Preserve legacy response contracts",
                why: "The driver app already in the stores must keep working during the migration.",
                tradeoff: "New endpoints carry some legacy shapes until clients are updated.",
            },
            {
                title: "Narrow AI agents with explicit artifacts",
                why: "An analyst inventories, a migrator ports with tests, a tracker records state — each step is verifiable.",
                tradeoff: "Requires upfront process design, and every change still needs human review.",
            },
        ],
        challenges: [
            "Legacy handlers multiplex many operations behind one endpoint, so each must be discovered before it can be ported.",
            "Keeping long migrations coherent across many AI sessions — solved with trackers and persistent memory.",
        ],
        approach: [
            "Designed a unified API (Clean Architecture, CQRS, validation, structured logging, JWT + refresh tokens), then split it into three deployables.",
            "Built per-repo agent pairs in Claude Code: a read-only legacy analyst and a migrator that ports one operation at a time with tests and updates the tracker.",
            "Chained them in a migrate-legacy skill per API, plus slash commands to scaffold CQRS commands/queries and wrap stored procedures.",
            "Connected a SQL Server MCP server for schema-aware work and Engram persistent memory so migrations resume across sessions.",
            "Enforced a repository rule: every new route must include tests.",
        ],
        flow: ["Legacy handler", "Analyst subagent", "Operation inventory", "Migrator subagent", "CQRS + tests", "Tracker update"],
        impact: [
            "A tested foundation (90+ xUnit tests) for retiring legacy handlers incrementally.",
            "The new WMS mobile app is built on the new WMS API from day one.",
            "AI agents are used for development workflow only — not as customer-facing features.",
        ],
        stack: [".NET 10", "ASP.NET Core", "Clean Architecture", "CQRS", "MediatR", "Dapper", "SQL Server", "JWT", "xUnit", "Claude Code", "MCP"],
        learning:
            "Agents are most reliable when work is decomposed into narrow, verifiable steps with an explicit artifact between them — an inventory, a test, a tracker row.",
    },
    {
        slug: "wms-inventory-engineering",
        title: "Reliable Warehouse Inventory Processing",
        org: "Nology Solutions",
        category: "enterprise",
        ai: false,
        period: "2026",
        tagline: "Transactional fulfillment, consistent FIFO allocation and reversible data fixes in a live WMS.",
        summary:
            "Work across three parts of DeliverySuite's WMS: a staged rewrite of the web module's order pages and SQL Server logic, a greenfield offline-first mobile app for warehouse staff (in development), and the WMS API that backs it.",
        overview: {
            product: "The warehouse module of DeliverySuite: web pages for supervisors, a new mobile app for floor staff and the API behind it.",
            role: "Rewrote the inbound and outbound pages and their SQL Server logic, corrected live inventory data, and am building the mobile app and its API.",
            problem: "Inconsistent allocation logic hid picked stock from availability, mixed different customers' stock and left order lines that could never be allocated.",
            outcome: "Availability now accounts for picked-but-unshipped stock, and 190+ inconsistent records were repaired with reversible scripts.",
            status: {
                delivered: "Rewritten inbound/outbound pages, allocation fixes, data repairs and an HTML report pilot.",
                inProgress: "The offline-first WMS mobile app and its API endpoints.",
            },
        },
        metrics: [
            { value: "190+", label: "Inconsistent records repaired" },
            { value: "100%", label: "Data fixes with rollback scripts" },
            { value: "0", label: "C# changes to add a report" },
        ],
        problem:
            "Allocation logic had grown inconsistent: stock picked but not yet shipped was invisible to availability, some picks used another customer's stock, and order lines referenced lots that could never be allocated. Every fix had to happen on live operational data without stopping the warehouse.",
        responsibilities: [
            "WMS web module: rewrite of inbound/outbound pages and their SQL Server logic",
            "WMS mobile app: architecture and development (greenfield, in development)",
            "WMS API endpoints backing the mobile app",
            "Production data corrections with backups and rollback scripts",
        ],
        architecture: {
            caption: "High-level view — WMS components",
            layers: [
                {
                    name: "Users",
                    nodes: [
                        { label: "Warehouse supervisors", detail: "web" },
                        { label: "Floor operators", detail: "mobile" },
                    ],
                },
                {
                    name: "Front ends",
                    nodes: [
                        { label: "WMS web module", detail: "ASP.NET · DevExtreme" },
                        { label: "WMS mobile app", detail: "Expo · TanStack Query · Zustand · Zod" },
                    ],
                },
                {
                    name: "Services",
                    nodes: [
                        { label: "Legacy handlers", detail: "web module" },
                        { label: "WMS API (.NET 10)", detail: "mobile app" },
                        { label: "HTML/PDF report engine", detail: "Handlebars · Paged.js" },
                    ],
                },
                {
                    name: "Data",
                    nodes: [
                        { label: "SQL Server", detail: "allocation, status transitions, transactional shipping" },
                    ],
                },
            ],
            notes: [
                "The mobile app is offline-first: a persisted mutation queue covers status changes, kits and photo uploads.",
            ],
        },
        decisions: [
            {
                title: "Staged rewrite with the old page kept live",
                why: "Structure first, then logic control by control, so every function could be compared against the original.",
                tradeoff: "Two versions of the page to maintain during the transition.",
            },
            {
                title: "Status transitions enforced in one place",
                why: "Allocated → picked → packed → shipped rules were scattered; centralizing them in SQL stopped invalid states.",
                tradeoff: "More logic in stored procedures until the domain moves to the new API.",
            },
            {
                title: "Shipping wrapped in a transaction",
                why: "Shipping changes order status and inventory together; a partial failure must never leave stock decremented without a shipped order.",
                tradeoff: "Transactions hold locks on busy inventory rows, so they have to stay short and focused.",
            },
            {
                title: "Every data fix is reversible",
                why: "Live operational data: each correction comes with backup tables and a rollback script.",
                tradeoff: "Slower to deliver, but no fix can make things worse irreversibly.",
            },
            {
                title: "Template-driven reports",
                why: "A report is a template, a stored procedure and a registry row — no C# deployment.",
                tradeoff: "Server-side PDF rendering through a headless browser adds an operational component.",
            },
        ],
        challenges: [
            "Availability was computed in several routines; picked-but-unshipped stock had to be accounted for consistently in every one of them.",
            "Repairing records that used another customer's stock without disrupting orders already in progress.",
            "Porting complex pages one control at a time while warehouse staff kept using them.",
        ],
        approach: [
            "Rewrote inbound and outbound pages on DevExtreme: FIFO allocation by receipt date, \"any lot\" lines, manual allocation by location and lot, kit validation, serial capture during picking and transactional shipping.",
            "Fixed every availability and allocation routine to account for picked-but-unshipped stock.",
            "Reversed 5 allocations and 28 picks of the wrong owner's stock, normalized 128 order lines and fixed 33 ship dates.",
            "Built a new inventory search page and replaced Crystal Reports with an HTML/PDF engine (pilot: warehouse pick list).",
            "Started the WMS mobile app with feature folders and Zod-validated API boundaries.",
        ],
        flow: ["Order line", "FIFO allocation", "Pick + serial capture", "Pack", "Ship (transaction)", "Inventory updated"],
        extraFlows: [
            {
                label: "safe data-fix procedure",
                steps: ["Detect inconsistency", "Backup table", "Fix script", "Verify results", "Rollback script on standby"],
            },
        ],
        impact: [
            "Inventory availability now accounts for picked-but-unshipped stock.",
            "Corrected inconsistent records without irreversible changes.",
            "The pilot HTML report was accepted by stakeholders.",
        ],
        stack: ["SQL Server", "T-SQL", "ASP.NET", "C#", "DevExtreme", "Expo", "TanStack Query", "Zustand", "Zod", "Handlebars", "Paged.js"],
        learning:
            "On live operational data, the rollback plan is part of the feature. Change things in small steps, keep the old path available and make every fix reversible.",
    },
    {
        slug: "deliverysuite-saas-modernization",
        title: "DeliverySuite SaaS: Performance & Modernization",
        org: "Nology Solutions",
        category: "enterprise",
        ai: false,
        period: "2022 – Present",
        tagline: "Keeping a B2B2C multi-tenant logistics SaaS fast and evolving for ~200 business customers and the end customers they serve.",
        summary:
            "DeliverySuite is a multi-tenant logistics SaaS — transportation management, warehouse operations and driver workflows — used by carrier companies for order entry, pricing, dispatch, invoicing and customer portals. It is B2B2C: each business customer typically has 10–30 staff users, and their own customers (from 80 to 1,200 per business customer) also use the platform to place and track orders. I've been its main developer since 2022.",
        overview: {
            product: "DeliverySuite, a B2B2C multi-tenant logistics SaaS: ~200 business customers, each with 10–30 staff users on average and 80–1,200 end customers of their own.",
            role: "Main developer since 2022 across web, database and integrations, responsible for performance work and the delivery process.",
            problem: "Some critical pages took 12–18 seconds to load while the product had to keep evolving for many tenants.",
            outcome: "Selected critical pages now load in 2–3 s, with steady feature delivery every month since early 2023.",
        },
        metrics: [
            { value: "~200", label: "Business customers (B2B2C)" },
            { value: "10–30", label: "Staff users per business customer, on average" },
            { value: "80–1,200", label: "End customers per business customer" },
            { value: "2–3 s", label: "Selected critical page loads (from 12–18 s)" },
        ],
        problem:
            "A large ASP.NET Web Forms + SQL Server product serving business customers and their own end customers had to keep delivering features for many tenants while some critical pages took 12–18 seconds to load and the UI aged.",
        responsibilities: [
            "Feature development across web, database and integrations",
            "Performance work on critical workflows",
            "Source control and delivery process (Git, Azure DevOps)",
        ],
        approach: [
            "Optimized SQL Server stored procedures, added indexes and tuned the database for the slowest workflows.",
            "Moved slow tab data access to an async handler layer and reordered database calls on the busiest pages.",
            "Profiled a customer-selection freeze of up to ~14 s down to ~500 forced browser layouts (server and network were only ~1 s) and applied targeted fixes.",
            "Delivered tenant setup, cross-tab session management, dispatch-board actions, quote-to-load conversion, a responsive load-entry page, route-time calculation and single-tab edit locks.",
            "Migrated legacy controls to DevExtreme widgets and introduced Git source control and Azure DevOps boards and pull requests.",
        ],
        impact: [
            "Selected critical pages went from roughly 12–18 seconds to 2–3 seconds.",
            "Steady feature delivery every month since early 2023.",
            "A structured Git + Azure DevOps workflow that shortened development and deployment cycles.",
        ],
        stack: ["ASP.NET Web Forms", "C#", "SQL Server", "T-SQL", "jQuery", "DevExtreme", "Azure DevOps"],
        learning: "Profiling beats guessing: many \"slow server\" complaints were really database plans or browser rendering.",
    },
    {
        slug: "etb-self-service-platform",
        title: "ETB Self-Service Platform",
        org: "ETB",
        category: "enterprise",
        ai: false,
        period: "2021",
        tagline: "Mobile and web self-service for a national telecom, built for ~10,000 concurrent users.",
        summary:
            "Redesigned the customer self-service experience on mobile and web for Colombia's oldest telecommunications company.",
        metrics: [
            { value: "~10k", label: "Concurrent users" },
            { value: "+25%", label: "Customer satisfaction" },
        ],
        problem: "The legacy self-service channels could not handle peak load and frustrated customers.",
        responsibilities: ["Redesign and implementation of mobile and web clients", "Backend services for high concurrency"],
        approach: [
            "React Native and React front ends with Redux.",
            "A Node.js + MongoDB backend designed for high concurrency, alongside microservices on Kubernetes (Azure).",
        ],
        impact: ["Supported ~10,000 simultaneous users and raised customer satisfaction by 25%."],
        stack: ["React Native", "React", "Redux", "Node.js", "MongoDB", "Azure", "Kubernetes"],
        learning: "Design for peak load from the start, not after the first outage.",
    },
    {
        slug: "etb-crm",
        title: "ETB Enterprise CRM",
        org: "ETB",
        category: "enterprise",
        ai: false,
        period: "2018",
        tagline: "A two-year CRM build that improved installation effectiveness and sales.",
        summary: "Designed and built the CRM used by sales and field teams for fiber-optic services.",
        metrics: [
            { value: "+50%", label: "Installation effectiveness" },
            { value: "+30%", label: "Sales" },
        ],
        problem: "Fragmented customer data slowed training, installations and sales.",
        approach: [
            "C# MVC application with MongoDB, designed with sales and field operations.",
            "Workflows that guided agents and reduced onboarding time.",
        ],
        impact: ["Reduced training time, +50% installation effectiveness and +30% sales."],
        stack: ["C#", "ASP.NET MVC", "MongoDB"],
        learning: "Software that changes how people work needs its users in the design room.",
    },

    // ── Personal R&D products ────────────────────────────────────────────────
    {
        slug: "hellotcf",
        title: "HelloTCF: AI-Powered TCF Canada Practice",
        org: "Personal R&D",
        category: "product",
        ai: true,
        period: "2026",
        url: "https://hellotcf.com",
        tagline: "Exam simulations, AI-graded writing and speaking, and a conversational AI examiner — self-hosted on k3s.",
        summary:
            "A web platform for preparing the TCF Canada French exam that I designed and built as personal R&D: timed simulations across the four skills, AI-assisted grading of writing and speaking, a conversational AI speaking examiner, a RAG study assistant and spaced-repetition flashcards — all behind a provider-agnostic LLM layer.",
        overview: {
            product: "A web platform for practicing the TCF Canada French exam: timed simulations, AI-assisted grading of writing and speaking, and a conversational speaking examiner.",
            role: "Personal R&D. I designed and built it: architecture, full-stack implementation, the LLM integration layer and its deployment on my homelab.",
            problem: "AI features depended on several providers with different quotas, prices and failure modes; one outage or exhausted quota could block grading for everyone.",
            outcome: "Failing models are skipped automatically, switching models is a configuration change instead of a deploy, and the cost of every AI call is visible.",
            status: {
                delivered: "Live platform: simulations, grading, speaking examiner, RAG assistant and flashcards.",
            },
        },
        links: [
            { label: "Visit hellotcf.com", href: "https://hellotcf.com" },
        ],
        metrics: [
            { value: "8", label: "AI provider adapters" },
            { value: "3-tier", label: "Model fallback chains" },
            { value: "Per call", label: "Token and cost logging" },
            { value: "4", label: "Exam skills simulated" },
        ],
        features: [
            "Timed exam simulations for listening, reading, writing and speaking",
            "AI-assisted grading of writing and speaking against rubrics",
            "Conversational AI speaking examiner with speech-to-text and text-to-speech",
            "RAG study assistant over pgvector with a semantic cache",
            "Spaced-repetition flashcards, streaks and skill progression",
            "Admin console: exams, media, AI providers and model chains, support inbox",
            "French and English interface",
        ],
        problem:
            "AI features depended on several providers with different prices, quotas and failure modes. A single provider outage or exhausted quota could block grading for everyone, costs were invisible, and the speaking examiner needed low-latency speech in both directions.",
        responsibilities: [
            "Product architecture and full-stack implementation",
            "Design of the AI layer: providers, fallback, circuit breaking, cost logging",
            "Kubernetes deployment, migrations, backups and monitoring on my homelab",
        ],
        architecture: {
            caption: "High-level architecture — HelloTCF",
            layers: [
                {
                    name: "Clients",
                    nodes: [
                        { label: "Learner web app", detail: "Next.js 16 · next-intl" },
                        { label: "Admin console", detail: "exams, media, AI config" },
                    ],
                },
                {
                    name: "Application",
                    nodes: [
                        { label: "Exam sessions", detail: "attempt state machine" },
                        { label: "Speaking examiner", detail: "STT ↔ LLM ↔ TTS" },
                        { label: "Study assistant", detail: "RAG chatbot" },
                        { label: "Flashcards & progress" },
                    ],
                },
                {
                    name: "AI layer",
                    nodes: [
                        { label: "Config service", detail: "model chain per use case" },
                        { label: "Circuit breaker", detail: "state in Postgres" },
                        { label: "LLM adapters", detail: "Anthropic · OpenAI · Gemini · Groq · DeepSeek" },
                        { label: "Speech", detail: "Whisper STT · ElevenLabs / Fish Audio / OpenAI TTS" },
                        { label: "Call log", detail: "tokens & cost" },
                    ],
                },
                {
                    name: "Data",
                    nodes: [
                        { label: "PostgreSQL + pgvector", detail: "Prisma 7" },
                        { label: "MinIO", detail: "media via tokenized proxy" },
                    ],
                },
                {
                    name: "Platform",
                    nodes: [
                        { label: "k3s", detail: "Traefik · cert-manager" },
                        { label: "Migration jobs" },
                        { label: "Backups" },
                        { label: "Prometheus" },
                    ],
                },
            ],
            notes: [
                "Exam content comes from a separate editorial pipeline (see the human-in-the-loop content pipeline).",
                "Media is never exposed directly: every file is served through a short-lived token.",
            ],
        },
        decisions: [
            {
                title: "Model chains per use case, configured in the database",
                why: "Switch models or providers without deploying; cheap models for low-stakes tasks, stronger ones for grading.",
                tradeoff: "Extra database reads on hot paths — mitigated with a TTL cache.",
            },
            {
                title: "Circuit breaker persisted in PostgreSQL",
                why: "Instances are stateless; an in-memory breaker would reset per instance and protect nothing.",
                tradeoff: "A database write per failure — acceptable because failures are rare by design.",
            },
            {
                title: "Next.js modular monolith",
                why: "One deployable for web, API and AI orchestration keeps operations simple for a small team.",
                tradeoff: "Long AI calls share the web runtime, so every call has timeouts and retries.",
            },
            {
                title: "Self-hosted on k3s",
                why: "Full control of data and media, and no per-request hosting costs.",
                tradeoff: "I own uptime, migrations, backups and monitoring.",
            },
        ],
        challenges: [
            "Graceful degradation: when every model in a chain fails, the examiner falls back to scripted phrases instead of erroring.",
            "Keeping AI costs visible and bounded across eight providers.",
            "Avoiding repetitive examiner phrasing — solved with embedding-based de-duplication.",
        ],
        approach: [
            "One LLM interface with adapters for Anthropic, OpenAI, Gemini, Groq, DeepSeek, ElevenLabs, Fish Audio and OpenAI TTS.",
            "Admin-configurable chains (primary, backup, backup 2) resolved from the database; API keys encrypted at rest and decrypted only in memory.",
            "Circuit breaker (CLOSED → OPEN → HALF_OPEN) that opens immediately on quota, auth or rate-limit errors and after repeated transient failures.",
            "RAG assistant over 1,536-dimension pgvector embeddings with a semantic cache.",
            "Every AI call logged with provider, model, tokens and cost.",
            "Deployed on k3s with migration jobs that run before rollout, scheduled backups and Prometheus metrics.",
        ],
        flow: ["Request", "Resolve model chain", "Circuit-breaker check", "Provider adapter", "Validate output", "Log tokens & cost"],
        impact: [
            "A failing or exhausted model is skipped automatically; users get a degraded answer instead of an error.",
            "Switching models is a configuration change, not a deploy.",
            "Per-call cost visibility drives which model serves which task.",
        ],
        stack: ["Next.js 16", "TypeScript", "PostgreSQL", "pgvector", "Prisma 7", "Better Auth", "next-intl", "MinIO", "Anthropic API", "OpenAI API", "Whisper", "k3s"],
        learning:
            "Production LLM work is mostly distributed-systems work: timeouts, retries, circuit breakers, idempotency and observability matter more than the prompt.",
    },
    {
        slug: "farmilygo",
        title: "FarmilyGo: Farm-to-Consumer Marketplace",
        org: "Personal R&D",
        category: "product",
        ai: true,
        period: "2026",
        url: "https://farmilygo.com",
        tagline: "Web, mobile and API for discovering local farms, products, experiences and rural stays.",
        summary:
            "A marketplace and agritourism platform connecting people with local Canadian farms — fresh products, farm experiences and rural stays — that I built as personal R&D: a Turborepo monorepo with a Next.js web app, an Expo mobile app and a NestJS API, with AI-assisted listings and semantic search.",
        overview: {
            product: "A marketplace for local farms' products, experiences and rural stays, on web and mobile.",
            role: "Personal R&D. I designed the monorepo, API and data model, built the web, mobile and API apps, and defined the testing strategy.",
            problem: "Three audiences with different permissions — shoppers, farmers and admins — had to be served on web and mobile from one codebase.",
            outcome: "One API and one schema package serve both apps; critical flows are covered by end-to-end, authorization and load tests.",
        },
        links: [
            { label: "Visit farmilygo.com", href: "https://farmilygo.com" },
        ],
        metrics: [
            { value: "3", label: "Apps: web, mobile, API" },
            { value: "13", label: "Playwright E2E suites" },
            { value: "4", label: "Role-based workspaces" },
            { value: "k6", label: "Load tests for search and peak traffic" },
        ],
        features: [
            "Four role-based workspaces: Shop, Customer, Farmer and Admin",
            "Catalog of products, experiences and stays with bookings and calendar blockouts",
            "Semantic search and recommendations with vector embeddings",
            "Location-aware discovery with PostGIS and geocoding",
            "AI listing assistant: identifies products from photos and drafts descriptions",
            "Real-time messaging between customers and farmers",
            "Security and privacy: 2FA, SMS one-time codes, audit log, consent and privacy requests",
        ],
        problem:
            "Farm products, experiences and stays are scattered across small sites and social media. The platform needed to serve three very different audiences — shoppers, farmers and admins — on web and mobile from one codebase.",
        responsibilities: [
            "Architecture of the monorepo, API and data model",
            "Full-stack implementation across web, mobile and API",
            "AI features: listing assistant and semantic search",
            "Testing strategy: E2E, authorization and load tests",
        ],
        architecture: {
            caption: "High-level architecture — FarmilyGo",
            layers: [
                {
                    name: "Clients",
                    nodes: [
                        { label: "Web app", detail: "Next.js 16 · 4 workspaces" },
                        { label: "Mobile app", detail: "Expo · React Native · NativeWind" },
                    ],
                },
                {
                    name: "API",
                    nodes: [
                        { label: "NestJS 11 REST", detail: "/api/v1 · Swagger" },
                        { label: "Catalog & bookings" },
                        { label: "Messaging", detail: "server-sent events" },
                        { label: "Search & recommendations" },
                        { label: "AI assist" },
                    ],
                },
                {
                    name: "Cross-cutting",
                    nodes: [
                        { label: "Better Auth", detail: "RBAC · 2FA · SMS OTP" },
                        { label: "Rate limiting" },
                        { label: "Health checks · cron jobs" },
                        { label: "Audit & consent" },
                    ],
                },
                {
                    name: "Data",
                    nodes: [
                        { label: "PostgreSQL", detail: "PostGIS + pgvector" },
                        { label: "Prisma", detail: "shared database package" },
                        { label: "MinIO", detail: "images" },
                    ],
                },
                {
                    name: "External",
                    nodes: [
                        { label: "Anthropic Claude", detail: "vision + text" },
                        { label: "Voyage embeddings" },
                        { label: "Maps & geocoding" },
                        { label: "Weather API", detail: "cached" },
                    ],
                },
            ],
            notes: [
                "Web and mobile share one API and one Prisma schema package — a single source of truth for data.",
                "External API usage is logged per call to keep third-party costs visible.",
            ],
        },
        decisions: [
            {
                title: "Separate NestJS API instead of Next.js route handlers",
                why: "Web and mobile share the same business logic, validation, jobs and webhooks.",
                tradeoff: "Two deployables and an extra network hop for the web app.",
            },
            {
                title: "Vectors and geodata inside PostgreSQL",
                why: "pgvector and PostGIS keep search, recommendations and distance queries in one transactional store.",
                tradeoff: "A dedicated search engine would scale further; not needed at this stage.",
            },
            {
                title: "Server-sent events for messaging",
                why: "One-way push over plain HTTP is enough for notifications; sends go through REST.",
                tradeoff: "No bidirectional channel — fine for chat-style inquiries, not for collaborative editing.",
            },
            {
                title: "Workspaces gated in server components",
                why: "Role checks happen before any UI renders, and multi-role users can switch workspace.",
                tradeoff: "More routing structure to maintain across four workspaces.",
            },
        ],
        challenges: [
            "Serving three audiences with different permissions without duplicating screens.",
            "Making AI image analysis work with private object storage (images are converted before being sent to the model).",
            "Validating embedding vectors before they reach SQL to prevent malformed casts.",
        ],
        approach: [
            "Turborepo + pnpm monorepo with shared UI, utilities, config and database packages.",
            "NestJS feature modules for catalog, bookings, orders, inquiries, messaging, search, recommendations, maps and admin.",
            "AI listing assistant with Claude: product suggestions with confidence from a photo, plus generated descriptions and taglines.",
            "Semantic search and recommendations over Voyage embeddings stored in pgvector.",
            "Playwright E2E suites for checkout, workspaces and access control; authorization tests; k6 load scenarios for search and peak traffic.",
        ],
        impact: [
            "One codebase delivers web, mobile and API with consistent data and permissions.",
            "Farmers can create listings faster with AI-drafted descriptions.",
            "Critical flows are covered by automated E2E and load tests.",
        ],
        stack: ["Next.js 16", "NestJS 11", "Expo", "React Native", "TypeScript", "PostgreSQL", "PostGIS", "pgvector", "Prisma", "Better Auth", "Anthropic API", "Playwright", "k6"],
        learning: "Shared packages and strict workspace boundaries are what keep a three-app monorepo maintainable.",
    },

    // ── Architecture & R&D ───────────────────────────────────────────────────
    {
        slug: "agentic-engineering-workflow",
        title: "My Agentic Engineering Workflow",
        org: "Personal R&D",
        category: "rnd",
        ai: true,
        period: "2025 – Present",
        tagline: "Spec-driven development with Claude Code and Codex: phase subagents, multi-agent review and persistent memory.",
        summary:
            "How I build software with AI agents every day, in Claude Code and Codex: a spec-driven pipeline where specialized subagents explore, propose, specify, design, plan, implement and verify — reviewed by a panel of agents and backed by persistent memory.",
        metrics: [
            { value: "8", label: "Spec-driven phases, one subagent each" },
            { value: "5", label: "Reviewer agents (4 lenses + refuter)" },
            { value: "2", label: "Independent judges for critical changes" },
            { value: "2", label: "Agents: Claude Code & Codex" },
        ],
        problem:
            "Unstructured AI coding produces fast but inconsistent results: lost context between sessions, unreviewed assumptions and drift from the architecture.",
        approach: [
            "Spec-driven development: explore → propose → spec → design → tasks → apply → verify → archive, each phase run by a dedicated subagent with its own instructions and artifacts.",
            "A review panel of four lenses — readability, reliability, resilience and risk — plus a refuter that challenges findings before they are accepted.",
            "Two independent judges review critical changes blind, and a fix agent applies only the findings both agree on.",
            "Engram MCP gives agents durable memory of decisions, root causes and conventions across sessions and projects.",
            "Shared CLAUDE.md / AGENTS.md files, skills and ADRs encode architecture rules so both Claude Code and Codex follow them by default.",
        ],
        flow: ["Explore", "Propose", "Spec", "Design", "Tasks", "Apply", "Verify", "Archive"],
        impact: [
            "The same principles power my professional legacy migration and every R&D project on this site.",
            "Decisions are written down once and reused by every future session — and by every agent.",
        ],
        stack: ["Claude Code", "Codex", "Subagents", "Skills", "Slash commands", "MCP", "Engram", "AGENTS.md", "ADRs"],
        learning:
            "The leverage of AI-assisted development comes from process design: small verifiable steps, explicit artifacts and independent review.",
    },
    {
        slug: "human-in-the-loop-content-pipeline",
        title: "Human-in-the-Loop LLM Content Pipeline",
        org: "Personal R&D",
        category: "rnd",
        ai: true,
        period: "2026",
        tagline: "Generate → validate → LLM review → human approval → TTS, with immutable revisions and full provenance.",
        summary:
            "The editorial side of HelloTCF: a platform that uses LLMs to plan and draft original listening-comprehension exams while keeping humans in charge — nothing reaches text-to-speech until a person approves an exact, frozen revision.",
        metrics: [
            { value: "5", label: "Gated pipeline stages" },
            { value: "39", label: "Planned items per exam blueprint" },
            { value: "2", label: "Implementations (TS & Python)" },
        ],
        problem:
            "Raw LLM output is not trustworthy enough to publish: questions can be ambiguous, off-level or have more than one right answer — and generating audio for bad content wastes money.",
        approach: [
            "An exam planner produces a blueprint of 39 planned item specifications; approving it authorizes content generation only, never audio.",
            "A generator drafts each item as structured JSON, validated by schemas (Zod in TypeScript, Pydantic in Python) and deterministic domain rules — invalid output is rejected, not silently repaired.",
            "An independent LLM reviewer (separate prompt and context) scores quality, difficulty, ambiguity and fidelity to the blueprint.",
            "Editors review and edit in the web app; every edit creates an immutable revision, and approval freezes an exact version.",
            "TTS runs only on an explicit request for an approved revision, in idempotent background jobs, recording provider, model, prompt version and cost.",
        ],
        flow: ["Blueprint", "LLM generator", "Schema + rules", "LLM reviewer", "Human approval", "TTS job"],
        impact: [
            "Quality gates are explicit and auditable; each stage has one responsibility.",
            "Built twice — a Turborepo/BullMQ TypeScript monorepo and a FastAPI/Dramatiq Python service — to compare trade-offs.",
        ],
        stack: ["Python", "FastAPI", "Pydantic", "SQLAlchemy", "Dramatiq", "TypeScript", "BullMQ", "PostgreSQL", "MinIO/S3", "Anthropic API"],
        learning: "LLM-as-judge is a useful gate, not a replacement for human approval. Versioning prompts, outputs and approvals makes AI content auditable.",
    },
    {
        slug: "speech-evaluation-pipeline",
        title: "Speech Evaluation Pipeline: STT + Metrics + LLM",
        org: "Personal R&D",
        category: "rnd",
        ai: true,
        period: "2026",
        status: "In development",
        tagline: "Grading spoken answers with transcripts, objective fluency metrics and rubric-based structured LLM output.",
        summary:
            "An AI-assisted simulator for an English proficiency exam, designed as a hexagonal modular monolith with an async AI worker and one provider port per AI capability — documented in 14 ADRs.",
        metrics: [
            { value: "14", label: "Architecture decision records" },
            { value: "5", label: "AI capability ports" },
            { value: "4", label: "Evaluation steps" },
        ],
        problem: "An LLM reading only a transcript cannot judge how someone sounds: pauses, fluency and pronunciation are lost in plain text.",
        approach: [
            "Four steps in a worker: speech-to-text with word timestamps, pure-domain metrics (words per minute, long pauses, fillers, low-confidence words), an LLM evaluator with a versioned rubric prompt, then persistence of scores and AI usage.",
            "Confidence is never fabricated: transcripts carry their real granularity (word, segment or none) and metrics degrade accordingly.",
            "One port per capability — Evaluator, Transcriber, ContentGenerator, ImageGenerator, SpeechSynthesizer — configurable at runtime.",
            "Screaming + hexagonal architecture enforced by lint boundary rules; Vitest unit, integration and storage-contract suites.",
        ],
        flow: ["Audio", "STT + timestamps", "Fluency metrics", "LLM rubric eval", "Validated JSON", "Scores + cost"],
        impact: ["Feedback that reflects delivery, not just words.", "Providers can be swapped as prices change, with the cost of every call tracked."],
        stack: ["Next.js 16", "TypeScript", "Vercel AI SDK", "Zod", "pg-boss", "PostgreSQL", "Prisma", "Vitest", "k3s"],
        learning: "Deterministic signal extraction plus an LLM judge is more trustworthy than asking the model to infer everything.",
    },
    {
        slug: "homelab-k3s",
        title: "Homelab: Self-Hosted Production Platform",
        org: "Personal R&D",
        category: "rnd",
        ai: false,
        period: "2025 – Present",
        status: "Running this site",
        tagline: "Proxmox virtualization, an OPNsense firewall, a k3s cluster, dedicated data services and automated off-site backups.",
        summary:
            "The infrastructure that runs my R&D projects — including this portfolio and HelloTCF — operated like production: virtualization across two Proxmox nodes, network security, a Kubernetes cluster for stateless workloads, dedicated database, cache and object-storage services, CI/CD, monitoring and daily backups with off-site copies.",
        metrics: [
            { value: "2", label: "Proxmox virtualization nodes" },
            { value: "3", label: "k3s cluster nodes" },
            { value: "Daily", label: "Automated database & storage backups" },
            { value: "2", label: "Independent off-site backup copies" },
        ],
        features: [
            "Virtual machines and LXC containers across two Proxmox nodes",
            "OPNsense firewall and a site-to-site VPN in front of the network",
            "k3s cluster with Traefik ingress and automatic TLS",
            "Dedicated PostgreSQL, Redis and MinIO (S3-compatible) services outside the cluster",
            "Private container registry and push-to-deploy CI/CD",
            "Prometheus monitoring, migration jobs and a documented restore path",
        ],
        problem:
            "Run web apps, AI workers, databases and object storage continuously — without cloud bills — while practicing the operational side of engineering: isolation, security, deployments, monitoring and recovery.",
        responsibilities: [
            "Design and operation of the virtualization, network and cluster layers",
            "Provisioning of database, cache and storage services",
            "CI/CD pipelines, backups and restore procedures",
        ],
        architecture: {
            caption: "High-level architecture — homelab",
            layers: [
                {
                    name: "Edge & security",
                    nodes: [
                        { label: "Cloudflare DNS" },
                        { label: "OPNsense firewall" },
                        { label: "Site-to-site VPN", detail: "to an off-site node" },
                        { label: "Traefik v3 + cert-manager", detail: "Let's Encrypt DNS-01" },
                    ],
                },
                {
                    name: "Virtualization",
                    nodes: [
                        { label: "Proxmox node A" },
                        { label: "Proxmox node B" },
                        { label: "VMs & LXC containers" },
                    ],
                },
                {
                    name: "Kubernetes (k3s)",
                    nodes: [
                        { label: "3 nodes" },
                        { label: "Web apps & AI workers" },
                        { label: "Migration jobs" },
                        { label: "Prometheus", detail: "kube-prometheus-stack" },
                    ],
                },
                {
                    name: "Data services",
                    nodes: [
                        { label: "PostgreSQL", detail: "dedicated per project" },
                        { label: "Redis" },
                        { label: "MinIO", detail: "S3-compatible" },
                        { label: "Other database engines" },
                    ],
                },
                {
                    name: "Delivery & recovery",
                    nodes: [
                        { label: "GitHub Actions" },
                        { label: "Private registry" },
                        { label: "Backup VM", detail: "on the other Proxmox node" },
                        { label: "Off-site copies", detail: "via VPN + local" },
                    ],
                },
            ],
            notes: [
                "Stateful services live outside the cluster, so k3s workloads stay stateless and replaceable.",
                "Network addresses, hostnames and credentials are intentionally omitted.",
            ],
        },
        decisions: [
            {
                title: "Stateful services outside Kubernetes",
                why: "Databases and object storage get dedicated containers with their own lifecycle and backups; the cluster stays disposable.",
                tradeoff: "More hosts to patch and monitor than an all-in-cluster setup.",
            },
            {
                title: "Backup server on a different Proxmox node",
                why: "A single node failure can't take out production data and its backup at the same time.",
                tradeoff: "Backups depend on the network between nodes.",
            },
            {
                title: "Dated database dumps, mirrored media",
                why: "Daily pg_dump files give point-in-time restores with 14-day retention; media buckets are mirrored to avoid duplicating large files every day.",
                tradeoff: "A deletion in object storage propagates to the mirror, so media has no history.",
            },
            {
                title: "Two independent off-site copies",
                why: "One copy over a site-to-site VPN and one on a separate local machine protect against losing the whole lab.",
                tradeoff: "More moving parts to verify regularly.",
            },
        ],
        challenges: [
            "pg_dump refused to back up a newer PostgreSQL major version — fixed by installing the matching client from the official repository.",
            "A backup VM defaulting to UTC made the nightly job run at the wrong local time — caught and aligned to the same timezone as the data hosts.",
        ],
        approach: [
            "Proxmox on two nodes hosting VMs and LXC containers; the network sits behind an OPNsense firewall with a site-to-site VPN to an off-site node.",
            "k3s cluster with Traefik v3 ingress (Helm) and cert-manager issuing Let's Encrypt certificates through Cloudflare DNS-01 challenges.",
            "PostgreSQL, Redis and MinIO run as dedicated services outside the cluster; Kubernetes Secrets inject connection settings.",
            "GitHub Actions builds images, pushes them to a private registry and rolls out deployments; migration jobs run before each rollout.",
            "A backup VM runs daily database dumps and media mirroring, then copies them off-site.",
            "Runbooks document how to onboard a project (namespace, deployment, service, ingress) and how backups work.",
        ],
        flow: ["git push", "GitHub Actions", "Docker build", "Private registry", "Migration job", "Rollout + TLS"],
        extraFlows: [
            {
                label: "nightly backup",
                steps: ["pg_dump (daily)", "Mirror media buckets", "14-day retention", "Off-site copy via VPN", "Local off-site copy"],
            },
        ],
        impact: [
            "Every project on this site deploys with a git push.",
            "Production-style recovery: daily backups with two independent off-site copies.",
            "Hands-on experience operating what I build — virtualization, networking, certificates, upgrades and backups.",
        ],
        stack: ["Proxmox", "LXC", "OPNsense", "Kubernetes (k3s)", "Traefik", "cert-manager", "Cloudflare", "PostgreSQL", "Redis", "MinIO", "Docker", "GitHub Actions", "Prometheus"],
        learning:
            "Owning the platform end to end makes you a better application engineer: you design for health checks, migrations, rollouts and restores from day one.",
    },
    {
        slug: "multi-tenant-logistics-prototype",
        title: "Multi-Tenant Logistics SaaS Prototype",
        org: "Personal R&D",
        category: "rnd",
        ai: true,
        period: "2026",
        status: "Paused",
        tagline: "Architecture prototype: Go services, schema-per-tenant isolation and an opt-in Python AI orchestrator.",
        summary:
            "A paused architecture exploration for a multi-tenant supply-chain platform. It is a foundation and a set of designs — not a production system — built with spec-driven development to stress-test tenancy, identity and AI boundaries.",
        metrics: [
            { value: "5", label: "Backend services scaffolded" },
            { value: "3", label: "Front ends scaffolded" },
            { value: "Paused", label: "Foundation built, domain logic not started" },
        ],
        problem: "Multi-tenant SaaS needs strict data isolation, centralized identity and AI features that never sit on the critical path.",
        approach: [
            "Implemented: platform foundation — Go services (API gateway, core, platform admin, auth) in a go.work workspace, a local stack with PostgreSQL, Redis, NATS JetStream and self-hosted ZITADEL, and Next.js / Expo app shells.",
            "Prototyped: a Python FastAPI + ARQ AI orchestrator kept opt-in and outside the critical path.",
            "Designed: per-tenant schemas with directory-resolved connections, control-plane / tenant-data separation and audited support access.",
            "Planned (not built): TMS/WMS domain logic, route optimization and load matching.",
        ],
        impact: ["A reusable reference architecture and tenant-isolation checklists."],
        stack: ["Go", "Python", "FastAPI", "PostgreSQL", "NATS JetStream", "ZITADEL", "Redis", "Next.js", "Expo"],
        learning: "Boundaries first: identity, tenancy and AI each deserve their own seams before any domain code exists.",
    },
    {
        slug: "parametric-cad-lab",
        title: "Parametric CAD Engine & Image-to-3D Lab",
        org: "Personal R&D",
        category: "rnd",
        ai: true,
        period: "2026",
        tagline: "Spec-driven parametric parts exported to STEP and STL, next to an AI image-to-3D pipeline.",
        summary: "A Python lab that combines an upstream image-to-3D AI pipeline with my hexagonal CAD engine for precise, printable parts.",
        metrics: [
            { value: "STEP", label: "For Fusion 360" },
            { value: "STL", label: "For 3D printing" },
        ],
        problem: "AI-generated meshes are not precise enough for functional parts, and CAD parameters get lost between tools.",
        approach: [
            "A CAD engine with a hexagonal layout: domain rules know nothing about CadQuery, FastAPI or trimesh.",
            "Parameters live in a spec file where every number carries a source and status, so assumptions stay visible in each build report.",
            "Mesh and B-rep kept separate: STEP is the source of truth, STL a derived artifact; GPU work runs on RunPod.",
        ],
        impact: ["Reproducible, documented parts instead of one-off models."],
        stack: ["Python", "CadQuery", "FastAPI", "trimesh", "RunPod"],
        learning: "Treat geometry like code: specs, provenance and builds you can reproduce.",
    },
    {
        slug: "observability-stack",
        title: "Microservices Observability Stack",
        org: "Personal R&D",
        category: "rnd",
        ai: false,
        period: "2026",
        tagline: "Structured logging from NestJS and Next.js into Elasticsearch and Kibana.",
        summary: "A reference stack for structured logs across services communicating over NATS.",
        metrics: [{ value: "4", label: "Pipeline components" }],
        problem: "Debugging distributed services requires correlated, structured logs in one place.",
        approach: [
            "Pino structured JSON logs from a NestJS gateway, a NATS microservice and a Next.js app.",
            "Vector collects stdout and forwards it to Elasticsearch; Kibana dashboards for search and visualization.",
        ],
        impact: ["A reusable logging baseline for my services."],
        stack: ["NestJS", "NATS", "Pino", "Vector", "Elasticsearch", "Kibana", "Turborepo"],
        learning: "Decide the log schema before the first service goes live.",
    },
];

/** Projects shown on the home page, in order. */
export const homeProjectSlugs = ["deliverysuite-driver", "enterprise-api-modernization", "hellotcf"];

/** Every project URL a project exposes as public evidence (store listings, live site). */
export function projectLinks(project: Project): ProjectLink[] {
    if (project.links) return project.links;
    if (project.url) return [{ label: "Visit " + project.url.replace(/^https?:\/\//, ""), href: project.url }];
    return [];
}
