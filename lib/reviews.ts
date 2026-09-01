// Google Reviews mirror. Nothing here is invented — this array stays empty
// until real reviews exist, either pasted in by hand or pulled from the
// Google Places API once Vanguard has a verified Google Business Profile
// (needs a Place ID + GOOGLE_PLACES_API_KEY, wired in lib/google-reviews.ts
// when that's ready).

export interface Review {
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  relativeTime: string; // e.g. "2 weeks ago" — as Google's API returns it
  profilePhoto?: string;
}

export const REVIEWS: Review[] = [];
