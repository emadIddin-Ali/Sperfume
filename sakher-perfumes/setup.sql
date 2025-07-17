-- Sakher Perfumes Database Setup
-- Run this in your Supabase SQL Editor

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  image_url TEXT,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  cart JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

-- Insert sample products
INSERT INTO products (name, description, price, image_url, active) VALUES
('Rose Elegance', 'A sophisticated blend of Bulgarian roses and white musk, creating an enchanting fragrance that embodies timeless elegance and romance.', 89.99, 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop', true),
('Ocean Breeze', 'Fresh aquatic notes with hints of citrus and sea salt, capturing the essence of a perfect day by the ocean.', 75.50, 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=400&h=400&fit=crop', true),
('Vanilla Dreams', 'Warm vanilla with notes of caramel and sandalwood, creating a comforting and indulgent fragrance.', 65.00, 'https://images.unsplash.com/photo-1592945403244-b3faa5b613b0?w=400&h=400&fit=crop', true),
('Lavender Fields', 'Pure lavender essence with herbal undertones, bringing the tranquility of a peaceful garden to your daily routine.', 55.25, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop', true),
('Midnight Jasmine', 'Exotic jasmine flowers with hints of amber and musk, perfect for evening wear and special occasions.', 95.00, 'https://images.unsplash.com/photo-1590736969955-71cc94901354?w=400&h=400&fit=crop', true),
('Citrus Sunrise', 'Bright citrus notes with bergamot and grapefruit, energizing and refreshing for morning wear.', 45.75, 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop', true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_active ON products(active);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);

-- Enable Row Level Security (RLS) for better security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policies for products (public read access)
CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT USING (true);

-- Create policies for orders (insert only, no read access for security)
CREATE POLICY "Orders can be created by anyone" ON orders
  FOR INSERT WITH CHECK (true);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon;
GRANT ALL ON products TO anon;
GRANT ALL ON orders TO anon; 