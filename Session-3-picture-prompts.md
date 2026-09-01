# Session 3 — making your pictures with ChatGPT

For attendees who have no photographs of their own yet. Read the two rules at the bottom before you publish anything you make here.

---

## The sizes, in one table

| What | Ask ChatGPT for | Save it for the site as |
|---|---|---|
| 12 gallery pictures | **1536 × 1024** (3:2 landscape) | keep as is — already the right size |
| The top picture *(optional)* | **1920 × 1080** (16:9) | resize to **1600 × 900**, .jpg |
| A picture of you | **1024 × 1024** (square) | resize to **800 × 800**, .jpg |
| Your logo | **1024 × 1024** (square) | resize to **512 × 512**, **.png**, background removed |

**Why ask for those numbers and not the final ones.** ChatGPT produces images at its own fixed sizes. Three of them — 1024 × 1024, 1536 × 1024 and 1024 × 1536 — it gives you *exactly*. Any other number it treats as a wish and approximates. So you ask for a size it can actually make, then take it down to the size your site wants in a resizer. Never ask for 512 × 512 directly: you get a small blurry picture instead of a sharp one made smaller.

---

## Step 1 — paste this once, at the start of a new chat

Fill in the three fields in `[ ]` first.

```
I am building a website for my language teaching. I need a set of 12 photographs
that look like they were all taken by the same photographer, on the same day,
in the same school. I will ask for them one at a time.

Keep these fixed for every single image:

SIZE    1536 x 1024 pixels, landscape 3:2. Every image, the same size.
STYLE   natural documentary photography. Not stock-photo posing. Not an
        illustration, not a 3D render, not a painting.
CAMERA  35mm lens, eye level, shallow depth of field, a little natural grain.
LIGHT   soft daylight from large windows. No flash, no hard shadows.
COLOUR  warm neutrals — cream walls, light wood, muted [YOUR ACCENT COLOUR] accents.
PEOPLE  [AGE OF YOUR LEARNERS, e.g. children aged 7 to 10] and one adult teacher.
        [WHERE YOU TEACH, e.g. Egyptian, in Alexandria]. Modest everyday clothes.
        Busy with the task, relaxed, never looking at the camera.
FACES   keep faces small in the frame and away from the edges.
NO TEXT anywhere in the image. No letters, no numbers, no signs, no writing on
        the whiteboard, no logos, no labels on books. This rule matters more
        than any other: generated writing always comes out misspelled.

Reply only with READY. Then I will send shot 1.
```

## Step 2 — send these one at a time

After each picture, save it, then send the next line. If your ChatGPT offers several images at once, send them in threes.

```
1  Wide shot from the back of the classroom. Learners at tables working, the teacher walking between them.
2  Close-up of a child's hand writing in an exercise book. Pencil, paper texture, blank page.
3  Four learners around one table talking, one of them gesturing mid-sentence.
4  The teacher crouching beside a desk helping one learner. Both looking down at the work.
5  A reading corner: cushions, a low shelf of books, two children reading separately.
6  Hands raised across a bright classroom, teacher at the front, seen from the side.
7  Flat-lay from directly above: blank colour cards, scissors, glue and a notebook on a wooden table.
8  Two learners sharing one laptop, headphones between them, working together.
9  A wall of children's paintings and drawings, photographed at a slight angle.
10 Outdoors in the school courtyard at break, children moving, slight motion blur.
11 An adult handing a folded card to a smiling child. Other children clapping, out of focus behind.
12 The empty classroom at the end of the day, warm afternoon light across the desks.
```

Twelve shots deliberately different from each other — wide, close, flat-lay, outdoor, detail, empty room. Twelve versions of the same wide classroom shot will look like one picture repeated.

## Step 3 — the top picture *(only if you chose "My own picture" in the tool)*

```
Same style as above, but this one at 1920 x 1080 pixels, 16:9 widescreen.

A wide banner photograph of a bright, empty classroom corner. Compose it so the
right third of the frame is plain wall or soft-focus background with nothing
happening in it, because a title will sit there. No text in the image.
```

