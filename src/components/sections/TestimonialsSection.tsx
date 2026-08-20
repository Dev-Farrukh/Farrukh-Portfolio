import { Testimonials } from "./Testimonials";

const TESTIMONIALS_TIMEOUT_MS = 8000;
type TestimonialRow = {
  id: string;
  name: string;
  relationship: string;
  content: string;
  imageUrl: string | null;
  linkedinUrl: string | null;
  githubUrl: string | null;
  xUrl: string | null;
  instagramUrl: string | null;
  websiteUrl: string | null;
};

export async function TestimonialsSection() {
  const rows: TestimonialRow[] = [
    {
      id: "dummy-testimonial",
      name: "A fellow builder",
      relationship: "Collaborator",
      content: "A thoughtful engineer who cares about the details.",
      imageUrl: null,
      linkedinUrl: null,
      githubUrl: null,
      xUrl: null,
      instagramUrl: null,
      websiteUrl: null,
    },
  ];

  return <Testimonials items={rows} />;
}
