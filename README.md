# Rakhi Keepsake

Premium Raksha Bandhan Digital Gift Experience

Transform the existing application into a premium, emotionally warm, deeply Indian Raksha Bandhan digital gifting experience.

This is not meant to feel like a generic greeting-card website, a wedding template, a SaaS dashboard, or an AI-generated festival landing page.

The final product should feel like a beautifully handcrafted Indian keepsake that someone would genuinely send to their sister on Raksha Bandhan.

1. IMPORTANT: PRESERVE THE EXISTING APPLICATION

The application is already substantially implemented.

Do NOT unnecessarily rebuild the application architecture.

Do NOT remove existing functionality that already works.

Do NOT replace working components merely for visual changes.

Instead:

Preserve the existing routing and application structure where practical.

Preserve existing functionality and data flow.

Improve the visual design, interaction quality, responsiveness, and emotional experience.

Refactor components only when necessary to achieve the new experience cleanly.

Keep the implementation production-quality and maintainable.

Before changing anything, inspect the existing application and understand its current structure.

2. PRODUCT VISION

The product should feel like:

"A little Raksha Bandhan gift that happens to live on the web."

The experience should have the emotional quality of opening a physical gift.

The user should not immediately be presented with a conventional website full of cards, buttons, navigation bars, and sections.

Instead, create a cinematic digital celebration experience.

The emotional progression should be:

Curiosity
   ↓
Personalization
   ↓
Anticipation
   ↓
Reveal
   ↓
Emotion
   ↓
Shareable keepsake


The website should feel intimate, premium, handcrafted, and distinctly Indian.

3. VISUAL DIRECTION

Use the visual language of Indian craftsmanship, not stereotypical festival graphics.

Take inspiration from:

Hand-painted Indian illustrations

Traditional textile patterns

Rajasthani miniature-art detailing

Banarasi textile ornamentation

Rangoli geometry

Indian floral motifs

Brass diya craftsmanship

Handcrafted rakhi designs

Decorative Indian borders

Handmade paper

Traditional jewelry detailing

Temple-inspired ornamental geometry

However, do NOT copy any specific artwork.

The design should feel inspired by these traditions while remaining modern and original.

Overall aesthetic

Think:

"Luxury Indian stationery meets interactive digital keepsake."

NOT:

"Colorful Indian wedding website."

4. COLOR SYSTEM

Use a restrained premium palette.

Primary background:

Warm ivory

Handmade-paper cream

Very subtle parchment texture

Primary accent:

Deep vermilion / sindoor red

Secondary:

Saffron

Burnt orange

Accent:

Antique muted gold

Supporting:

Deep forest green

Text:

Very dark warm brown / charcoal

Avoid excessive saturated colors.

Gold should be used as an accent, not as a dominant gradient.

Avoid:

Neon colors

Excessive gradients

Glossy gold everywhere

Purple/blue SaaS-style palettes

Generic red-and-yellow festival UI

The page should remain elegant even with all decorative elements visible.

5. TYPOGRAPHY

Typography is extremely important.

Use a sophisticated combination of:

Display typography

An elegant Indian-compatible serif/display typeface for:

Raksha Bandhan title

Sister's name

Emotional statements

Major card headings

Supporting typography

A clean modern sans-serif for:

Inputs

Buttons

Helper text

Navigation

Interface controls

Indian script

Where appropriate, introduce subtle Devanagari typography for decorative/emotional elements.

Do NOT fill the interface with Hindi text unnecessarily.

Use Devanagari as an accent.

Typography should feel editorial and premium.

Avoid:

Cartoon fonts

Overly decorative fonts

Generic startup typography

Excessive font weights

6. LANDING / OPENING EXPERIENCE

The first screen should NOT immediately look like an application dashboard.

Create an immersive opening scene.

Use:

Warm textured background

Subtle floral illustrations around the edges

A central handcrafted rakhi illustration/card

Very subtle floating petals or dust particles

Small decorative Indian motifs

Soft lighting

Gentle movement

The composition should have plenty of breathing room.

Central message:

"For the girl who has been annoying me since childhood..."

Then reveal:

"...and somehow became one of the most important people in my life."

Then a clear CTA:

Open Your Rakhi

The exact copy should be editable/configurable rather than hardcoded into the architecture.

The opening should feel like opening a physical letter.

7. INTERACTION DESIGN

Avoid generic:

Fade everything in

Slide everything from the left

Bounce buttons

Random floating emojis

Instead use physical/tactile-inspired motion.

Examples:

Rakhi interaction

When the user opens the experience:

Rakhi gently rotates or moves into position.

Thread subtly animates.

Decorative flowers appear.

The card/letter unfolds.

The personal message is revealed.

Background illumination gently increases.

Animations should be:

Slow

Elegant

Intentional

Physically believable

GPU-friendly

Use transform/opacity-based animation where possible.

Do not create excessive animation that makes the site feel like a game.

