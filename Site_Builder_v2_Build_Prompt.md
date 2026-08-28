# Edulixa Site Builder v2: build prompt

Paste everything between the two rules into ChatGPT, Gemini or a coding agent.
It builds the tool. It is not the prompt the tool emits: the tool writes that itself,
and the template for it is Part 9 below.

**What v1 already does well and must be kept:** bilingual EN/AR with RTL, menus with
hover previews, brand presets, keyword suggestions per niche, a design-synergy score,
and contextual suggestions derived from the site name, mission and vision.

**The seven things v2 adds.** These are the whole reason to rebuild rather than patch:

1. **A live preview of the user's own site**, updating as they choose. v1 previews the
   *choice*; v2 previews the *result*.
2. **One sentence to start.** "What is your site about, and who is it for" fills in a
   complete draft brief before the user answers anything else.
3. **Every suggestion states its reason**, in one line, and can be rejected in one click.
4. **A contrast guard** on the palette, so a teacher cannot ship unreadable text.
5. **Real page copy collected per page**, so the AI stops inventing a generic training
   company.
6. **Logo and avatar fields with live validation and preview**, plus per-page images.
7. **Save, resume, export and import the brief**, so a two-hour workshop survives a
   closed tab.

---

## PART 0: ROLE AND OUTPUT

You are building a production tool for teachers who have never made a website.

Deliver **one self-contained `index.html`**. No build step, no framework, no bundler,
no server. Vanilla HTML, CSS and JavaScript only. It must open by double-clicking the
file and work with no internet connection. Do not load anything from a CDN. Self-host
or system-stack every font.

Target user: a teacher or trainer, comfortable with a phone and a browser, not with
code. Everything must be operable with a mouse, a finger and a keyboard.

The tool's job is to produce **one long, precise prompt** that a teacher pastes into
ChatGPT or Gemini to get a complete website back. The tool does not build the website
itself. It builds the instruction that makes the AI build it well.

---

## PART 1: THE FIVE STEPS

A stepper across the top, five steps, always showing which one you are on and letting
the user jump back. Never trap them: every step is reachable at any time, and the
prompt can be generated from step 2 onwards with whatever has been filled in.

**Step 1 · Describe it.** One large textarea, one question:
> *What is your site about, and who is it for?*

with a real example underneath as placeholder text, not as a label:
> *"I train primary school teachers in Alexandria to use AI in English lessons. My
> visitors are heads of department and school owners."*

One button: **Suggest a starting point**.

**Step 2 · Confirm the draft.** The tool proposes a complete brief and shows it as a
list of decisions, each with the reason in one line and a **Change** control. Nothing
is hidden behind a menu the user has to open. See Part 3.

**Step 3 · Design.** The live design menus, each rendered as the real component, with
the preview panel updating. See Part 4.

**Step 4 · Content and assets.** Per-page copy slots, logo, avatar, images, contact
details, search words. See Parts 5 and 6.

**Step 5 · Your prompt.** The generated prompt in a scrollable box, a **Copy** button
that confirms, a **Download brief** button, and the three-step instruction for what to
do with it. See Part 9.

---

## PART 2: THE LIVE PREVIEW (the main difference from v1)

From step 2 onward, a preview panel shows **the user's own site**, not a sample.

- Desktop: preview pinned beside the form, at least 420px wide, sticky as the form
  scrolls. Below 1000px: preview collapses into a **Preview** button that opens it as a
  full-screen sheet with a close control.
- It renders the real chosen navigation bar, the real palette, the real panel style, the
  real buttons, the real fonts, and the user's own words as they type them.
- A phone/desktop toggle above the preview. The phone view is a real narrow render, not
  a scaled screenshot.
- It updates within 150ms of any change. Debounce text input at 250ms.
- **It is a preview of the promise.** Anything the preview shows must be something the
  generated prompt actually asks for. Never preview a feature the prompt does not
  specify.

---

## PART 3: THE SMART LAYER

The suggestions must be **deterministic rules in code**, not a call to an AI service.
The tool works offline; it cannot ask anyone anything.

Parse the step 1 sentence for signals and score them. Signals to detect, with examples
of the words that trigger them:

