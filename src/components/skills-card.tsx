"use client";
import { useEffect } from "react";
import Rating from "./rating";
import { iconMap } from "./ui/icons";
import aos from "aos";
import "aos/dist/aos.css";

interface ISkills {
    _id: string;
    name: string;
    description: string;
    rating: number;
    icon: string;
    createdAt?: string;
    updatedAt?: string;
}

interface SkillsCardProps {
    skills: ISkills[];
}

export default function SkillsCard2({ skills }: SkillsCardProps) {
    useEffect(() => {
        aos.init();
    }, []);

    return (
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-5xl lg:grid-cols-3">
            {skills.map((skill, id) => {
                const IconComponent = iconMap[skill.icon as keyof typeof iconMap];
                return (
                    <div key={id} className="relative overflow-hidden rounded-lg border bg-background p-2" data-aos="fade-up" data-aos-anchor-placement="top-bottom">
                        <div className="flex h-57.5 flex-col justify-between rounded-md p-6 sm:h-57.5">
                            <IconComponent size={50} />
                            <div className="space-y-2">
                                <h3 className="font-bold">{skill.name}</h3>
                                <p className="text-sm text-muted-foreground">{skill.description}</p>
                                <Rating stars={skill.rating} />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
