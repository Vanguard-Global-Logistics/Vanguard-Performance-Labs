"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  ArrowRight,
  Atom,
  BookOpen,
  Bot,
  Box,
  CheckCircle,
  ClipboardList,
  FlaskConical,
  LockKeyhole,
  Microscope,
  Search,
  ShieldCheck,
  Snowflake,
  Sparkles,
  UserRound,
} from "lucide-react";
import { JessiePortrait } from "@/components/brand";

const openJessie = () =>
  document.querySelector<HTMLButtonElement>('[aria-label^="Open Jessie"]')?.click();

const trust = [
  [ShieldCheck, "For research use only", "For laboratory research use only."],
  [BookOpen, "Educational content", "Research insights and documentation."],
  [Sparkles, "Transparent sourcing", "Sourced with integrity and care."],
  [UserRound, "Research support", "Support for your research journey."],
  [Snowflake, "Temperature-conscious", "Careful handling and secure packaging."],
  [LockKeyhole, "Private & secure", "Discreet, secure ordering and packaging."],
] as const;

const categories = [
  ["Weight Management", "/images/approved/category-weight-management.webp", "/education"],
  ["Recovery", "/images/approved/category-recovery.webp", "/education"],
  ["Longevity", "/images/approved/category-longevity.webp", "/education"],
  ["Cognitive Support", "/images/approved/category-cognitive-support.webp", "/education"],
  ["Immune Support", "/images/approved/category-immune-support.webp", "/education"],
  ["Lab Supply", "/images/approved/category-lab-supply.webp", "/products"],
] as const;

const tools = [
  [UserRound, "Personalized recommendations", "Get tailored ideas and product suggestions based on your interests.", "/education"],
  [ClipboardList, "Documentation center", "Explore documentation, COAs, and educational research content.", "/research"],
  [FlaskConical, "Research insights", "Stay informed with research articles, whitepapers, and more.", "/articles"],
  [Search, "Product explorer", "Browse our catalog and discover materials for your research.", "/products"],
] as const;

const embers = Array.from({ length: 58 }, (_, index) => ({
  left: `${5 + ((index * 37) % 91)}%`,
  delay: `${-((index * 0.41) % 9).toFixed(2)}s`,
  duration: `${(5.4 + ((index * 13) % 39) / 10).toFixed(1)}s`,
  size: `${1 + ((index * 7) % 4)}px`,
  drift: `${-38 + ((index * 17) % 76)}px`,
  hot: index % 9 === 0,
}));

const categoryParticles = Array.from({ length: 7 }, (_, index) => ({
  x: `${10 + ((index * 29) % 78)}%`,
  y: `${18 + ((index * 17) % 64)}%`,
  delay: `${-(index * 0.73).toFixed(2)}s`,
}));

function setPointerVariables(event: ReactPointerEvent<HTMLElement>) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const target = event.currentTarget;
  const rect = target.getBoundingClientRect();
  const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
  const y = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));

  target.style.setProperty("--pointer-x", `${x * 100}%`);
  target.style.setProperty("--pointer-y", `${y * 100}%`);
  target.style.setProperty("--tilt-x", `${(0.5 - y) * 4}deg`);
  target.style.setProperty("--tilt-y", `${(x - 0.5) * 5}deg`);
}

function resetPointerVariables(event: ReactPointerEvent<HTMLElement>) {
  const target = event.currentTarget;
  target.style.setProperty("--pointer-x", "50%");
  target.style.setProperty("--pointer-y", "50%");
  target.style.setProperty("--tilt-x", "0deg");
  target.style.setProperty("--tilt-y", "0deg");
}

