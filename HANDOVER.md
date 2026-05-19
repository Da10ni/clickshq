# ClicksHQ — Website Guide

## Links

- **Website:** https://clickshq.vercel.app
- **Admin Panel:** https://clickshq.vercel.app/admin

## Login

```
Email:    danieleah43@gmail.com
Password: Password@123
```

All content changes are made in the **Admin Panel**. Open the link, log in, edit, click **Save** — the change goes live on the website immediately.

---

## How to Edit Content

1. Go to https://clickshq.vercel.app/admin
2. Log in with the credentials above.
3. Use the left sidebar to pick what to edit.

### What you can edit

**Pages** (sidebar → Pages)
Each page is built from sections (blocks). You can add, remove, and reorder them.
- Home — Hero, Features, Pricing, Testimonials, Call-to-Action
- About — Hero, Team, Call-to-Action
- Contact — Contact form (email / phone / address are editable)
- Privacy Policy / Terms — text content
- You can also create a new page with its own URL (e.g. slug `pricing` → `/pricing`)

Available block types: Hero · Features · Pricing · Testimonials · Call-to-Action · Team · Content (rich text) · Contact Form

**Posts** (sidebar → Posts)
Blog articles — title, image, content, author. Set **Status: Published** to make it appear on `/blog`.

**Media** (sidebar → Media)
Upload images, then use them inside any block.

**Contacts** (sidebar → Contacts)
Messages submitted through the website contact form appear here (read-only).

**Globals** (sidebar → Globals)
- Header — logo text, navigation links, button
- Footer — footer columns, links, social links, copyright
- Site Settings — site title, meta description, OG image (SEO)




---

## API Access

All content is available via API:
- REST: `https://clickshq.vercel.app/api/pages`, `/api/posts`, `/api/media`
- Each page/post edit screen has an **API** tab showing that record's direct API URL.

---

## Notes

- Built with Payload CMS + Next.js. The admin panel lives at `/admin` .
- Hosted on Vercel; database on MongoDB Atlas.
