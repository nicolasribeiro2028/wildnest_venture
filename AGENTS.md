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
| **Map** | Static image (PNG) + CSS/SVG overlay for pins | Map image path in config; placeholder until real map is provided. Pin positions as % (pin_x, pin_y). |
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
   - CTA to sign in / sign up.  
   - No listings or map visible here.

3. **Simple auth**  
   - Sign up (e.g. email + password), sign in, sign out.  
   - Session (e.g. cookie).  
   - Protect all listing/map routes: redirect unauthenticated users to login.

4. **Map + pins** 
   - Load map from configurable image path.  
   - Render pins from listing positions (`pin_x`, `pin_y` as %).  
   - Click pin → navigate to listing detail (or tooltip then detail).  
   - Template map was alreafy provided.

5. **Listings**  
   - DB schema: listings with `tag` (sublet | landlord), `term` (summer | year_long), `pin_x`, `pin_y`, and other fields from the data model below.  
   - API: CRUD for listings (scoped to current user for create/update/delete).  
   - “Post listing” form: tag, term, title, description, price, dates, pin position (e.g. click on map to set), optional images.  
   - List view and detail view; filters by term and tag; sort by date or price.

6. **Manage my sublets**  
   - Dedicated section (page or sidebar): list only current user’s listings where `tag = 'sublet'`.  
   - Create, edit, delete sublet listings from here.

7. **Messaging**  
   - DB: conversations (listing_id, student_user_id), messages (conversation_id, sender_user_id, body).  
   - API: create conversation from listing, send message, list conversations, get thread.  
   - UI: “Message” on listing detail → conversation; inbox list and thread view with reply.

8. **Listing images**  
   - Upload listing photos; store URLs (e.g. in `image_urls`).  
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
