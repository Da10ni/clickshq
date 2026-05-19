# ClicksHQ — Complete Guide

A full guide to how this website works and how to use it.
**Part 1** is for non-technical users (editing content). **Part 2** is for developers.

---

## Quick Links

| | |
|---|---|
| Live Website | https://clickshq.vercel.app |
| Admin Panel | https://clickshq.vercel.app/admin |
| Admin Login | `danieleah43@gmail.com` / `Password@123` |
| Source Code | https://github.com/Da10ni/clickshq |

---

# Part 1 — For Content Editors (Non-Technical)

## What is this?

This website is built with **Payload CMS** — a content management system, similar in idea to WordPress.
- The **website** (what visitors see) is at `clickshq.vercel.app`
- The **admin panel** (where you change the content) is at `clickshq.vercel.app/admin` — like WordPress's `/wp-admin`

You don't touch any code. You log into the admin panel, edit text/images/sections, click **Save**, and the website updates.

## The Flow (how a change happens)

```
You log into /admin  →  Edit a Page / Post / setting  →  Click "Save"
        →  Change is saved to the database  →  Website shows the new content
```

That's it. No deployment, no developer needed for content changes.

## Logging In

1. Go to **https://clickshq.vercel.app/admin**
2. Enter the email and password.
3. You'll see the dashboard with a sidebar on the left.

The sidebar has two groups:
- **Collections** — Pages, Posts, Media, Contacts, Users
- **Globals** — Header, Footer, Site Settings

## Editing a Page (e.g. the Home page)

1. Sidebar → **Pages** → click **Home**
2. You'll see a **Title**, a **Slug** (the URL), and a **Layout** field.
3. The **Layout** is a stack of "blocks" (sections). The Home page has: Hero → Features → Pricing → Testimonials → Call-to-Action.
4. Click a block to expand it and edit its fields (headline, text, list items, buttons, etc.).
5. To **reorder** blocks: drag the handle (⠿ icon) on the left of a block.
6. To **add** a block: scroll to the bottom of Layout → click **Add Block** → pick one.
7. To **remove** a block: click the **⋯** menu on a block → Remove.
8. Click **Save** (top-right). The website updates immediately.

### Block types available

| Block | Use it for |
|---|---|
| Hero | Big headline section at the top of a page |
| Features | Grid of features with icons |
| Pricing | Pricing plan cards |
| Testimonials | Customer quotes |
| Call-to-Action | A highlighted "sign up" banner |
| Team | Team member cards |
| Content | Free-form rich text (headings, paragraphs, lists, links) |
| Contact Form | The contact form + your contact details |

## Live Preview (see changes before saving)

1. While editing a Page or Post, look at the top-right: **Edit | Live Preview | API**
2. Click **Live Preview** — the website preview opens on the right side.
3. Type in any field on the left — the preview updates **instantly, without saving**.
4. Use the device dropdown to check **Mobile / Tablet / Desktop** views.
5. When you're happy, click **Save** to publish it.
6. Don't like it? Just leave the page — nothing was saved.

> Live Preview only appears on **Pages** and **Posts** (those are actual web pages). It does not appear on Contacts, Media, or Users.

## Writing a Blog Post

1. Sidebar → **Posts** → **Create New**
2. Fill in Title, Slug, Featured Image (optional), Excerpt, and Content (rich text editor).
3. Set **Status** to **Published**.
4. (Optional) Set Published Date and Author.
5. Click **Save**.
6. It now appears at `clickshq.vercel.app/blog` and at `clickshq.vercel.app/blog/your-slug`.

To hide a post again: set Status back to **Draft** and Save.

## Uploading Images

1. Sidebar → **Media** → **Create New** (or **Bulk Upload**)
2. Choose an image, add an **Alt text** (describes the image — important for SEO/accessibility).
3. Click **Save**.
4. Now in any block that has an image field (e.g. Hero background, Post featured image), you can pick this image.

> Note: For images to stay permanently after deployments, **Vercel Blob storage** should be enabled (see Part 2). Until then, treat image uploads as temporary.

## Header, Footer, Site Settings (the "Globals")

