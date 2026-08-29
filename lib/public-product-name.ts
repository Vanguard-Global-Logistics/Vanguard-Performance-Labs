import type { Compound } from "@/types";

/** Public-facing product labels. Internal slugs stay stable so existing routes,
 * cart records, analytics, and integrations do not break. */
export function publicProductName(compound: Pick<Compound, "slug" | "name">) {
  return compound.slug === "retatrutide" ? "RT3" : compound.name;
}
