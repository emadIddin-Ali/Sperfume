'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/Header';
import { ArrowLeft, ShoppingBag, Plus, Minus } from 'lucide-react';

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { dispatch } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', params.id)
        .single();
      if (data) setProduct(data);
      setLoading(false);
    }
    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-16 center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-12 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-16 center">
          <h1 className="font-display text-2xl font-semibold text-text-primary mb-4">
            Product not found
          </h1>
          <a
            href="/"
            className="inline-flex items-center space-x-2 bg-primary hover:bg-primary-hover text-white font-medium py-3 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Products</span>
          </a>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
        quantity,
      },
    });
  };

  const handleBuyNow = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
        quantity,
      },
    });
    router.push('/checkout');
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <a
            href="/"
            className="inline-flex items-center space-x-2 text-primary hover:text-primary-hover mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Products</span>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <div className="bg-gray-50 rounded-2xl p-8">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-auto rounded-xl object-cover shadow-lg"
                />
              ) : (
                <div className="w-full h-96 bg-gray-200 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="h-24 w-24 text-gray-400" />
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <div className="space-y-6">
              <div>
                <h1 className="font-display text-4xl font-bold text-text-primary mb-2">
                  {product.name}
                </h1>
                <div className="text-primary font-display text-3xl font-semibold">
                  {Number(product.price).toFixed(2)} kr
                </div>
              </div>

              {product.description && (
                <div className="prose prose-lg">
                  <p className="text-gray-700 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-text-primary">
                  Quantity
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={decreaseQuantity}
                    className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-primary transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-xl font-semibold w-16">
                    {quantity}
                  </span>
                  <button
                    onClick={increaseQuantity}
                    className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-primary transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 pt-6">
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-4 px-8 rounded-xl text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  Buy Now - {(Number(product.price) * quantity).toFixed(2)} kr
                </button>
                
                <button
                  onClick={handleAddToCart}
                  className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-4 px-8 rounded-xl text-lg transition-colors duration-200"
                >
                  <ShoppingBag className="h-5 w-5" />
                  Add to Cart
                </button>
              </div>

              {/* Product Details */}
              <div className="border-t border-gray-200 pt-6 mt-8">
                <h3 className="font-display text-lg font-semibold text-text-primary mb-4">
                  Product Details
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Price per unit:</span>
                    <span>{Number(product.price).toFixed(2)} kr</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total for {quantity} unit{quantity > 1 ? 's' : ''}</span>
                    <span className="font-semibold text-primary">
                      {(Number(product.price) * quantity).toFixed(2)} kr
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 