import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { copy, getTheme, themes, type ThemeId } from "@/lib/rakhi-content";
import { CornerVine, Divider, PhotoFrame, Rakhi } from "@/components/ornaments";

export const Route = createFileRoute("/")({
  component: Experience,
  head: () => ({
    meta: [
      { title: "Ek Dhaaga — A Handcrafted Raksha Bandhan Keepsake" },
      {
        name: "description",
        content:
          "Tie a digital rakhi: personalise a handcrafted Indian keepsake card with her name, a photo and a message, then share it on Raksha Bandhan.",
      },
      { property: "og:title", content: "Ek Dhaaga — A Handcrafted Raksha Bandhan Keepsake" },
      {
        property: "og:description",
        content: "A little Raksha Bandhan gift that happens to live on the web.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

type Stage = "opening" | "personalize" | "designs" | "assembling" | "card";

type Gift = {
  sister: string;
  brother: string;
  message: string;
  photo: string | null;
  theme: ThemeId;
};

const emptyGift: Gift = {
  sister: "",
  brother: "",
  message: "",
  photo: null,
  theme: "royal",
};

/* ------------------------------------------------------------------ */

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduced(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);
  return reduced;
}

/** A handful of slow marigold-dust particles — deliberately few. */
function Petals({ enabled }: { enabled: boolean }) {
  const seeds = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, i) => ({
        left: `${(i * 37) % 96}%`,
        size: 5 + ((i * 7) % 8),
        delay: `${i * 2.6}s`,
        duration: `${22 + ((i * 5) % 14)}s`,
      })),
    [],
  );
  if (!enabled) return null;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {seeds.map((s, i) => (
        <span
          key={i}
          className="petal absolute bottom-[-6vh] rounded-full"
          style={{
            left: s.left,
            width: s.size,
            height: s.size * 0.7,
            animationDelay: s.delay,
            animationDuration: s.duration,
            background:
              i % 3 === 0
                ? "color-mix(in oklab, var(--saffron) 80%, transparent)"
                : i % 3 === 1
                  ? "color-mix(in oklab, var(--vermillion) 55%, transparent)"
                  : "color-mix(in oklab, var(--antique-gold) 75%, transparent)",
          }}
        />
      ))}
    </div>
  );
}

function Corners() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 opacity-70">
      <CornerVine className="absolute left-0 top-0" />
      <CornerVine className="absolute right-0 top-0 -scale-x-100" />
      <CornerVine className="absolute bottom-0 left-0 -scale-y-100" />
      <CornerVine className="absolute bottom-0 right-0 -scale-100" />
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Experience() {
  const [stage, setStage] = useState<Stage>("opening");
  const [gift, setGift] = useState<Gift>(emptyGift);
  const reduced = usePrefersReducedMotion();
  const liveRef = useRef<HTMLDivElement>(null);

  const theme = getTheme(gift.theme);
  const themeStyle = theme.vars as React.CSSProperties;

  useEffect(() => {
    if (liveRef.current) liveRef.current.textContent = `${stage} step`;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }, [stage, reduced]);

  return (
    <main
      style={themeStyle}
      className="paper relative flex min-h-dvh flex-col items-center px-[clamp(1rem,5vw,3rem)] py-[max(1.5rem,env(safe-area-inset-top))] pb-[max(2rem,env(safe-area-inset-bottom))]"
    >
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 lamp-glow"
        style={{ background: theme.vars["--t-wash"] }}
      />
      <Petals enabled={!reduced && stage !== "assembling"} />
      <Corners />
      <div ref={liveRef} aria-live="polite" className="sr-only" />

      <div className="relative z-10 flex w-full flex-1 items-center justify-center">
        {stage === "opening" && <Opening onOpen={() => setStage("personalize")} />}
        {stage === "personalize" && (
          <Personalize
            gift={gift}
            setGift={setGift}
            onBack={() => setStage("opening")}
            onNext={() => setStage("designs")}
          />
        )}
        {stage === "designs" && (
          <Designs
            selected={gift.theme}
            onSelect={(id) => setGift((g) => ({ ...g, theme: id }))}
            onBack={() => setStage("personalize")}
            onNext={() => setStage("assembling")}
          />
        )}
        {stage === "assembling" && (
          <Assembling theme={gift.theme} onDone={() => setStage("card")} reduced={reduced} />
        )}
        {stage === "card" && (
          <FinalCard gift={gift} onRestart={() => { setGift(emptyGift); setStage("opening"); }} />
        )}
      </div>
    </main>
  );
}

/* ---------------------------- 1. opening --------------------------- */

function Opening({ onOpen }: { onOpen: () => void }) {
  const [second, setSecond] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setSecond(true), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="mx-auto flex max-w-[38rem] flex-col items-center text-center">
      <p className="deva reveal text-[clamp(1rem,3.4vw,1.35rem)] text-[color:var(--t-accent)]">
        {copy.opening.kicker}
      </p>

      <Rakhi theme="royal" className="reveal mt-[clamp(1.5rem,5vw,2.5rem)] w-[clamp(11rem,42vw,17rem)]" />

      <h1 className="display reveal mt-[clamp(1.5rem,5vw,2.5rem)] text-balance text-[clamp(1.5rem,5.4vw,2.4rem)] leading-[1.25]">
        {copy.opening.line1}
      </h1>

      <p
        className={`mt-5 max-w-[30rem] text-balance text-[clamp(1rem,3.2vw,1.15rem)] leading-relaxed text-[color:color-mix(in_oklab,var(--ink)_74%,var(--parchment))] transition-opacity duration-[1200ms] ${
          second ? "opacity-100" : "opacity-0"
        }`}
      >
        {copy.opening.line2}
      </p>

      <Divider className="my-[clamp(1.75rem,6vw,2.75rem)]" />

      <button type="button" onClick={onOpen} className="btn-base btn-primary reveal">
        {copy.opening.cta}
      </button>
      <p className="caption mt-5">{copy.opening.hint}</p>
    </section>
  );
}

