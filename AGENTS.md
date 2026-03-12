# AGENTS.md — Logic & Architecture

This file documents the **core logic** of WildNest so team members can understand and extend the system. When making design or implementation choices, refer to this document.

**Product design:** See **[product.md](./product.md)** for brand, design system, and UI specs.

---

## Tech stack

| Layer | Choice | Notes |
|-------|--------|--------|
| **Frontend** | Next.js 16 (App Router), React 19, Tailwind CSS | Server + client components; server actions for mutations. |
| **Backend** | Next.js server actions | No separate API; actions in `app/actions/`. |
| **Database** | SQLite + Prisma | `prisma/schema.prisma`; migrations in `prisma/migrations/`. |
| **Auth** | iron-session (cookie), bcrypt | `backend/auth/`; `getCurrentUserId()` gates protected logic. |
| **Map** | Mapbox GL JS | `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN`; fallback to static image if missing. |
| **File storage** | Local `public/uploads/` | Listing photos; URLs stored as JSON array in `image_urls`. |

---

## 1. Authentication & session

- **Session**: `iron-session` cookie (`wildnest_session`); stores `userId`.
- **Helpers**: `getCurrentUserId()` → `string | null`; `getSession()` for full session.
- **Password**: bcrypt hash; `hashPassword()` / `verifyPassword()` in `backend/auth/password.ts`.
- **Login redirect**: `?redirect=/path` on login page; after auth, redirect to that path.
- **Protected routes**: `app/(protected)/` layout calls `getCurrentUserId()` and redirects to `/login` if null.

---

## 2. Route access (public vs protected)

| Route | Access | Notes |
|-------|--------|------|
| `/`, `/search`, `/listings`, `/listings/[id]` | Public | No auth required. |
| `/login`, `/signup` | Public | Auth pages. |
| `/signup/preferences` | Public (post-signup) | Step 2 of sign-up; skippable. Accessible immediately after account creation. |
| `/listings/new`, `/listings/[id]/edit` | Protected | Owner check on edit. |
| `/my-sublets` | Protected | Only current user's sublets. |
| `/messages`, `/messages/[id]` | Protected | Participant check on thread. |
| `/profile` | Protected | View and edit account info + room preferences. |

---

## 3. Map coordinate system

- **Storage**: Listings use `pin_x`, `pin_y` as **0–100%** of campus bounds (not lat/lng).
- **Config**: `app/lib/config.ts` — `campusBounds` (north, south, west, east), `mapCenter`, `mapZoom`.
- **Conversion**:
  - `pinPercentToLatLng(pinX, pinY)` → `[lng, lat]` for Mapbox markers.
  - `latLngToPinPercent(lat, lng)` → `[pinX, pinY]` for pin picker (click/drag on map).
- **Mapbox fallback**: If no `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN`, static image + overlay pins used.

---

## 4. Listings logic

- **CRUD**: `app/actions/listings.ts` — `createListingAction`, `updateListingAction`, `deleteListingAction`.
- **Ownership**: Create/update/delete require `listing.userId === getCurrentUserId()`.
- **Forms**: Accept `FormData` (including `images`); `extractFormData()` parses fields; images saved via `saveListingImages()`.
- **Queries**:
  - `getListingsForMap()` — id, pinX, pinY, title (for map pins).
  - `getListings(filters)` — tag, term, sort (date | price).
  - `getListingById(id)` — full listing + user.
  - `getMySublets()` — `userId = current` AND `tag = 'sublet'`.
- **Return flow**: `?returnTo=my-sublets` on Post form → redirect to `/my-sublets` after create.

---

## 5. Messaging logic

- **Model**: One conversation per `(listing_id, student_user_id)`; `student` = person who messaged about the listing; listing owner can reply.
- **Actions**: `app/actions/messages.ts`
  - `startConversationAction(formData)` → create/find conversation, redirect to thread.
  - `createConversationAction(listingId)` — blocks if user owns listing.
  - `getConversations()` — where `studentUserId = current` OR `listing.userId = current`.
  - `getThread(id)` — messages + participants; only if user is student or listing owner.
  - `sendMessageAction(conversationId, body)` — participant check, then insert message.

---

## 6. Image upload

- **Storage**: `public/uploads/[listingId]/[timestamp]-[index].[ext]`; URL = `/uploads/...`.
- **DB**: `image_urls` = JSON array of URL strings.
- **Helpers**: `app/lib/upload.ts` — `saveListingImages()`, `parseImageUrls()`, `stringifyImageUrls()`.
- **Limits**: 5 images/listing, 5MB/file, JPEG/PNG/WebP.
- **Create**: Listing created first; then images saved; listing updated with URLs.
- **Edit**: New images appended to existing; total capped at 5.