function JessiePanel() {
  const [speaking, setSpeaking] = useState(false);
  const transcript = "Hello, I’m Jessie. How can I help you today?";

  function toggleSpeech() {
    if (!("speechSynthesis" in window)) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(transcript);
    utterance.rate = 0.98;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }

  return (
    <section className="home-jessie" aria-label="Jessie AI guide">
      <div className="home-jessie-radar" aria-hidden="true"><i /><i /><i /></div>
      <div className="home-kicker home-jessie-kicker">
        <span className="home-live-dot" /> Jessie · live AI guide
      </div>
      <div className="home-jessie-art">
        <JessiePortrait size={360} variant="hero" priority />
        <span className="home-jessie-scan" aria-hidden="true" />
        <span className="home-jessie-rimlight" aria-hidden="true" />
      </div>
      <div className="home-jessie-transcript" aria-live="polite">
        <div>
          <strong>Hello, I&apos;m Jessie.</strong>
          <span>How can I help you today?</span>
        </div>
        <button
          type="button"
          onClick={toggleSpeech}
          aria-label={speaking ? "Stop Jessie read-aloud" : "Play Jessie read-aloud"}
          className={`home-wave ${speaking ? "is-speaking" : ""}`}
        >
          {[8, 16, 11, 22, 14, 27, 18, 12, 21, 9, 16, 7].map((height, index) => (
            <i key={index} style={{ height }} />
          ))}
        </button>
      </div>
    </section>
  );
}