/* ------------------------- 2. personalize -------------------------- */

function Personalize({
  gift,
  setGift,
  onBack,
  onNext,
}: {
  gift: Gift;
  setGift: React.Dispatch<React.SetStateAction<Gift>>;
  onBack: () => void;
  onNext: () => void;
}) {
  const onPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setGift((g) => ({ ...g, photo: String(reader.result) }));
    reader.readAsDataURL(file);
  };

  return (
    <section className="w-full max-w-[34rem] py-8">
      <header className="text-center">
        <h2 className="display text-[clamp(1.6rem,5vw,2.1rem)]">{copy.personalize.title}</h2>
        <p className="mt-3 text-[0.95rem] text-[color:color-mix(in_oklab,var(--ink)_70%,var(--parchment))]">
          {copy.personalize.subtitle}
        </p>
        <Divider className="mx-auto my-7" />
      </header>

      <form
        className="unfold flex flex-col gap-7"
        onSubmit={(e) => {
          e.preventDefault();
          onNext();
        }}
      >
        <div className="grid gap-7 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="caption">{copy.personalize.sisterLabel}</span>
            <input
              className="field display text-lg"
              required
              maxLength={28}
              placeholder={copy.personalize.sisterPlaceholder}
              value={gift.sister}
              onChange={(e) => setGift((g) => ({ ...g, sister: e.target.value }))}
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="caption">{copy.personalize.brotherLabel}</span>
            <input
              className="field display text-lg"
              required
              maxLength={28}
              placeholder={copy.personalize.brotherPlaceholder}
              value={gift.brother}
              onChange={(e) => setGift((g) => ({ ...g, brother: e.target.value }))}
            />
          </label>
        </div>

        <div className="flex flex-col gap-3">
          <span className="caption">{copy.personalize.messageLabel}</span>
          <textarea
            className="field min-h-[7.5rem] resize-y leading-relaxed"
            rows={4}
            maxLength={420}
            placeholder={copy.personalize.messagePlaceholder}
            value={gift.message}
            onChange={(e) => setGift((g) => ({ ...g, message: e.target.value }))}
          />
          <div className="flex flex-wrap gap-2">
            {copy.personalize.prompts.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() =>
                  setGift((g) => ({ ...g, message: g.message ? `${g.message}\n${p} ` : `${p} ` }))
                }
                className="min-h-11 rounded-[3px] border border-[color:color-mix(in_oklab,var(--antique-gold)_60%,transparent)] px-3 text-[0.8rem] text-[color:color-mix(in_oklab,var(--ink)_75%,var(--parchment))] transition-colors hover:bg-[color:color-mix(in_oklab,var(--antique-gold)_14%,transparent)]"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="caption">{copy.personalize.photoLabel}</span>
          <div className="flex flex-wrap items-center gap-4">
            <label className="btn-base btn-ghost cursor-pointer">
              {gift.photo ? "Change photo" : "Add a photo"}
              <input type="file" accept="image/*" className="sr-only" onChange={onPhoto} />
            </label>
            {gift.photo && (
              <>
                <img
                  src={gift.photo}
                  alt="Preview of the photo you added"
                  className="size-14 rounded-full border border-[color:var(--antique-gold)] object-cover"
                />
                <button
                  type="button"
                  className="min-h-11 text-sm underline underline-offset-4"
                  onClick={() => setGift((g) => ({ ...g, photo: null }))}
                >
                  Remove
                </button>
              </>
            )}
          </div>
          <p className="text-xs text-[color:color-mix(in_oklab,var(--ink)_55%,var(--parchment))]">
            {copy.personalize.photoHelp}
          </p>
        </div>

        <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <button type="button" onClick={onBack} className="btn-base btn-ghost">
            {copy.personalize.back}
          </button>
          <button type="submit" className="btn-base btn-primary">
            {copy.personalize.next}
          </button>
        </div>
      </form>
    </section>
  );
}

