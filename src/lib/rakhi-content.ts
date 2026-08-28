/**
 * All user-facing copy and theme definitions live here so the experience
 * can be re-worded or re-themed without touching component logic.
 *
 * Narrative: the SISTER prepares and sends a Rakhi to her BROTHER.
 * Language: English carries function, Hindi carries emotion (~25%).
 */

export const copy = {
  opening: {
    kicker: "रक्षाबंधन",
    hindiLine1: "एक धागा,",
    hindiLine2: "हज़ार यादें।",
    line1: "To the brother who has been annoying me since childhood…",
    line2: "…and somehow became one of the most important people in my life.",
    waiting: "Your Rakhi is waiting.",
    cta: "Prepare His Rakhi",
    hint: "A little gift that happens to live on the web",
  },
  personalize: {
    title: "For your brother",
    titleHi: "भाई के लिए कुछ खास…",
    subtitle: "Some bonds don't need explaining. This one just needs a name.",
    brotherLabel: "Brother's name",
    brotherLabelHi: "भाई का नाम",
    brotherPlaceholder: "Vivek",
    sisterLabel: "Sister's name",
    sisterLabelHi: "बहन का नाम",
    sisterPlaceholder: "Priya",
    photoLabel: "A photo of you two (optional)",
    photoLabelHi: "यादों के नाम",
    photoHelp: "JPG or PNG · stays on this device",
    messageLabel: "Your message",
    messageLabelHi: "आपका संदेश",
    messagePlaceholder: "Write something from the heart…",
    messageHint: "दिल से लिखा हुआ",
    prompts: [
      "A childhood memory we still laugh about…",
      "Something I've always wanted to tell my brother…",
      "The one thing you do that secretly makes me smile…",
    ],
    next: "Choose His Rakhi",
    back: "Back",
  },
  designs: {
    title: "Pick his Rakhi",
    titleHi: "उसका धागा चुनिए",
    subtitle: "Six threads. Choose the one that feels like him.",
    next: "Tie the Rakhi",
  },
  assembling: [
    "धागा तैयार हो रहा है… · Preparing the thread",
    "Adding your memories…",
    "Wrapping it with a little love…",
    "राखी बंध रही है… · Tying the Rakhi",
  ],
  card: {
    greetingHi: "शुभ रक्षाबंधन",
    greeting: "Happy Raksha Bandhan",
    forLabel: "For my brother",
    blessingHi: "फिर चाहे कितनी भी दूरियाँ हों,\nभाई-बहन का रिश्ता हमेशा दिल के पास रहता है।",
    signature: "With love,",
    signatureHi: "आपकी बहन",
    fallbackMessage:
      "A thread tied with love, memories, and a little bit of mischief. No matter how old we get, you'll always be my brother.",
    restart: "Make another",
  },
  share: {
    title: "Send his Rakhi",
    titleHi: "इस रिश्ते के नाम",
    subtitle: "Three ways to place this thread in his hands.",
    emailTitle: "Send via email",
    emailTo: "Brother's email",
    emailFrom: "Your email",
    emailSend: "Prepare email",
    emailPending:
      "Email delivery isn't connected yet — your details are saved and ready for when it is.",
    shareTitle: "Share Rakhi",
    shareBtn: "Share link",
    copied: "Link copied",
    saveTitle: "Save Rakhi",
    saveGif: "Save animated Rakhi",
    saveImage: "Save image",
    gifPending: "Animated export is being prepared — save the image for now.",
  },
  info: {
    kicker: "रक्षाबंधन की कहानी",
    title: "The story of Raksha Bandhan",
    panels: [
      {
        hi: "क्यों मनाते हैं रक्षाबंधन?",
        en: "Why we celebrate",
        body: "Raksha Bandhan marks a promise made visible. A sister ties a thread on her brother's wrist, he offers his care in return, and a whole year of small kindnesses is renewed in a single afternoon.",
      },
      {
        hi: "परंपरा कहाँ से आई",
        en: "Where the tradition comes from",
        body: "There is no single founder. The festival gathers many strands — verses from the epics, folk customs of protective threads, regional harvest and monsoon rites — that slowly braided together into what families keep today.",
      },
      {
        hi: "राखी का मतलब",
        en: "The meaning behind the thread",
        body: "The rakhi is deliberately humble: cotton, a bead, a little gold. Its value is not in the material but in the tying — a knot standing in for words that siblings rarely say out loud.",
      },
      {
        hi: "भाई-बहन का रिश्ता",
        en: "More than a rakhi",
        body: "The celebration keeps widening: cousins, friends, chosen family, siblings separated by oceans. What stays constant is the intent — someone is looking out for you, and wants you to know it.",
      },
    ],
  },
  story: {
    kicker: "एक धागे की कहानी",
    title: "The story of a thread",
    steps: [
      { hi: "धागा", en: "Thread", body: "Cotton spun thin, dyed in festival colours." },
      { hi: "वादा", en: "Promise", body: "A knot made slowly, so it is meant." },
      { hi: "रक्षा", en: "Protection", body: "Not from the world — from feeling alone in it." },
      { hi: "यादें", en: "Memory", body: "Every year's thread remembers the last one." },
      { hi: "परिवार", en: "Family", body: "The room fills, the sweets come out." },
      { hi: "प्यार", en: "Love", body: "Said without ever quite saying it." },
    ],
  },
  credit: "Crafted with love by Vivek",
} as const;

