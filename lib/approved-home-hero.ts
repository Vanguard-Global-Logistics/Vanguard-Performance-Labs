import { APPROVED_HERO_Q50_PART_1 } from "@/lib/approved-hero-q50-part-1";
import { APPROVED_HERO_Q50_PART_2 } from "@/lib/approved-hero-q50-part-2";
import { APPROVED_HERO_Q50_PART_3 } from "@/lib/approved-hero-q50-part-3";
import { APPROVED_HERO_Q50_PART_4 } from "@/lib/approved-hero-q50-part-4";

// Owner-approved winged-vial artwork, split into verified segments to prevent
// source truncation in GitHub/Vercel. Served as binary by the approved-asset API.
export const APPROVED_HERO = `data:image/webp;base64,${APPROVED_HERO_Q50_PART_1}${APPROVED_HERO_Q50_PART_2}${APPROVED_HERO_Q50_PART_3}${APPROVED_HERO_Q50_PART_4}`;
