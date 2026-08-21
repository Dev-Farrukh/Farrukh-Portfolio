import { PROJECTS, type MergedProject } from "./projects";
import type { Service } from "@/db/schema";

export type ExperienceRow = {
  id: number;
  role: string;
  org: string;
  period: string;
  location: string;
  isCurrent: boolean;
  description: string[];
  order: number;
};

export type SocialRow = { platform: string; url: string; username: string; order: number };
export type FundingRow = { label: string; url: string; primary: boolean; order: number };

const experiences: ExperienceRow[] = [
  { id: 1, role: "Software Engineer", org: "Independent", period: "2023 - Present", location: "Remote", isCurrent: true, description: ["Building useful digital products", "Working across frontend and backend systems"], order: 1 },
];

const skills = [
  { name: "TypeScript", iconPath: "", category: "Languages", order: 1 },
  { name: "React", iconPath: "", category: "Frontend", order: 2 },
  { name: "Next.js", iconPath: "", category: "Frontend", order: 3 },
];

const services: Service[] = [
  { title: "Product Engineering", description: "Turning ideas into polished, maintainable products.", icon: "code", order: 1 },
];

const socials: SocialRow[] = [
  { platform: "github", url: "https://github.com/Dev-Farrukh", username: "github", order: 1 },
  { platform: "email", url: "mailto:m.farrukhnoman@gmail.com", username: "m.farrukhnoman@gmail.com", order: 2 },
];

const funding: FundingRow[] = [];

export async function getProfile() { return null as never; }
export async function getProjectsMerged(): Promise<MergedProject[]> { return PROJECTS; }
export async function getExperiences() { return experiences; }
export async function getSkills() { return skills; }
export async function getServices() { return services; }
export async function getSocialLinks() { return socials; }
export async function getFundingLinks() { return funding; }
export async function getRandomTagline() { return "Rise above limits"; }
export async function getFaqs() { return [{ question: "What do you build?", answer: "Thoughtful software and digital products." }]; }