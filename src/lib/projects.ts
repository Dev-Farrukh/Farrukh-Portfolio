export type MergedProject = {
  id: string;
  repo: string;
  slug : string;
  title: string;
  description: string | null;
  readmeExcerpt?: string | null;
  htmlUrl?: string | null;
  homepage?: string | null;
  coverImage?: string | null;
  screenshots: string[];
  language?: string | null;
  tags: string[];
  stars?: number | null;
  forks?: number | null;
  featured: boolean;
};

export const PROJECTS: MergedProject[] = [
  {
    id: "uber-clone",
    repo: "Uber-Clone",
    slug: "uber-clone",
    title: "Uber Clone",
    description:
      "A full-stack ride-hailing web application featuring real-time location mapping, user authentication, and ride routing.",
    htmlUrl: "https://github.com/Dev-Farrukh/Uber-Clone",
    homepage: "https://your-uber-demo.vercel.app",
    coverImage: "/projectImages/clone.png",
    screenshots: [],
    tags: ["React", "Node.js", "Express", "MongoDB", "JWT", "Web Sockets"],
    featured: true,
  },
  {
    id: "genai-resume-enhancer",
    repo: "GenAi-Resume-Enhancer",
    slug: "genai-resume-enhancer",
    title: "GenAI Resume Enhancer",
    description:
      "An AI-powered application that generates ATS-friendly resumes and tailored interview preparation plans using Gemini API, React.js, and SCSS.",
    htmlUrl: "https://github.com/Dev-Farrukh/GenAi-Resume-Enhancer",
    homepage: "https://genai-resume-enhancer.vercel.app",
    coverImage: "/projectImages/genai.png",
    screenshots: [],
    tags: ["React.js", "Gemini API", "SCSS"],
    featured: true,
  },
  {
    id: "employee-management-system",
    repo: "employee-management-system",
    slug: "employee-management-system",
    title: "Employee Management System",
    description:
      "A comprehensive admin dashboard and portal for managing employee records, tasks and their status to enhance workflows.",
    htmlUrl: "https://github.com/dev-farrukh/employee-management-system",
    homepage: "https://ems-portal-pro.vercel.app/",
    coverImage: "/projectImages/ems.png",
    screenshots: [],
    tags: ["React", "Tailwind CSS", "Vite", "Local Storage"],
    featured: false,
  },
  {
    id: "ommart",
    repo: "E-commere-Store",
    slug: "ommart",
    title: "Ommart",
    description:
      "An e-commerce platform built for seamless product browsing, category filtering, cart management, and online shopping.",
    htmlUrl: "https://github.com/Dev-Farrukh/E-commere-Store",
    homepage: "https://om-mart.vercel.app",
    coverImage: "/projectImages/ommart.png",
    screenshots: [],
    tags: ["React", "Firebase", "Redux", "Tailwind CSS"],
    featured: false,
  },
  {
    id: "food-qabila-billing-app",
    repo: "Food-Qabila",
    slug: "food-qabila-billing-app",
    title: "Food-Qabila Billing App",
    description:
      "Real-time billing application for restaurants to generate customer receipts with dynamic pricing and order management.",
    htmlUrl: "https://github.com/Dev-Farrukh/Food-Qabila",
    homepage: "https://food-qabila.vercel.app",
    coverImage: "/projectImages/fqr.png",
    screenshots: [],
    tags: ["Electron.js", "Dynamic Document Generation (PDF/Print)", "Tailwind CSS"],
    featured: false,
  },
];