Then resize it to **1600 × 900**.

## Step 4 — a picture of you

**Do not generate a photorealistic headshot of yourself.** A face that is not yours, presented to parents as you, is a lie your website tells before anyone has read a word of it. Three honest options, in order:

1. A real photo — a phone, a window, a plain wall, someone else holding the camera. Two minutes.
2. Leave it empty. The builder puts a friendly 3D character in your place and the page still looks finished.
3. An avatar that is obviously a drawing, never mistaken for a photograph:

```
Generate a square image, 1024 x 1024 pixels.

A flat vector portrait illustration of a teacher, head and shoulders, built from
simple geometric shapes, clearly an illustration and not a photograph.
Two colours only: [YOUR ACCENT COLOUR] and cream. Plain flat background.
No text anywhere in the image.
```

Then resize it to **800 × 800**.

## Step 5 — your logo

```
Generate a square image, 1024 x 1024 pixels.

A simple flat vector logo mark for a language school called [YOUR SITE NAME].
A single symbol only — absolutely no letters and no words of any kind anywhere
in the image. Geometric and clean: one shape a child could draw from memory.
Two colours: [YOUR ACCENT COLOUR] and white.
The symbol centred, with clear empty margin around it, on a plain pure white
background. Flat, no shadow, no gradient, no 3D, no reflection.
```

Then three things, in order:

1. **Remove the white background.** ChatGPT cannot give you a transparent one — ask for transparency and it draws you a grey checkerboard *into the picture*. Generate on white as above, then remove the white with any free background remover. Skip this and your logo shows up as a white box sitting on your site's coloured bar.
2. **Resize to 512 × 512.**
3. **Save as .png**, not .jpg. Only .png keeps the transparency you just made.

Ask for a symbol with **no writing in it** — image models cannot spell, and they mangle Arabic script badly. Your site name is written beside the logo by the builder anyway, in a real font that is actually spelled correctly.

*And if the logo becomes a fight: leave the field empty. The builder writes your site name in text instead and it looks deliberate. Nobody will miss it.*

## Step 6 — before these go anywhere near GitHub

