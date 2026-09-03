# FrenchFry — MVP

A French learning companion. This MVP scope: **Speaking, A1 only.**
Reading, Listening, and Writing tiles are visible but stubbed ("Coming soon").

## What's built

- Landing page — 4 tiles, only Speaking is clickable
- Camille — the speaking companion, with 5 emotional states driven by session events
- 5 A1 chapters (greetings, ordering food, directions, family, numbers/time),
  25 phrases total, each tagged with a target French phoneme
- Real pronunciation scoring via Azure Speech Pronunciation Assessment
  (accuracy, fluency, prosody — phoneme-level detail)
- Mouth-position correction modal for 7 phoneme categories (u, ou, r, an, on, in, eu)
- Progress + mistake log persisted to Supabase

## Setup

### 1. Supabase

Create a new Supabase project (or reuse an existing free-tier one for now —
see note in project chat about splitting this out before real users arrive).

Run `supabase_migration.sql` in the SQL Editor. This creates:
- `frenchfry_progress` — one row per user, completed phrases + mistake log
- `frenchfry_attempts` — full history of every scored attempt

### 2. Azure Speech

1. Go to [portal.azure.com](https://portal.azure.com) — free account, no card required for F0 tier
2. Create a resource → search "Speech" → create with **Free F0** pricing tier
3. Once created, go to **Keys and Endpoint** — copy Key 1 and Region

Free tier gives you, every month, forever:
- 5 audio hours of speech-to-text (powers pronunciation scoring)
- 500,000 characters of neural text-to-speech (powers Camille's voice)

More than enough to build and test the MVP at zero cost.

### 3. Environment variables

Copy `.env.example` to `.env` and fill in your values.

**Important:** `AZURE_SPEECH_KEY` and `AZURE_SPEECH_REGION` must NOT have the
`VITE_` prefix — they're read only inside `/api` serverless functions,
never exposed to the browser.

### 4. Local development

```bash
npm install
npm run dev
```

Note: `/api` functions only run on Vercel's infrastructure, not Vite's dev
server. To test them locally, install the Vercel CLI:

```bash
npm i -g vercel
vercel dev
```

### 5. Deploy

```bash
vercel
```

Then in Vercel dashboard → Settings → Environment Variables, add all 4
values from your `.env` (Production + Preview + Development).

## Architecture notes

- `api/tts.js` — Edge function, proxies Azure Neural TTS, keeps key server-side
- `api/pronunciation-assess.js` — Node function (needs binary body handling),
  proxies Azure Pronunciation Assessment
- `src/data/a1-chapters.js` — all MVP content lives here; adding a chapter
  is just adding an object to the array
- `src/lib/supabase.js` — single-user singleton pattern for MVP (no auth yet)

## What's deliberately NOT in this MVP

- User accounts / auth
- Payments
- A2/B1/B2 content
- Reading, Listening, Writing modules
- Cross-skill mistake correlation (nothing to cross-reference with only one skill)
- Video-based mouth position clips (using text + illustration placeholder for now)

## Next milestone after MVP validation

Once you've used this yourself for 1-2 weeks and it's genuinely helping:
1. Record 7 short mouth-position video clips (one per phoneme in `PHONEME_GUIDANCE`)
2. Add basic auth so a second real user can try it
3. Move to its own Supabase project (currently fine to share a free-tier slot for MVP)
