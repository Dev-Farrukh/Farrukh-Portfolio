import { getFaqs } from "@/lib/queries";
import { Faq } from "./Faq";

const FAQ_TIMEOUT_MS = 8000;

/** Server wrapper: fetches FAQs from the DB and renders the FAQ section. */
export async function FaqSection() {
  const faqs = await Promise.race([
    getFaqs().catch(() => []),
    new Promise<Awaited<ReturnType<typeof getFaqs>>>((resolve) =>
      setTimeout(() => resolve([]), FAQ_TIMEOUT_MS),
    ),
  ]);
  return <Faq faqs={faqs.map((f) => ({ question: f.question, answer: f.answer }))} />;
}
