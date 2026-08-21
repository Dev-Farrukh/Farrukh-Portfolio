"use server";

import { revalidatePath } from "next/cache";

const SECTION_IDS = new Set([
  "about",
  "skills",
  "experience",
  "projects",
  "services",
  "testimonials",
  "support",
  "faq",
  "contact",
]);

export async function setSectionVisibility(visibility: Record<string, boolean>) {
  for (const [id, visible] of Object.entries(visibility)) {
    if (!SECTION_IDS.has(id) || typeof visible !== "boolean") {
      throw new Error("Invalid section visibility update");
    }
  }

  revalidatePath("/");
}