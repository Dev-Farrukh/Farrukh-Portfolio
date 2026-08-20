import { Reveal } from "@/components/motion/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { SkillCard } from "./SkillCard";

export type SkillRow = {
  name: string;
  iconPath: string;
  category: string;
  order: number;
};

// Hardcoded Skill Data
const SKILLS: SkillRow[] = [
  { name: "JavaScript", iconPath: "/toolsIcons/javascript.svg", category: "Programming Languages", order: 1 },
  { name: "TypeScript", iconPath: "/toolsIcons/typescript.svg", category: "Programming Languages", order: 2 },
  { name: "Python", iconPath: "/toolsIcons/python.svg", category: "Programming Languages", order: 3 },

  { name: "React", iconPath: "/toolsIcons/react.svg", category: "Frontend Development", order: 1 },
  { name: "Next.js", iconPath: "/toolsIcons/nextjs.png", category: "Frontend Development", order: 2 },
  { name: "Tailwind CSS", iconPath: "/toolsIcons/tailwind.svg", category: "Frontend Development", order: 3 },
  { name: "HTML", iconPath: "/toolsIcons/html.svg", category: "Frontend Development", order: 4 },
  { name: "CSS", iconPath: "/toolsIcons/css.svg", category: "Frontend Development", order: 5 },
  { name: "Redux", iconPath: "/toolsIcons/redux.svg", category: "Frontend Development", order: 6 },
  { name: "Firebase", iconPath: "/toolsIcons/firebase.svg", category: "Miscellaneous", order: 7 },


  { name: "Node.js", iconPath: "/toolsIcons/nodejs.svg", category: "Backend Development", order: 1 },
  { name: "Express.js", iconPath: "/toolsIcons/express.svg", category: "Backend Development", order: 2 },
  { name: "Socket.io", iconPath: "/toolsIcons/socket-io.png", category: "Backend Development", order: 3 },

  { name: "MongoDB", iconPath: "/toolsIcons/mongodb.svg", category: "Database Management", order: 1 },
  { name: "PostgreSQL", iconPath: "/toolsIcons/postgresql.svg", category: "Database Management", order: 2 },

  { name: "Docker", iconPath: "/toolsIcons/docker.png", category: "DEVOPS / VCS", order: 1 },
  { name: "Git", iconPath: "/toolsIcons/git.svg", category: "DEVOPS / VCS", order: 2 },
  { name: "Github", iconPath: "/toolsIcons/github.svg", category: "DEVOPS / VCS", order: 3 },

  { name: "Figma", iconPath: "/toolsIcons/figma.svg", category: "Miscellaneous", order: 1 },
  { name: "Ubuntu", iconPath: "/toolsIcons/ubuntu.png", category: "Miscellaneous", order: 2 },
];

function groupByCategory(skills: SkillRow[]) {
  const map = new Map<string, SkillRow[]>();
  for (const s of [...skills].sort((a, b) => a.order - b.order)) {
    const list = map.get(s.category) ?? [];
    list.push(s);
    map.set(s.category, list);
  }
  return [...map.entries()];
}

export function Skills({ skills = SKILLS }: { skills?: SkillRow[] }) {
  const groups = groupByCategory(skills);

  return (
    <Section id="skills" className="scroll-mt-24">
      <Reveal>
        <SectionHeading number="03" eyebrow="Skills" title="Tools I work with" />
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2 md:items-stretch">
        {groups.map(([category, items], i) => (
          <Reveal key={category} delay={i * 0.06} className="h-full">
            <Card className="flex h-full flex-col p-6">
              <h3 className="text-foreground/70 mb-4 text-sm font-semibold tracking-wide uppercase">
                {category}
              </h3>
              <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                {items.map((s) => (
                  <SkillCard key={s.name} name={s.name} iconPath={s.iconPath} />
                ))}
              </ul>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export default Skills;