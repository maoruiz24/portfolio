"use client";

import SectionHeading from "@/components/SectionHeading";
import { siteConfig } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Code2, Heart, Rocket, Target, Users } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 md:px-8 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <div className="space-y-12">
                    <SectionHeading
                        title="End-to-end ownership. Scalable results."
                        subtitle="I build systems that grow with your business, focusing on measurable outcomes and technical excellence."
                    />

                    <div className="prose prose-invert prose-lg text-muted-foreground space-y-6">
                        <p>
                            I'm Ivan Ruiz, a Senior Full-Stack Engineer based in Mississauga, Ontario. My career has been defined by a passion for solving complex architectural puzzles and delivering high-performance applications that serve thousands of users.
                        </p>
                        <p>
                            Throughout my journey, I've developed a preference for <strong className="text-foreground">measurable outcomes</strong>. Whether it's reducing server costs through efficient cloud-native patterns or improving user satisfaction by 25% through a platform redesign, I believe engineering should always be tied to impact.
                        </p>
                        <p>
                            Currently, I am deeply focused on <strong className="text-foreground">multi-tenant SaaS architectures</strong> and the integration of AI modules to drive operational efficiency. I enjoy the challenge of building isolated, secure, and cost-aware systems that can scale from an initial prototype to a robust enterprise solution.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                <Target className="h-6 w-6 text-primary" />
                            </div>
                            <h4 className="font-bold text-xl">Impact Driven</h4>
                            <p className="text-muted-foreground">Every line of code should move the needle. I focus on performance, reliability, and time-to-market.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                <Rocket className="h-6 w-6 text-primary" />
                            </div>
                            <h4 className="font-bold text-xl">Architecture First</h4>
                            <p className="text-muted-foreground">Building the right foundation ensures scalability. I specialize in microservices and multi-tenant isolation.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                <Users className="h-6 w-6 text-primary" />
                            </div>
                            <h4 className="font-bold text-xl">Team Leadership</h4>
                            <p className="text-muted-foreground">Experience leading and mentoring teams, establishing QA processes, and fostering a culture of excellence.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                <Heart className="h-6 w-6 text-primary" />
                            </div>
                            <h4 className="font-bold text-xl">Lifelong Learner</h4>
                            <p className="text-muted-foreground">From homelab experiments to continuous learning and cloud-native engineering, I stay at the forefront of modern engineering.</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-12">
                    {/* Visual card or image placeholder */}
                    <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-gradient-to-tr from-primary/20 via-primary/5 to-purple-500/20 border border-primary/20 group">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Code2 className="h-48 w-48 text-primary/10 group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <div className="absolute bottom-12 left-12 right-12 glass p-8 rounded-2xl border-white/10 space-y-4">
                            <h3 className="text-2xl font-bold">Ivan Ruiz</h3>
                            <p className="text-muted-foreground">Senior Full-Stack Engineer</p>
                            <div className="flex gap-4">
                                <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/20">C# / .NET</Badge>
                                <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/20">Node.js</Badge>
                                <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/20">Next.js</Badge>
                            </div>
                        </div>
                    </div>

                    <div className="bg-muted/30 p-8 rounded-3xl border border-muted/50">
                        <h4 className="font-bold mb-4">Values I code by:</h4>
                        <ul className="space-y-3">
                            <li className="flex gap-3 text-muted-foreground">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2" />
                                <span>Simplicity over complexity until complexity is necessary.</span>
                            </li>
                            <li className="flex gap-3 text-muted-foreground">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2" />
                                <span>Security and performance are not features, they are requirements.</span>
                            </li>
                            <li className="flex gap-3 text-muted-foreground">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2" />
                                <span>Documentation is as important as the implementation.</span>
                            </li>
                            <li className="flex gap-3 text-muted-foreground">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2" />
                                <span>Automate the repetitive to focus on the creative.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="text-center lg:text-left">
                        <Button asChild size="lg" className="h-14 px-10 text-lg">
                            <Link href="/contact">
                                Work with me <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
