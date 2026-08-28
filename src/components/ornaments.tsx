import type { ThemeId } from "@/lib/rakhi-content";

const deco = { "aria-hidden": true, focusable: false } as const;

const ACCENT = "var(--t-accent, var(--vermillion))";
const GOLD = "var(--t-accent-2, var(--antique-gold))";

/** Small ornamental separator: a paisley flanked by tapering rules. */
export function Divider({ className = "" }: { className?: string }) {
  return (
    <svg
      {...deco}
      viewBox="0 0 240 24"
      className={`h-5 w-full max-w-[15rem] text-[color:var(--t-accent-2,var(--antique-gold))] ${className}`}
    >
      <path d="M6 12h78M156 12h78" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
      <path
        d="M120 3c9 4 13 9 13 13 0 5-4 8-8 8-5 0-8-4-8-8 0-6 5-9 11-11"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="120" cy="17" r="1.6" fill="currentColor" />
      <path d="M92 12c4-5 8-5 12 0-4 5-8 5-12 0Z" fill="currentColor" opacity="0.7" />
      <path d="M136 12c4-5 8-5 12 0-4 5-8 5-12 0Z" fill="currentColor" opacity="0.7" />
      <circle cx="86" cy="12" r="1.2" fill="currentColor" opacity="0.65" />
      <circle cx="154" cy="12" r="1.2" fill="currentColor" opacity="0.65" />
    </svg>
  );
}

/** Corner floral vine with lotus + paisley detail. */
export function CornerVine({ className = "" }: { className?: string }) {
  const blooms: [number, number, number][] = [
    [60, 72, 7],
    [86, 92, 5],
    [40, 44, 5],
    [108, 106, 4],
  ];
  return (
    <svg
      {...deco}
      viewBox="0 0 160 160"
      className={`w-[clamp(4.5rem,14vw,9rem)] text-[color:var(--t-accent-2,var(--antique-gold))] ${className}`}
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.1" opacity="0.85">
        <path d="M4 4c0 46 12 76 42 96s60 26 110 26" opacity="0.55" />
        <path d="M12 30c24 6 40 20 48 42" />
        <path d="M30 12c8 24 22 40 44 48" />
        <path d="M70 96c14 8 28 12 46 12" opacity="0.7" />
        <path d="M18 10c14 2 22 10 24 22-12 2-21-6-24-22Z" opacity="0.7" />
      </g>
      <g fill="currentColor">
        {blooms.map(([cx, cy, r], i) => (
          <g key={i} opacity={0.9}>
            {Array.from({ length: 8 }).map((_, p) => (
              <ellipse
                key={p}
                cx={cx}
                cy={cy - r}
                rx={r * 0.34}
                ry={r * 0.8}
                transform={`rotate(${p * 45} ${cx} ${cy})`}
                opacity="0.55"
              />
            ))}
            <circle cx={cx} cy={cy} r={r * 0.35} />
          </g>
        ))}
      </g>
    </svg>
  );
}

/** Lotus motif, used above headings. */
export function Lotus({ className = "" }: { className?: string }) {
  return (
    <svg {...deco} viewBox="0 0 120 60" className={`w-16 text-[color:var(--t-accent-2,var(--antique-gold))] ${className}`}>
      <g fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M60 54c-10 0-18-8-18-18 0 0 8 4 18 18Z" />
        <path d="M60 54c10 0 18-8 18-18 0 0-8 4-18 18Z" />
        <path d="M60 54c-4-12-4-24 0-32 4 8 4 20 0 32Z" />
        <path d="M60 54c-16-2-26-8-32-16 10-2 22 4 32 16Z" opacity="0.75" />
        <path d="M60 54c16-2 26-8 32-16-10-2-22 4-32 16Z" opacity="0.75" />
      </g>
      <circle cx="60" cy="54" r="2" fill="currentColor" />
    </svg>
  );
}

