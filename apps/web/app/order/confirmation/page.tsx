'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order') || 'UNKNOWN';

  useEffect(() => {
    // Trigger confetti or celebration animation
    console.log('Order placed successfully!', orderNumber);
  }, [orderNumber]);

  return (
    <main className="flex-1 bg-neutral-light py-12 px-6">
      <div className="container mx-auto max-w-3xl">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="font-heading text-4xl font-bold text-primary-dark mb-2">
            Order Confirmed!
          </h1>
          <p className="text-xl text-gray-600">
            Thank you for your order. We've received it and will process it shortly.
          </p>
        </div>

        {/* Order Details Card */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6 pb-6 border-b">
              <div>
                <p className="text-sm text-gray-600 mb-1">Order Number</p>
                <p className="font-heading text-2xl font-bold text-primary-dark">
                  {orderNumber}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">Order Date</p>
                <p className="font-semibold text-gray-900">
                  {new Date().toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">What happens next?</h3>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary font-bold text-sm">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Order Confirmation Email</p>
                      <p className="text-sm text-gray-600">
                        You'll receive an email confirmation shortly with your order details.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary font-bold text-sm">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Order Processing</p>
                      <p className="text-sm text-gray-600">
                        Our team will prepare your order for printing and production.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary font-bold text-sm">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Production & Quality Check</p>
                      <p className="text-sm text-gray-600">
                        Your items will be printed and undergo quality inspection.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary font-bold text-sm">4</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Dispatch & Delivery</p>
                      <p className="text-sm text-gray-600">
                        Your order will be carefully packaged and dispatched. You'll receive tracking information.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📧</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email Confirmation</h3>
                  <p className="text-sm text-gray-600">
                    Check your inbox for order details and receipt. If you don't see it, check your spam folder.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📦</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Track Your Order</h3>
                  <p className="text-sm text-gray-600">
                    You can track your order status anytime from your account dashboard.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/dashboard/orders">View Order Details</Link>
          </Button>
          <Button asChild size="lg">
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>

        {/* Help Section */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-2">Need help with your order?</p>
          <Link href="/support" className="text-primary hover:text-primary-dark font-medium">
            Contact our support team →
          </Link>
        </div>
      </div>
    </main>
  );
}
