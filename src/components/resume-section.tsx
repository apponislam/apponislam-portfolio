"use client";

import React, { useEffect } from "react";
import { pagesConfig } from "@/components/config/pages";
import { ExperienceSection } from "@/components/experience-section";
import { EducationSection } from "@/components/education-section";
import { CertificatesSection } from "@/components/certificates-section";
import aos from "aos";
import "aos/dist/aos.css";

export function ResumeSection() {
    useEffect(() => {
        aos.init({
            duration: 800,
            once: true,
        });
    }, []);

    return (
        <section id="resume" className="md:container space-y-12 py-10 my-14 dark:bg-transparent overflow-hidden">
            {/* Section Header */}
            <div className="mx-auto flex max-w-232 flex-col items-center space-y-4 text-center" data-aos="fade-up">
                <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">{pagesConfig.resume.title}</h2>
                <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">{pagesConfig.resume.description}</p>
            </div>

            {/* Grid Layout for Experience & Education */}
            <div className="mx-auto grid gap-10 lg:grid-cols-2 w-full max-w-6xl pt-4">
                <ExperienceSection />
                <EducationSection />
            </div>

            {/* Professional Certifications */}
            <div className="mx-auto w-full max-w-6xl pt-4">
                <CertificatesSection />
            </div>
        </section>
    );
}
