# WildNest

Student housing for a single campus: browse summer and year-long listings on a map, message listers, and post sublets or landlord listings. Public front page and search (map); Post listing, Manage my sublets, and Messages require sign-in.

**Status:** Main logic is implemented and the system is workable. Many small UI interfaces need refinement. A house-selection algorithm is planned for later implementation.

**Construction plan:** See **[AGENTS.md](./AGENTS.md)** for the step-by-step build, tech choices, and data model. All design and implementation decisions should align with that document.

---

## Tech stack

- **Frontend:** Next.js 16 (App Router), React 19, Tailwind CSS, TypeScript
- **Backend:** Next.js API routes
- **Database:** SQLite with Prisma
- **Theme:** Bauhaus-inspired (green + purple)

---

## Planned improvements

- **UI polish** — Refine many small interface elements across the app
- **House-selection algorithm** — Implement matching/recommendation logic for listings (to be added later)

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
- `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` — Mapbox API key for interactive map. Get one at [mapbox.com](https://mapbox.com). Omit to fallback to static image.
- `NEXT_PUBLIC_MAP_IMAGE_PATH` — Fallback map image path (default `/assets/campus-map.png`) when Mapbox token is not set.

---

## Project structure

```
app/
  page.tsx          # Public front page (landing)
  login/             # Sign-in (placeholder until Step 3)
  signup/            # Sign-up (placeholder until Step 3)
  search/            # Map + pins (public; Mapbox or static fallback)
  listings/[id]/     # Listing detail (public; from map pin click)
  lib/                # db.ts, config.ts
  globals.css        # Bauhaus theme (green, purple)
components/
  ui/                 # Button, ButtonLink
  landing/            # Turtle mascot, etc.
prisma/
  schema.prisma      # User, Listing, Conversation, Message
```

---

## Buildings CSV

Building and apartment listings can be imported from a CSV. For college-focused housing search, please use these columns:

| Column                 | Required | Purpose                                                    |
|------------------------|----------|------------------------------------------------------------|
| `id`                   | Yes      | Unique identifier (e.g. `foster-walker`, `1838-chicago`)   |
| `name`                 | Yes      | Building or apartment name                                 |
| `address`              | Yes      | Full street address                                        |
| `lat`                  | Yes      | Latitude (for map pin)                                     |
| `lng`                  | Yes      | Longitude (for map pin)                                    |
| `description`          | No       | Short description (e.g. room types, atmosphere)            |
| `floors`               | No       | Number of floors                                           |
| `amenities`            | No       | Comma-separated list (e.g. "WiFi, Laundry, Study Lounge")  |
| `room_types`           | No       | Common types (e.g. "Single, Double, Suite")                |
| `price_per_month`      | No       | Starting at (numeric, USD)                                 |
| `available_from`       | No       | Date listing becomes available (YYYY-MM-DD)                |
| `lease_length_months`  | No       | Typical lease duration in months                           |
| `nearby_landmarks`     | No       | Notable places nearby (e.g. "Near Tech, Main Library")     |
| `tags`                 | No       | Comma-separated keywords, e.g. "on-campus,pet-friendly". Can be pre-defined such as: `on-campus`, `off-campus`, `pet-friendly`, `furnished`, `utilities-included`, `short-term`, `international`, `sublet` |
| `distance_to_campus`   | No       | Walking distance or distance in meters                     |
| `contact_email`        | No       | Leasing or landlord contact email                          |
| `place_type`           | Yes      | Marker for type of place — e.g., `building`, `bus-stop`, `supermarket`, `restaurant`, etc. Use to tag differently on the map |


### usefull links to try to search with APIs 
 - civic data : https://www.civicdata.com/dataset?organization=evanston-9adef673-0141

**Example:**

```csv
id,name,address,lat,lng,amenities,room_types,price_per_month,available_from
foster-walker,Foster-Walker Complex,1927 Orrington Ave Evanston IL,42.0512,-87.6815,WiFi,Laundry,Study Lounge,"Single,Double",1180,2024-06-15
1838-chicago,1838 Chicago Ave,1838 Chicago Ave Evanston IL,42.0485,-87.6782,WiFi,Elevator,"Single",1050,2024-09-01
```


```

---

## License

Private — for MVP development.


