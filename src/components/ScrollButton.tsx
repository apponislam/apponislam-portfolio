"use client";
import React from "react";
import { Icons } from "./icons";

const ScrollButton = () => {
    const handleScrollAndAsyncTasks = async () => {
        // Smooth scroll to the skills section
        const skillsSection = document.getElementById("skills");
        if (skillsSection) {
            skillsSection.scrollIntoView({ behavior: "smooth" });
        }

        // Simulate async tasks after scroll
        await new Promise((resolve) => setTimeout(resolve, 500));
        await additionalAsyncTasks();
    };

    async function additionalAsyncTasks() {
        console.log("Running additional async tasks...");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Async tasks completed!");
    }

    return (
        <button
            type="button"
            onClick={handleScrollAndAsyncTasks}
            aria-label="Scroll down to skills section"
            title="Scroll down to skills section"
        >
            <Icons.chevronDown className="h-6 w-6 mt-10 downarrow" aria-hidden="true" />
            <span className="sr-only">Scroll down to skills section</span>
        </button>
    );
};

export default ScrollButton;