export function ApprovedHomepage() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onVisibility = () =>
      document.documentElement.classList.toggle("motion-paused", document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    onVisibility();
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      document.documentElement.classList.remove("motion-paused");
      window.speechSynthesis?.cancel();
    };
  }, []);

  return (
    <div className="approved-composition">
      <section
        ref={heroRef}
        className="home-hero-shell"
        aria-labelledby="home-heading"
        onPointerMove={setPointerVariables}
        onPointerLeave={resetPointerVariables}
      >
        <span className="home-hero-cursor-glow" aria-hidden="true" />
        <span className="home-hero-grid" aria-hidden="true" />
        <JessiePanel />

        <div className="home-copy">
          <p className="home-kicker text-vanguard-gold">Research insights. Research support.</p>
          <h1 id="home-heading">
            Research with <em>Confidence.</em>
          </h1>
          <p>
            High-quality research materials, transparent sourcing, and educational content—helping researchers make informed decisions.
          </p>
          <div className="home-actions">
            <Link href="/education"><Atom /> Research insights</Link>
            <Link href="/products"><Box /> Explore catalog</Link>
            <Link href="/research"><Microscope /> Research support</Link>
            <button type="button" onClick={openJessie} aria-label="Open Jessie AI guide"><UserRound /> Ask Jessie</button>
          </div>
        </div>

        <div className="home-vial-scene" aria-label="Vanguard winged research vial artwork">
          <span className="home-vial-halo" aria-hidden="true" />
          <Image
            src="/images/approved/hero-winged-vial.webp"
            width={701}
            height={320}
            alt="Vanguard Performance Labs winged research vial"
            priority
          />
          <div className="home-vial-glint" aria-hidden="true" />
          <div className="home-embers" aria-hidden="true">
            {embers.map((ember, index) => (
              <i
                key={index}
                className={ember.hot ? "is-hot" : ""}
                style={{
                  "--ember-left": ember.left,
                  "--ember-delay": ember.delay,
                  "--ember-duration": ember.duration,
                  "--ember-size": ember.size,
                  "--ember-drift": ember.drift,
                } as CSSProperties}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="home-trust" aria-label="Vanguard standards">
        {trust.map(([Icon, title, copy], index) => (
          <div key={title} style={{ "--trust-index": index } as CSSProperties}>
            <Icon />
            <p><strong>{title}</strong><span>{copy}</span></p>
          </div>
        ))}
      </section>

      <section className="home-categories" aria-label="Research categories">
        {categories.map(([title, image, href], categoryIndex) => (
          <Link
            href={href}
            key={title}
            className="home-category"
            onPointerMove={setPointerVariables}
            onPointerLeave={resetPointerVariables}
            style={{ "--category-index": categoryIndex } as CSSProperties}
          >
            <Image src={image} width={360} height={210} alt="" aria-hidden="true" />
            <span className="home-category-shade" aria-hidden="true" />
            <span className="home-category-spotlight" aria-hidden="true" />
            <span className="home-category-orbit" aria-hidden="true"><i /><i /></span>
            <span className="home-category-particles" aria-hidden="true">
              {categoryParticles.map((particle, index) => (
                <i
                  key={index}
                  style={{
                    "--particle-x": particle.x,
                    "--particle-y": particle.y,
                    "--particle-delay": particle.delay,
                  } as CSSProperties}
                />
              ))}
            </span>
            <strong>{title}</strong>
            <ArrowRight className="category-arrow" />
          </Link>
        ))}
      </section>

      <section className="home-assistant" aria-label="Research assistant tools">
        <div className="home-assistant-intro">
          <span className="home-tool-ambient" aria-hidden="true" />
          <p className="home-kicker text-vanguard-gold">Research assistant</p>
          <h2>Tools and support<br />for your research.</h2>
          <p>Access curated insights, product information, and research resources to support your work.</p>
          <button type="button" onClick={openJessie} aria-label="Open Jessie research assistant">
            Ask Jessie <ArrowRight />
          </button>
        </div>

        {tools.map(([Icon, title, copy, href], index) => (
          <Link href={href} key={title} className="home-tool" style={{ "--tool-index": index } as CSSProperties}>
            <span className="home-tool-ambient" aria-hidden="true" />
            <span className="home-tool-icon"><Icon /></span>
            <div><strong>{title}</strong><span>{copy}</span></div>
          </Link>
        ))}

        <button type="button" onClick={openJessie} className="home-tool" aria-label="Open Jessie live AI guide">
          <span className="home-tool-ambient" aria-hidden="true" />
          <span className="home-tool-icon"><Bot /></span>
          <div><strong>Ask Jessie</strong><span>Have a question? Jessie is here to help with research support.</span></div>
        </button>
      </section>

      <section className="home-bottom">
        <div className="home-veteran">
          <span className="home-flag-ripples" aria-hidden="true">
            {Array.from({ length: 8 }, (_, index) => (
              <i key={index} style={{ "--flag-fold": index } as CSSProperties} />
            ))}
          </span>
          <div className="home-veteran-copy">
            <Image className="home-veteran-mark" src="/images/brand/vanguard-mark.png" width={86} height={66} alt="" aria-hidden="true" />
            <div>
              <h2>Veteran owned.<br />Mission driven.</h2>
              <p>Proudly veteran owned and operated. Built on values of integrity, discipline, and service—supporting researchers with dedication and respect.</p>
            </div>
          </div>
        </div>

        <Newsletter />

        <div className="home-bottom-trust">
          <div><CheckCircle /><p><strong>For research use only</strong><span>For laboratory research use only.</span></p></div>
          <div><LockKeyhole /><p><strong>Private & secure</strong><span>Your privacy is our priority.</span></p></div>
          <div><UserRound /><p><strong>Research support</strong><span>We&apos;re here to support your research.</span></p></div>
          <button type="button" onClick={openJessie} aria-label="Open Jessie live AI guide">
            <Bot /><span><strong>Ask Jessie</strong><small>Live AI Guide</small></span>
          </button>
        </div>
      </section>
    </div>
  );
}

function Newsletter() {
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email") ?? "");
    setState("busy");
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "information_request",
          company: "Newsletter subscriber",
          email,
          source: "homepage_newsletter",
          topic: "newsletter",
        }),
      });
      if (!response.ok) throw new Error();
      setState("done");
    } catch {
      setState("error");
    }
  }

  return (
    <form onSubmit={submit} className="home-newsletter">
      <span className="home-newsletter-aurora" aria-hidden="true" />
      <h2>Stay informed. Advance your research.</h2>
      <p>Subscribe for research insights, product updates, and educational content.</p>
      <div>
        <input required type="email" name="email" aria-label="Email for research newsletter" placeholder="Enter your email" />
        <button disabled={state === "busy"}>{state === "busy" ? "Sending…" : "Subscribe"}</button>
      </div>
      <span aria-live="polite">
        {state === "done"
          ? "Subscription request received for human review."
          : state === "error"
            ? "Could not subscribe. Please try again."
            : ""}
      </span>
    </form>
  );
}
