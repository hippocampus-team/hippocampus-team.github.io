export const baseUrl = "https://raw.githubusercontent.com/HippocampusTeam/WebsiteContent/master";

export interface CV {
    general: GeneralInfo;
    projects: Project[];
    education: Project[];
}

export interface GeneralInfo {
    name: string;
    bio: string;
    contacts: {
        telegram: string;
        email: string;
        github: string
    }
}

export interface Project {
    title: string;
    text: string;
    buttons: ProjectLink[];
}

export interface ProjectLink {
    text: string;
    link: string;
}

export function fetchContent(name: string): Promise<CV> {
    return Promise.all([
        fetch(`${baseUrl}/${name}/person.json`).then(v => v.json()),
        fetch(`${baseUrl}/${name}/projects.json`).then(v => v.json()),
        fetch(`${baseUrl}/${name}/education.json`).then(v => v.json()),
        // eslint-disable-next-line max-len
    ]).then(([general, projects, education]: [GeneralInfo, { cards: Project[] }, { cards: Project[] }]) => ({
        general, projects: projects.cards, education: education.cards,
    }));
}
