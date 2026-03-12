# AGENTS.md — Construction plan

This file is the **single source of truth** for the Student Housing MVP. When making design or implementation choices, always refer to this document first.

---

## Tech stack (MVP)

| Layer | Choice | Notes |
|-------|--------|--------|
| **Frontend** | React or Next.js + Tailwind CSS | Pages: front page, login/signup, map + pins, listing list/detail, Post listing, Manage my sublets, Messages. |
| **Backend** | Next.js API routes **or** small Node/Express service | REST or simple RPC; session-based auth. |
| **Database** | SQLite (MVP) or Postgres | users, listings, conversations, messages. |
| **Auth** | Simple custom (email + password hash, session cookie) | Minimal; intended to be **replaced later**. No OAuth required for MVP. |
| **Map** | Mapbox GL JS (external API) | `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` required. Pin positions: `pin_x`, `pin_y` as % converted to lat/lng within campus bounds; optional `latitude`, `longitude` for future. Fallback to static image if no key. |
| **File storage** | Local or simple cloud (e.g. Supabase Storage / S3) | Listing photos; store URLs in DB. Can defer to “listing images” step. |

Keep the stack simple; avoid adding new frameworks or services unless the plan below explicitly requires them.

---

## Steps to take (in order)

1. **Project setup**  -- DONE --
   - Initialize repo (frontend + backend or full-stack).  
   - Set up DB (SQLite or Postgres) and schema placeholders.  
   - Add placeholder map image and config path for map asset (e.g. `assets/campus-map.png` or env).

2. **Front page**  -- DONE --
   - Public landing page; no auth required.  
   - CTA to sign in / sign up; link to search (map).  
   - Search and listing detail are public.

3. **Simple auth**  -- DONE -- 
   - Sign up (e.g. email + password), sign in, sign out.  
   - Session (e.g. cookie).  
   - Search (map) and listing detail are **public** (no login required).  
   - Protect Post listing, Manage my sublets, Messages: redirect unauthenticated users to login.

4. **Map + pins** --DONE--
   - Use Mapbox GL JS with `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN`; fallback to static image if key missing.  
   - Map config: center (campus lat/lng), zoom, style in `app/lib/config.ts`.  
   - Fetch listings from DB; convert `pin_x`, `pin_y` (0–100%) to lat/lng within campus bounds.  
   - Render pins on map; click pin → navigate to listing detail (or tooltip then detail).  
   - Client component `MapView` in `components/map/`; search page fetches listings and passes to MapView.

5. **Listings**  -- DONE --
   - DB schema: listings with `tag` (sublet | landlord), `term` (summer | year_long), `pin_x`, `pin_y`, and other fields from the data model below.  
   - API: CRUD for listings (scoped to current user for create/update/delete).  
   - “Post listing” form: tag, term, title, description, price, dates, pin position (click on map to set), optional images (deferred to step 8).  
   - List view and detail view; filters by term and tag; sort by date or price.  
   - Edit/delete from detail page when owner.

6. **Manage my sublets**  -- DONE --  
   - Dedicated page `/my-sublets`: list only current user’s listings where `tag = 'sublet'`.  
   - Create (Add sublet → /listings/new?tag=sublet), edit, delete sublet listings from here.

7. **Messaging**  -- DONE --  
   - DB: conversations (listing_id, student_user_id), messages (conversation_id, sender_user_id, body).  
   - API: create conversation from listing, send message, list conversations, get thread.  
   - UI: “Message” on listing detail → conversation; inbox list and thread view with reply.

8. **Listing images**  -- DONE --
   - Upload listing photos; store URLs in `image_urls` (JSON array). Local storage in `public/uploads/`.  
   - Show images on listing card and detail page.

9. **Polish**  
   - Basic validation and error states.  
   - Empty states for list, map, inbox.  
   - Replace placeholder map when final image is provided; keep pin data as % so it still works.

---

## Data model (reference)

- **users**: id, email, name, password_hash, created_at  
- **listings**: id, user_id, tag (sublet | landlord), term (summer | year_long), title, description, price, start_date, end_date, pin_x, pin_y, image_urls[], created_at, updated_at  
- **conversations**: id, listing_id, student_user_id, created_at  
- **messages**: id, conversation_id, sender_user_id, body, created_at  

One conversation per (listing, student). Manage my sublets = listings where `user_id = current_user` and `tag = 'sublet'`.

---

## Future steps (do not focus on now)

- **Replace auth** with production auth (OAuth, proper session, etc.).  
- **Payments** (rent, deposits).  
- **Contracts** or document generation.  
- **Verification** (e.g. student/landlord badges).  
- **Reviews and ratings** for listings or users.  
- **Multiple maps** or multi-campus support.  
- **Admin moderation** beyond basic delete (e.g. report flow, approval queue).  
- **Real-time messaging** (e.g. WebSockets); MVP can use refresh/polling.  
- **Push/email notifications** for new messages (optional later).  
- **Recalibrate map** if the final map image uses a different coordinate system; keep pin_x/pin_y as % where possible.

When in doubt, prefer the minimal option that matches the “Steps to take” above and defer the rest to this “Future steps” section.
