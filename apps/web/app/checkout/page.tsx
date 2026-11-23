'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/cart-context';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

type CheckoutStep = 'shipping' | 'delivery' | 'payment' | 'review';

interface ShippingDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  county: string;
  postcode: string;
  country: string;
  saveAddress: boolean;
}

interface DeliveryOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);

  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    county: '',
    postcode: '',
    country: 'United Kingdom',
    saveAddress: false,
  });

  const deliveryOptions: DeliveryOption[] = [
    {
      id: 'standard',
      name: 'Standard Delivery',
      description: '5-7 working days',
      price: 0,
      estimatedDays: '5-7',
    },
    {
      id: 'express',
      name: 'Express Delivery',
      description: '2-3 working days',
      price: 9.99,
      estimatedDays: '2-3',
    },
    {
      id: 'next-day',
      name: 'Next Day Delivery',
      description: 'Order before 2pm',
      price: 19.99,
      estimatedDays: '1',
    },
  ];

  const [selectedDelivery, setSelectedDelivery] = useState<string>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');

  const vatRate = 0.2;
  const deliveryPrice = deliveryOptions.find((d) => d.id === selectedDelivery)?.price || 0;
  const vat = (subtotal + deliveryPrice) * vatRate;
  const total = subtotal + deliveryPrice + vat;

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <main className="flex-1 py-12 px-6">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="font-heading text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Add some products before checking out</p>
          <Button asChild>
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      </main>
    );
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('delivery');
  };

  const handleDeliverySubmit = () => {
    setCurrentStep('payment');
  };

  const handlePaymentSubmit = () => {
    setCurrentStep('review');
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    // TODO: Implement actual order creation API call
    setTimeout(() => {
      clearCart();
      router.push('/order/confirmation?order=ORD-2024-001');
    }, 2000);
  };

  const steps = [
    { id: 'shipping', name: 'Shipping', icon: '📦' },
    { id: 'delivery', name: 'Delivery', icon: '🚚' },
    { id: 'payment', name: 'Payment', icon: '💳' },
    { id: 'review', name: 'Review', icon: '✓' },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <main className="flex-1 bg-neutral-light py-8 px-6">
      <div className="container mx-auto max-w-6xl">
        <h1 className="font-heading text-3xl font-bold text-primary-dark mb-8">Checkout</h1>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-2 ${
                      index <= currentStepIndex
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step.icon}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      index <= currentStepIndex ? 'text-primary' : 'text-gray-500'
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 ${
                      index < currentStepIndex ? 'bg-primary' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Shipping Information */}
            {currentStep === 'shipping' && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-heading text-2xl font-bold mb-6">Shipping Information</h2>
                  <form onSubmit={handleShippingSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="First Name"
                        value={shippingDetails.firstName}
                        onChange={(e) =>
                          setShippingDetails({ ...shippingDetails, firstName: e.target.value })
                        }
                        required
                      />
                      <Input
                        label="Last Name"
                        value={shippingDetails.lastName}
                        onChange={(e) =>
                          setShippingDetails({ ...shippingDetails, lastName: e.target.value })
                        }
                        required
                      />
                    </div>

                    <Input
                      label="Email Address"
                      type="email"
                      value={shippingDetails.email}
                      onChange={(e) =>
                        setShippingDetails({ ...shippingDetails, email: e.target.value })
                      }
                      required
                    />

                    <Input
                      label="Phone Number"
                      type="tel"
                      value={shippingDetails.phone}
                      onChange={(e) =>
                        setShippingDetails({ ...shippingDetails, phone: e.target.value })
                      }
                      required
                    />

                    <Input
                      label="Address Line 1"
                      value={shippingDetails.addressLine1}
                      onChange={(e) =>
                        setShippingDetails({ ...shippingDetails, addressLine1: e.target.value })
                      }
                      required
                    />

                    <Input
                      label="Address Line 2 (Optional)"
                      value={shippingDetails.addressLine2}
                      onChange={(e) =>
                        setShippingDetails({ ...shippingDetails, addressLine2: e.target.value })
                      }
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="City"
                        value={shippingDetails.city}
                        onChange={(e) =>
                          setShippingDetails({ ...shippingDetails, city: e.target.value })
                        }
                        required
                      />
                      <Input
                        label="County"
                        value={shippingDetails.county}
                        onChange={(e) =>
                          setShippingDetails({ ...shippingDetails, county: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Postcode"
                        value={shippingDetails.postcode}
                        onChange={(e) =>
                          setShippingDetails({ ...shippingDetails, postcode: e.target.value })
                        }
                        required
                      />
                      <Input
                        label="Country"
                        value={shippingDetails.country}
                        onChange={(e) =>
                          setShippingDetails({ ...shippingDetails, country: e.target.value })
                        }
                        required
                      />
                    </div>

                    {isAuthenticated && (
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={shippingDetails.saveAddress}
                          onChange={(e) =>
                            setShippingDetails({
                              ...shippingDetails,
                              saveAddress: e.target.checked,
                            })
                          }
                          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary mr-2"
                        />
                        <span className="text-sm text-gray-700">Save this address for future orders</span>
                      </label>
                    )}

                    <div className="flex gap-4 pt-4">
                      <Button type="button" variant="outline" asChild className="flex-1">
                        <Link href="/cart">Back to Cart</Link>
                      </Button>
                      <Button type="submit" className="flex-1">
                        Continue to Delivery
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Delivery Options */}
            {currentStep === 'delivery' && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-heading text-2xl font-bold mb-6">Delivery Options</h2>
                  <div className="space-y-4">
                    {deliveryOptions.map((option) => (
                      <label
                        key={option.id}
                        className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedDelivery === option.id
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <input
                            type="radio"
                            name="delivery"
                            value={option.id}
                            checked={selectedDelivery === option.id}
                            onChange={(e) => setSelectedDelivery(e.target.value)}
                            className="w-4 h-4 text-primary"
                          />
                          <div>
                            <div className="font-semibold text-gray-900">{option.name}</div>
                            <div className="text-sm text-gray-600">{option.description}</div>
                          </div>
                        </div>
                        <div className="font-bold text-gray-900">
                          {option.price === 0 ? 'FREE' : `£${option.price.toFixed(2)}`}
                        </div>
                      </label>
                    ))}
                  </div>

                  <div className="flex gap-4 pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep('shipping')}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button onClick={handleDeliverySubmit} className="flex-1">
                      Continue to Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Payment Method */}
            {currentStep === 'payment' && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-heading text-2xl font-bold mb-6">Payment Method</h2>
                  <div className="space-y-4 mb-6">
                    <label
                      className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        paymentMethod === 'card'
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value as 'card')}
                        className="w-4 h-4 text-primary mr-4"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">Credit / Debit Card</div>
                        <div className="text-sm text-gray-600">Pay securely with Stripe</div>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-2xl">💳</span>
                      </div>
                    </label>

                    <label
                      className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        paymentMethod === 'paypal'
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="paypal"
                        checked={paymentMethod === 'paypal'}
                        onChange={(e) => setPaymentMethod(e.target.value as 'paypal')}
                        className="w-4 h-4 text-primary mr-4"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">PayPal</div>
                        <div className="text-sm text-gray-600">Pay with your PayPal account</div>
                      </div>
                      <span className="text-2xl">🅿️</span>
                    </label>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-blue-800">
                      <strong>🔒 Secure Payment:</strong> Your payment information is encrypted and secure. We never store your card details.
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep('delivery')}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button onClick={handlePaymentSubmit} className="flex-1">
                      Review Order
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Review Order */}
            {currentStep === 'review' && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-heading text-2xl font-bold mb-6">Review Your Order</h2>

                  {/* Shipping Details Summary */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Shipping Address</h3>
                    <div className="text-sm text-gray-700 space-y-1">
                      <p>
                        {shippingDetails.firstName} {shippingDetails.lastName}
                      </p>
                      <p>{shippingDetails.addressLine1}</p>
                      {shippingDetails.addressLine2 && <p>{shippingDetails.addressLine2}</p>}
                      <p>
                        {shippingDetails.city}, {shippingDetails.county} {shippingDetails.postcode}
                      </p>
                      <p>{shippingDetails.country}</p>
                      <p>{shippingDetails.email}</p>
                      <p>{shippingDetails.phone}</p>
                    </div>
                    <button
                      onClick={() => setCurrentStep('shipping')}
                      className="text-sm text-primary hover:underline mt-2"
                    >
                      Edit
                    </button>
                  </div>

                  {/* Delivery Summary */}
                  <div className="mb-6 pb-6 border-b">
                    <h3 className="font-semibold text-gray-900 mb-3">Delivery Method</h3>
                    <p className="text-sm text-gray-700">
                      {deliveryOptions.find((d) => d.id === selectedDelivery)?.name} -{' '}
                      {deliveryOptions.find((d) => d.id === selectedDelivery)?.description}
                    </p>
                    <button
                      onClick={() => setCurrentStep('delivery')}
                      className="text-sm text-primary hover:underline mt-2"
                    >
                      Edit
                    </button>
                  </div>

                  {/* Items Summary */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Order Items ({items.length})</h3>
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-4">
                          <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0">
                            {item.image ? (
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-2xl">📄</div>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-semibold text-gray-900">
                            £{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep('payment')}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      className="flex-1"
                    >
                      {isProcessing ? 'Processing...' : 'Place Order'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-heading text-xl font-bold mb-4">Order Summary</h3>

                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal ({items.length} items)</span>
                    <span>£{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Delivery</span>
                    <span>{deliveryPrice === 0 ? 'FREE' : `£${deliveryPrice.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>VAT (20%)</span>
                    <span>£{vat.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-heading text-lg font-bold">
                      <span>Total</span>
                      <span>£{total.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Inc. VAT</p>
                  </div>
                </div>

                {/* Items List */}
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-sm mb-3">Items in your order</h4>
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div key={item.id} className="text-sm text-gray-700">
                        <div className="flex justify-between">
                          <span>{item.name}</span>
                          <span>x{item.quantity}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