| Signal | Triggers include |
|---|---|
| Audience: parents | parent, family, mother, father, child, my son, my daughter |
| Audience: schools | school, head of department, principal, ministry, academy, institution |
| Audience: teachers | teacher, trainer, colleague, staff, CPD, professional development |
| Audience: adult learners | adult, professional, business English, corporate, employee |
| Audience: young learners | kids, children, primary, KG, year 1-6, young learners |
| Subject: language | English, Arabic, French, CEFR, IELTS, phonics, grammar |
| Subject: technology | AI, coding, robotics, STEM, digital, EdTech |
| Subject: exams | IGCSE, IB, SAT, IELTS, TOEFL, revision, exam |
| Tone: formal | consultancy, accredited, certified, institution, corporate |
| Tone: warm | fun, playful, happy, love, joyful, friendly |
| Selling: one service | workshop, training day, course, programme |
| Selling: many services | services, consultancy, packages, and, plus |

Then apply these mappings. **Show the reason next to every one.**

- **Parents as audience → Pure Frost** (light). *"Parents read on a phone in daylight and
  print things. A light page is easier for both."*
- **Schools or teachers → Midnight Slate or Emerald Noir.** *"Reads as professional to an
  institution."*
- **Young learners → Sunset Ember.** *"Warm colours suit a young audience."*
- **Premium or accredited tone → Obsidian Gold.** *"Signals paid, senior training."*
- **Technology subject → Cosmic Indigo.** *"Only if the subject really is technology."*
- **Five names or fewer in the menu → Floating pill.** *"It needs the space."*
- **Long reading pages, or six or more sections → Sticky glass.** *"The way out stays one
  press away."*
- **A logo URL was supplied → Split header.** *"The gap is what makes a logo look
  deliberate."*
- **Four or five short sections → one long page.** *"Easier to publish and easier to
  send. You can split it later."*
- **Six or more sections, or wanting each found separately in search → separate pages.**
- **Young learners → pill buttons and an even grid gallery.** **Schools → solid buttons
  and a masonry gallery.**
- **Always → lifted panels and press-to-enlarge on the gallery.** *"A certificate nobody
  can read proves nothing."*

Also generate, from the same sentence: a draft site name, a one-sentence mission, a
one-sentence vision, five to eight search phrases written the way a parent would type
them, and a draft opening headline of the form *"I [verb] [who] to [outcome]"*.

**Rules for the smart layer:**
- Every suggestion is a **default, never a lock**. One click changes it.
- **One reason line each, under 15 words**, in plain language. Never "optimised for
  engagement".
- If the sentence is too short or matches nothing, say so plainly and offer the three
  most common starting points instead of guessing.
- A **Start again** control clears the draft without clearing what the user typed.

---

## PART 4: THE DESIGN MENUS, RENDERED AS THEMSELVES

Every menu below is rendered as the **real working component**. No dropdowns of names,
no text lists, no screenshots. The user picks by looking at the thing.

**Where a comparison is being taught, show every option at once.** Do not put variants
behind tabs: the user cannot compare A with B while B is hidden. Exaggerate the one
thing that differs and label what to look at.

### 4.1 Colour theme (six, each repainting the live preview)
| Name | Background | Main | Shout |
|---|---|---|---|
| Emerald Noir | `#0B1A19` | `#0F695D` | `#5FD6C0` |
| Cosmic Indigo | `#0B0E24` | `#3B3BAF` | `#A56BFF` |
| Obsidian Gold | `#121110` | `#8A6A2A` | `#E9C46A` |
| Midnight Slate | `#0E1628` | `#1E3A8A` | `#7DD3FC` |
| Pure Frost | `#F5F6F7` | `#6B7280` | `#111827` |
| Sunset Ember | `#1A0F0C` | `#B23A16` | `#F2994A` |

Plus **Use my own colours**: three colour inputs, which run through the contrast guard
in Part 7. Show the three hex codes for whatever is selected, so the teacher can hand
them to a designer.

### 4.2 Navigation bar (three, all visible at once)
Floating pill · Sticky glass · Split header. Render all three simultaneously in small
page frames. **The sticky one must be a real scrollable box** so the user sees the bar
stay while content moves under it. That behaviour is the only thing that distinguishes
it, and it cannot be shown in a static picture.

### 4.3 Panel style (seven, all working)
Flat · Outlined · Lifted (rises on hover) · Glass (on a colour strip, or it makes no
sense) · Bento grid · **Collapsible** (native `<details>`, first one open) ·
**Tabbed**. Fill every one with the user's real course or service names as they type
them.

### 4.4 Gallery (four)
Even grid · Masonry · One at a time with working arrows · Press to enlarge.
Press-to-enlarge is a behaviour added on top of the others, not a fourth kind. Say so.

### 4.5 Buttons (six)
Solid · Outlined · Ghost · Pill · Gradient · Icon and word. All pressable, with a real
hover and pressed state. Minimum 44px tall.

