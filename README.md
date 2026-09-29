# Knot — URL shortener (frontend only)

Frontend-only Next.js app for a URL shortener product called **Knot**.
No backend or database is wired up — forms and the dashboard use local
component state and mock data so you can drop your own API calls in.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (custom tokens — see `tailwind.config.ts`)
- Fonts: Fraunces (display), Inter (body), JetBrains Mono (short links / code)

## Pages

| Route              | Purpose                                              |
| ------------------ | ----------------------------------------------------- |
| `/`                 | Landing page with a working (client-only) demo widget |
| `/login`            | Log in form                                            |
| `/signup`           | Sign up form                                           |
| `/forgot-password`  | Password reset request form                            |
| `/dashboard`        | Create links + table of links (mock data)              |

## Where to plug in your backend

- `app/login/page.tsx`, `app/signup/page.tsx`, `app/forgot-password/page.tsx`
  — each `handleSubmit` has a `// Backend wiring goes here.` comment.
- `app/dashboard/page.tsx` — `handleCreate` currently generates a fake code
  client-side (`lib/mock.ts`); replace it with a call to your API.
- `lib/mock.ts` — swap `initialLinks` for data fetched from your database
  (e.g. in a server component, or via a client-side fetch on mount).
- The actual short domain (`knot.link`) is hardcoded in `ShortenDemo.tsx`
  and `LinksTable.tsx` — replace with your real short domain.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.
