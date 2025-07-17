# 🚀 Quick Setup Guide - Sakher Perfumes

Follow this guide to get your perfume webshop running locally in minutes!

## 📋 Prerequisites

- Node.js 18+ installed
- A Supabase account (free at [supabase.com](https://supabase.com))
- An email service (Gmail, Resend, etc.) for order notifications

## 🛠️ Step-by-Step Setup

### 1. Project Setup

```bash
# Navigate to the project directory
cd sakher-perfumes

# Install dependencies
npm install
```

### 2. Supabase Setup

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Choose your organization
   - Enter project name: `sakher-perfumes`
   - Set a database password
   - Choose a region close to you
   - Click "Create new project"

2. **Get API Keys**
   - In your Supabase dashboard, go to Settings > API
   - Copy the "Project URL" and "anon public" key

3. **Set Up Database**
   - Go to SQL Editor in your Supabase dashboard
   - Copy and paste the entire content of `setup.sql`
   - Click "Run" to create tables and sample data

### 3. Environment Configuration

1. **Create Environment File**
   ```bash
   cp env.example .env.local
   ```

2. **Update Environment Variables**
   Edit `.env.local` and replace with your actual values:

   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

   # SMTP Configuration (Optional - for email notifications)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   SMTP_FROM=your-email@gmail.com

   # Admin email for order notifications
   ADMIN_EMAIL=admin@sakherperfumes.com
   ```

### 4. Email Setup (Optional)

**Option A: Gmail**
1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security > 2-Step Verification > App passwords
   - Generate password for "Mail"
   - Use this password in `SMTP_PASS`

**Option B: Resend (Recommended)**
1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Update environment variables:
   ```env
   SMTP_HOST=smtp.resend.com
   SMTP_PORT=587
   SMTP_USER=resend
   SMTP_PASS=your-resend-api-key
   ```

### 5. Run the Application

```bash
# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

## 🎯 What You Should See

- **Homepage**: Beautiful hero section with product grid
- **Products**: 6 sample perfumes with images and descriptions
- **Cart**: Click cart icon to see shopping cart
- **Checkout**: Add items to cart and test the checkout process
- **Email**: If configured, you'll receive order confirmation emails

## 🔧 Customization

### Add Your Own Products

1. Go to Supabase Dashboard > Table Editor > products
2. Click "Insert row"
3. Fill in:
   - `name`: Product name
   - `description`: Product description
   - `price`: Price (numeric)
   - `image_url`: Image URL (use Unsplash or your own images)
   - `active`: true (to show the product)

### Change Colors/Design

Edit `tailwind.config.ts` to modify:
- Primary color (currently gold `#CBA135`)
- Fonts (currently Playfair Display + Inter)
- Layout max-width (currently 1280px)

### Modify Email Templates

Edit `src/lib/email.ts` to customize:
- Email subject lines
- Email content and styling
- Order summary format

## 🚨 Troubleshooting

### "Cannot connect to Supabase"
- Check your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Ensure your Supabase project is active
- Check if you've run the SQL setup script

### "Email sending failed"
- Verify your SMTP credentials
- For Gmail: Make sure you're using an App Password, not your regular password
- Check if your email provider allows SMTP access

### "Products not showing"
- Check if products have `active = true` in the database
- Verify the Supabase connection is working
- Check browser console for errors

### "Build errors"
- Make sure all dependencies are installed: `npm install`
- Check if you're using Node.js 18+
- Clear Next.js cache: `rm -rf .next && npm run dev`

## 📱 Testing the Full Flow

1. **Browse Products**: Visit homepage and see the product grid
2. **Add to Cart**: Click "Add to Cart" on any product
3. **View Cart**: Click the cart icon in the header
4. **Modify Quantities**: Use +/- buttons in cart
5. **Checkout**: Click "Proceed to Checkout"
6. **Fill Form**: Enter name and email
7. **Place Order**: Click "Place Order"
8. **Confirmation**: See thank you page and check emails

## 🎉 Success!

Your perfume webshop is now running locally! You can:
- Browse and purchase products
- Test the complete checkout flow
- Receive email confirmations
- Customize the design and content

## 🚀 Next Steps

- **Deploy to Vercel**: Push to GitHub and connect to Vercel
- **Add Payment**: Integrate Stripe or PayPal
- **Admin Panel**: Build an admin interface to manage products
- **User Accounts**: Add user registration and order history
- **Inventory**: Add stock management features

---

**Need help?** Check the main README.md for more detailed documentation! 