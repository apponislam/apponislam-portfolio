import { pagesConfig } from "@/components/config/pages";
import { siteConfig } from "@/components/config/site";
import ContactForm from "@/components/forms/contact-form";
import PageHeader from "@/components/page-header";
import { Metadata } from "next";
import { Icons } from "@/components/icons";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Contact",
    description: "Let's connect and explore collaborations.",
    alternates: {
        canonical: `${siteConfig.url}/contact`,
    },
};

const ContactPage = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <PageHeader title={pagesConfig.contact.title} description={pagesConfig.contact.description} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-10 items-start">
                {/* Contact Info & Details (Left Column) */}
                <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
                    <div className="space-y-6">
                        <h3 className="font-heading text-2xl font-bold tracking-tight">Reach Out Directly</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Feel free to connect via social media or email.</p>

                        <div className="space-y-4 pt-4">
                            {/* Email Card */}
                            <div className="flex items-center gap-4 p-4 rounded-xl border border-muted bg-background/50 backdrop-blur-xs transition-colors hover:bg-accent/30">
                                <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                                    <Icons.gmail className="h-5 w-5" />
                                </div>
                                <div className="flex-1 text-left">
                                    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Email Me</p>
                                    <a href={`mailto:${siteConfig.email}`} className="text-sm font-medium hover:text-primary transition-colors">
                                        {siteConfig.email}
                                    </a>
                                </div>
                            </div>

                            {/* Phone Card */}
                            <div className="flex items-center gap-4 p-4 rounded-xl border border-muted bg-background/50 backdrop-blur-xs transition-colors hover:bg-accent/30">
                                <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                                    <Icons.contact className="h-5 w-5" />
                                </div>
                                <div className="flex-1 text-left">
                                    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Call Me</p>
                                    <a href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`} className="text-sm font-medium hover:text-primary transition-colors">
                                        {siteConfig.phone}
                                    </a>
                                </div>
                            </div>

                            {/* Location Card */}
                            <div className="flex items-center gap-4 p-4 rounded-xl border border-muted bg-background/50 backdrop-blur-xs">
                                <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                                    <Icons.globe className="h-5 w-5" />
                                </div>
                                <div className="flex-1 text-left">
                                    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Location</p>
                                    <p className="text-sm font-medium">{siteConfig.location}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Social Media Links */}
                    <div className="space-y-4 pt-6 border-t border-muted">
                        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Social Channels</h4>
                        <div className="flex gap-3">
                            <Link href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-lg border border-muted bg-background/50 hover:bg-accent hover:text-foreground hover:scale-105 active:scale-95 transition-all duration-200">
                                <Icons.linkedin className="h-5 w-5" />
                            </Link>
                            <Link href={`https://wa.me/${siteConfig.phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-lg border border-muted bg-background/50 hover:bg-emerald-500/10 hover:text-emerald-500 hover:scale-105 active:scale-95 transition-all duration-200">
                                <Icons.whatsapp className="h-5 w-5" />
                            </Link>
                            <Link href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-lg border border-muted bg-background/50 hover:bg-accent hover:text-foreground hover:scale-105 active:scale-95 transition-all duration-200">
                                <Icons.gitHub className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Form Card (Right Column) */}
                <div className="lg:col-span-6 w-full lg:max-w-xl lg:ml-auto p-6 md:p-8 rounded-2xl border border-muted bg-background/50 backdrop-blur-md shadow-lg relative overflow-hidden">
                    {/* Glowing effect inside card */}
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

                    <h3 className="font-heading text-2xl font-bold tracking-tight mb-6">Send Message</h3>
                    <ContactForm />
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
