'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/cart-context';

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  const vatRate = 0.2;
  const vat = subtotal * vatRate;
  const shipping = 0; // Free shipping
  const total = subtotal + vat + shipping;

  const isEmpty = items.length === 0;

  return (
    <main className="flex-1 py-12 px-6">
      <div className="container mx-auto max-w-7xl">
        <h1 className="font-heading text-4xl font-bold text-gray-900 mb-8">
          Shopping Cart
        </h1>

        {isEmpty ? (
          // Empty Cart
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
              <span className="text-6xl opacity-50">🛒</span>
            </div>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Add some products to get started
            </p>
            <Button asChild size="lg">
              <Link href="/products">
                Browse Products
              </Link>
            </Button>
          </div>
        ) : (
          // Cart with Items
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          <span className="text-3xl opacity-20">📄</span>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-heading text-lg font-semibold text-gray-900">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-error transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>

                        {/* Configuration */}
                        <div className="text-sm text-gray-600 mb-4 space-y-1">
                          {Object.entries(item.options).map(([key, value]) => (
                            <div key={key}>
                              <span className="font-medium capitalize">{key}:</span> {value}
                            </div>
                          ))}
                        </div>

                        {/* Price and Quantity */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                            >
                              −
                            </button>
                            <span className="font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                            >
                              +
                            </button>
                          </div>
                          <div className="text-right">
                            <div className="font-heading text-xl font-bold text-gray-900">
                              £{(item.price * item.quantity).toFixed(2)}
                            </div>
                            <div className="text-sm text-gray-500">
                              £{item.price.toFixed(2)} each
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Continue Shopping */}
              <div className="pt-4">
                <Link
                  href="/products"
                  className="text-primary hover:text-primary/80 font-medium inline-flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-heading text-xl font-bold mb-6">Order Summary</h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-700">
                      <span>Subtotal</span>
                      <span>£{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>VAT (20%)</span>
                      <span>£{vat.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Shipping</span>
                      <span className="text-success font-medium">FREE</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3 mt-3">
                      <div className="flex justify-between font-heading text-xl font-bold">
                        <span>Total</span>
                        <span>£{total.toFixed(2)}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Inc. VAT
                      </p>
                    </div>
                  </div>

                  {/* Discount Code */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Discount Code
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter code"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <Button variant="outline">Apply</Button>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Button asChild className="w-full mb-3" size="lg">
                    <Link href="/checkout">
                      Proceed to Checkout
                    </Link>
                  </Button>

                  <Button asChild variant="outline" className="w-full">
                    <Link href="/quote">
                      Request a Quote
                    </Link>
                  </Button>

                  {/* Trust Badges */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-success mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Secure checkout
                      </div>
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-success mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Free delivery on orders over £50
                      </div>
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-success mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        30-day money-back guarantee
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Need Help */}
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold mb-2">Need Help?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Our team is here to assist you with your order
                  </p>
                  <Link
                    href="/support"
                    className="text-sm text-primary hover:text-primary/80 font-medium"
                  >
                    Contact Support →
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
