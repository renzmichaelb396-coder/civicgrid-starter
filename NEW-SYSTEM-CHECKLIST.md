# Starting a New CivicGrid System — Exact Steps

Run these in order. Do not skip.

---

## Step 1 — Clone the template

```bash
git clone https://github.com/YOUR-ORG/civicgrid-starter [system-name]
cd [system-name]
git remote set-url origin https://github.com/YOUR-ORG/[system-name]
git push -u origin main
```

## Step 2 — Fill in CLAUDE.md

Open `CLAUDE.md`. Replace every `[PLACEHOLDER]`:
- `[SYSTEM NAME]` → e.g. "RoadSense LGU Dashboard"
- `[CLIENT / LGU]` → e.g. "City of San Juan CDRRMO"
- `[DESCRIPTION]` → one sentence on what it solves
- `[SYSTEM NAME]Status` and `[SYSTEM NAME]State` → define your actual states

**Do not write any feature code until this is done.**

## Step 3 — Install dependencies and init shadcn/ui

```bash
npm install
npx shadcn@latest init
# Choose: Default style → Slate base → CSS variables ON → src/components/ui
```

Then add the components you need:
```bash
npx shadcn@latest add button input form label badge table dialog toast skeleton
```

## Step 4 — Create Supabase project

1. Go to supabase.com → New project
2. Copy the project URL and anon key to `.env.local`
3. Update `CLAUDE.md` with the project ref
4. Enable RLS on every table before inserting data

## Step 5 — Add GitHub secrets for CI

In your GitHub repo → Settings → Secrets → Actions:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Step 6 — Verify the baseline

```bash
npm run build       # must pass before writing any feature
npx tsc --noEmit    # must pass
npm test            # chaos agent must pass
```

If all three pass → you have a clean baseline. Start building features.

---

## What you get automatically (no extra work needed)

- ✅ CivicGrid blue theme pre-configured
- ✅ PageSkeleton, ErrorState, EmptyState ready to import
- ✅ Supabase client with Web Locks fix
- ✅ assertNever + discriminated union scaffold
- ✅ Chaos agent running on every `npm test`
- ✅ GitHub Actions blocking broken pushes to main
- ✅ TypeScript strict mode ON
- ✅ Claude Code reads CLAUDE.md laws automatically
