export type ProjectGroup = "professional" | "lab" | "earlier";

export interface ProjectMetric {
    value: string;
    label: string;
}

export interface Project {
    slug: string;
    title: string;
    /** Where the work happened, e.g. "Nology Solutions" or "Personal R&D". */
    org: string;
    group: ProjectGroup;
    /** True when LLMs / agents are central to the project. */
    ai: boolean;
    featured: boolean;
    period: string;
    status?: string;
    tagline: string;
    summary: string;
    metrics: ProjectMetric[];
    problem: string;
    approach: string[];
    /** Optional pipeline rendered as a step diagram on the case-study page. */
    flow?: string[];
    impact: string[];
    stack: string[];
    learning: string;
}

export const groupLabels: Record<ProjectGroup, string> = {
    professional: "Professional",
    lab: "R&D Lab",
    earlier: "Earlier career",
};

export const projects: Project[] = [
    // ── AI ───────────────────────────────────────────────────────────────────
    {
        slug: "ai-assisted-legacy-migration",
        title: "AI-Assisted Legacy Migration to .NET 10",
        org: "Nology Solutions",
        group: "professional",
        ai: true,
        featured: true,
        period: "2026",
        status: "In progress",
        tagline: "Subagents, skills and MCP porting a legacy logistics backend into three Clean Architecture APIs.",
        summary:
            "I designed the target architecture for DeliverySuite's backend and an agentic workflow in Claude Code that migrates legacy handlers operation by operation — with tests, preserved contracts and a tracker that acts as shared state between AI sessions.",
        metrics: [
            { value: "3", label: "Independent .NET 10 APIs" },
            { value: "96", label: "xUnit tests" },
            { value: "9", label: "Custom subagents" },
            { value: "0", label: "Breaking changes to the shipped app" },
        ],
        problem:
            "The product's backend lived in legacy ASP.NET handlers — the largest around 2,300 and 1,900 lines — plus a legacy driver API. A rewrite had to happen without breaking the mobile app already in the stores, and with a single developer carrying most of the load.",
        approach: [
            "Designed a unified API (Clean Architecture, CQRS with MediatR, FluentValidation, Serilog, JWT + refresh tokens), then split it into three independently deployable APIs — Web/Public, Driver and WMS — so one failure cannot take down the others.",
            "Phase 1 wraps existing stored procedures with Dapper to move fast safely; phase 2 moves logic into the domain with EF Core.",
            "Built per-repo agent pairs: a read-only legacy analyst that inventories every operation in a handler, and a migrator that ports it into the new architecture with tests and updates the tracker.",
            "Chained them in a migrate-legacy skill per API, plus slash commands to scaffold CQRS commands/queries and wrap stored procedures.",
            "Connected a SQL Server MCP server for schema-aware work and Engram persistent memory so long migrations resume across sessions without re-explaining context.",
            "Enforced a repo rule: every new route ships with tests.",
        ],
        flow: ["Legacy handler", "Analyst subagent", "Operation inventory", "Migrator subagent", "CQRS + tests", "Tracker update"],
        impact: [
            "Driver API already serves login and load lists with the legacy response contract preserved.",
            "WMS API backs the new WMS mobile app: login, inbound/outbound lists, barcode scan and inquiry.",
            "Migration state lives in versioned trackers, so humans and agents work from the same source of truth.",
        ],
        stack: [".NET 10", "ASP.NET Core", "CQRS", "MediatR", "Dapper", "SQL Server", "xUnit", "Claude Code", "MCP", "Engram"],
        learning:
            "Agents are most reliable when the work is decomposed into narrow, verifiable steps with an explicit artifact between them — an inventory, a test, a tracker row — instead of one large prompt.",
    },
    {
        slug: "llm-gateway-fallback",
        title: "Multi-Provider LLM Gateway with Fallback Chains",
        org: "Personal R&D",
        group: "lab",
        ai: true,
        featured: true,
        period: "2026",
        tagline: "Provider-agnostic LLM layer with circuit breakers, cost logging, RAG and an AI speaking examiner.",
        summary:
            "The AI core of a language-exam practice platform I built as personal R&D: grading of writing and speaking, a RAG assistant and a conversational examiner — all behind one provider-agnostic layer that survives quota errors and outages.",
        metrics: [
            { value: "8", label: "Provider adapters" },
            { value: "3-tier", label: "Fallback chain per use case" },
            { value: "RAG", label: "Assistant over pgvector" },
            { value: "129", label: "Commits" },
        ],
        problem:
            "AI features depended on several providers with different prices, quotas and failure modes. A single provider outage or exhausted quota could block grading for every user, and costs were invisible.",
        approach: [
            "Defined one LLM interface with adapters for Anthropic, OpenAI, Gemini, Groq, DeepSeek, ElevenLabs, Fish Audio and OpenAI TTS.",
            "Admin-configurable model chains per usage context (primary, backup, backup 2), resolved from the database with a TTL cache; API keys encrypted at rest and decrypted only in memory.",
            "A circuit breaker persisted in PostgreSQL (CLOSED → OPEN → HALF_OPEN) that opens immediately on quota, auth or rate-limit errors and after repeated transient failures — state survives stateless instances.",
            "Structured grading of writing and speaking against rubrics, with Whisper-based transcription and timeouts plus retries around every call.",
            "RAG assistant over pgvector embeddings (1,536-dimension), and embedding-based de-duplication of generated examiner phrases.",
            "Every call logs provider, model, tokens and cost for usage analytics.",
        ],
        flow: ["Request", "Resolve model chain", "Circuit-breaker check", "Provider adapter", "Validate JSON", "Log tokens & cost"],
        impact: [
            "A failing or exhausted model is skipped automatically; users degrade gracefully instead of seeing errors.",
            "Switching models is a configuration change, not a deploy.",
            "Per-call cost visibility made it possible to route cheaper models to low-stakes tasks.",
        ],
        stack: ["TypeScript", "Next.js 16", "PostgreSQL", "pgvector", "Prisma", "Anthropic API", "OpenAI API", "Whisper", "TTS"],
        learning:
            "Production LLM work is mostly distributed-systems work: timeouts, retries, circuit breakers, idempotency and observability matter more than the prompt.",
    },
    {
        slug: "human-in-the-loop-content-pipeline",
        title: "Human-in-the-Loop LLM Content Pipeline",
        org: "Personal R&D",
        group: "lab",
        ai: true,
        featured: true,
        period: "2026",
        tagline: "Generate → validate → LLM review → human approval → TTS, with immutable revisions and full provenance.",
        summary:
            "An editorial platform that uses LLMs to plan and draft original listening-comprehension exams while keeping humans in charge: nothing reaches text-to-speech until a person approves an exact, frozen revision.",
        metrics: [
            { value: "5", label: "Gated pipeline stages" },
            { value: "39", label: "Planned items per exam blueprint" },
            { value: "2", label: "Implementations (TS & Python)" },
            { value: "0", label: "Audio without human approval (by design)" },
        ],
        problem:
            "Raw LLM output is not trustworthy enough to publish: questions can be ambiguous, off-level or have more than one right answer — and generating audio for bad content wastes money.",
        approach: [
            "An exam planner produces a blueprint of 39 planned item specifications; approving it authorizes content generation only, never audio.",
            "A generator drafts each item as structured JSON, validated by schemas (Zod in the TypeScript version, Pydantic in the Python version) and deterministic domain rules — invalid output is rejected, not silently repaired.",
            "An independent LLM reviewer (separate prompt and context) scores quality, difficulty, ambiguity and fidelity to the blueprint.",
            "Editors review and edit in the web app; every edit creates a new immutable revision, and approval freezes an exact version.",
            "TTS (Fish Audio / ElevenLabs) runs only on an explicit request for an approved revision, in idempotent background jobs; audio goes to S3-compatible storage with provider, model, prompt version and cost recorded.",
        ],
        flow: ["Blueprint", "LLM generator", "Schema + rules", "LLM reviewer", "Human approval", "TTS job"],
        impact: [
            "Quality gates are explicit and auditable; each stage has a single responsibility.",
            "Provider-agnostic ports for LLM and TTS keep vendors swappable.",
            "Built twice — a Turborepo/BullMQ TypeScript monorepo and a FastAPI/Dramatiq Python service — to compare trade-offs.",
        ],
        stack: ["Python", "FastAPI", "Pydantic", "SQLAlchemy", "Dramatiq", "TypeScript", "BullMQ", "PostgreSQL", "MinIO/S3", "Anthropic API"],
        learning:
            "LLM-as-judge is a useful gate, not a replacement for human approval. Versioning prompts, outputs and approvals is what makes AI content auditable.",
    },
    {
        slug: "speech-evaluation-pipeline",
        title: "Speech Evaluation Pipeline: STT + Metrics + LLM",
        org: "Personal R&D",
        group: "lab",
        ai: true,
        featured: false,
        period: "2026",
        tagline: "Grading spoken answers with transcripts, objective fluency metrics and rubric-based structured LLM output.",
        summary:
            "An AI-assisted simulator for an English proficiency exam, built as a hexagonal modular monolith with an async AI worker and one provider port per AI capability — documented in 14 ADRs.",
        metrics: [
            { value: "14", label: "Architecture decision records" },
            { value: "5", label: "AI capability ports" },
            { value: "4", label: "Evaluation steps" },
        ],
        problem:
            "An LLM reading only a transcript cannot judge how someone sounds: pauses, fluency and pronunciation are lost in plain text.",
        approach: [
            "Four-step evaluation in a worker: speech-to-text with word timestamps, pure-domain metrics (words per minute, long pauses, fillers, low-confidence words), an LLM evaluator with a versioned rubric prompt, then persistence of scores and AI usage.",
            "Confidence is never fabricated: the transcript carries its real granularity (word, segment or none) and metrics degrade accordingly per provider.",
            "One port per capability — Evaluator, Transcriber, ContentGenerator, ImageGenerator, SpeechSynthesizer — with provider and model configurable at runtime.",
            "Screaming + hexagonal architecture enforced by lint boundary rules; Vitest unit, integration and storage-contract suites.",
        ],
        flow: ["Audio", "STT + timestamps", "Fluency metrics", "LLM rubric eval", "Validated JSON", "Scores + cost"],
        impact: [
            "Feedback that reflects delivery, not just words.",
            "Providers can be swapped as prices and credits change, with the cost of every call tracked.",
        ],
        stack: ["Next.js 16", "TypeScript", "Vercel AI SDK", "Zod", "pg-boss", "PostgreSQL", "Prisma", "Vitest", "k3s"],
        learning:
            "Combining deterministic signal extraction with an LLM judge gives more trustworthy results than asking the model to infer everything.",
    },
    {
        slug: "agentic-engineering-workflow",
        title: "My Agentic Engineering Workflow",
        org: "Personal R&D",
        group: "lab",
        ai: true,
        featured: true,
        period: "2025 – Present",
        tagline: "Spec-driven development with phase subagents, multi-agent review, adversarial judges and persistent memory.",
        summary:
            "How I build software with AI every day: a spec-driven pipeline where specialized subagents explore, propose, specify, design, plan, implement and verify — reviewed by a panel of agents and backed by persistent memory.",
        metrics: [
            { value: "8", label: "Spec-driven phases, one subagent each" },
            { value: "5", label: "Reviewer agents (4R + refuter)" },
            { value: "2", label: "Independent adversarial judges" },
            { value: "MCP", label: "Persistent memory across sessions" },
        ],
        problem:
            "Unstructured AI coding produces fast but inconsistent results: lost context between sessions, unreviewed assumptions and drift from the architecture.",
        approach: [
            "Spec-driven development (SDD): explore → propose → spec → design → tasks → apply → verify → archive, each phase run by a dedicated subagent with its own instructions and artifacts.",
            "A review panel of four lenses — readability, reliability, resilience and risk — plus a refuter agent that challenges findings before they are accepted.",
            "Two independent judges review critical changes blind, and a fix agent applies only the findings both agree on.",
            "Engram MCP gives agents durable memory of decisions, root causes and conventions across sessions and projects.",
            "Project-level CLAUDE.md / AGENTS.md, skills and ADRs encode architecture rules so agents follow them by default.",
        ],
        flow: ["Explore", "Propose", "Spec", "Design", "Tasks", "Apply", "Verify", "Archive"],
        impact: [
            "The same principles power my professional legacy migration and every R&D project on this site.",
            "Decisions are written down once and reused by every future session.",
        ],
        stack: ["Claude Code", "Subagents", "Skills", "Slash commands", "MCP", "Engram", "ADRs"],
        learning:
            "The leverage of AI-assisted development comes from process design: small verifiable steps, explicit artifacts, and independent review.",
    },

    // ── Professional ────────────────────────────────────────────────────────
    {
        slug: "driver-app-offline-first",
        title: "DeliverySuite Driver: Offline-First Mobile App",
        org: "Nology Solutions",
        group: "professional",
        ai: false,
        featured: true,
        period: "2022 – Present",
        status: "Live on App Store & Google Play",
        tagline: "A field app for delivery drivers, owned end to end from prototype to 45 store releases.",
        summary:
            "The driver app for carriers on DeliverySuite: accept loads, capture proof of pickup and delivery with photos and signatures, scan barcodes and stream background GPS to dispatch — built and owned end to end.",
        metrics: [
            { value: "45", label: "Releases (v1.0 → v1.7.6)" },
            { value: "7", label: "Expo SDK upgrades" },
            { value: "0", label: "Data loss by design (outbox)" },
            { value: "2", label: "Stores: iOS & Android" },
        ],
        problem:
            "Drivers work with unreliable connectivity. The original queues were capped at 250 and 200 items and silently dropped the oldest driver actions and GPS points; a separate freeze left drivers with no loads.",
        approach: [
            "Designed an offline-first SQLite outbox: atomic rows, delete only on server confirmation, photos stored as files instead of base64 blobs.",
            "Overhauled location tracking: migrated from expo-location to a native background-geolocation SDK, added a watchdog, health reporter, iOS recovery and an in-app GPS diagnostics screen.",
            "Root-caused the \"app frozen / no loads\" complaint — one failed GPS ping held back load refreshes for up to a 5-minute backoff — with code analysis and a 7+ hour live-device test.",
            "Fixed Android out-of-memory crashes caused by leftover background jobs from the old location library.",
            "Added silent-push remote refresh and scan-to-take-over load assignment with multi-tenant fallback.",
        ],
        flow: ["Driver action", "SQLite outbox", "Sync worker", "Driver API", "Server ack", "Row deleted"],
        impact: [
            "Shipped continuously to both stores for over 3 years, keeping pace with React Native and Expo upgrades.",
            "Eliminated by design the silent data loss of the old queues.",
            "Patterns reused in the new offline-first WMS mobile app (Expo, TanStack Query, Zustand, Zod).",
        ],
        stack: ["React Native", "Expo / EAS", "TypeScript", "Redux Toolkit", "Redux-Saga", "expo-sqlite", "Background geolocation", "Firebase", ".NET Web API"],
        learning:
            "Mobile reliability is about designing for failure first: every network call can fail, every OS can kill the app, and every queue needs an explicit acknowledgment.",
    },
    {
        slug: "wms-modernization",
        title: "WMS Order Flows & Inventory Integrity",
        org: "Nology Solutions",
        group: "professional",
        ai: false,
        featured: true,
        period: "2026",
        tagline: "Rebuilding inbound/outbound warehouse flows and fixing the data underneath them — safely.",
        summary:
            "A staged rewrite of the warehouse module's order pages and SQL Server business logic, plus a data-integrity cleanup where every change shipped with a backup and a rollback script.",
        metrics: [
            { value: "190+", label: "Inconsistent records repaired" },
            { value: "100%", label: "Changes with rollback scripts" },
            { value: "5", label: "Status transitions enforced" },
        ],
        problem:
            "Allocation logic had grown inconsistent: stock picked but not yet shipped was invisible to availability, some picks used another customer's stock, and order lines referenced lots that could never be allocated.",
        approach: [
            "Rewrote the inbound and outbound pages on DevExtreme in stages — structure first, then logic control by control — keeping the old page live as a reference.",
            "Centralized status transitions (allocated → picked → packed → shipped), FIFO allocation by receipt date, \"any lot\" lines, manual allocation by location and lot, kit validation and serial capture.",
            "Wrapped shipping in transactions and corrected every availability routine to account for picked-but-unshipped stock.",
            "Reversed 5 allocations and 28 picks of the wrong owner's stock, normalized 128 order lines and fixed 33 ship dates — each with backup tables and rollback scripts.",
            "Built a new inventory search page and an HTML/PDF report engine (Handlebars, Paged.js, headless browser) that replaces Crystal Reports.",
        ],
        impact: [
            "Inventory availability now matches physical reality.",
            "New reports need only a template, a stored procedure and a registry row — zero C# changes.",
        ],
        stack: ["SQL Server", "T-SQL", "ASP.NET", "C#", "DevExtreme", "jQuery", "Handlebars", "Paged.js"],
        learning:
            "On live operational data, the rollback plan is part of the feature. Ship small, keep the old path available, and make every data fix reversible.",
    },
    {
        slug: "tms-web-platform",
        title: "DeliverySuite TMS: 4 Years of Product Engineering",
        org: "Nology Solutions",
        group: "professional",
        ai: false,
        featured: false,
        period: "2022 – Present",
        tagline: "Continuous delivery on a multi-tenant courier and freight platform.",
        summary:
            "Main developer of the multi-tenant web platform used by carriers for order entry, pricing, dispatch, invoicing and customer portals.",
        metrics: [
            { value: "1,113", label: "Commits in the main repo" },
            { value: "~500", label: "Forced layouts found in a 14 s freeze" },
            { value: "~35%", label: "Faster core SaaS" },
        ],
        problem:
            "A large Web Forms + SQL Server product had to keep shipping features for many tenants while its performance and UI aged.",
        approach: [
            "Delivered tenant setup, cross-tab session management, dispatch-board actions, quote-to-load conversion, a responsive load-entry page, route-time calculation and single-tab edit locks.",
            "Migrated legacy controls to DevExtreme widgets and self-hosted front-end assets.",
            "Profiled a customer-selection freeze of up to ~14 s down to ~500 forced browser layouts (server and network were only ~1 s) and shipped targeted fixes.",
            "Moved slow tab data access to an async handler layer and reordered database calls on the busiest pages.",
        ],
        impact: [
            "Steady feature delivery every month since early 2023.",
            "Performance work that made the core platform measurably faster.",
        ],
        stack: ["ASP.NET Web Forms", "C#", "SQL Server", "jQuery", "DevExtreme", "Azure DevOps"],
        learning:
            "Profiling beats guessing: most \"slow server\" complaints turned out to be browser rendering problems.",
    },

    // ── R&D lab ──────────────────────────────────────────────────────────────
    {
        slug: "homelab-k3s",
        title: "Homelab: Self-Hosted Kubernetes Platform",
        org: "Personal R&D",
        group: "lab",
        ai: false,
        featured: true,
        period: "2025 – Present",
        status: "Running this site",
        tagline: "A 3-node k3s cluster with push-to-deploy CI/CD, TLS automation and a private registry.",
        summary:
            "The platform I use to run my R&D projects — including this portfolio — with the same practices as production: containers, ingress, automatic certificates, secrets and CI/CD.",
        metrics: [
            { value: "3", label: "Nodes (1 control plane + 2 workers)" },
            { value: "Auto", label: "TLS via cert-manager" },
            { value: "Push", label: "To deploy (GitHub Actions)" },
        ],
        problem:
            "I wanted to run AI workers, databases and web apps continuously without cloud bills, while practicing real platform engineering.",
        approach: [
            "k3s cluster with one control plane and two workers; Traefik v3 ingress installed via Helm.",
            "cert-manager with Let's Encrypt DNS-01 challenges through Cloudflare for automatic HTTPS.",
            "A private container registry with authentication; GitHub Actions builds images, pushes them and rolls out deployments with kubectl.",
            "PostgreSQL and S3-compatible object storage on local servers outside the cluster; Kubernetes Secrets for configuration.",
            "A documented runbook for onboarding new projects (namespace, deployment, service, ingress).",
        ],
        flow: ["git push", "GitHub Actions", "Docker build", "Private registry", "kubectl rollout", "Traefik + TLS"],
        impact: [
            "Every project on this site deploys with a git push.",
            "Hands-on experience operating what I build: uptime, certificates, upgrades and backups.",
        ],
        stack: ["Kubernetes (k3s)", "Traefik", "Helm", "cert-manager", "Cloudflare", "Docker", "GitHub Actions", "PostgreSQL"],
        learning:
            "Owning the platform end to end makes you a better application engineer: you design for health checks, migrations and rollouts from day one.",
    },
    {
        slug: "multi-tenant-platform-architecture",
        title: "Multi-Tenant Platform Architecture",
        org: "Personal R&D",
        group: "lab",
        ai: true,
        featured: false,
        period: "2026",
        status: "Paused",
        tagline: "Go services, schema-per-tenant isolation and an opt-in Python AI orchestrator.",
        summary:
            "An architecture exploration for a multi-tenant supply-chain platform, built with spec-driven development to stress-test tenancy, identity and AI-orchestration boundaries.",
        metrics: [
            { value: "5", label: "Backend services" },
            { value: "3", label: "Front ends (2 web + mobile)" },
            { value: "67", label: "Commits in the foundation phase" },
        ],
        problem:
            "Multi-tenant SaaS needs strict data isolation, centralized identity and AI features that never sit on the critical path.",
        approach: [
            "Go services (API gateway, core, platform admin, auth) in a go.work workspace; per-tenant schemas with directory-resolved connections.",
            "Self-hosted ZITADEL for identity, NATS JetStream for events, River for jobs, Redis and PostgreSQL.",
            "A Python FastAPI + ARQ AI orchestrator kept opt-in and outside the critical path.",
            "Project skills encoding tenant-isolation safety checks and service patterns for AI agents.",
        ],
        impact: ["A reusable reference architecture and checklists for tenant isolation."],
        stack: ["Go", "Python", "FastAPI", "PostgreSQL", "NATS JetStream", "ZITADEL", "Next.js", "Expo"],
        learning: "Boundaries first: identity, tenancy and AI each deserve their own seams before any domain code exists.",
    },
    {
        slug: "farm-marketplace",
        title: "Farm-to-Consumer Marketplace",
        org: "Personal R&D",
        group: "lab",
        ai: false,
        featured: false,
        period: "2026",
        tagline: "Full-stack monorepo: web, API and mobile with role-based workspaces.",
        summary:
            "A marketplace concept connecting consumers with local farms for products, experiences and stays — a full-stack exercise across web, API and mobile.",
        metrics: [
            { value: "146", label: "Commits" },
            { value: "4", label: "Role-isolated workspaces" },
            { value: "3", label: "Apps in one monorepo" },
        ],
        problem: "Practice building a complete multi-role product with shared packages and real testing.",
        approach: [
            "Turborepo + pnpm monorepo: Next.js 16 web, NestJS 11 API with Swagger, Expo mobile app and shared UI, database and utility packages.",
            "Better Auth with role-based workspaces (shop, customer, farmer, admin) gated in server components.",
            "Playwright end-to-end tests, authorization test suites and k6 load tests.",
        ],
        impact: ["A template for shipping web + mobile + API products from a single codebase."],
        stack: ["Next.js 16", "NestJS", "Expo", "Prisma", "PostgreSQL", "Better Auth", "Playwright", "k6"],
        learning: "Shared packages and strict workspace boundaries keep a three-app monorepo maintainable.",
    },
    {
        slug: "parametric-cad-lab",
        title: "Parametric CAD Engine & Image-to-3D Lab",
        org: "Personal R&D",
        group: "lab",
        ai: true,
        featured: false,
        period: "2026",
        tagline: "Spec-driven parametric parts exported to STEP and STL, next to an AI image-to-3D pipeline.",
        summary:
            "A Python lab that combines an image-to-3D AI pipeline with a hexagonal CAD engine for precise, printable parts.",
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
        group: "lab",
        ai: false,
        featured: false,
        period: "2026",
        tagline: "Structured logging from NestJS and Next.js into Elasticsearch and Kibana.",
        summary: "A reference stack for structured logs across services communicating over NATS.",
        metrics: [{ value: "4", label: "Pipeline components" }],
        problem: "Debugging distributed services requires correlated, structured logs in one place.",
        approach: [
            "Pino structured JSON logs from a NestJS gateway, a NATS microservice and a Next.js app.",
            "Vector aggregates stdout and ships to Elasticsearch; Kibana dashboards for search and visualization.",
        ],
        impact: ["A reusable logging baseline for my services."],
        stack: ["NestJS", "NATS", "Pino", "Vector", "Elasticsearch", "Kibana", "Turborepo"],
        learning: "Decide the log schema before the first service ships.",
    },

    // ── Earlier career ───────────────────────────────────────────────────────
    {
        slug: "etb-self-service-platform",
        title: "Telecom Self-Service Platform",
        org: "ETB",
        group: "earlier",
        ai: false,
        featured: false,
        period: "2021",
        tagline: "Mobile and web self-service for a national telecom, built for 10,000 concurrent users.",
        summary:
            "Redesigned the customer self-service experience on mobile and web for Colombia's oldest telecommunications company.",
        metrics: [
            { value: "~10k", label: "Concurrent users" },
            { value: "+25%", label: "Customer satisfaction" },
        ],
        problem: "The legacy self-service channels could not handle peak load and frustrated customers.",
        approach: [
            "React Native and React front ends with Redux.",
            "A Node.js + MongoDB backend designed for high concurrency.",
        ],
        impact: ["Supported ~10,000 simultaneous users and raised satisfaction by 25%."],
        stack: ["React Native", "React", "Redux", "Node.js", "MongoDB"],
        learning: "Design for peak load from the start, not after the first outage.",
    },
    {
        slug: "etb-crm",
        title: "Enterprise CRM for Fiber Operations",
        org: "ETB",
        group: "earlier",
        ai: false,
        featured: false,
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
];

export const featuredProjects = projects.filter((p) => p.featured);
