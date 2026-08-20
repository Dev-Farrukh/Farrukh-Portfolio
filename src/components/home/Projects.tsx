import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ProjectsBrowser } from "./ProjectsBrowser";
import type { MergedProject } from "@/lib/projects";

const GITHUB_PROFILE = "https://github.com/farrukhnoman"; // Updated to your GitHub link if needed

// Hardcoded Project Data
const PROJECTS: MergedProject[] = [
   {
    id: "uber-clone",
    slug: "uber-clone",
    title: "Uber Clone",
    description:
      "A full-stack ride-hailing web application featuring real-time location mapping, user authentication, and ride routing.",
    category: "Full-Stack",
    tags: ["React", "Node.js", "Express", "MongoDB", "JWT", "Web Sockets"],
    image: "/projects/uber-clone.png",
    demoUrl: "",
    githubUrl: "https://github.com/Dev-Farrukh/Uber-Clone",
    featured: true,
    order: 1,
  },
  {
    id: "genai-resume-enhancer",
    slug: "genai-resume-enhancer",
    title: "GenAI Resume Enhancer",
    description:
      "An AI-powered application that generates ATS-friendly resumes and tailored interview preparation plans using Gemini API, React.js, and SCSS.",
    category: "Full-Stack / AI",
    tags: ["Rect.js", "Gemini API", "SCSS"],
    image: "/projects/resume-enhancer.png", // Ensure image exists in /public/projects/
    demoUrl: "https://genai-resume-enhancer.vercel.app",
    githubUrl: "https://github.com/Dev-Farrukh/GenAi-Resume-Enhancer",
    featured: true,
    order: 2,
  },
  {
    id: "employee-management-system",
    slug: "employee-management-system",
    title: "Employee Management System",
    description:
      "A comprehensive admin dashboard and portal for managing employee records, tasks and their status to enhance workflows.",
    category: "Web App",
    tags: ["React", "Tailwind CSS", "Vite", "Local Storage"],
    image: "/projectImages/ems.png",
    demoUrl: "https://ems-portal-pro.vercel.app/",
    githubUrl: "https://github.com/farrukhnoman/employee-management-system",
    featured: false,
    order: 3,
  },
  {
    id: "ommart",
    slug: "ommart",
    title: "Ommart",
    description:
      "An e-commerce platform built for seamless product browsing, category filtering, cart management, and online shopping.",
    category: "E-Commerce",
    tags: ["React", "Firebase", "Redux", "Tailwind CSS"],
    image: "/projectImages/ommart.png",
    demoUrl: "om-mart.vercel.app",
    githubUrl: "https://github.com/Dev-Farrukh/E-commere-Store",
    featured: false,
    order: 4,
  },
  {
    id: "Food-Qabila Billing App",
    slug: "Food-Qabila Billing App",
    title: "Food-Qabila Billing App",
    description:"Real-time billing application for restaurants to generate customer receipts with dynamic pricing and order management.",
    category: "Web App",
    tags: ["Electron js", "Dynamic Document Generation (PDF/Print)" ,  "Tailwind CSS"],
    image: "/projectImages/fqr.png",
    demoUrl: "food-qabila.vercel.app",
    githubUrl: "https://github.com/Dev-Farrukh/Food-Qabila",
    featured: false,
    order: 4,
  }
];

/** Server shell: heading and CTA stay server-rendered, and ProjectsBrowser owns the
 *  parts that need selection state (showcase, filter, grid, quick view). */
export function Projects({ projects = PROJECTS }: { projects?: MergedProject[] }) {
  return (
    <Section id="projects" className="scroll-mt-24">
      <Reveal>
        <SectionHeading number="05" eyebrow="Projects" title="Featured work" />
      </Reveal>

      <ProjectsBrowser projects={projects} />

      <div className="mt-12 text-center">
        <Magnetic>
          <Button
            href={GITHUB_PROFILE}
            variant="secondary"
            size="md"
            target="_blank"
            rel="noopener noreferrer"
            leftIcon={<ArrowUpRight className="size-4" aria-hidden />}
          >
            View all on GitHub
          </Button>
        </Magnetic>
      </div>
    </Section>
  );
}

export default Projects;