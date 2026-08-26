import { Metadata } from "next";
import PageHeader from "@/components/page-header";
import { pagesConfig } from "@/components/config/pages";
import { getSkills } from "@/components/actions/skill-actions";
import SkillsCard from "@/components/skills-card";

export const metadata: Metadata = {
    title: "Skills & Experience",
    description: "Discover Appon Islam's core competencies, technologies, frameworks, and full-stack development skill set.",
};

import { skillsInterface } from "@/components/config/skills";

export default async function SkillsPage() {
    let skills: skillsInterface[] = [];
    let error = null;

    try {
        skills = await getSkills();
    } catch (err) {
        console.error("Failed to load skills:", err);
        error = err instanceof Error ? err.message : "Failed to load skills";
    }

    return (
        <>
            <PageHeader title={pagesConfig.skills.title} description={pagesConfig.skills.description} />

            {/* Error State */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-800 max-w-4xl mx-auto">
                    <p>Error loading skills: {error}</p>
                    <p className="text-sm mt-2">Please try refreshing the page or check back later</p>
                </div>
            )}

            {/* Skills Display */}
            <div className="mt-8 max-w-4xl mx-auto">
                {!error && (
                    <>
                        {skills.length > 0 ? (
                            <SkillsCard skills={skills} />
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground">No skills are currently displayed</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
}
