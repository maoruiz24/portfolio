"use client";

import SectionHeading from "@/components/SectionHeading";
import CopyEmailButton from "@/components/CopyEmailButton";
import { siteConfig } from "@/lib/site";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Linkedin, Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get("name");
        const subject = formData.get("subject");
        const message = formData.get("message");

        const mailtoUrl = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject as string)}&body=${encodeURIComponent(`Name: ${name}\n\n${message}`)}`;
        window.location.href = mailtoUrl;
    };

    return (
        <div className="container mx-auto px-4 md:px-8 py-24">
            <SectionHeading
                title="Get in touch"
                subtitle="Have a project in mind or just want to chat about tech? I'm always open to new connections."
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-12">
                {/* Contact Info */}
                <div className="space-y-12">
                    <div className="space-y-8">
                        <h3 className="text-2xl font-bold">Contact Information</h3>
                        <p className="text-muted-foreground text-lg">
                            Feel free to reach out via email or connect with me on professional networks. I typically respond within 24–48 hours.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Mail className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground uppercase font-bold tracking-tight">Email</p>
                                    <a href={siteConfig.links.email} className="text-lg font-medium hover:text-primary transition-colors">
                                        {siteConfig.email}
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <MapPin className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground uppercase font-bold tracking-tight">Location</p>
                                    <p className="text-lg font-medium">{siteConfig.location}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6 pt-8 border-t">
                        <h4 className="font-bold uppercase tracking-widest text-sm text-muted-foreground">Social Profiles</h4>
                        <div className="flex gap-4">
                            <Button asChild variant="outline" size="lg" className="rounded-2xl h-14 w-14 p-0">
                                <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
                                    <Github className="h-6 w-6" />
                                </a>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="rounded-2xl h-14 w-14 p-0">
                                <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer">
                                    <Linkedin className="h-6 w-6" />
                                </a>
                            </Button>
                        </div>
                    </div>

                    <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10">
                        <CopyEmailButton />
                    </div>
                </div>

                {/* Contact Form */}
                <Card className="rounded-[2.5rem] border-muted/50 bg-card/50 backdrop-blur-sm p-8 md:p-12">
                    <CardContent className="p-0">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-bold uppercase tracking-tight ml-1">Name</label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Your name"
                                    required
                                    className="h-14 rounded-2xl bg-background/50 border-muted/50 focus:ring-primary/20"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-bold uppercase tracking-tight ml-1">Subject</label>
                                <Input
                                    id="subject"
                                    name="subject"
                                    placeholder="Project inquiry, architecture review, etc."
                                    required
                                    className="h-14 rounded-2xl bg-background/50 border-muted/50 focus:ring-primary/20"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-bold uppercase tracking-tight ml-1">Message</label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    placeholder="Tell me a bit about what you're looking for..."
                                    required
                                    className="min-h-[200px] rounded-2xl bg-background/50 border-muted/50 focus:ring-primary/20 p-4"
                                />
                            </div>
                            <Button type="submit" size="lg" className="w-full h-14 rounded-2xl text-lg font-bold transition-all hover:scale-[1.02] active:scale-[0.98]">
                                Send Message
                                <Send className="ml-2 h-5 w-5" />
                            </Button>
                            <p className="text-center text-xs text-muted-foreground pt-4">
                                Note: This form will open your default email client with the message pre-filled.
                            </p>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
