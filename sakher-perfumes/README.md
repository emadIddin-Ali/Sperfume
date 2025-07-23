# 🛍️ Sakher Perfumes - Luxury Fragrance Webshop

A beautiful, modern perfume webshop built with Next.js, Tailwind CSS, and Supabase. Features a responsive design, shopping cart functionality, and email notifications.

## ✨ Features

- **Modern Design**: Clean, responsive layout with custom typography and color scheme
- **Product Catalog**: Browse and view perfume products with images and descriptions
- **Shopping Cart**: Add products to cart with quantity management
- **Checkout Process**: Complete order form with customer information
- **Email Notifications**: Automatic confirmation emails to customers and admin
- **Mobile Responsive**: Optimized for all screen sizes
- **Local Storage**: Cart persists across browser sessions

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Backend**: Supabase (Database & Auth)
- **Email Service**: Nodemailer with SMTP
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 🚀 Quick Start

### 1. Clone and Install

```bash
# Navigate to the project directory
cd sakher-perfumes

# Install dependencies
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. Create the required tables using the SQL below

#### Database Tables

Run these SQL commands in your Supabase SQL editor:

```sql
-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  image_url TEXT,
  active BOOLEAN DEFAULT TRUE
);

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  cart JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);
```

#### Sample Products

Insert some sample products:

```sql
INSERT INTO products (name, description, price, image_url, active) VALUES
('Rose Elegance', 'A sophisticated blend of Bulgarian roses and white musk', 89.99, 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400', true),
('Ocean Breeze', 'Fresh aquatic notes with hints of citrus and sea salt', 75.50, 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=400', true),
('Vanilla Dreams', 'Warm vanilla with notes of caramel and sandalwood', 65.00, 'https://images.unsplash.com/photo-1592945403244-b3faa5b613b0?w=400', true),
('Lavender Fields', 'Pure lavender essence with herbal undertones', 55.25, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', true);
```

### 3. Environment Variables

1. Copy the example environment file:
```bash
cp env.example .env.local
```

2. Update `.env.local` with your actual values:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# SMTP Configuration (for email sending)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM=your_email@gmail.com

# Admin email for order notifications
ADMIN_EMAIL=admin@sakherperfumes.com
```

### 4. Email Setup (Optional)

For email functionality, you can use:
- **Gmail**: Use App Password (2FA required)
- **Resend**: Modern email API service
- **Mailgun**: Professional email service
- **Custom SMTP**: Any SMTP provider

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── orders/        # Order processing
│   ├── checkout/          # Checkout page
│   ├── thank-you/         # Thank you page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── Header.tsx         # Navigation & cart
│   └── ProductCard.tsx    # Product display
├── contexts/              # React contexts
│   └── CartContext.tsx    # Shopping cart state
└── lib/                   # Utility libraries
    ├── supabase.ts        # Supabase client
    └── email.ts           # Email service
```

## 🎨 Design System

### Colors
- **Primary**: `#CBA135` (Gold)
- **Primary Hover**: `#B6892D` (Darker Gold)
- **Text Primary**: `#111827` (Very Dark Gray)
- **Error**: `#DC2626` (Red)

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Layout
- **Max Width**: 1280px
- **Responsive Grid**: 1-4 columns based on screen size
- **Sticky Header**: With logo, navigation, and cart

## 🔧 Customization

### Adding Products
1. Go to your Supabase dashboard
2. Navigate to Table Editor > products
3. Add new products with required fields

### Styling
- Modify `tailwind.config.ts` for theme changes
- Update `src/app/globals.css` for global styles
- Component styles are in their respective files

### Email Templates
- Edit `src/lib/email.ts` to customize email content
- Modify HTML templates for different styling

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📧 Email Configuration

### Gmail Setup
1. Enable 2-Factor Authentication
2. Generate App Password
3. Use App Password in SMTP_PASS

### Resend Setup
```env
SMTP_HOST=smtp.resend.com
SMTP_PORT=587
SMTP_USER=resend
SMTP_PASS=your_resend_api_key
```

## 📑 Viewing Changes

All updates to this project are tracked with Git. Run `git log` to view the
commit history or `git diff` to inspect specific modifications. The `docs/`
folder contains additional stage notes outlining planned features.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

For support or questions:
- Create an issue on GitHub
- Email: info@sakherperfumes.com

---

**Note**: This is a demonstration project. No actual orders will be processed or products shipped.