/** Rangoli geometry — used as a faint backdrop behind the rakhi. */
export function Rangoli({ className = "" }: { className?: string }) {
  return (
    <svg {...deco} viewBox="0 0 200 200" className={`text-[color:var(--t-accent-2,var(--antique-gold))] ${className}`}>
      <g fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.5">
        {Array.from({ length: 12 }).map((_, i) => (
          <ellipse key={i} cx="100" cy="100" rx="26" ry="82" transform={`rotate(${i * 15} 100 100)`} />
        ))}
        <circle cx="100" cy="100" r="92" strokeDasharray="2 6" />
        <circle cx="100" cy="100" r="56" />
      </g>
    </svg>
  );
}

/** A small brass diya with a living flame. */
export function Diya({ className = "" }: { className?: string }) {
  return (
    <svg {...deco} viewBox="0 0 80 70" className={`w-14 ${className}`}>
      <path d="M12 44c6 12 50 12 56 0-6-6-50-6-56 0Z" fill={GOLD} opacity="0.9" />
      <path d="M12 44c6 12 50 12 56 0" fill="none" stroke={GOLD} strokeWidth="1.2" />
      <ellipse cx="40" cy="43" rx="27" ry="5" fill={ACCENT} opacity="0.35" />
      <g className="flame" style={{ transformOrigin: "40px 36px" }}>
        <path d="M40 8c8 12 12 18 12 24a12 12 0 0 1-24 0c0-6 4-12 12-24Z" fill={ACCENT} opacity="0.85" />
        <path d="M40 20c4 7 6 10 6 13a6 6 0 0 1-12 0c0-3 2-6 6-13Z" fill={GOLD} />
      </g>
    </svg>
  );
}

/** Decorative border drawn as a single scalable frame. */
export function OrnateFrame({ className = "" }: { className?: string }) {
  return (
    <svg
      {...deco}
      viewBox="0 0 400 560"
      preserveAspectRatio="none"
      className={`absolute inset-0 h-full w-full text-[color:var(--t-accent-2,var(--antique-gold))] ${className}`}
    >
      <rect x="10" y="10" width="380" height="540" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.7" />
      <rect
        x="18"
        y="18"
        width="364"
        height="524"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.6"
        strokeDasharray="3 5"
        opacity="0.6"
      />
    </svg>
  );
}

/* ------------------------------- rakhi ------------------------------- */

type RakhiProps = {
  theme: ThemeId;
  className?: string;
  /** idle sway */
  animate?: boolean;
  /** run the tying sequence (thread draws, medallion settles, details bloom) */
  tying?: boolean;
};

function Medallion({ theme }: { theme: ThemeId }) {
  const r = 26;
  const petals =
    theme === "minimal" ? 6 : theme === "festive" ? 16 : theme === "handcrafted" ? 14 : 12;

  return (
    <g transform="translate(100 96)">
      {/* outer petals */}
      <g className="rk-petals">
        {Array.from({ length: petals }).map((_, i) => (
          <ellipse
            key={i}
            cx="0"
            cy={-r - 12}
            rx={theme === "heritage" ? 5 : 7}
            ry={theme === "heritage" ? 16 : 14}
            transform={`rotate(${(360 / petals) * i})`}
            fill={ACCENT}
            opacity={i % 2 ? 0.55 : 0.85}
          />
        ))}
      </g>

      {theme === "handcrafted" && (
        <g className="rk-beads">
          {Array.from({ length: 18 }).map((_, i) => {
            const a = (i / 18) * Math.PI * 2;
            return (
              <circle
                key={i}
                cx={Math.sin(a) * (r + 20)}
                cy={-Math.cos(a) * (r + 20)}
                r={i % 3 === 0 ? 3.4 : 2.2}
                fill={i % 2 ? GOLD : ACCENT}
                opacity="0.85"
              />
            );
          })}
        </g>
      )}

      <circle r={r + 2} fill="none" stroke={GOLD} strokeWidth="1.5" />
      <circle r={r - 4} fill={GOLD} opacity="0.22" />

      {theme === "festive" ? (
        <g className="rk-core">
          {Array.from({ length: 8 }).map((_, i) => (
            <path key={i} d="M0 -20 L5 0 L0 20 L-5 0 Z" transform={`rotate(${i * 45})`} fill={GOLD} opacity="0.65" />
          ))}
        </g>
      ) : theme === "heritage" ? (
        <g className="rk-core" stroke={GOLD} fill="none" strokeWidth="1.2">
          <rect x="-13" y="-13" width="26" height="26" transform="rotate(45)" />
          <rect x="-13" y="-13" width="26" height="26" />
        </g>
      ) : theme === "handcrafted" ? (
        <g className="rk-core">
          {Array.from({ length: 8 }).map((_, i) => (
            <g key={i} transform={`rotate(${i * 45})`}>
              <path d="M0 -19c5 4 7 8 7 11a7 7 0 0 1-14 0c0-3 2-7 7-11Z" fill={GOLD} opacity="0.55" />
              <circle cy="-13" r="1.8" fill={ACCENT} />
            </g>
          ))}
          <circle r="11" fill="none" stroke={GOLD} strokeWidth="0.8" strokeDasharray="1.5 3" />
        </g>
      ) : (
        <g className="rk-core">
          {Array.from({ length: 6 }).map((_, i) => (
            <ellipse key={i} cy={-11} rx="4.5" ry="9" transform={`rotate(${i * 60})`} fill={GOLD} opacity="0.7" />
          ))}
        </g>
      )}

      <circle r="6" fill={ACCENT} />
      <circle r="2.4" fill={GOLD} />
    </g>
  );
}

