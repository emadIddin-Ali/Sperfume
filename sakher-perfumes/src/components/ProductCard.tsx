'use client';

import { Product, CartItem } from '@/lib/supabase';
import { useCart } from '@/contexts/CartContext';
import { ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useCart();
  const router = useRouter();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      quantity: 1,
    };
    dispatch({ type: 'ADD_ITEM', payload: cartItem });
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      quantity: 1,
    };
    dispatch({ type: 'ADD_ITEM', payload: cartItem });
    router.push('/checkout');
  };

  const handleCardClick = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={handleCardClick}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${product.name}`}
    >
      {/* Product Image */}
      <div className="aspect-square overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <ShoppingBag className="h-12 w-12 text-gray-400" />
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-display text-lg font-semibold text-text-primary mb-2">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
        )}
        <div className="flex items-center justify-between">
          <span className="font-display text-xl font-semibold text-primary">
            {Number(product.price).toFixed(2)} kr
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-sm"
            >
              Buy Now
            </button>
            <button
              onClick={handleAddToCart}
              className="flex-1 border border-primary text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-sm flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 