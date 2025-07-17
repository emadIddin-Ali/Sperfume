import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";

export const metadata: Metadata = {
  title: "Sakher Perfumes - Luxury Fragrances",
  description: "Discover our exquisite collection of fine fragrances, crafted with the finest ingredients to create unforgettable moments.",
  keywords: "perfumes, fragrances, luxury, scents, Sakher Perfumes",
  authors: [{ name: "Sakher Perfumes" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