### 4.6 Visual style (four)
Modern bento · Glassmorphism · Luxury modern · Minimalist.

### 4.7 Motion (three) and page architecture (two)
Fade and slide · Depth and parallax · Fast kinetic reveal. One long page · Separate
pages. Both preview live.

---

## PART 5: THE PAGE SET AND ITS CONTENT

Five pages. **Home, About, Services, Courses and Contact are on by default**; Courses
and Services can each be switched off, and a site may add Resources, Gallery or Blog.
Home, About and Contact cannot be switched off.

For each page, collect the real content. **This is the field that stops the AI inventing
a generic training company.** Every slot has a placeholder showing a real example, and
a **Suggest** button that drafts from the step 1 sentence.

- **Home:** one headline of the form *"I [verb] [who] to [outcome]"*, one supporting
  line under 25 words, one button label, and three short highlights.
- **About:** the story in three to five sentences, qualifications as a list, years and
  places, and one portrait image.
- **Services:** per service: name, who it is for, what they get, how long, and the
  format (in person, online, hybrid).
- **Courses:** per course: name, **CEFR level or age range**, hours, format, and one
  line on what the learner can do at the end. The level is required: "intermediate"
  means nothing to a parent.
- **Contact:** email, WhatsApp with country code, city, and **how fast you reply**.
  Optional LinkedIn and Instagram.

Show a live **completeness meter**: "4 of 9 content slots filled". A blank slot is not
neutral; it is a gap the AI fills with invention. Say that once, in the interface, at
the point where it matters.

---

## PART 6: ASSETS AND LINKS

Every asset field: a URL input, a **live thumbnail** as soon as the URL resolves, a
clear failed state, and a **what happens if you leave this empty** line.

- **Logo:** square or wide, shown in the preview's navigation bar. Empty → the site
  name is set in type instead. Say so.
- **Avatar or portrait:** the teacher's own photograph, shown on About and in the
  preview. Empty → About runs without a portrait, and the tool says the page is weaker
  for it.
- **Home image** and **per-page images:** one each, optional.
- **Gallery images:** a repeatable list: URL plus a **required one-line description**.
  Do not let an image be added without its description. That line is read aloud to a
  visitor who is blind and is the only thing a search engine can read about the picture.

Validate each URL for shape, show the thumbnail, and never block on a failed load:
warn and carry on. Accept a data URL pasted in, for a teacher working entirely offline.

**Contact links are generated, not typed.** From a WhatsApp number, build
`https://wa.me/<country code><number>` with no plus, no spaces and no leading zero, and
show the finished link back. Same for `mailto:`.

---

## PART 7: THE ACCESSIBILITY GUARD

Non-negotiable, and checked in the tool, not left to the AI.

- **Contrast.** Compute the ratio for body text on background and for button text on
  button. Below 4.5:1, show a plain warning next to the swatch: *"This text will be hard
  to read in daylight."* Offer a one-click corrected shade. Never silently allow a
  palette that fails.
- **Touch targets.** Every control in the tool itself is at least 44 by 44 pixels.
- **Labels.** Every input has a visible label above it. Never a placeholder as a label.
- **Errors** appear under the field they belong to, never only at the top, and the first
  bad field takes focus on submit.
- **Keyboard.** Every step, menu and preview is reachable by Tab, with a visible focus
  ring. Arrow keys move within a menu group.
- **Reduced motion.** Honour `prefers-reduced-motion` for every animation.
- The generated prompt carries these same requirements forward to the built site.

---

## PART 8: SAVE, RESUME, EXPORT

- Autosave the whole brief to `localStorage` on every change, wrapped in try/catch.
- On load, if a saved brief exists, offer **Continue where you left off** or **Start
  fresh**. Never restore silently.
- **Download brief** writes a `.json` file. **Load brief** reads one back. This is how a
  teacher moves between the school computer and home, and how a trainer hands a
  half-finished brief to a colleague.
- Nothing is ever sent anywhere. State that in the interface in one line.

---

## PART 9: WHAT THE TOOL EMITS

The output is one prompt, in the user's chosen language, assembled from the brief.
It must contain, in this order:

1. **Role and goal.** *"You are building a complete website for a teacher. Return one
   file called `index.html` with the CSS and JavaScript inside it, and nothing else."*
2. **Who and what:** site name, mission, vision, audience, tone.
3. **The pages**, named, in menu order, each with its real collected copy quoted
   verbatim. Instruct: *"Use this copy exactly. Do not invent services, courses,
   qualifications, numbers or testimonials that are not written here."*