8. PERSONALIZATION FLOW

After the opening experience, provide a beautiful personalization flow.

The user should be able to enter:

Sister's name

Example:

"Chandrika Kumari"

Brother's name

Example:

"Vivek"

Optional photograph

Allow an image upload.

The image should be presented inside a beautiful Indian-inspired frame.

Possible frame styles:

Floral

Ornamental

Traditional

Minimal gold

Personal message

Provide a large elegant text area.

Include optional starter prompts such as:

"Write something from the heart..."

"A childhood memory..."

"Something you've always wanted to tell her..."

Do not force the user to write a long message.

9. RAKHI DESIGN SELECTION

Create a premium interactive gallery.

Users should be able to choose from several visual identities.

Start with approximately 5 designs:

01 — Royal

Deep red + antique gold.

Intricate ornamental detailing.

02 — Floral

Jasmine, marigold, rose and delicate botanical elements.

Soft and warm.

03 — Heritage

Textile-inspired Indian patterns.

Rajasthani / traditional craft influence.

04 — Minimal

Warm ivory background with a single beautiful rakhi and restrained gold detailing.

Very premium.

05 — Festive

Rangoli + diya + floral composition.

More celebratory while remaining elegant.

Each design should feel genuinely different.

Do not simply change the background color.

Change:

Border

Illustration

Rakhi

Ornamentation

Floral arrangement

Typography treatment

Decorative pattern

10. CARD GENERATION EXPERIENCE

After personalization and style selection, create a short transition.

Instead of immediately rendering the final card, show a subtle handcrafted creation sequence.

For example:

Preparing your Rakhi...
Adding your memories...
Wrapping it with a little love...
Almost ready...


Do NOT make this look like an AI loading screen.

No spinning loader.

No technical terminology.

Use elegant progress transitions.

The experience should suggest that a physical keepsake is being assembled.

11. FINAL RAKHI CARD

This is the most important screen.

The final card should feel like a physical premium Indian greeting card translated into an interactive digital object.

Structure:

Decorative Indian border

          [Rakhi]

     Happy Raksha Bandhan

        [Sister Name]

   [Personal Message]

        [Photo]
       optional

     With love,
     [Brother Name]

Decorative floral details


But do not make it rigid.

The selected visual theme should control the composition.

The card should have depth.

Use subtle:

Paper texture

Shadows

Layering

Decorative borders

Illustration

Light

Texture

Avoid making it look like a flat HTML card.

12. PHOTO TREATMENT

If a photo is uploaded:

Do not simply place it inside a rectangular <img>.

Create a designed photo treatment.

Examples:

Circular ornamental frame

Oval miniature-painting-inspired frame

Floral frame

Small Polaroid-like handmade paper frame

The image should feel integrated into the artwork.

Use object-fit and responsive constraints so photographs never distort.

13. FLOWER SYSTEM

Flowers should be an actual visual system.

Use illustrated motifs inspired by:

Marigold

Jasmine

Rose

Lotus

Champa

Do not scatter random flower SVGs everywhere.

Create controlled compositions:

Corner clusters

Border decorations

Small floral dividers

Background botanical elements

Flowers should frame the content rather than compete with it.

14. INDIAN ORNAMENTATION

Use decorative motifs carefully.

Possible motifs:

Rangoli geometry

Paisley

Floral vines

Traditional textile borders

Mandala-inspired geometry

Small ornamental separators

Use these primarily around:

Card edges

Section transitions

Buttons

Decorative corners

Background elements

Do not cover the entire interface with patterns.

Negative space is essential.

15. BUTTON DESIGN

Buttons should feel custom-designed.

Primary CTA:

Deep vermilion background

Warm ivory text

Slightly rounded but not excessively pill-shaped

Subtle shadow

Small decorative detail on hover

Secondary CTA:

Transparent / ivory

Thin antique-gold border

Dark text

Avoid generic:

bg-primary rounded-lg px-4 py-2


looking buttons.

They should feel part of the visual identity.

16. MICRO-INTERACTIONS

Add subtle interactions:

Flowers gently respond to opening

Card slightly lifts on hover

Rakhi has very subtle movement

Buttons have tactile press states

Decorative elements appear progressively

Text reveals naturally

Photo gently transitions into the composition

Keep interaction performance high.

Respect:

prefers-reduced-motion.

If reduced motion is enabled, provide a calm static version.

17. MOBILE EXPERIENCE

Mobile is a first-class experience.

Do NOT simply shrink the desktop UI.

Design the interaction specifically for touch.

Requirements:

Full viewport experience

Large touch targets

No tiny controls

No horizontal overflow

Comfortable typography

Swipeable rakhi designs

Bottom-oriented actions where appropriate

Full-screen card reveal

Safe-area support for modern mobile devices

The final card should look beautiful on a typical 390px-wide mobile viewport.

Test at:

320px

375px

390px

430px

