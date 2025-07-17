# 🛍️ Stage 1 – Webshop Core with Design & Cart (No Payment)

## 🎯 Goal
Create a beautiful, functional perfume webshop homepage where users can:
- Browse products with a modern design
- Add products to a cart (client-side)
- Submit order with customer info (no payment)
- Receive confirmation emails (via SMTP)
- Admin receives notification emails

---

## 🛠️ Tech Stack
- **Frontend:** Next.js + Tailwind CSS (utility-first styling)
- **Backend/DB/Auth:** Supabase
- **Email Service:** SMTP (Resend / Mailgun / custom)
- **Deployment:** Vercel

---

## 🎨 Design Guidelines

### Color Palette
- **Background:** `#ffffff` (white)
- **Primary Text:** `#111827` (very dark gray)
- **Accent Color (Gold):** `#CBA135`
- **Button Hover:** slightly darker gold `#B6892D`
- **Error:** `#DC2626` (red-600)

### Typography
- Headings: `Playfair Display`, serif
- Body: `Inter`, sans-serif

### Layout
- Full-width layout with centered content (max-width: 1280px)
- Responsive grid for products (1–4 cols depending on screen)
- Sticky header with logo, nav links, and cart icon

---

## ✅ Features – Task Breakdown

### 1. Project Initialization
- [ ] Create a new Next.js project
- [ ] Install Tailwind CSS + configure theme
- [ ] Set up Supabase client
- [ ] Connect project to Supabase project
- [ ] Deploy base setup to Vercel

### 2. Supabase Tables
#### `products`
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  image_url TEXT,
  active BOOLEAN DEFAULT TRUE
);
```

#### `orders`
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  cart JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);
```

---

### 3. Frontend: Public Webshop Pages

#### 🧱 Homepage (Product Grid)
- [ ] Fetch `active` products from Supabase
- [ ] Display product card with:
  - [ ] Image
  - [ ] Name
  - [ ] Price
  - [ ] Short description
  - [ ] "Add to cart" button (stores item locally)

#### 🛒 Cart UI
- [ ] Floating cart icon in header with item count
- [ ] On click, show cart drawer/modal:
  - [ ] List of added products (name, qty, subtotal)
  - [ ] Total amount
  - [ ] Remove item / adjust quantity
  - [ ] "Proceed to checkout" button

#### 📋 Checkout Page
- [ ] Form fields:
  - Name
  - Email
  - Confirm cart items
- [ ] Submit form stores order to Supabase
- [ ] Clear local cart
- [ ] Redirect to Thank You page

---

### 4. Email Integration (SMTP)
- [ ] Set up SMTP credentials in environment variables
- [ ] On successful order:
  - [ ] Send confirmation email to customer (include order summary)
  - [ ] Send alert email to admin with full order
- [ ] Email template:
  - [ ] Subject: "Thank you for your order!"
  - [ ] Body: includes name, email, products, quantities, total

---

### 5. Mobile & UX Details
- [ ] Responsive layout for all screen sizes
- [ ] Smooth animations (slide-in cart, button hover)
- [ ] Loading states for async actions (fetch, submit)
- [ ] Error states (missing fields, email fail)

---

## ✅ Acceptance Criteria
- Products can be browsed and added to a local cart
- Orders can be placed via a checkout form (no payment)
- Customer and admin both receive confirmation emails
- Design is modern, minimal, and mobile-friendly
- Content and products are fully managed via Supabase