- Do the resizing above. [squoosh.app](https://squoosh.app) does it in the browser with no sign-up: drop the picture in, set the width on the right, download.
- Save the twelve photographs and the top picture as **.jpg**, the logo as **.png**.
- Rename them: `class-wide.jpg`, `reading-corner.jpg`, `logo.png` — small English letters, hyphens instead of spaces, no Arabic letters.
- Write your one line of alt text for each one now, while you still remember which is which.
- Then upload to GitHub and collect the links, as in the previous message.

---

## Two rules before you publish

**1. Generated pictures are placeholders, not evidence.** They let you finish and publish a real site today instead of waiting for a photographer. They do not show your teaching, and they must never be offered to a parent or a school as though they do. Replace them with your own photographs as you take them — that is the whole point of the twelve slots.

**2. This does not lift the permission rule. It removes the excuse for breaking it.** You may not have a signed permission for a photograph of a real class yet, so use a generated picture in the meantime — not a real child's face.

---

## نسخة عربية للمتدربين

**صور موقعك بالذكاء الاصطناعي — لمن لا يملك صورًا بعد**

اكتب الأوامر بالإنجليزية كما هي أدناه، فالنماذج تفهمها أدق، وهي لا تُحسن رسم الحروف العربية إطلاقًا.

### المقاسات

| الصورة | اطلبها من ChatGPT بمقاس | واحفظها للموقع بمقاس |
|---|---|---|
| صور المعرض الاثنتا عشرة | **١٥٣٦ × ١٠٢٤** (أفقية ٣:٢) | كما هي، فهي المقاس الصحيح |
| الصورة العلوية *(اختيارية)* | **١٩٢٠ × ١٠٨٠** (١٦:٩) | **١٦٠٠ × ٩٠٠**، بصيغة .jpg |
| صورتك أنت | **١٠٢٤ × ١٠٢٤** (مربّعة) | **٨٠٠ × ٨٠٠**، بصيغة .jpg |
| الشعار | **١٠٢٤ × ١٠٢٤** (مربّعة) | **٥١٢ × ٥١٢**، بصيغة **.png**، بعد إزالة الخلفية |

**ولماذا نطلب هذه الأرقام لا الأرقام النهائية؟** لأن ChatGPT يُنتج بمقاسات ثابتة عنده، ثلاثة منها يُعطيك إياها بالضبط: ‏١٠٢٤ × ١٠٢٤، و١٥٣٦ × ١٠٢٤، و١٠٢٤ × ١٥٣٦. وما عداها يُقاربه تقريبًا. فتطلب مقاسًا يُحسنه، ثم تُصغّره إلى ما يريده موقعك. ولا تطلب ٥١٢ × ٥١٢ مباشرةً، فتحصل على صورة صغيرة باهتة بدل صورة حادّة مُصغَّرة.

### الخطوات

١. افتح محادثة جديدة في ChatGPT، والصق **الأمر الأول** (Step 1) بعد ملء الحقول الثلاثة بين `[ ]`: لونك المميّز، وأعمار متعلميك، ومكان عملك.
٢. انتظر كلمة READY، ثم أرسل لقطات **Step 2** واحدة تلو الأخرى، واحفظ كل صورة قبل إرسال التالية.
٣. الصورة العلوية (Step 3) لمن اختار «صورتي أنا» في الأداة فقط، ثم صغّرها إلى ١٦٠٠ × ٩٠٠.
٤. **صورتك الشخصية:** لا تولّد وجهًا واقعيًّا يُظنّ أنه وجهك. الأفضل صورة حقيقية بهاتفك أمام حائط سادة، أو اترك الحقل فارغًا فتقف مكانك الشخصية ثلاثية الأبعاد، أو استخدم رسمًا واضحًا أنه رسم (Step 4)، ثم صغّره إلى ٨٠٠ × ٨٠٠.
٥. **الشعار (Step 5):** اطلب **رمزًا بلا أي حروف**، فالنماذج لا تُحسن الهجاء، وتُفسد الكتابة العربية خاصةً. ثم ثلاث خطوات بالترتيب: أزِل الخلفية البيضاء بأي أداة مجانية — فـ ChatGPT لا يعطيك خلفية شفافة، بل يرسم لك مربعات رمادية داخل الصورة، وإن تركتها ظهر شعارك مربعًا أبيض فوق شريط موقعك الملوّن — ثم صغّره إلى ٥١٢ × ٥١٢، ثم احفظه بصيغة ‏.png لا .jpg، فهي وحدها التي تحفظ الشفافية.
   *وإن أرهقك الشعار فاترك الحقل فارغًا: يُكتب اسم موقعك نصًّا وتبدو النتيجة مقصودة.*
٦. قبل الرفع: أعِد تسمية الملفات بأحرف إنجليزية صغيرة وشَرْطات، واكتب سطر الوصف لكل صورة، ثم ارفعها على GitHub واجمع الروابط كما في الرسالة السابقة.

**قاعدتان قبل النشر**

**١) الصور المولَّدة صور مؤقتة، لا دليل على عملك.** هي تتيح لك أن تُنهي موقعك وتنشره اليوم بدل انتظار مصوّر، لكنها لا تُظهر تدريسك، ولا يجوز أبدًا تقديمها لولي أمر أو لمدرسة على أنها كذلك. استبدلها بصورك الحقيقية كلما التقطتها.

**٢) وهي لا تُلغي قاعدة الإذن، بل تُلغي العذر في مخالفتها.** قد لا يكون لديك إذن مكتوب بصورة صف حقيقي بعد، فاستخدم صورة مولَّدة في الأثناء — لا وجه طفل حقيقي.