18. DESKTOP EXPERIENCE

On desktop, create a centered celebration canvas.

The background can extend beyond the card with:

Floral decoration

Soft texture

Decorative Indian motifs

The main card should have a strong visual hierarchy.

Do not turn the desktop version into a dashboard.

The experience should remain focused and immersive.

19. RESPONSIVE BREAKPOINTS

Ensure layouts work cleanly across:

Small mobile

Large mobile

Tablet

Laptop

Large desktop

Avoid hardcoded pixel positioning that breaks at different viewport sizes.

Prefer:

CSS grid

Flexbox

clamp()

responsive typography

max-width containers

aspect-ratio

fluid spacing

20. SHARE EXPERIENCE

At the end provide:

Share this Rakhi

Possible actions:

Share

Copy link

Download/save card

On mobile, use the native Web Share API when available.

Fallback gracefully when unavailable.

The shared experience should preserve the personalization.

Do not expose private uploaded images or data unintentionally.

21. ACCESSIBILITY

Maintain high accessibility standards.

Requirements:

Semantic HTML

Keyboard navigation

Visible focus states

Accessible labels

Sufficient contrast

Alt text for meaningful imagery

Decorative imagery marked appropriately

Reduced motion support

Touch target sizing

Screen-reader-friendly controls

Decorative Indian artwork should not pollute the accessibility tree.

22. PERFORMANCE

This is a visual-heavy experience, so performance matters.

Do not load massive image assets unnecessarily.

Prefer:

Optimized WebP/AVIF

Lazy loading

CSS-based decorative effects where practical

SVG for simple ornaments

GPU-friendly animations

Avoid unnecessary animation libraries

Avoid rendering hundreds of decorative DOM elements

The first meaningful experience should load quickly on a mobile network.

23. DESIGN SYSTEM

Create reusable components/tokens for:

Colors

--ivory
--parchment
--vermillion
--saffron
--antique-gold
--forest
--ink


Typography

display
body
caption
decorative


Surfaces

paper
card
ornament
overlay


Motion

reveal
unfold
float
fade
press


Do not duplicate styles unnecessarily.

24. WHAT NOT TO DO

This is critical.

Do NOT create:

Generic SaaS navbar

Hero section with stock Indian woman/rakhi image

Generic gradient backgrounds

Excessive emojis

Excessive gold

Excessive red

Generic Bootstrap-looking cards

Random Indian symbols everywhere

Wedding invitation aesthetics

Cheap-looking clipart

Excessive shadows

Excessive rounded cards

Huge gradients

Random animations

Confetti everywhere

Dashboard-like layouts

AI chatbot-style UI

The product should feel crafted, not generated.

25. EMOTIONAL COPY

Keep copy short.

The interface should never become text-heavy.

Use lines with emotional weight.

Examples:

"Some bonds don't need explaining."

"Different homes. Same bond."

"No matter how old we get, you'll always be my sister."

"A thread tied with love, memories, and a little bit of mischief."

Use personalization naturally:

Happy Raksha Bandhan, Chandrika Kumari.

With love, Vivek.

The copy should remain warm without becoming overly sentimental or cheesy.

26. FINAL EXPERIENCE PRINCIPLE

At every design decision, ask:

"Would this feel special if my sister opened it on Raksha Bandhan?"

If the answer is no, simplify it.

The final product should feel closer to:

a handcrafted digital letter + Indian festive artwork + interactive keepsake

than:

a festival website.

Prioritize emotional impact, visual craftsmanship, and interaction quality over adding more features.

Build the experience so that the first 10 seconds already feel special.

Do not just make it "beautiful."

Make it feel personal.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/9c99b6bc-2e4e-47c4-9c3f-2fe796fb6e50).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Email (Send via Email)

The "Send via Email" button delivers the Rakhi straight from the browser using
[EmailJS](https://www.emailjs.com) — it does **not** open a visitor's mail app.

To turn it on:

1. Create a free account at https://www.emailjs.com.
2. In **Email Services**, add a service (e.g. Gmail / Outlook / your SMTP) — copy the **Service ID** (`service_…`).
3. In **Email Templates**, create a template and copy its **Template ID** (`template_…`).
   Give it a subject that uses the `{{subject}}` variable, and a body built from
   `{{to_name}}`, `{{message}}`, `{{from_name}}`, `{{reply_to}}` and `{{rakhi_link}}`.
4. In **Account → API Keys**, copy your **Public Key**.
5. Create a `.env` file from `.env.example` and fill in the three values:

   ```
   VITE_EMAILJS_SERVICE_ID=service_…
   VITE_EMAILJS_TEMPLATE_ID=template_…
   VITE_EMAILJS_PUBLIC_KEY=…
   ```

   In Lovable, set the same keys under your project's environment variables.

The email is sent from your EmailJS-verified sender; the sister's email is passed as
the reply-to, so the brother can reply straight to her.
