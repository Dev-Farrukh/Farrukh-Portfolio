"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { MapPin } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Section, SectionHeading } from "@/components/ui/Section";
import { cn } from "@/utils/cn";

export type ExperienceRow = {
  id: string;
  role: string;
  org: string;
  period: string;
  location?: string;
  description: string[];
  order: number;
};

// Hardcoded Experience Data
const EXPERIENCES: ExperienceRow[] = [
  {
    id: "bidec-solutions",
    role: "Junior Frontend Developer",
    org: "Bidec Solutions",
    period: "2026 Jan — 2026 Feb",
    location: "Karachi, Pakistan",
    description: [
      "Developed responsive and accessible web applications using React, Next.js, and TypeScript.",
      "Integrated REST APIs and streamlined component state management across multiple client projects.",
      "Collaborated closely with designers and backend developers to deliver pixel-perfect UI implementations."
    ],
    order: 2,
  },
   {
    id: "bidec-solutions-",
    role: "Frontend Intern",
    org: "Bidec Solutions",
    period: "2025 Nov — 2026 Jan",
    location: "Karachi, Pakistan",
    description: [
      "Assisted in building responsive figma pages ",
      "Learn to work with REST APIs and state management across multiple client projects."
    ],
    order: 3,
  },
  {
    id: "freelance-fullstack",
    role: "Full-Stack Developer",
    org: "Freelance",
    period: "2026 — Present",
    location: "Remote",
    description: [
      "Engineered custom full-stack web applications utilizing the MERN stack and Next.js.",
      "Designed database schemas in MongoDB and PostgreSQL with robust backend routing in Node.js/Express.",
      "Optimized production deployments and workflows using Vercel, Docker, and Railway."
    ],
    order: 1,
  },
];

function TimelineEntry({ exp, index, last }: { exp: ExperienceRow; index: number; last: boolean }) {
  const reduce = useReducedMotion();

  const inner = (
    <div className="flex gap-6">
      {/* Rail dot (the connector line is drawn once for the whole list) */}
      <div className="relative flex w-3 justify-center">
        <span className="bg-background z-10 mt-1 size-3 shrink-0 rounded-full border-2 border-(--brand-deep) ring-4 ring-(--brand-deep)/10" />
      </div>

      {/* Card content */}
      <div className={cn("pb-10", last && "pb-0")}>
        <p className="font-mono text-xs tracking-widest text-(--period) uppercase">{exp.period}</p>
        <h3 className="mt-1 text-xl font-bold">{exp.role}</h3>
        <div className="text-muted mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-sm">
          <span>{exp.org}</span>
          {exp.location && (
            <span className="flex items-center gap-1">
              <MapPin className="size-3" aria-hidden />
              {exp.location}
            </span>
          )}
        </div>
        {exp.description.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {exp.description.map((d, i) => (
              <li key={`${exp.id}-bullet-${i}`} className="text-muted flex gap-2 text-sm">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-(image:--gradient-brand)" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );

  if (reduce) {
    return <li>{inner}</li>;
  }

  return (
    <motion.li
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: "easeOut" }}
    >
      {inner}
    </motion.li>
  );
}

export function Experience({ experiences = EXPERIENCES }: { experiences?: ExperienceRow[] }) {
  const sorted = [...experiences].sort((a, b) => a.order - b.order);
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLDivElement>(null);

  // Track scroll through the list and fill the connector rail as it passes.
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 70%", "end 60%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const scaleY = useTransform(fill, [0, 1], [0, 1]);

  return (
    <Section id="experience" className="scroll-mt-24">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading number="04" eyebrow="Experience" title="Where I've worked" />
          <p className="text-muted -mt-6 max-w-sm text-base leading-relaxed">
            A track record of shipping across projects and teams — building fast, user-focused, and reliable applications.
          </p>
        </div>

        <div ref={listRef} className="relative">
          {sorted.length > 1 && (
            <>
              <span aria-hidden className="bg-border absolute top-2 bottom-8 left-[5.5px] w-px" />
              <motion.span
                aria-hidden
                style={reduce ? { transform: "scaleY(1)" } : { scaleY }}
                className="absolute top-2 bottom-8 left-[5.5px] w-px origin-top bg-(image:--gradient-brand)"
              />
            </>
          )}
          <ol className="relative">
            {sorted.map((exp, index) => (
              <TimelineEntry
                key={exp.id}
                exp={exp}
                index={index}
                last={index === sorted.length - 1}
              />
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}

export default Experience;