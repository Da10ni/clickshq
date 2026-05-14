# ClicksHQ — SaaS Landing Page

A professional, fully CMS-driven marketing site for **ClicksHQ**, a project-management SaaS product.
Built with **Payload CMS v3**, **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and **MongoDB**.

Everything visible on site is editable from the Payload admin panel — there is **no hard-coded copy** on the frontend.

---

## Tech Stack

| Layer        | Tech                                              |
|--------------|---------------------------------------------------|
| CMS / Admin  | Payload CMS v3 (`/admin`)                          |
| Framework    | Next.js 15 — App Router, React 19                 |
| Language     | TypeScript                                         |
| Styling      | Tailwind CSS 3 (+ `@tailwindcss/typography`)       |
| Database     | MongoDB (`@payloadcms/db-mongodb`)                 |
| Media / Email| `@payloadcms/payload-cloud` (S3 storage on Cloud)  |
| Data access  | Payload **Local API** in React Server Components   |

---

## Project Structure

```
src/
├── app/
│   ├── (frontend)/           # Public marketing site
│   │   ├── layout.tsx        # Header + Footer wrapper, global SEO
│   │   ├── page.tsx          # Home  (CMS page slug: "home")
│   │   ├── [slug]/           # Any other CMS page
│   │   ├── about/            # CMS page slug: "about"
│   │   ├── contact/          # CMS page slug: "contact"
│   │   ├── blog/             # Blog list + blog/[slug] detail
│   │   ├── privacy/          # CMS page slug: "privacy"
│   │   ├── terms/            # CMS page slug: "terms"
│   │   └── not-found.tsx
│   └── (payload)/            # Payload admin panel + REST/GraphQL API
│       ├── admin/[[...segments]]/
│       ├── api/[...slug]/    # REST  → /api/*
│       └── api/graphql/      # GraphQL → /api/graphql
├── collections/              # Pages, Posts, Media, Contacts, Users
├── globals/                  # Header, Footer, SiteSettings
├── blocks/                   # Page-builder block definitions
├── components/
│   ├── blocks/               # Frontend renderers for each block
│   ├── Header.tsx / Footer.tsx / Icon.tsx
│   └── PagePlaceholder.tsx
├── lib/payload.ts            # getPayloadClient() helper
└── payload.config.ts
```

### Collections
- **pages** — flexible block-based layout (Hero, Features, Pricing, Testimonials, CTA, Content, Team, Contact Form) + per-page SEO meta
- **posts** — blog posts: title, slug, status (draft/published), publishedAt, author, featured image, excerpt, rich-text content, SEO meta
- **media** — image / PDF uploads with auto-generated sizes (thumbnail, card, hero)
- **contacts** — contact-form submissions (name, email, subject, message)
- **users** — admin users (built-in auth, roles: admin / editor)

### Globals
- **header** — logo text, nav links, CTA button
- **footer** — copyright, link columns, social links
- **site-settings** — site title, meta description, OG image, favicon

---

## Local Development

### 1. Prerequisites
- Node.js 20+
- A MongoDB connection string — either a local `mongodb://localhost:27017/clickshq` or a free **MongoDB Atlas** cluster

### 2. Install
```bash
npm install --legacy-peer-deps
```

### 3. Environment
Copy `.env.example` → `.env` and fill in:
```
DATABASE_URI=<your mongodb connection string>/clickshq
PAYLOAD_SECRET=<a long random string>
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Run
```bash
npm run dev
```
- Frontend → http://localhost:3000
- Admin panel → http://localhost:3000/admin  (creates the first admin user on first visit)

### 5. (Optional) Seed demo content
With the dev server running:
```bash
npm run seed
```
This populates the header, footer, site settings, and Home / About / Contact pages with demo content, and creates an admin user `admin@clickshq.com` / `changeme123`.

---

## Build

```bash
npm run build && npm start
```

---

## Deploy to Payload Cloud

1. Push this repo to GitHub.
2. Go to **https://cloud.payloadcms.com** → **New Project** → import the repo.
3. Payload Cloud provisions MongoDB + S3 media storage and sets `DATABASE_URI` automatically.
4. Add environment variables in the Payload Cloud dashboard:
   ```
   PAYLOAD_SECRET=<a long random string>
   NEXT_PUBLIC_SITE_URL=https://<your-app>.payloadcms.app
   ```
5. Deploy. Visit `/admin` to create the first admin user, then add content.

> The `@payloadcms/payload-cloud` plugin is already wired up in `payload.config.ts`, so media uploads and outbound email work on Cloud with no extra config.

---

## Editing Content (for the client)

Log in at `/admin`:
- **Pages** → edit the Home page (or any page). The **Layout** field is a block builder — add, remove, and reorder Hero / Features / Pricing / Testimonials / CTA / Team / Content / Contact Form sections.
- **Posts** → write blog articles. Set **Status** to *Published* to make them appear on `/blog`.
- **Media** → upload images; reference them from any block.
- **Header / Footer / Site Settings** (Globals) → edit navigation, footer links, social links, and site-wide SEO defaults.
- **Contacts** → read contact-form submissions.