export type ThemeId =
  | "royal"
  | "floral"
  | "heritage"
  | "minimal"
  | "festive"
  | "handcrafted";

export type RakhiTheme = {
  id: ThemeId;
  index: string;
  name: string;
  nameHi: string;
  tagline: string;
  /** CSS custom properties applied to the themed surface. */
  vars: Record<string, string>;
};

export const themes: RakhiTheme[] = [
  {
    id: "royal",
    index: "01",
    name: "Royal",
    nameHi: "राजसी",
    tagline: "Deep red, antique gold, ornamental detail.",
    vars: {
      "--t-paper": "var(--parchment)",
      "--t-accent": "var(--vermillion)",
      "--t-accent-2": "var(--antique-gold)",
      "--t-ink": "var(--ink)",
      "--t-wash":
        "radial-gradient(120% 90% at 50% 0%, color-mix(in oklab, var(--vermillion) 9%, transparent), transparent 70%)",
    },
  },
  {
    id: "floral",
    index: "02",
    name: "Floral",
    nameHi: "फूलों की खुशबू",
    tagline: "Jasmine, marigold and rose, softly gathered.",
    vars: {
      "--t-paper": "var(--ivory)",
      "--t-accent": "var(--saffron)",
      "--t-accent-2": "var(--rose)",
      "--t-ink": "var(--ink)",
      "--t-wash":
        "radial-gradient(110% 80% at 80% 10%, color-mix(in oklab, var(--saffron) 14%, transparent), transparent 65%)",
    },
  },
  {
    id: "heritage",
    index: "03",
    name: "Heritage",
    nameHi: "परंपरा",
    tagline: "Rajasthani textile lines and block-print order.",
    vars: {
      "--t-paper": "var(--parchment)",
      "--t-accent": "var(--forest)",
      "--t-accent-2": "var(--burnt)",
      "--t-ink": "var(--ink)",
      "--t-wash":
        "radial-gradient(120% 90% at 20% 100%, color-mix(in oklab, var(--forest) 10%, transparent), transparent 70%)",
    },
  },
  {
    id: "minimal",
    index: "04",
    name: "Minimal",
    nameHi: "सादगी",
    tagline: "One thread, ivory air, a whisper of gold.",
    vars: {
      "--t-paper": "var(--ivory)",
      "--t-accent": "var(--antique-gold)",
      "--t-accent-2": "var(--burnt)",
      "--t-ink": "var(--ink)",
      "--t-wash": "none",
    },
  },
  {
    id: "festive",
    index: "05",
    name: "Festive",
    nameHi: "उत्सव",
    tagline: "Rangoli geometry with a lit brass diya.",
    vars: {
      "--t-paper": "var(--parchment)",
      "--t-accent": "var(--burnt)",
      "--t-accent-2": "var(--saffron)",
      "--t-ink": "var(--ink)",
      "--t-wash":
        "radial-gradient(90% 70% at 50% 100%, color-mix(in oklab, var(--saffron) 18%, transparent), transparent 70%)",
    },
  },
  {
    id: "handcrafted",
    index: "06",
    name: "Handcrafted",
    nameHi: "अपना धागा",
    tagline: "Beads, mirrorwork and a hand-knotted tassel.",
    vars: {
      "--t-paper": "var(--parchment)",
      "--t-accent": "var(--rose)",
      "--t-accent-2": "var(--antique-gold)",
      "--t-ink": "var(--ink)",
      "--t-wash":
        "radial-gradient(120% 100% at 50% 20%, color-mix(in oklab, var(--rose) 12%, transparent), transparent 68%)",
    },
  },
];

export const getTheme = (id: ThemeId): RakhiTheme =>
  themes.find((t) => t.id === id) ?? (themes[0] as RakhiTheme);
