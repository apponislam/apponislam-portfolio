// This will be new interface
export interface ProjectLink {
    url?: string;
    disabled: boolean;
    private: boolean;
}

export interface ProjectContribution {
    name: string;
    role: string;
    profileImage: string;
    linkedinUsername: string;
    highlights: string[];
}

export interface Project {
    _id: string;
    serial: number;
    type: string;
    companyName: string;
    category: string[];
    shortDescription: string;

    links: {
        githubFrontend?: ProjectLink;
        githubBackend?: ProjectLink;
        githubApp?: ProjectLink;
        demo?: ProjectLink;
        live?: ProjectLink;
        googleStore?: ProjectLink;
        appleStore?: ProjectLink;
    };

    contributions: ProjectContribution[];

    techStack: string[];
    startDate: string;
    endDate: string;
    companyLogoImg: string;
    images: string[];

    descriptionDetails: {
        paragraphs: string[];
        bullets: string[];
    };

    warning?: string;
}