---

## 7. Key files

| Path | Role |
|------|------|
| `app/lib/config.ts` | Map center, zoom, bounds, pin ↔ lat/lng conversion. |
| `app/lib/auth.ts` | Re-exports `getCurrentUserId`, `getSession`, password helpers. |
| `app/lib/upload.ts` | Image save/parse; upload dir, limits. |
| `app/lib/db.ts` | Re-exports Prisma client. |
| `app/actions/listings.ts` | Listing CRUD, filters, my sublets. |
| `app/actions/messages.ts` | Conversation + message actions. |
| `app/actions/auth.ts` | Login, signup, logout. |
| `components/shared/AppHeader.tsx` | Nav; auth-aware (Sign in vs Sign out, Post listing, etc.). |
| `components/map/MapView.tsx` | Mapbox or static map + pins. |
| `components/map/PinPicker.tsx` | Map for picking pin position (create/edit listing). |

---

## 8. Data model

- **users**: id, email, first_name, last_name, phone (nullable), password_hash, created_at
- **listings**: id, user_id, tag (sublet | landlord), term (summer | year_long), title, description, price, start_date, end_date, pin_x, pin_y, image_urls (JSON), created_at, updated_at
- **conversations**: id, listing_id, student_user_id, created_at — unique on (listing_id, student_user_id)
- **messages**: id, conversation_id, sender_user_id, body, created_at
- **user_preferences**: id, user_id (FK → users, unique), total_occupants (int, nullable), max_rent (int, nullable), location_tags (JSON array, nullable), quiet_place (bool, nullable), has_dog (bool, nullable), close_to_supermarket (bool, nullable), close_to_bus_stop (bool, nullable), updated_at

**Invariants**: One conversation per (listing, student). Sublets = listings where `user_id = current_user` and `tag = 'sublet'`. One `user_preferences` row per user (upsert on save).

---

## 9. Sign-up flow & user preferences

### Sign-up: Step 1 — Account creation (`/signup`)

Fields:
- First name, Last name (required)
- Email (required)
- Password + confirm password (required)
- Cellphone (optional)

On success: create `users` row, open session, redirect to `/signup/preferences`.

### Sign-up: Step 2 — Room preferences (`/signup/preferences`)

This page is **skippable**. A prominent "Skip for now" button redirects to `/` without saving anything.
If the user fills it in and submits, an upsert creates/updates the `user_preferences` row.

Fields and UI:

| Field | UI | Storage |
|-------|-----|---------|
| Total occupants | Number stepper (1–10+) | `total_occupants` int |
| Max rent (total, USD/mo) | Number input | `max_rent` int |
| Preferred area | Multi-select pill buttons (any combination) | `location_tags` JSON array |
| Quiet place? | Y / N toggle button | `quiet_place` bool |
| I have a dog | Y / N toggle button | `has_dog` bool |
| Close to supermarket? | Y / N toggle button | `close_to_supermarket` bool |
| Close to bus stop? | Y / N toggle button | `close_to_bus_stop` bool |

Location tag values (exact strings stored in JSON array):
`north_campus`, `central_campus`, `south_campus`, `close_to_evanston`, `downtown_evanston`, `south_evanston`
— geographic boundaries for each tag will be defined when the matching algorithm is built.

### Profile page (`/profile`) — protected

Displays and allows editing of:
1. Account info: first name, last name, email, phone.
2. Room preferences: same fields and Y/N button UI as Step 2 above.

On load: fetch `users` row + left-join `user_preferences` (may be empty if skipped).
On save: update `users`; upsert `user_preferences`.

### Actions

| Action | File | Notes |
|--------|------|-------|
| `signupAction` | `app/actions/auth.ts` | Creates user; opens session; returns redirect to `/signup/preferences`. |
| `savePreferencesAction` | `app/actions/preferences.ts` | Upsert `user_preferences` for current user. Used by both `/signup/preferences` and `/profile`. |
| `updateProfileAction` | `app/actions/profile.ts` | Updates `first_name`, `last_name`, `email`, `phone` on `users`. |

### Key files (new)

| Path | Role |
|------|------|
| `app/signup/preferences/page.tsx` | Step 2 preferences UI (skippable). |
| `app/profile/page.tsx` | View/edit account info + preferences. |
| `app/actions/preferences.ts` | `savePreferencesAction` (upsert). |
| `app/actions/profile.ts` | `updateProfileAction`. |

---

## 10. Planned / future work

- **UI polish** — Refine many small interface elements.
- **House-selection algorithm** — Matching/recommendation logic for listings; will consume `user_preferences` data collected above.
- Replace auth with OAuth; payments; contracts; verification; reviews; multi-campus; admin moderation; real-time messaging; notifications.
