'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/Header';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

export default function CheckoutPage() {
  const { state, dispatch } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalAmount = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.customer_name.trim()) {
      newErrors.customer_name = 'Name is required';
    }

    if (!formData.customer_email.trim()) {
      newErrors.customer_email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.customer_email)) {
      newErrors.customer_email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (state.items.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_name: formData.customer_name,
          customer_email: formData.customer_email,
          cart: state.items,
        }),
      });

      if (response.ok) {
        // Clear cart and redirect to thank you page
        dispatch({ type: 'CLEAR_CART' });
        router.push('/thank-you');
      } else {
        const error = await response.json();
        alert(`Order submission failed: ${error.message}`);
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Failed to submit order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h1 className="font-display text-2xl font-semibold text-text-primary mb-4">
            Your cart is empty
          </h1>
          <p className="text-gray-600 mb-8">
            Add some products to your cart before proceeding to checkout.
          </p>
          <a
            href="/"
            className="inline-flex items-center space-x-2 bg-primary hover:bg-primary-hover text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Continue Shopping</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <a
              href="/"
              className="inline-flex items-center space-x-2 text-primary hover:text-primary-hover mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Shopping</span>
            </a>
            <h1 className="font-display text-3xl font-semibold text-text-primary">
              Checkout
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="lg:order-2">
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="font-display text-xl font-semibold text-text-primary mb-4">
                  Order Summary
                </h2>
                
                <div className="space-y-4 mb-6">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      {item.image_url && (
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="font-medium text-text-primary">{item.name}</h3>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-medium text-text-primary">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-display text-lg font-semibold text-text-primary">
                      Total
                    </span>
                    <span className="font-display text-2xl font-semibold text-primary">
                      ${totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkout Form */}
            <div className="lg:order-1">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="customer_name" className="block text-sm font-medium text-text-primary mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="customer_name"
                    name="customer_name"
                    value={formData.customer_name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.customer_name ? 'border-error' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.customer_name && (
                    <p className="mt-1 text-sm text-error">{errors.customer_name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="customer_email" className="block text-sm font-medium text-text-primary mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="customer_email"
                    name="customer_email"
                    value={formData.customer_email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.customer_email ? 'border-error' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email address"
                  />
                  {errors.customer_email && (
                    <p className="mt-1 text-sm text-error">{errors.customer_email}</p>
                  )}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-medium text-blue-900 mb-2">Important Note</h3>
                  <p className="text-sm text-blue-800">
                    This is a demo checkout. No payment will be processed. 
                    You will receive a confirmation email after placing your order.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary-hover disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 