"use client";

import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import SkillsGrid from "@/components/SkillsGrid";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/data/projects";
import { experiences } from "@/lib/data/experience";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Code2, Database, Globe, Layers, Settings, Zap } from "lucide-react";
import CopyEmailButton from "@/components/CopyEmailButton";
import { staggerContainer, sectionReveal } from "@/lib/motion";

export default function Home() {
  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);
  const experienceHighlights = experiences.slice(0, 3);

  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <section id="about" className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <SectionHeading
            title="Senior Full-Stack Engineer with a product mindset."
            subtitle="I specialize in building end-to-end systems that don't just work—they scale. My approach combines technical rigor with a focus on business impact and user experience."
          />
          <div className="space-y-6 text-lg text-muted-foreground">
            <p>
              With over 15 years of experience across startups and large enterprises, I've led development teams to ship complex platforms, from Colombian telecommunications infrastructure to modern Canadian SaaS solutions.
            </p>
            <p>
              I believe in the power of clear architecture, measurable performance, and ownership. Whether it's optimizing a SQL query to save 35% in latency or architecting a multi-tenant microservices layer, I focus on delivering reliability and value.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-lg text-sm font-medium">
                <Globe className="h-4 w-4 text-primary" /> End-to-End Delivery
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-lg text-sm font-medium">
                <Layers className="h-4 w-4 text-primary" /> Cloud Native
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-lg text-sm font-medium">
                <Zap className="h-4 w-4 text-primary" /> Performance-Focused
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="container mx-auto px-4 md:px-8">
        <SectionHeading
          title="Technical Arsenal"
          subtitle="A comprehensive stack focused on reliability, scale, and modern delivery."
          centered
        />
        <SkillsGrid />
      </section>

      {/* Current Focus Section */}
      <section className="container mx-auto px-4 md:px-8 bg-primary/5 py-24 rounded-3xl border border-primary/10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                <Settings className="h-3 w-3" /> Current Focus
              </div>
              <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight">
                Multi-Tenant SaaS & AI Architecture
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                I'm currently architecting a high-scale logistics platform (TMS) with a focus on strict tenant isolation, subdomain routing, and AI-driven operational automation.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-background border border-border/50">
                  <h4 className="font-bold mb-1">Tenancy Isolation</h4>
                  <p className="text-sm text-muted-foreground">Shared services vs tenant-scoped data boundaries using PostgreSQL schemas.</p>
                </div>
                <div className="p-4 rounded-xl bg-background border border-border/50">
                  <h4 className="font-bold mb-1">Cost-Aware Scaling</h4>
                  <p className="text-sm text-muted-foreground">Homelab-to-cloud transition strategy using Kubernetes and MinIO.</p>
                </div>
                <div className="p-4 rounded-xl bg-background border border-border/50">
                  <h4 className="font-bold mb-1">AI Module (RAG)</h4>
                  <p className="text-sm text-muted-foreground">Operational automation using vector embeddings and LLM assistants.</p>
                </div>
                <div className="p-4 rounded-xl bg-background border border-border/50">
                  <h4 className="font-bold mb-1">Cloud Resilience</h4>
                  <p className="text-sm text-muted-foreground">Microservices with RabbitMQ for decoupling and Redis for distributed caching.</p>
                </div>
              </div>
              <Button asChild variant="outline" className="mt-6 group">
                <Link href="/projects/multi-tenant-logistics-saas">
                  Read Case Study <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
            <div className="flex-1 w-full aspect-square md:aspect-auto md:h-full min-h-[400px] bg-gradient-to-br from-primary/20 via-primary/5 to-purple-500/20 rounded-2xl border border-primary/20 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <Database className="h-64 w-64 text-primary animate-pulse" />
              </div>
              <div className="relative z-10 p-8 glass rounded-xl border-white/20 shadow-2xl space-y-4 max-w-sm">
                <div className="h-2 w-20 bg-primary rounded-full" />
                <p className="text-sm font-mono text-primary/80 tracking-widest">ARCHITECTURE SNAPSHOT</p>
                <div className="space-y-2">
                  <div className="h-8 w-full bg-primary/20 rounded flex items-center px-3 text-[10px] font-mono">Next.js 15 App Router</div>
                  <div className="h-8 w-full bg-primary/15 rounded flex items-center px-3 text-[10px] font-mono">API GATEWAY + IAM</div>
                  <div className="h-8 w-full bg-primary/10 rounded flex items-center px-3 text-[10px] font-mono">TENANT-SCOPED SERVICES</div>
                  <div className="h-8 w-full bg-primary/5 rounded flex items-center px-3 text-[10px] font-mono">PRISMA + PG MULTI-SCHEMA</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <SectionHeading
            title="Featured Projects"
            subtitle="Selected work from high-impact migrations to enterprise SaaS redesigns."
            className="mb-0"
          />
          <Button asChild variant="ghost" className="group">
            <Link href="/projects">
              View All Work <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* Experience Highlights */}
      <section className="container mx-auto px-4 md:px-8">
        <SectionHeading
          title="Career Journey"
          subtitle="Helping companies scale through engineering excellence."
          centered
        />
        <div className="max-w-4xl mx-auto space-y-8">
          {experienceHighlights.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-6 rounded-2xl border border-muted/50 hover:border-primary/30 transition-all bg-card/50"
            >
              <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-2">
                <div>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{exp.role}</h3>
                  <p className="text-muted-foreground">{exp.company} • {exp.period}</p>
                </div>
                <div className="text-sm font-medium px-3 py-1 bg-primary/5 text-primary rounded-full border border-primary/10">
                  {exp.location}
                </div>
              </div>
              <p className="text-muted-foreground line-clamp-2 italic mb-4">
                &quot;{exp.impact}&quot;
              </p>
              <Button asChild variant="link" className="p-0 h-auto group-hover:text-primary">
                <Link href="/experience" className="flex items-center">
                  See full details <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          ))}
          <div className="text-center pt-8">
            <Button asChild size="lg" variant="outline">
              <Link href="/experience">View Full Timeline</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto rounded-3xl p-8 md:p-16 text-center space-y-8 relative overflow-hidden border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent">
          <SectionHeading
            title="Let's build something exceptional."
            subtitle="I'm always open to discussing new opportunities, technical challenges, or architecture reviews."
            centered
            className="mb-0"
          />
          <div className="flex justify-center">
            <CopyEmailButton />
          </div>
        </div>
      </section>
    </div>
  );
}
