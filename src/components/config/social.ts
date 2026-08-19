import { Icons } from "../icons";

interface SocialInterface {
    name: string;
    username: string;
    icon: React.ElementType;
    link: string;
}

export const SocialLinks: SocialInterface[] = [
    {
        name: "Github",
        username: "@apponislam",
        icon: Icons.gitHub,
        link: "https://github.com/apponislam",
    },
    {
        name: "LinkedIn",
        username: "Appon Islam",
        icon: Icons.linkedin,
        link: "https://www.linkedin.com/in/apponislam/",
    },
    {
        name: "Twitter",
        username: "@appon2003",
        icon: Icons.twitter,
        link: "https://twitter.com/appon2003",
    },
    {
        name: "Gmail",
        username: "apponislam",
        icon: Icons.gmail,
        link: "mailto:apponislamdev@gmail.com",
    },
];
