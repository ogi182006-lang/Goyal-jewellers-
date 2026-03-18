# 💎 Goyal Jewellers — Website & Admin Panel

A modern, elegant jewellery showroom website with a full admin panel.  
Built with **Next.js 14**, **Supabase**, **Cloudinary**, and deployable on **Vercel**.

---

## 🚀 Quick Start (3 Steps)

### Step 1 — Set up Supabase Database

1. Go to [supabase.com](https://supabase.com) → open your project
2. Click **SQL Editor** in the left sidebar
3. Copy the entire contents of `supabase/schema.sql`
4. Paste it into the SQL editor and click **Run**
5. You will see: categories table, products table, RLS policies, and indexes created

### Step 2 — Create Admin User

1. In Supabase → go to **Authentication → Users**
2. Click **Add User → Create New User**
3. Enter your admin email and a strong password
4. Save — this is what you'll use to log in at `/admin`

### Step 3 — Deploy to Vercel

1. Upload this project ZIP to GitHub (create a new repository)
2. Go to [vercel.com](https://vercel.com) → **New Project** → import your GitHub repo
3. In **Environment Variables**, add these one by one:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://jyyilgvnjtpabypcsopb.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | *(your anon key)* |
| `SUPABASE_SERVICE_ROLE_KEY` | *(your service role key)* |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | `dwjjancj9` |
| `CLOUDINARY_API_KEY` | `332251643513396` |
| `CLOUDINARY_API_SECRET` | *(your secret)* |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `919928529683` |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.vercel.app` |

4. Click **Deploy** — done! 🎉

---

## 📋 Features

### Customer Website
- **Homepage** — Hero, categories grid, latest products, about section, store info + Google Maps
- **Category Pages** — `/category/[slug]` — products filtered by category
- **Product Detail** — image gallery, specs, Add to Cart, Order on WhatsApp
- **Cart** — localStorage cart, quantity management, WhatsApp checkout
- **SEO** — meta tags, Open Graph, JSON-LD schema, sitemap.xml, robots.txt

### Admin Panel (`/admin`)
- **Secure login** — Supabase email/password authentication
- **Dashboard** — product & category counts, quick actions
- **Products** — list, add, edit, delete
- **Image Upload** — multiple images per product, stored on Cloudinary
- **Categories** — add and delete categories

---

## 🗂️ Project Structure

```
goyal-jewellers/
├── app/
│   ├── page.js                          # Homepage
│   ├── layout.js                        # Root layout
│   ├── not-found.js                     # 404 page
│   ├── sitemap.js                       # Dynamic sitemap
│   ├── robots.js                        # robots.txt
│   ├── category/[slug]/page.js          # Category page
│   ├── product/[id]/page.js             # Product detail page
│   ├── cart/page.js                     # Cart page
│   ├── admin/
│   │   ├── page.js                      # Admin login
│   │   └── dashboard/
│   │       ├── layout.js                # Admin layout with sidebar
│   │       ├── page.js                  # Admin overview
│   │       ├── products/
│   │       │   ├── page.js              # Products list
│   │       │   ├── new/page.js          # Add product
│   │       │   └── [id]/edit/page.js    # Edit product
│   │       └── categories/page.js       # Categories
│   └── api/
│       ├── upload/route.js              # Cloudinary upload
│       ├── products/route.js            # Products API
│       ├── products/[id]/route.js       # Product by ID
│       ├── categories/route.js          # Categories API
│       ├── categories/[id]/route.js     # Category by ID
│       └── admin/login/route.js         # Admin auth
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── HeroSection.jsx
│   ├── ProductCard.jsx
│   ├── CategoryCard.jsx
│   ├── ProductGallery.jsx
│   ├── AddToCartButton.jsx
│   ├── CartDrawer.jsx
│   ├── PublicLayout.jsx
│   ├── Skeletons.jsx
│   └── admin/
│       ├── AdminSidebar.jsx
│       ├── EditProductForm.jsx
│       ├── DeleteProductButton.jsx
│       └── CategoriesManager.jsx
├── context/
│   └── CartContext.js                   # Global cart state
├── lib/
│   ├── supabase.js                      # Browser Supabase client
│   ├── supabaseAdmin.js                 # Service role client
│   ├── supabaseServer.js                # Server component client
│   └── cloudinary.js                    # Cloudinary config
├── supabase/
│   └── schema.sql                       # Complete DB setup script
├── middleware.js                        # Admin route protection
├── .env.local                           # Environment variables
└── vercel.json                          # Vercel config
```

---

## 🎨 Design

| Token | Value |
|-------|-------|
| Background | `#0D0D0D` |
| Gold Accent | `#D4AF37` |
| Gold Light | `#F5D76E` |
| Text | `#FFFFFF` |
| Secondary Text | `#BFBFBF` |
| Display Font | Cormorant Garamond |
| Body Font | Josefin Sans |

---

## 📞 Business Info

**Goyal Jewellers**  
Naya Bajar, Chomu, Rajasthan 303702  
📞 +91 99285 29683  
🕙 10:30 AM – 07:30 PM (Daily)  
💬 WhatsApp: [wa.me/919928529683](https://wa.me/919928529683)
