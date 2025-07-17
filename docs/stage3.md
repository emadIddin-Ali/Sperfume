# 🛡️ Stage 3 – Admin Panel & Full Management

## 🎯 Goal
Enable the admin to manage the entire system:
- View/edit products
- View/export all orders (manual + online)
- Manage users (sellers/contact persons)
- Control delivery status
- Access sales stats
- Moderate visibility of roles

---

## 🛠️ Tech Stack
- **Frontend:** Next.js + Tailwind
- **Backend:** Supabase (DB + Auth + RLS)
- **Email:** SMTP
- **Export:** CSV download via client utils (e.g. Papaparse)

---

## ✅ Features – Task Breakdown

### 1. Admin Role Access
- [ ] Detect logged-in user's role from Supabase `users` table
- [ ] If role !== `admin`, redirect away from `/dashboard/admin`

### 2. Admin Dashboard Routes
Create protected route: `/dashboard/admin`

#### 📦 Products Management
- [ ] View all products
- [ ] Add new product (image, name, price, desc)
- [ ] Edit/delete existing product
- [ ] Toggle `active` status

#### 📑 Order Management
- [ ] View all orders (with seller_code if present)
- [ ] View all manual sales
- [ ] Filter by date, seller, product
- [ ] Export order data to CSV

#### 👥 User Management
- [ ] View all users by role
- [ ] Change user roles (e.g. upgrade to seller)
- [ ] Toggle role visibility: hide `contact_person`, disable `seller`

### 📦 Delivery Tracking Table (optional)
```sql
CREATE TABLE delivery_status (
  order_id UUID REFERENCES orders(id),
  status TEXT CHECK (status IN ('pending', 'packed', 'shipped', 'delivered')) DEFAULT 'pending',
  updated_at TIMESTAMP DEFAULT now()
);
```
- [ ] UI: dropdown to update delivery status
- [ ] Show current status in order list
- [ ] Send email when status is updated (optional)

### 📊 Stats Overview
- [ ] Total orders
- [ ] Orders per seller
- [ ] Manual vs Online
- [ ] Top selling products
- [ ] Revenue estimate (optional)

### 🔒 Admin RLS Rules
- [ ] Make sure only `role = 'admin'` can access full tables
- [ ] Protect product writes with admin-only rules

---

## ✅ Acceptance Criteria
- Admin can view and manage all data (products, orders, users)
- All role visibility toggles work (seller/contact_person)
- Delivery tracking is functioning and updatable
- Admin can export sales/orders to CSV
- System is secure via Supabase RLS and auth checks