4. **The design:** the three palette hex codes by role (background, main, shout), the
   navigation bar by name and behaviour, panel style, gallery style, button style,
   visual style, motion, and one page or separate pages.
5. **The assets:** logo, avatar and image URLs, each with its description.
6. **The links:** the finished WhatsApp and mailto links, social links.
7. **Search words:** the five to eight phrases, plus the instruction to write a title
   and a 25-word description for every page.
8. **The non-negotiables**, listed:
   - one file, no build step, no external stylesheet or script
   - all colours declared once at the top of the file so they can be changed in one place
   - works on a phone: nothing scrolls sideways, the menu collapses
   - every button at least 44px tall, with hover and pressed states
   - every image has its description
   - text contrast at least 4.5:1
   - honours `prefers-reduced-motion`
   - no placeholder text of any kind in the delivered file
9. **The review checklist** the teacher runs before publishing, as six lines they can
   tick: every menu name goes somewhere; every picture appears; nothing slides sideways
   at phone width; the WhatsApp button opens WhatsApp with the right number; the email
   address is correct read out letter by letter; nothing on the page identifies a
   learner.

Above the prompt box, three numbered lines: paste it into ChatGPT or Gemini; open the
answer in the Edulixa HTML Viewer to check it; then publish the folder.

**Copy button behaviour:** copy on click, confirm in place ("Copied"), and reset after
about two seconds. Use the hidden-textarea fallback, because the tool is opened from a
`file://` path where the async clipboard API is unavailable.

---

## PART 10: LANGUAGE

Full English and Arabic, one toggle, with `dir="rtl"` on the document in Arabic and the
whole layout mirrored. Use logical CSS properties (`margin-inline-start`,
`inset-inline-end`) so the mirroring is free.

Three rules learned the hard way:

- **Any module that injects markup after load must re-translate its own subtree**, or a
  page that *opens* in Arabic shows English. Test by seeding the language before load,
  not by flipping it after: flipping hides the bug.
- **Never put a translation attribute on an element that has child elements.** Setting
  its text content deletes its children, including icons and swatches. Put the attribute
  on an inner span.
- **Never glue an Arabic letter directly to a Latin word.** Always a space: `و ChatGPT`,
  never `وChatGPT`.

Numbers, hex codes and URLs stay Latin and `dir="ltr"` in both languages.

---

## PART 11: QUALITY BAR

**Do not** ship: dropdowns of style names where the style itself could be rendered;
variants hidden behind tabs when the point is to compare them; a wizard that cannot be
navigated backwards; placeholder text as a label; a colour picker with no contrast
check; a generated prompt containing a bracket the user was supposed to fill in; a
single em dash in any visible string; any AI-purple gradient; more than one accent
colour; card corner radius above 16px.

**Do** ship: one clear primary action per step; every suggestion with its reason; the
live preview always truthful; and an interface a teacher can finish in fifteen minutes
without asking anyone for help.

---

## PART 12: ACCEPTANCE TESTS

The tool is not done until every line passes.

1. Opens from a double-clicked file with no internet, no console errors.
2. Typing one sentence in step 1 and pressing the suggest button fills every design
   choice, and every one shows a reason.
3. Changing any suggestion updates the live preview within 150ms.
4. All six palettes render distinctly in the preview, and each shows its three hexes.
5. All three navigation bars are visible at once, and the sticky one stays put when its
   box is scrolled.
6. The collapsible panel opens and closes; the tabbed panel shows exactly one pane.
7. A palette failing 4.5:1 raises a visible warning and offers a fix.
8. A logo URL renders a thumbnail; a broken one warns without blocking.
9. A gallery image cannot be added without a description.
10. The generated prompt contains every collected value, and contains no empty brackets.
11. Copy works from a `file://` page and confirms.
12. Reloading offers to restore; downloading and re-loading a brief round-trips exactly.
13. The Arabic toggle mirrors the whole layout, with no English left and no Arabic
    letter glued to a Latin word. Seed the language before load and re-test.
14. Every control is at least 44px tall; every input has a visible label above it.
15. No sideways scroll at 360, 390, 768, 1024 and 1440 pixels, in both languages.

---

## The one thing to decide before building

Your brief says *"four main pages home about and contact us services and courses"*,
which names five. This spec treats **Home, About, Services, Courses and Contact** as the
default set, with Services and Courses each switchable off. If you meant four, with
Services and Courses as one page, say so and Part 5 collapses to a single "Services and
Courses" page.