/** Per-theme rakhi: thread + central medallion, all vector. */
export function Rakhi({ theme, className = "", animate = true, tying = false }: RakhiProps) {
  return (
    <svg
      {...deco}
      viewBox="0 0 200 200"
      className={`${tying ? "rakhi-tying" : animate ? "rakhi-sway" : ""} ${className}`}
    >
      {/* thread */}
      <path
        className="rk-thread"
        d="M2 118c34-18 52-18 66-6M198 118c-34-18-52-18-66-6"
        fill="none"
        stroke={ACCENT}
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        className="rk-thread rk-thread-2"
        d="M2 128c34-16 52-16 66-6M198 128c-34-16-52-16-66-6"
        fill="none"
        stroke={GOLD}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.8"
      />
      {(theme === "handcrafted" || theme === "festive") && (
        <g className="rk-tassel">
          <path d="M100 132v18" stroke={GOLD} strokeWidth="1.4" strokeLinecap="round" />
          {[-6, -2, 2, 6].map((dx) => (
            <path key={dx} d={`M100 148c${dx} 6 ${dx} 10 ${dx * 1.2} 16`} stroke={ACCENT} strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.8" />
          ))}
        </g>
      )}
      <Medallion theme={theme} />
    </svg>
  );
}

/** Ornamental photo frame: oval miniature-painting style with a vine ring. */
export function PhotoFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <figure className="photo-reveal relative mx-auto w-[min(15rem,64%)]">
      <svg
        {...deco}
        viewBox="0 0 200 240"
        className="absolute -inset-[9%] h-[118%] w-[118%] text-[color:var(--t-accent-2,var(--antique-gold))]"
      >
        <ellipse cx="100" cy="120" rx="92" ry="112" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.8" />
        <ellipse cx="100" cy="120" rx="86" ry="106" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 4" />
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i / 16) * Math.PI * 2;
          const cx = 100 + Math.sin(a) * 92;
          const cy = 120 - Math.cos(a) * 112;
          return (
            <g key={i} opacity="0.6">
              {Array.from({ length: 5 }).map((_, p) => (
                <ellipse
                  key={p}
                  cx={cx}
                  cy={cy - 3}
                  rx="1.1"
                  ry="3"
                  transform={`rotate(${p * 72} ${cx} ${cy})`}
                  fill="currentColor"
                />
              ))}
            </g>
          );
        })}
      </svg>
      <div className="relative overflow-hidden rounded-[50%/42%] border border-[color:color-mix(in_oklab,var(--antique-gold)_60%,transparent)] shadow-[0_10px_24px_-16px_rgba(60,30,10,0.6)]">
        <img src={src} alt={alt} loading="lazy" className="aspect-4/5 w-full object-cover" />
      </div>
    </figure>
  );
}
