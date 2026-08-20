import { Reveal } from "@/components/motion/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Code2, Layout, Smartphone, Server } from "lucide-react";

export type ServiceRow = {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: keyof typeof ICON_MAP;
  order: number;
};

const ICON_MAP = {
  frontend: Code2,
  uiux: Layout,
  responsive: Smartphone,
  backend: Server,
};

// Hardcoded Services Data
const SERVICES: ServiceRow[] = [
  {
    id: "frontend-development",
    title: "Front-End Web Development",
    description:
      "Creating modern, responsive websites using the latest technologies like React, HTML5, CSS3, and JavaScript.",
    features: [
      "Responsive Design",
      "Modern JavaScript",
      "Component Architecture",
      "Performance Optimization",
    ],
    icon: "frontend",
    order: 1,
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design Implementation",
    description:
      "Transforming design concepts into pixel-perfect, interactive user interfaces with attention to detail.",
    features: [
      "Pixel Perfect Design",
      "Interactive Elements",
      "User Experience Focus",
      "Cross-browser Compatibility",
    ],
    icon: "uiux",
    order: 4,
  },
  {
    id: "responsive-design",
    title: "Responsive Web Design",
    description:
      "Ensuring your website looks and functions perfectly across all devices and screen sizes.",
    features: [
      "Mobile-First Approach",
      "Flexible Layouts",
      "Touch-Friendly Interface",
      "Fast Loading Times",
    ],
    icon: "responsive",
    order: 3,
  },
  {
    id: "backend-integration",
    title: "Full Stack Development",
    description:
      "Connecting front-end applications with APIs and implementing basic backend logic for dynamic functionality.",
    features: [
      "API Integration",
      "Data Management",
      "Form Handling",
      "Authentication Systems",
    ],
    icon: "backend",
    order: 2,
  },
];

export function Services({ services = SERVICES }: { services?: ServiceRow[] }) {
  const sorted = [...services].sort((a, b) => a.order - b.order);

  return (
    <Section id="services" className="scroll-mt-24">
      <Reveal>
        <SectionHeading number="06" eyebrow="Services" title="What I offer" />
      </Reveal>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {sorted.map((service, index) => {
          const IconComponent = ICON_MAP[service.icon] ?? Code2;

          return (
            <Reveal key={service.id} delay={index * 0.06} className="h-full">
              <Card className="flex h-full flex-col p-6">
                <div className="bg-brand-deep/10 text-brand-deep mb-4 flex size-12 items-center justify-center rounded-lg">
                  <IconComponent className="size-10" aria-hidden />
                </div>

                <h3 className="mb-2 text-xl font-bold">{service.title}</h3>
                <p className="text-muted mb-4 text-sm leading-relaxed">
                  {service.description}
                </p>

                <ul className="mt-auto space-y-1.5 border-t border-border/50 pt-4">
                  {service.features.map((feature, i) => (
                    <li key={`${service.id}-feat-${i}`} className="text-muted flex items-center gap-2 text-xs">
                      <span className="size-1.5 rounded-full bg-brand-deep" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

export default Services;