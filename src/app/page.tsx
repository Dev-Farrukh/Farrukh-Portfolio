import nextDynamic from "next/dynamic";
import {
  getProjectsMerged,
  getExperiences,
  getSkills,
  getServices,
  getSocialLinks,
  getFundingLinks,
  getRandomTagline,
} from "@/lib/queries";
import { Hero } from "@/components/home/Hero";
import { SiteNav } from "@/components/navbar/SiteNav";
import { Footer } from "@/components/layout/Footer";

export const revalidate = 60;
const HOMEPAGE_DATA_TIMEOUT_MS = 3000;

const PROFILE = {
  name: "Farrukh Noman",
  bio: "Farrukh Noman is a Full Stack Developer Engineer and Frontend Engineer who builds fast, reliable products across web and mobile. I works full-stack - crafting polished front-ends with React and Next.js and robust back-ends with Node.js - with a growing focus on applied AI.",
  roles: ["Software Engineer" , "MERN Stack Developer" , "Frontend Developer"],
  avatarUrl: "/avatar.jfif",
  resumeUrl: "",
  heroTagline: "Currently Freelancing",
  sectionVisibility: {
    about: true,
    skills: true,
    experience: true,
    projects: true,
    services: true,
    testimonials: false,
    support: true,
    faq: false,
    contact: true,
  } as Record<string, boolean>,
  stats: { years: "4+" , repos: "70+", stars: "5+", followers: "500+" },
};

function withTimeout<T>(promise: Promise<T>, fallback: T): Promise<T> {
  return Promise.race([
    promise.catch(() => fallback),
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), HOMEPAGE_DATA_TIMEOUT_MS)),
  ]);
}

// Below-the-fold sections: lazy-loaded to keep the hero bundle lean.
// Note: These are Server Components — next/dynamic with ssr:true (default)
// performs code-splitting without disabling server rendering.
const About = nextDynamic(() =>
  import("@/components/home/About").then((m) => ({ default: m.About })),
);
const Skills = nextDynamic(() =>
  import("@/components/home/Skills").then((m) => ({ default: m.Skills })),
);
const Experience = nextDynamic(() =>
  import("@/components/home/Experience").then((m) => ({ default: m.Experience })),
);
const Projects = nextDynamic(() =>
  import("@/components/home/Projects").then((m) => ({ default: m.Projects })),
);
const Services = nextDynamic(() =>
  import("@/components/home/Services").then((m) => ({ default: m.Services })),
);
const Support = nextDynamic(() =>
  import("@/components/home/Support").then((m) => ({ default: m.Support })),
);
const TestimonialsSection = nextDynamic(() =>
  import("@/components/sections/TestimonialsSection").then((m) => ({
    default: m.TestimonialsSection,
  })),
);
const Contact = nextDynamic(() =>
  import("@/components/home/Contact").then((m) => ({ default: m.Contact })),
);
const Faq = nextDynamic(() =>
  import("@/components/sections/FaqSection").then((m) => ({ default: m.FaqSection })),
);
export default async function Home() {
  const profile = PROFILE
    
  const vis = profile.sectionVisibility;
  const show = (id: string) => vis[id] !== false;
  // const usingFallback = profile === PROFILE;

  // Fetch only the data for VISIBLE sections - a hidden section runs no query
  // (and its component chunk never loads via the gated dynamic import below).
  // Socials + funding are shared (nav/footer + hero sponsor), so always load.
  const [projects, experiences, skills, services, socials, funding, tagline] = await withTimeout(
    Promise.all([
      show("projects") ? getProjectsMerged() : Promise.resolve([]),
      show("experience") ? getExperiences() : Promise.resolve([]),
      show("skills") ? getSkills() : Promise.resolve([]),
      show("services") ? getServices() : Promise.resolve([]),
      getSocialLinks(),
      getFundingLinks(),
      getRandomTagline(),
    ]),
    [[], [], [], [], [], [], "Rise above limits"],
  );

  const sponsorUrl = funding.find((f) => f.primary)?.url;
  const contactEmail =
    socials.find((s) => s.platform.toLowerCase() === "email")?.url.replace("mailto:", "") ??
    "m.farrukhnoman@gmail.com"

  return (
    <>
      <SiteNav
        tagline={tagline}
        socials={socials.map((s) => ({ platform: s.platform, url: s.url }))}
        hidden={Object.entries(vis)
          .filter(([, v]) => v === false)
          .map(([k]) => k)}
      />

      <Hero
        profile={{ name: profile.name, roles: profile.roles }}
        sponsorUrl={sponsorUrl}
        heroTagline={profile.heroTagline}
      />

      {show("about") && (
        <About
          profile={{
            bio: profile.bio,
            stats: profile.stats,
            name: profile.name,
            avatarUrl: profile.avatarUrl,
          }}
        />
      )}

      {show("skills") && <Skills  />}

      {show("experience") && <Experience  />}

      {show("projects") && <Projects  />}

      {show("services") && <Services />}

      {show("testimonials") && <TestimonialsSection />}

      {show("support") && <Support funding={funding} />}

      {show("faq") && <Faq />}

      {show("contact") && <Contact socials={socials} email={contactEmail} />}

      <Footer socials={socials} />
    </>
  );
}
