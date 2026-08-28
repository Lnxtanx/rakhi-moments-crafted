import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { copy, getTheme, themes, type ThemeId } from "@/lib/rakhi-content";
import { CornerVine, Divider, Diya, Lotus, PhotoFrame, Rakhi, Rangoli } from "@/components/ornaments";

export const Route = createFileRoute("/")({
  component: Experience,
  head: () => ({
    meta: [
      { title: "Ek Dhaaga — A Handcrafted Raksha Bandhan Rakhi for Your Brother" },
      {
        name: "description",
        content:
          "Prepare a digital rakhi for your brother: pick one of six handcrafted designs, add a photo and a message, then send, share or save the keepsake card.",
      },
      { property: "og:title", content: "Ek Dhaaga — A Handcrafted Raksha Bandhan Rakhi" },
      {
        property: "og:description",
        content: "एक धागा, हज़ार यादें — a Raksha Bandhan keepsake a sister can send her brother.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

type Stage = "opening" | "personalize" | "designs" | "assembling" | "card";

type Gift = {
  /** sender */
  sister: string;
  /** recipient */
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

/** Adds `is-visible` to `.scroll-reveal` children as they enter the viewport. */
function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>(".scroll-reveal"));
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
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
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 opacity-60">
      <CornerVine className="absolute left-0 top-0" />
      <CornerVine className="absolute right-0 top-0 -scale-x-100" />
      <CornerVine className="absolute bottom-0 left-0 -scale-y-100" />
      <CornerVine className="absolute bottom-0 right-0 -scale-100" />
    </div>
  );
}

function Credit() {
  return (
    <p className="deva mt-10 text-center text-[0.78rem] tracking-[0.14em] text-[color:color-mix(in_oklab,var(--ink)_52%,var(--parchment))]">
      {copy.credit}
    </p>
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
      className="paper relative flex min-h-dvh w-full max-w-full flex-col items-center overflow-x-hidden px-[clamp(0.9rem,5vw,3rem)] py-[max(1.5rem,env(safe-area-inset-top))] pb-[max(2rem,env(safe-area-inset-bottom))]"
    >
      <div
        aria-hidden
        className="lamp-glow pointer-events-none fixed inset-0 z-0"
        style={{ background: theme.vars["--t-wash"] }}
      />
      <Petals enabled={!reduced && stage !== "assembling"} />
      <Corners />
      <div ref={liveRef} aria-live="polite" className="sr-only" />

      <div className="relative z-10 flex w-full flex-1 flex-col items-center justify-center">
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
          <FinalCard
            gift={gift}
            onRestart={() => {
              setGift(emptyGift);
              setStage("opening");
            }}
          />
        )}
      </div>
    </main>
  );
}

/* ---------------------------- 1. opening --------------------------- */

function Opening({ onOpen }: { onOpen: () => void }) {
  const [second, setSecond] = useState(false);
  const revealRef = useScrollReveal<HTMLDivElement>();

  useEffect(() => {
    const t = setTimeout(() => setSecond(true), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div ref={revealRef} className="w-full">
      <section className="mx-auto flex max-w-[38rem] flex-col items-center text-center">
        <p className="deva reveal text-[clamp(1.05rem,3.6vw,1.5rem)] tracking-[0.16em] text-[color:var(--t-accent)]">
          {copy.opening.kicker}
        </p>

        <div className="relative mt-[clamp(1.25rem,5vw,2.25rem)] flex w-full items-center justify-center">
          <Rangoli
            className="pointer-events-none absolute w-[clamp(15rem,60vw,24rem)] opacity-25"
            aria-hidden
          />
          <Rakhi theme="royal" className="reveal relative w-[clamp(10.5rem,42vw,17rem)]" />
        </div>

        <h1 className="deva reveal mt-[clamp(1.5rem,5vw,2.25rem)] text-balance text-[clamp(1.9rem,8vw,3rem)] leading-[1.35] text-[color:var(--t-accent)]">
          {copy.opening.hindiLine1}
          <br />
          {copy.opening.hindiLine2}
        </h1>

        <p className="display reveal mt-6 max-w-[32rem] text-balance text-[clamp(1.05rem,4vw,1.35rem)] leading-[1.5]">
          {copy.opening.line1}
        </p>

        <p
          className={`mt-4 max-w-[30rem] text-balance text-[clamp(0.95rem,3.2vw,1.1rem)] leading-relaxed text-[color:color-mix(in_oklab,var(--ink)_74%,var(--parchment))] transition-opacity duration-[1200ms] ${
            second ? "opacity-100" : "opacity-0"
          }`}
        >
          {copy.opening.line2}
        </p>

        <Divider className="my-[clamp(1.5rem,6vw,2.5rem)]" />

        <p className="caption">{copy.opening.waiting}</p>

        <button type="button" onClick={onOpen} className="btn-base btn-primary reveal mt-6">
          {copy.opening.cta}
        </button>
        <p className="caption mt-5 max-w-[22rem]">{copy.opening.hint}</p>
      </section>

      <StoryOfAThread />
      <InfoPanels />
      <Credit />
    </div>
  );
}

/* ------------------------ story + information ---------------------- */

function StoryOfAThread() {
  return (
    <section className="mx-auto mt-[clamp(4rem,14vw,8rem)] w-full max-w-[62rem]">
      <header className="scroll-reveal flex flex-col items-center text-center">
        <Lotus />
        <p className="deva mt-3 text-[clamp(1.1rem,4vw,1.4rem)] text-[color:var(--t-accent)]">
          {copy.story.kicker}
        </p>
        <h2 className="display mt-2 text-[clamp(1.35rem,4.6vw,2rem)]">{copy.story.title}</h2>
        <Divider className="mx-auto my-7" />
      </header>

      <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {copy.story.steps.map((s, i) => (
          <li
            key={s.en}
            className="scroll-reveal keepsake relative flex min-w-0 flex-col gap-2 p-[clamp(1.1rem,4vw,1.6rem)]"
            style={{ transitionDelay: `${i * 90}ms` }}
          >
            <span className="caption">{String(i + 1).padStart(2, "0")}</span>
            <span className="deva text-[clamp(1.25rem,5vw,1.6rem)] leading-tight text-[color:var(--t-accent)]">
              {s.hi}
            </span>
            <span className="display text-[1.05rem]">{s.en}</span>
            <p className="text-[0.9rem] leading-relaxed text-[color:color-mix(in_oklab,var(--ink)_70%,var(--parchment))]">
              {s.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function InfoPanels() {
  return (
    <section className="mx-auto mt-[clamp(4rem,14vw,8rem)] w-full max-w-[62rem]">
      <header className="scroll-reveal flex flex-col items-center text-center">
        <Diya />
        <p className="deva mt-3 text-[clamp(1.1rem,4vw,1.4rem)] text-[color:var(--t-accent)]">
          {copy.info.kicker}
        </p>
        <h2 className="display mt-2 text-[clamp(1.35rem,4.6vw,2rem)]">{copy.info.title}</h2>
        <Divider className="mx-auto my-7" />
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {copy.info.panels.map((p, i) => (
          <article
            key={p.en}
            className="scroll-reveal keepsake relative min-w-0 overflow-hidden p-[clamp(1.25rem,5vw,2rem)]"
            style={{ transitionDelay: `${i * 90}ms` }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-2 border border-dashed border-[color:color-mix(in_oklab,var(--antique-gold)_32%,transparent)]"
            />
            <div className="relative">
              <h3 className="deva text-[clamp(1.15rem,4.4vw,1.5rem)] leading-snug text-[color:var(--t-accent)]">
                {p.hi}
              </h3>
              <p className="caption mt-2">{p.en}</p>
              <p className="mt-4 text-[0.94rem] leading-[1.8] text-[color:color-mix(in_oklab,var(--ink)_78%,var(--parchment))]">
                {p.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ------------------------- 2. personalize -------------------------- */

function FieldLabel({ en, hi }: { en: string; hi: string }) {
  return (
    <span className="flex flex-wrap items-baseline gap-2">
      <span className="caption">{en}</span>
      <span className="deva text-[0.9rem] text-[color:var(--t-accent)]">{hi}</span>
    </span>
  );
}

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
        <p className="deva text-[clamp(1.1rem,4vw,1.4rem)] text-[color:var(--t-accent)]">
          {copy.personalize.titleHi}
        </p>
        <h2 className="display mt-2 text-[clamp(1.5rem,5vw,2.1rem)]">{copy.personalize.title}</h2>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-[color:color-mix(in_oklab,var(--ink)_70%,var(--parchment))]">
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
        <div className="grid min-w-0 gap-7 sm:grid-cols-2">
          <label className="flex min-w-0 flex-col gap-2">
            <FieldLabel en={copy.personalize.brotherLabel} hi={copy.personalize.brotherLabelHi} />
            <input
              className="field display text-lg"
              required
              maxLength={28}
              autoComplete="off"
              placeholder={copy.personalize.brotherPlaceholder}
              value={gift.brother}
              onChange={(e) => setGift((g) => ({ ...g, brother: e.target.value }))}
            />
          </label>
          <label className="flex min-w-0 flex-col gap-2">
            <FieldLabel en={copy.personalize.sisterLabel} hi={copy.personalize.sisterLabelHi} />
            <input
              className="field display text-lg"
              required
              maxLength={28}
              autoComplete="off"
              placeholder={copy.personalize.sisterPlaceholder}
              value={gift.sister}
              onChange={(e) => setGift((g) => ({ ...g, sister: e.target.value }))}
            />
          </label>
        </div>

        <div className="flex min-w-0 flex-col gap-3">
          <FieldLabel en={copy.personalize.messageLabel} hi={copy.personalize.messageLabelHi} />
          <textarea
            className="field min-h-[7.5rem] resize-y leading-relaxed"
            rows={4}
            maxLength={420}
            placeholder={copy.personalize.messagePlaceholder}
            value={gift.message}
            onChange={(e) => setGift((g) => ({ ...g, message: e.target.value }))}
          />
          <p className="deva text-[0.85rem] text-[color:color-mix(in_oklab,var(--ink)_60%,var(--parchment))]">
            {copy.personalize.messageHint}
          </p>
          <div className="flex flex-wrap gap-2">
            {copy.personalize.prompts.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() =>
                  setGift((g) => ({ ...g, message: g.message ? `${g.message}\n${p} ` : `${p} ` }))
                }
                className="min-h-11 max-w-full rounded-[3px] border border-[color:color-mix(in_oklab,var(--antique-gold)_60%,transparent)] px-3 text-left text-[0.8rem] text-[color:color-mix(in_oklab,var(--ink)_75%,var(--parchment))] transition-colors hover:bg-[color:color-mix(in_oklab,var(--antique-gold)_14%,transparent)]"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-3">
          <FieldLabel en={copy.personalize.photoLabel} hi={copy.personalize.photoLabelHi} />
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
                  className="size-14 shrink-0 rounded-full border border-[color:var(--antique-gold)] object-cover"
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
        <p className="deva text-[clamp(1.1rem,4vw,1.4rem)] text-[color:var(--t-accent)]">
          {copy.designs.titleHi}
        </p>
        <h2 className="display mt-2 text-[clamp(1.5rem,5vw,2.1rem)]">{copy.designs.title}</h2>
        <p className="mt-3 text-[0.95rem] text-[color:color-mix(in_oklab,var(--ink)_70%,var(--parchment))]">
          {copy.designs.subtitle}
        </p>
        <Divider className="mx-auto my-7" />
      </header>

      <ul
        className="-mx-[clamp(0.9rem,5vw,3rem)] flex snap-x snap-mandatory gap-4 overflow-x-auto px-[clamp(0.9rem,5vw,3rem)] pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3"
        role="list"
      >
        {themes.map((t) => {
          const active = t.id === selected;
          return (
            <li key={t.id} className="min-w-[15rem] flex-1 snap-center sm:min-w-0">
              <button
                type="button"
                aria-pressed={active}
                onClick={() => onSelect(t.id)}
                style={t.vars as React.CSSProperties}
                className={`lift keepsake flex h-full w-full flex-col items-center gap-2 p-6 text-center transition-shadow ${
                  active
                    ? "outline outline-2 outline-offset-4 outline-[color:var(--t-accent)]"
                    : "opacity-90"
                }`}
              >
                <span className="caption self-start">{t.index}</span>
                <Rakhi theme={t.id} animate={active} className="w-28" />
                <span className="deva mt-1 text-[1.15rem] text-[color:var(--t-accent)]">
                  {t.nameHi}
                </span>
                <span className="display text-lg">{t.name}</span>
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
      const t = setTimeout(onDone, 400);
      return () => clearTimeout(t);
    }
    const id = setInterval(() => {
      setStep((s) => {
        if (s >= copy.assembling.length - 1) {
          clearInterval(id);
          return s;
        }
        return s + 1;
      });
    }, 850);
    const done = setTimeout(onDone, 850 * copy.assembling.length + 500);
    return () => {
      clearInterval(id);
      clearTimeout(done);
    };
  }, [onDone, reduced]);

  return (
    <section className="flex flex-col items-center px-2 text-center" aria-live="polite">
      <div className="relative flex items-center justify-center">
        <Rangoli aria-hidden className="pointer-events-none absolute w-[clamp(13rem,52vw,20rem)] opacity-20" />
        <Rakhi theme={theme} tying className="relative w-[clamp(9rem,34vw,13rem)]" />
      </div>
      <p key={step} className="reveal deva mt-10 text-balance text-[clamp(1rem,4vw,1.35rem)]">
        {copy.assembling[step]}
      </p>
      <div className="mt-8 h-px w-[min(18rem,70vw)] bg-[color:color-mix(in_oklab,var(--antique-gold)_45%,transparent)]">
        <div
          className="h-px bg-[color:var(--t-accent)] transition-[width] duration-700 ease-out"
          style={{ width: `${((step + 1) / copy.assembling.length) * 100}%` }}
        />
      </div>
    </section>
  );
}

/* -------------------------- 5. final card -------------------------- */

function FinalCard({ gift, onRestart }: { gift: Gift; onRestart: () => void }) {
  const cardRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);

  const sister = gift.sister.trim() || "आपकी बहन";
  const brother = gift.brother.trim() || "Bhai";
  const message = gift.message.trim() || copy.card.fallbackMessage;

  const shareText = `${copy.card.greeting}, ${brother} — with love, ${sister}.`;

  const renderCard = useCallback(async () => {
    const node = cardRef.current;
    if (!node) return null;
    const { toBlob } = await import("html-to-image");
    return toBlob(node, {
      pixelRatio: Math.min(3, Math.max(2, window.devicePixelRatio || 2)),
      cacheBust: true,
      backgroundColor: getComputedStyle(document.body).backgroundColor,
      filter: (el) => !(el instanceof HTMLElement && el.dataset["exportHide"] === "true"),
    });
  }, []);

  const save = useCallback(async () => {
    setSaving(true);
    try {
      const blob = await renderCard();
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `rakhi-for-${brother.replace(/\s+/g, "-").toLowerCase() || "bhai"}.png`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
    } finally {
      setSaving(false);
    }
  }, [brother, renderCard]);

  const share = useCallback(async () => {
    const url = typeof window !== "undefined" ? window.location.href : "/";
    const payload: ShareData = { title: copy.card.greeting, text: shareText, url };

    try {
      const blob = await renderCard();
      if (blob && navigator.canShare) {
        const file = new File([blob], "rakhi.png", { type: "image/png" });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({ ...payload, files: [file] });
          return;
        }
      }
    } catch {
      /* fall through to link sharing */
    }

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(payload);
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
  }, [renderCard, shareText]);

  return (
    <section className="flex w-full max-w-[34rem] flex-col items-center py-6">
      <article
        ref={cardRef}
        className="keepsake unfold relative w-full min-w-0 overflow-hidden px-[clamp(1.1rem,6vw,3rem)] py-[clamp(1.9rem,7vw,3.25rem)] text-center"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-3 border border-[color:color-mix(in_oklab,var(--antique-gold)_55%,transparent)]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-[0.9rem] border border-dashed border-[color:color-mix(in_oklab,var(--antique-gold)_35%,transparent)]"
        />

        <div className="relative">
          <Rakhi theme={gift.theme} className="mx-auto w-[clamp(7rem,28vw,10.5rem)]" />

          <p className="deva mt-6 text-[clamp(1.2rem,5vw,1.6rem)] text-[color:var(--t-accent)]">
            {copy.card.greetingHi}
          </p>
          <h1 className="display mt-2 text-[clamp(1.05rem,4.2vw,1.4rem)] tracking-wide">
            {copy.card.greeting}
          </h1>

          <p className="caption mt-7">{copy.card.forLabel}</p>
          <p className="display mt-2 text-balance text-[clamp(1.8rem,8.5vw,3rem)] leading-[1.1] text-[color:var(--t-accent)]">
            {brother}
          </p>

          <Divider className="mx-auto my-7" />

          <p className="mx-auto max-w-[26rem] whitespace-pre-line text-[clamp(0.95rem,3.4vw,1.05rem)] leading-[1.85] text-[color:color-mix(in_oklab,var(--ink)_84%,var(--parchment))]">
            {message}
          </p>

          {gift.photo && (
            <div className="mt-9">
              <PhotoFrame src={gift.photo} alt={`${sister} and ${brother}`} />
            </div>
          )}

          <p className="deva mt-9 whitespace-pre-line text-[0.98rem] leading-[1.9] text-[color:color-mix(in_oklab,var(--ink)_70%,var(--parchment))]">
            {copy.card.blessingHi}
          </p>

          <Divider className="mx-auto my-7" />

          <p className="caption">{copy.card.signature}</p>
          <p className="display mt-1 text-[clamp(1.2rem,5vw,1.6rem)]">{sister}</p>
          <p className="deva mt-1 text-[0.9rem] text-[color:color-mix(in_oklab,var(--ink)_58%,var(--parchment))]">
            {copy.card.signatureHi}
          </p>
        </div>
      </article>

      {/* ------------------------ send / share / save ------------------------ */}
      <div className="mt-[clamp(2rem,7vw,3rem)] w-full">
        <header className="text-center">
          <p className="deva text-[clamp(1.05rem,4vw,1.35rem)] text-[color:var(--t-accent)]">
            {copy.share.titleHi}
          </p>
          <h2 className="display mt-2 text-[clamp(1.25rem,4.6vw,1.7rem)]">{copy.share.title}</h2>
          <p className="mt-2 text-[0.9rem] text-[color:color-mix(in_oklab,var(--ink)_68%,var(--parchment))]">
            {copy.share.subtitle}
          </p>
          <Divider className="mx-auto my-7" />
        </header>

        <div className="flex flex-col gap-4">
          {/* share + save */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="keepsake flex min-w-0 flex-col items-start gap-3 p-[clamp(1.1rem,5vw,1.75rem)]">
              <h3 className="display text-[1.05rem]">{copy.share.shareTitle}</h3>
              <button type="button" onClick={share} className="btn-base btn-primary w-full">
                {copied ? copy.share.copied : copy.share.shareBtn}
              </button>
            </div>
            <div className="keepsake flex min-w-0 flex-col items-start gap-3 p-[clamp(1.1rem,5vw,1.75rem)]">
              <h3 className="display text-[1.05rem]">{copy.share.saveTitle}</h3>
              <button
                type="button"
                onClick={save}
                disabled={saving}
                className="btn-base btn-ghost w-full disabled:opacity-60"
              >
                {saving ? "Preparing…" : copy.share.saveImage}
              </button>
              <p className="text-xs leading-relaxed text-[color:color-mix(in_oklab,var(--ink)_55%,var(--parchment))]">
                {copy.share.gifPending}
              </p>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="mt-8 min-h-11 text-sm text-[color:color-mix(in_oklab,var(--ink)_65%,var(--parchment))] underline underline-offset-4"
      >
        {copy.card.restart}
      </button>

      <Credit />
    </section>
  );
}