- **Header** — change the logo text, the navigation menu links, and the top "Get Started" button.
- **Footer** — change the footer link columns, social media links, and the copyright line.
- **Site Settings** — change the site title, the default meta description, and the Open Graph (social share) image. These are the site-wide SEO defaults.

Edit → **Save** → live.

## SEO for a specific page or post

Each Page and Post has a **Meta** section near the bottom:
- **Meta Title** — the title shown in Google / browser tab
- **Meta Description** — the snippet shown in search results
- (Pages also have a Meta Image for social sharing)

If you leave these blank, the page title is used automatically.

## Reading Contact Form Submissions

When someone fills the contact form on `/contact`, it shows up in **Contacts** in the admin (name, email, subject, message). This is a read-only inbox — you can't reply from here, just view.

## Managing Admin Users

- Sidebar → **Users** → **Create New** → add email, password, name, role (Admin / Editor).
- To change your own password: click your profile (top-right) → **Account**.

---

# Part 2 — For Developers

## Stack

| Layer | Tech |
|---|---|
| CMS / Admin | Payload CMS v3 (lives at `/admin` inside the Next.js app) |
| Framework | Next.js 15 (App Router), React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 3 + `@tailwindcss/typography` |
| Database | MongoDB (`@payloadcms/db-mongodb`) — hosted on MongoDB Atlas |
| Media storage | `@payloadcms/storage-vercel-blob` (activates when `BLOB_READ_WRITE_TOKEN` is set) |
| Live Preview | `@payloadcms/live-preview-react` (`useLivePreview`, `RefreshRouteOnSave`) |
| Hosting | Vercel |
| Data fetching | Payload **Local API** inside React Server Components |

## How Payload v3 fits into Next.js

Payload v3 is **not a separate server**. It plugs into the Next.js app:
- `src/app/(payload)/admin/[[...segments]]/page.tsx` → renders Payload's admin UI at `/admin`
- `src/app/(payload)/api/[...slug]/route.ts` → Payload's REST API at `/api/*`
- `src/app/(payload)/api/graphql/route.ts` → GraphQL at `/api/graphql`
- `src/app/(payload)/layout.tsx` → Payload's `RootLayout` (brings in admin CSS via `@payloadcms/next/css`)
- `src/payload.config.ts` → the single source of truth: collections, globals, db, plugins, admin options

The `(frontend)` route group is the public website; it reads data with the Local API (`getPayload({ config })`).

## Project Structure

```
src/
├── app/
│   ├── (frontend)/            # Public website
│   │   ├── layout.tsx         # Header + Footer + RefreshOnSave, global SEO. force-dynamic.
│   │   ├── page.tsx           # Home (CMS page slug "home")
│   │   ├── [slug]/            # Any other CMS page
│   │   ├── about/ contact/ privacy/ terms/
│   │   ├── blog/ + blog/[slug]/
│   │   └── not-found.tsx
│   └── (payload)/             # Payload admin + API (mostly generated)
├── collections/               # Pages, Posts, Media, Contacts, Users
├── globals/                   # Header, Footer, SiteSettings
├── blocks/                    # Block field definitions (Hero, Features, CTA, Pricing, Testimonials, Content, Team, ContactForm)
├── components/
│   ├── blocks/                # Frontend renderers for each block + RenderBlocks
│   ├── Header.tsx Footer.tsx Icon.tsx PagePlaceholder.tsx
│   ├── LivePreviewBlocks.tsx  # Client wrapper: useLivePreview → RenderBlocks
│   └── RefreshOnSave.tsx      # RefreshRouteOnSave listener
├── lib/payload.ts             # getPayloadClient()
├── payload.config.ts          # Payload config
└── seed.ts                    # `npm run seed` — populates demo content
```

## Collections & Globals

