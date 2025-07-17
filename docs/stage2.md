# 🚀 Stage 2 – Seller System & Dashboard (No Payments)

## 🎯 Goal
Enable sellers to:
- Log in via email/password
- Get a unique referral link
- See orders tied to them (auto + manual)
- Report physical/manual sales via dashboard
- Receive email confirmation on every manual sale

---

## 🛠️ Tech Stack
- **Frontend:** Next.js
- **Auth:** Supabase Auth
- **DB:** Supabase Postgres
- **Email:** SMTP via Resend/Mailgun

---

## ✅ Features – Task Breakdown

### 1. Authentication
- [ ] Enable Supabase Auth (email/password)
- [ ] Build login + signup pages
- [ ] Store extra user info in `users` table:

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT NOT NULL,
  role TEXT CHECK (role IN ('admin', 'seller', 'contact')) DEFAULT 'seller',
  seller_code TEXT UNIQUE NOT NULL
);
```

- [ ] Auto-generate a unique `seller_code` for each seller

### 2. Referral Tracking
- [ ] Create route: `/s/[seller_code]`
- [ ] When user visits a seller link:
  - [ ] Save seller_code in localStorage or cookie
- [ ] On checkout submit:
  - [ ] Include seller_code if it exists in order payload

Update `orders` table:
```sql
ALTER TABLE orders ADD COLUMN seller_code TEXT;
```

### 3. Manual Sales Table
```sql
CREATE TABLE manual_sales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID REFERENCES users(id),
  product_id UUID REFERENCES products(id),
  customer_name TEXT,
  quantity INTEGER,
  created_at TIMESTAMP DEFAULT now()
);
```

### 4. Seller Dashboard UI
- [ ] Create `/dashboard/seller` route (authenticated only)
- [ ] Show:
  - [ ] Total sales (manual + referral)
  - [ ] Table of recent orders (from both `orders` and `manual_sales`)
  - [ ] Manual sales form (select product, quantity, customer name)

### 5. Email Confirmations (SMTP)
- [ ] When a seller submits a manual sale:
  - [ ] Send email to seller confirming the manual sale
  - [ ] Send email to admin with sale details

---

## 📋 Supabase Row-Level Security (RLS)
- [ ] Ensure sellers can only access their own rows
```sql
-- RLS for manual_sales
CREATE POLICY "seller_owns_manual_sales" ON manual_sales
  FOR SELECT USING (auth.uid() = seller_id);
```

---

## ✅ Acceptance Criteria
- Sellers can log in and access their dashboard
- Each seller has a working unique referral link
- Orders via link are tied to the seller
- Manual sales can be reported and are emailed
- RLS ensures sellers only see their own data
