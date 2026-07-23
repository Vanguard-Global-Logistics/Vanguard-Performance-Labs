"use client";
import { GlowButton } from "@/components/ui";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <div className="font-display text-3xl font-bold text-bone">Something went wrong</div>
      <p className="mt-3 text-muted">An unexpected error occurred. You can try again.</p>
      <div className="mt-6"><GlowButton onClick={reset}>Try again</GlowButton></div>
    </div>
  );
}