- **pages** — `title`, `slug`, `layout` (blocks), `meta` (title/description/image). `read: () => true`.
- **posts** — `title`, `slug`, `status` (draft/published), `publishedAt`, `author` (rel→users), `featuredImage` (rel→media), `excerpt`, `content` (richText), `meta`.
- **media** — upload collection; image sizes: thumbnail / card / hero; `alt` required.
- **contacts** — `name`, `email`, `subject`, `message`. `create: () => true` (public form), `read` requires auth.
- **users** — Payload auth collection; `name`, `role` (admin/editor). Access is auth-gated.
- **globals**: `header`, `footer`, `site-settings` — all `read: () => true`.

## Live Preview implementation

- `payload.config.ts` → `admin.livePreview`: builds the preview URL from `NEXT_PUBLIC_SITE_URL` + the doc's slug; enabled for `pages` and `posts`; breakpoints for mobile/tablet/desktop.
- Pages render `<LivePreviewBlocks initialData={doc} />` — a client component using `useLivePreview` so the preview updates as you type.
- `<RefreshOnSave />` in the frontend layout uses `RefreshRouteOnSave` so the preview also refreshes when a doc is saved.
- Frontend pages are `export const dynamic = 'force-dynamic'` so CMS edits appear immediately (no stale static cache).

## Running Locally

```bash
npm install --legacy-peer-deps
cp .env.example .env          # then fill DATABASE_URI, PAYLOAD_SECRET, NEXT_PUBLIC_SITE_URL
npm run dev                   # http://localhost:3000  (admin at /admin)
npm run seed                  # optional: load demo content
npm run build                 # production build
```

`.env`:
```
DATABASE_URI=<mongodb connection string>/clickshq
PAYLOAD_SECRET=<long random string>
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Deploying changes

The repo is connected to Vercel. **Any push to `main` auto-deploys.**

```bash
git add -A
git commit -m "your change"
git push                      # Vercel builds & deploys automatically
```

### Vercel environment variables (Project → Settings → Environment Variables)
| Name | Value |
|---|---|
| `DATABASE_URI` | the MongoDB Atlas connection string (with `/clickshq` and credentials) |
| `PAYLOAD_SECRET` | a long random string |
| `NEXT_PUBLIC_SITE_URL` | `https://clickshq.vercel.app` (or the custom domain) |
| `BLOB_READ_WRITE_TOKEN` | *(not set yet)* — created automatically when you add Vercel Blob storage |

### Enabling persistent media storage (recommended)
1. Vercel → Project → **Storage** → **Create Database** → **Blob** → Create.
2. Vercel auto-adds `BLOB_READ_WRITE_TOKEN` to the project's env vars.
3. **Redeploy**. The `vercelBlobStorage` plugin in `payload.config.ts` activates automatically (it checks for that token).

### Custom domain
Vercel → Project → **Domains** → add your domain (e.g. `clickshq.com`). Then update `NEXT_PUBLIC_SITE_URL` to the new domain and redeploy.

## Adding a new block (developer task)

1. Define the block fields in `src/blocks/MyBlock.ts` (a `Block` config).
2. Add it to the `blocks` array in `src/collections/Pages.ts`.
3. Create a renderer `src/components/blocks/MyBlockBlock.tsx`.
4. Register it in `src/components/blocks/RenderBlocks.tsx` (`blockComponents` map, keyed by `blockType`).
5. Run `npm run generate:importmap` if needed, commit, push.

## API

- REST: `GET /api/pages`, `/api/posts`, `/api/media`, etc. (Payload's auto REST API)
- GraphQL: `POST /api/graphql`; playground at `/api/graphql-playground`
- Each admin edit screen has an **API** tab showing that record's direct REST URL.
- Public read is open on `pages`, `posts`, `media`, and the globals; `users` and `contacts` reads require auth.

## Notes / Gotchas

- Pinned versions: Payload `3.37.0`, Next `15.4.x`, React `19`. The Payload + Next peer range matters — keep them compatible.
- `sass` is a dev dependency — required for the admin SCSS to compile (without it the admin panel renders unstyled).
- `src/seed.ts` is excluded from the type-check build (`tsconfig.json` → `exclude`) because the inline Lexical content uses loose typing; it still runs fine via `tsx`.
- The frontend uses `suppressHydrationWarning` on `<html>`/`<body>` to ignore attributes injected by browser extensions.
```
