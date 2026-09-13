import { HeroSection } from "@/components/hero-section";
import { SkillsSection } from "@/components/skills-section";
import { ResumeSection } from "@/components/resume-section";
import { FeaturedProjects } from "@/components/featured-projects";

export default function Home() {
    return (
        <div className="container mx-auto">
            <HeroSection />
            <SkillsSection />
            <ResumeSection />
            <FeaturedProjects />
        </div>
    );
}
