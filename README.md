# WildNest

Student housing for a single campus: browse summer and year-long listings on a map, message listers, and post sublets or landlord listings. Public front page; map and listings require sign-in.

**Construction plan:** See **[AGENTS.md](./AGENTS.md)** for the step-by-step build, tech choices, and data model. All design and implementation decisions should align with that document.

---

## Tech stack

- **Frontend:** Next.js 16 (App Router), React 19, Tailwind CSS, TypeScript
- **Backend:** Next.js API routes
- **Database:** SQLite with Prisma
- **Theme:** Bauhaus-inspired (green + purple)

---

## Getting started

### Prerequisites

- Node.js 20+
- npm

### Install and run

```bash
npm install
cp .env.example .env   # if present; otherwise create .env with DATABASE_URL and optional NEXT_PUBLIC_MAP_IMAGE_PATH
npm run db:migrate     # create SQLite DB and run migrations
npm run dev            # start dev server at http://localhost:3000
```

### Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run db:generate` | Regenerate Prisma client |
| `npm run db:migrate` | Run database migrations |
| `npm run db:studio` | Open Prisma Studio |
| `npm run lint` | Run ESLint |

### Environment

- `DATABASE_URL` — SQLite path, e.g. `file:./dev.db` (default in `.env`)
- `NEXT_PUBLIC_MAP_IMAGE_PATH` — Map image path (default `/assets/campus-map.png`). Replace the file in `public/assets/` when you have the real campus map.

---

## Project structure

```
app/
  page.tsx          # Public front page (landing)
  login/             # Sign-in (placeholder until Step 3)
  signup/            # Sign-up (placeholder until Step 3)
  search/            # Search / map entry (placeholder)
  lib/                # db.ts, config.ts
  globals.css        # Bauhaus theme (green, purple)
components/
  ui/                 # Button, ButtonLink
  landing/            # Turtle mascot, etc.
prisma/
  schema.prisma      # User, Listing, Conversation, Message
```

---

## License

Private — for MVP development.
