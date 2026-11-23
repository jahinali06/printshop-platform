'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  itemCount: number;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function OrdersPage() {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // Mock data - will be replaced with real API calls
  const allOrders: Order[] = [
    {
      id: '1',
      orderNumber: 'ORD-2024-001',
      date: '2024-11-15',
      status: 'processing',
      total: 125.50,
      itemCount: 3,
      estimatedDelivery: '2024-11-22',
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-002',
      date: '2024-11-10',
      status: 'shipped',
      total: 89.99,
      itemCount: 1,
      trackingNumber: 'TRK123456789GB',
      estimatedDelivery: '2024-11-18',
    },
    {
      id: '3',
      orderNumber: 'ORD-2024-003',
      date: '2024-11-05',
      status: 'delivered',
      total: 245.00,
      itemCount: 5,
      trackingNumber: 'TRK987654321GB',
    },
    {
      id: '4',
      orderNumber: 'ORD-2024-004',
      date: '2024-10-28',
      status: 'delivered',
      total: 67.50,
      itemCount: 2,
    },
    {
      id: '5',
      orderNumber: 'ORD-2024-005',
      date: '2024-10-15',
      status: 'cancelled',
      total: 150.00,
      itemCount: 4,
    },
  ];

  const filteredOrders = allOrders.filter((order) => {
    if (filter === 'active') {
      return ['pending', 'processing', 'shipped'].includes(order.status);
    }
    if (filter === 'completed') {
      return ['delivered', 'cancelled'].includes(order.status);
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Page Header */}
      <div className="bg-white border-b border-neutral-medium">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-2 text-sm text-neutral-dark mb-2">
            <Link href="/dashboard" className="hover:text-primary">
              Dashboard
            </Link>
            <span>/</span>
            <span>Orders</span>
          </div>
          <h1 className="font-heading text-3xl font-bold text-primary-dark">
            My Orders
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <nav className="bg-white rounded-lg shadow-sm overflow-hidden">
              <Link
                href="/dashboard"
                className="block px-4 py-3 hover:bg-neutral-light transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/orders"
                className="block px-4 py-3 bg-primary text-white font-medium"
              >
                Orders
              </Link>
              <Link
                href="/dashboard/designs"
                className="block px-4 py-3 hover:bg-neutral-light transition-colors"
              >
                Saved Designs
              </Link>
              <Link
                href="/dashboard/profile"
                className="block px-4 py-3 hover:bg-neutral-light transition-colors"
              >
                Profile Settings
              </Link>
              <Link
                href="/dashboard/addresses"
                className="block px-4 py-3 hover:bg-neutral-light transition-colors"
              >
                Addresses
              </Link>
              <Link
                href="/dashboard/payment-methods"
                className="block px-4 py-3 hover:bg-neutral-light transition-colors"
              >
                Payment Methods
              </Link>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {/* Filter Tabs */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex gap-4 border-b border-neutral-medium">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 font-medium transition-colors border-b-2 -mb-px ${
                    filter === 'all'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-neutral-dark hover:text-primary'
                  }`}
                >
                  All Orders ({allOrders.length})
                </button>
                <button
                  onClick={() => setFilter('active')}
                  className={`px-4 py-2 font-medium transition-colors border-b-2 -mb-px ${
                    filter === 'active'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-neutral-dark hover:text-primary'
                  }`}
                >
                  Active (
                  {
                    allOrders.filter((o) =>
                      ['pending', 'processing', 'shipped'].includes(o.status)
                    ).length
                  }
                  )
                </button>
                <button
                  onClick={() => setFilter('completed')}
                  className={`px-4 py-2 font-medium transition-colors border-b-2 -mb-px ${
                    filter === 'completed'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-neutral-dark hover:text-primary'
                  }`}
                >
                  Completed (
                  {
                    allOrders.filter((o) =>
                      ['delivered', 'cancelled'].includes(o.status)
                    ).length
                  }
                  )
                </button>
              </div>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    {/* Order Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="font-heading text-xl font-bold text-primary-dark">
                          {order.orderNumber}
                        </h3>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            statusColors[order.status]
                          }`}
                        >
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </span>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="text-neutral-dark">
                          <span className="font-medium">Order Date:</span>{' '}
                          {new Date(order.date).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </div>
                        <div className="text-neutral-dark">
                          <span className="font-medium">Items:</span> {order.itemCount}
                        </div>
                        {order.trackingNumber && (
                          <div className="text-neutral-dark">
                            <span className="font-medium">Tracking:</span>{' '}
                            <span className="font-mono">{order.trackingNumber}</span>
                          </div>
                        )}
                        {order.estimatedDelivery && (
                          <div className="text-neutral-dark">
                            <span className="font-medium">Estimated Delivery:</span>{' '}
                            {new Date(order.estimatedDelivery).toLocaleDateString(
                              'en-GB',
                              {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              }
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Order Total & Actions */}
                    <div className="flex flex-col items-end gap-4">
                      <div className="text-right">
                        <div className="text-sm text-neutral-dark mb-1">
                          Order Total
                        </div>
                        <div className="font-heading text-2xl font-bold text-primary-dark">
                          £{order.total.toFixed(2)}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 w-full sm:w-auto">
                        <Link
                          href={`/dashboard/orders/${order.id}`}
                          className="inline-flex items-center justify-center px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium text-center"
                        >
                          View Details
                        </Link>
                        {order.trackingNumber && (
                          <button className="inline-flex items-center justify-center px-6 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all font-medium">
                            Track Shipment
                          </button>
                        )}
                        {order.status === 'delivered' && (
                          <button className="inline-flex items-center justify-center px-6 py-2 border border-neutral-medium text-neutral-dark rounded-lg hover:border-primary hover:text-primary transition-all font-medium">
                            Reorder
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredOrders.length === 0 && (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <div className="text-neutral-dark mb-4">
                    No orders found in this category
                  </div>
                  <Link
                    href="/products"
                    className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
                  >
                    Start Shopping
                  </Link>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
