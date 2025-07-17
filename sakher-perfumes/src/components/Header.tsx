'use client';

import { useCart } from '@/contexts/CartContext';
import { ShoppingBag, X } from 'lucide-react';

export default function Header() {
  const { state, dispatch } = useCart();
  
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="font-display text-2xl font-semibold text-text-primary">
              Sakher Perfumes
            </h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-text-primary hover:text-primary transition-colors">
              Home
            </a>
            <a href="#products" className="text-text-primary hover:text-primary transition-colors">
              Products
            </a>
            <a href="#about" className="text-text-primary hover:text-primary transition-colors">
              About
            </a>
            <a href="#contact" className="text-text-primary hover:text-primary transition-colors">
              Contact
            </a>
          </nav>

          {/* Cart Icon */}
          <button
            onClick={() => dispatch({ type: 'TOGGLE_CART' })}
            className="relative p-2 text-text-primary hover:text-primary transition-colors"
            aria-label="Shopping cart"
          >
            <ShoppingBag className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Cart Drawer */}
      {state.isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => dispatch({ type: 'CLOSE_CART' })}
          />
          
          {/* Cart Panel */}
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="font-display text-lg font-semibold text-text-primary">
                  Shopping Cart
                </h2>
                <button
                  onClick={() => dispatch({ type: 'CLOSE_CART' })}
                  className="p-1 text-gray-400 hover:text-text-primary transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4">
                {state.items.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {state.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                        {item.image_url && (
                          <img
                            src={item.image_url}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                        )}
                        <div className="flex-1">
                          <h3 className="font-medium text-text-primary">{item.name}</h3>
                          <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => dispatch({ 
                              type: 'UPDATE_QUANTITY', 
                              payload: { id: item.id, quantity: item.quantity - 1 } 
                            })}
                            className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-sm hover:bg-gray-300"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => dispatch({ 
                              type: 'UPDATE_QUANTITY', 
                              payload: { id: item.id, quantity: item.quantity + 1 } 
                            })}
                            className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-sm hover:bg-gray-300"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {state.items.length > 0 && (
                <div className="border-t border-gray-200 p-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium text-text-primary">Total:</span>
                    <span className="font-display text-lg font-semibold text-primary">
                      ${totalAmount.toFixed(2)}
                    </span>
                  </div>
                  <a
                    href="/checkout"
                    onClick={() => dispatch({ type: 'CLOSE_CART' })}
                    className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-3 px-4 rounded-lg transition-colors text-center block"
                  >
                    Proceed to Checkout
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 