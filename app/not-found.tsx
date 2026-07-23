import { GlowButton } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <div className="font-display text-6xl font-black text-vanguard-violet">404</div>
      <p className="mt-3 text-muted">That page isn&apos;t here. Let&apos;s get you back on mission.</p>
      <div className="mt-6"><GlowButton href="/">Return home</GlowButton></div>
    </div>
  );
}
