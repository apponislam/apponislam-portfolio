import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { pagesConfig } from "@/components/config/pages";
import HomeSkills from "@/components/Home-skills";

export function SkillsSection() {
    return (
        <section id="skills" className="md:container space-y-6 dark:bg-transparent py-10">
            <div className="mx-auto flex max-w-232 flex-col items-center space-y-4 text-center">
                <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">{pagesConfig.skills.title}</h2>
                <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">{pagesConfig.skills.description}</p>
            </div>
            <HomeSkills />
            <Link href="/skills" className="flex justify-center">
                <Button variant={"outline"} className="rounded-xl">
                    <Icons.chevronDown className="mr-2 h-4 w-4" /> View All
                </Button>
            </Link>
        </section>
    );
}