/* --------------------------- 3. designs ---------------------------- */

function Designs({
  selected,
  onSelect,
  onBack,
  onNext,
}: {
  selected: ThemeId;
  onSelect: (id: ThemeId) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <section className="w-full max-w-[62rem] py-8">
      <header className="text-center">
        <h2 className="display text-[clamp(1.6rem,5vw,2.1rem)]">{copy.designs.title}</h2>
        <p className="mt-3 text-[0.95rem] text-[color:color-mix(in_oklab,var(--ink)_70%,var(--parchment))]">
          {copy.designs.subtitle}
        </p>
        <Divider className="mx-auto my-7" />
      </header>

      <ul
        className="-mx-[clamp(1rem,5vw,3rem)] flex snap-x snap-mandatory gap-4 overflow-x-auto px-[clamp(1rem,5vw,3rem)] pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3"
        role="list"
      >
        {themes.map((t) => {
          const active = t.id === selected;
          return (
            <li key={t.id} className="min-w-[16rem] flex-1 snap-center sm:min-w-0">
              <button
                type="button"
                aria-pressed={active}
                onClick={() => onSelect(t.id)}
                style={t.vars as React.CSSProperties}
                className={`lift keepsake flex h-full w-full flex-col items-center gap-3 p-6 text-center transition-shadow ${
                  active
                    ? "outline outline-2 outline-offset-4 outline-[color:var(--t-accent)]"
                    : "opacity-90"
                }`}
              >
                <span className="caption self-start">{t.index}</span>
                <Rakhi theme={t.id} animate={false} className="w-28" />
                <span className="display text-xl">{t.name}</span>
                <span className="text-[0.85rem] leading-relaxed text-[color:color-mix(in_oklab,var(--ink)_66%,var(--parchment))]">
                  {t.tagline}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <button type="button" onClick={onBack} className="btn-base btn-ghost">
          {copy.personalize.back}
        </button>
        <button type="button" onClick={onNext} className="btn-base btn-primary">
          {copy.designs.next}
        </button>
      </div>
    </section>
  );
}

/* -------------------------- 4. assembling -------------------------- */

function Assembling({
  theme,
  onDone,
  reduced,
}: {
  theme: ThemeId;
  onDone: () => void;
  reduced: boolean;
}) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (reduced) {
      onDone();
      return;
    }
    const id = setInterval(() => {
      setStep((s) => {
        if (s >= copy.assembling.length - 1) {
          clearInterval(id);
          setTimeout(onDone, 900);
          return s;
        }
        return s + 1;
      });
    }, 1150);
    return () => clearInterval(id);
  }, [onDone, reduced]);

  return (
    <section className="flex flex-col items-center text-center" aria-live="polite">
      <Rakhi theme={theme} className="w-[clamp(9rem,34vw,13rem)]" />
      <p key={step} className="display reveal mt-10 text-[clamp(1.1rem,4vw,1.5rem)]">
        {copy.assembling[step]}
      </p>
      <div className="mt-8 h-px w-[min(18rem,70vw)] bg-[color:color-mix(in_oklab,var(--antique-gold)_45%,transparent)]">
        <div
          className="h-px bg-[color:var(--t-accent)] transition-[width] duration-1000 ease-out"
          style={{ width: `${((step + 1) / copy.assembling.length) * 100}%` }}
        />
      </div>
    </section>
  );
}

/* -------------------------- 5. final card -------------------------- */

function FinalCard({ gift, onRestart }: { gift: Gift; onRestart: () => void }) {
  const [copied, setCopied] = useState(false);
  const sister = gift.sister.trim() || "Behna";
  const brother = gift.brother.trim() || "Bhai";
  const message = gift.message.trim() || copy.card.fallbackMessage;

  const shareText = `Happy Raksha Bandhan, ${sister} — with love, ${brother}.`;

  const share = useCallback(async () => {
    const url = typeof window !== "undefined" ? window.location.href : "/";
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "Happy Raksha Bandhan", text: shareText, url });
        return;
      } catch {
        /* dismissed */
      }
    }
    try {
      await navigator.clipboard.writeText(`${shareText} ${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      /* clipboard blocked */
    }
  }, [shareText]);

  return (
    <section className="flex w-full max-w-[34rem] flex-col items-center py-6">
      <article className="keepsake unfold relative w-full overflow-hidden px-[clamp(1.25rem,6vw,3rem)] py-[clamp(2rem,7vw,3.25rem)] text-center">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-3 border border-[color:color-mix(in_oklab,var(--antique-gold)_55%,transparent)]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-[0.9rem] border border-dashed border-[color:color-mix(in_oklab,var(--antique-gold)_35%,transparent)]"
        />

        <div className="relative">
          <Rakhi theme={gift.theme} className="mx-auto w-[clamp(7.5rem,28vw,10.5rem)]" />

          <p className="deva mt-6 text-[color:var(--t-accent)]">शुभ रक्षाबंधन</p>
          <h1 className="display mt-2 text-[clamp(1.35rem,5vw,1.8rem)] tracking-wide">
            {copy.card.greeting}
          </h1>
          <p className="display mt-3 text-[clamp(2rem,9vw,3.25rem)] leading-[1.05] text-[color:var(--t-accent)]">
            {sister}
          </p>

          <Divider className="mx-auto my-7" />

          <p className="mx-auto max-w-[26rem] whitespace-pre-line text-[clamp(0.95rem,3.4vw,1.05rem)] leading-[1.85] text-[color:color-mix(in_oklab,var(--ink)_84%,var(--parchment))]">
            {message}
          </p>

          {gift.photo && (
            <div className="mt-9">
              <PhotoFrame src={gift.photo} alt={`${brother} and ${sister}`} />
            </div>
          )}

          <p className="caption mt-9">{copy.card.signature}</p>
          <p className="display mt-1 text-[clamp(1.25rem,5vw,1.6rem)]">{brother}</p>

          <Divider className="mx-auto mt-8" />
        </div>
      </article>

      <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
        <button type="button" onClick={share} className="btn-base btn-primary">
          {copied ? copy.card.copied : copy.card.share}
        </button>
        <button type="button" onClick={() => window.print()} className="btn-base btn-ghost">
          {copy.card.download}
        </button>
      </div>
      <button
        type="button"
        onClick={onRestart}
        className="mt-5 min-h-11 text-sm underline underline-offset-4 text-[color:color-mix(in_oklab,var(--ink)_65%,var(--parchment))]"
      >
        {copy.card.restart}
      </button>
    </section>
  );
}
