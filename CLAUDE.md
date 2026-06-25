# [SYSTEM NAME] — CivicGrid Project Laws
# ⚠️ FILL IN: Replace [SYSTEM NAME], [DESCRIPTION], [CLIENT] before starting work.
# Claude Code reads this file at session start. Follow every rule. No exceptions.

---

## WHAT WE ARE BUILDING
**System:** [SYSTEM NAME]
**Client:** [CLIENT / LGU]
**Description:** [One sentence — what problem this solves]
**Live URL:** [Vercel URL — fill after first deploy]
**Supabase project ref:** [fill after Supabase project is created]

---

## FOLDER STRUCTURE LAW — READ BEFORE CREATING ANY FILE

```
src/
├── app/                        # Next.js App Router — pages only, no logic
│   ├── (auth)/login/           # Public: login page
│   ├── (dashboard)/            # Protected: all dashboard pages
│   │   ├── layout.tsx          # Sidebar + main layout — DO NOT modify structure
│   │   └── [feature]/          # One folder per feature
│   │       ├── page.tsx        # Page component — thin, delegates to components
│   │       └── [id]/page.tsx   # Detail page if needed
│   ├── api/                    # API routes
│   │   └── [resource]/
│   │       └── route.ts        # One file per resource
│   └── globals.css             # CivicGrid theme — DO NOT add one-off styles here
├── components/
│   ├── ui/                     # shadcn/ui — NEVER edit these files manually
│   ├── layout/                 # Sidebar, Header — shared chrome
│   └── shared/                 # PageSkeleton, ErrorState, EmptyState — ALWAYS use these
├── core/
│   └── types.ts                # ALL discriminated unions + assertNever — source of truth
├── lib/
│   ├── supabase/
│   │   ├── client.ts           # Browser client — Web Locks fix included
│   │   └── server.ts           # Server client — service role only in API routes
│   └── utils.ts                # cn() + shared utilities
└── hooks/                      # Custom React hooks
```

**FORBIDDEN:**
- No logic in `app/` page files — pages call components, components call hooks
- No direct `supabase` calls in components — always go through a hook or API route
- No inline styles — Tailwind only
- No `any` type — TypeScript strict is ON
- No new folders outside this structure without updating this file first

---

## STATE MACHINE LAW — DISCRIMINATED UNIONS

**File:** `src/core/types.ts`
**Rule:** Define ALL system states here BEFORE writing any feature code.

```typescript
// ⚠️ FILL IN: Replace with this system's actual states
export type [SystemName]Status =
  | 'DRAFT'
  | 'ACTIVE'
  | 'RESOLVED'
  | 'VOID'  // terminal — all switches must handle this

export type [SystemName]State =
  | { status: 'DRAFT'; data: null }
  | { status: 'ACTIVE'; data: [SystemName]Data }
  | { status: 'RESOLVED'; data: [SystemName]Data; resolvedAt: string }
  | { status: 'VOID'; reason: string }

// NEVER add a new state without updating every switch that uses this union
export function assertNever(x: never): never {
  throw new Error('Unhandled state: ' + JSON.stringify(x))
}
```

Every `switch` on a discriminated union ends with:
```typescript
default: return assertNever(state)
```

---

## API ROUTE LAW

**File pattern:** `src/app/api/[resource]/route.ts`

Every API route must:
1. Verify auth first — reject with 401 if no session
2. Validate request body with zod before touching the database
3. Use the server Supabase client (never the browser client)
4. Return typed responses — never `return Response.json({ data: anything })`
5. Catch and return errors with appropriate status codes — never let errors bubble to 500

```typescript
// Pattern for every route:
export async function POST(req: Request) {
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return Response.json({ error: parsed.error.flatten() }, { status: 400 })

  // ... business logic
}
```

---

## SUPABASE LAW (NON-NEGOTIABLE)

- RLS on ALL tables before writing any data — no exceptions
- Never expose `SUPABASE_SERVICE_ROLE_KEY` to the client
- Web Locks fix is pre-applied in `src/lib/supabase/client.ts` — do not remove it
- Auth init order: `getUser()` first, THEN `onAuthStateChange()`
- Migration checklist: `git fetch && git status` before applying any migration

---

## UI LAW §UI.1 (see global ~/.claude/CLAUDE.md for full rules)

Quick reference — these are non-negotiable:
- ALL components from shadcn/ui — no raw divs for interactive elements
- Every button: wired handler + loading spinner + disabled state
- Every form: react-hook-form + zod + inline errors + toast on success/error
- Every data page: `<PageSkeleton />` → `<ErrorState />` → `<EmptyState />` → data
- Status colors: green=success, amber=warning, red=error, blue=info, gray=inactive

---

## PRE-DEPLOY GATE — RUN BEFORE EVERY PUSH

```bash
git fetch && git status          # must be on main, up to date
npm run build                    # zero errors
npx tsc --noEmit                 # zero TS errors
npm test                         # all tests pass
```

If any step fails → fix it before pushing. No exceptions.

---

## WHAT IS DONE VS. NOT DONE

A feature is NOT done until:
- [ ] All buttons have click handlers — tested manually
- [ ] Forms show validation errors on invalid submit
- [ ] Loading states show spinners, not blank screens
- [ ] No raw error objects visible to the user
- [ ] `npm run build` passes
- [ ] `npx tsc --noEmit` passes
- [ ] `npm test` passes

A feature is done when ALL boxes above are checked.
