'use client';

import React from 'react';
import Link from 'next/link';

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  itemCount: number;
}

interface UserStats {
  totalOrders: number;
  activeOrders: number;
  totalSpent: number;
  savedDesigns: number;
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function DashboardPage() {
  // Mock data - will be replaced with real API calls
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    joinedDate: '2024-01-15',
  };

  const stats: UserStats = {
    totalOrders: 12,
    activeOrders: 2,
    totalSpent: 1245.80,
    savedDesigns: 5,
  };

  const recentOrders: Order[] = [
    {
      id: '1',
      orderNumber: 'ORD-2024-001',
      date: '2024-11-15',
      status: 'processing',
      total: 125.50,
      itemCount: 3,
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-002',
      date: '2024-11-10',
      status: 'delivered',
      total: 89.99,
      itemCount: 1,
    },
    {
      id: '3',
      orderNumber: 'ORD-2024-003',
      date: '2024-11-05',
      status: 'delivered',
      total: 245.00,
      itemCount: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Page Header */}
      <div className="bg-white border-b border-neutral-medium">
        <div className="container mx-auto px-4 py-6">
          <h1 className="font-heading text-3xl font-bold text-primary-dark">
            My Account
          </h1>
          <p className="text-neutral-dark mt-1">
            Welcome back, {user.firstName}!
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <nav className="bg-white rounded-lg shadow-sm overflow-hidden">
              <Link
                href="/dashboard"
                className="block px-4 py-3 bg-primary text-white font-medium"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/orders"
                className="block px-4 py-3 hover:bg-neutral-light transition-colors"
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
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="text-sm text-neutral-dark mb-1">Total Orders</div>
                <div className="font-heading text-3xl font-bold text-primary">
                  {stats.totalOrders}
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="text-sm text-neutral-dark mb-1">Active Orders</div>
                <div className="font-heading text-3xl font-bold text-accent">
                  {stats.activeOrders}
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="text-sm text-neutral-dark mb-1">Total Spent</div>
                <div className="font-heading text-3xl font-bold text-primary-dark">
                  £{stats.totalSpent.toFixed(2)}
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="text-sm text-neutral-dark mb-1">Saved Designs</div>
                <div className="font-heading text-3xl font-bold text-secondary">
                  {stats.savedDesigns}
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-2xl font-bold text-primary-dark">
                  Recent Orders
                </h2>
                <Link
                  href="/dashboard/orders"
                  className="text-primary hover:text-primary-dark font-medium transition-colors"
                >
                  View All →
                </Link>
              </div>

              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-neutral-medium rounded-lg p-4 hover:border-primary transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-primary-dark">
                            {order.orderNumber}
                          </h3>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              statusColors[order.status]
                            }`}
                          >
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                        <div className="text-sm text-neutral-dark">
                          {new Date(order.date).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                          {' • '}
                          {order.itemCount} {order.itemCount === 1 ? 'item' : 'items'}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-semibold text-primary-dark">
                            £{order.total.toFixed(2)}
                          </div>
                        </div>
                        <Link
                          href={`/dashboard/orders/${order.id}`}
                          className="inline-flex items-center justify-center px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all font-medium"
                        >
                          View Order
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {recentOrders.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-neutral-dark mb-4">
                    You haven't placed any orders yet
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

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-heading text-2xl font-bold text-primary-dark mb-6">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/products"
                  className="flex items-center gap-4 p-4 border border-neutral-medium rounded-lg hover:border-primary hover:bg-neutral-light transition-all group"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <svg
                      className="w-6 h-6 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-primary-dark">Browse Products</div>
                    <div className="text-sm text-neutral-dark">
                      Explore our catalog
                    </div>
                  </div>
                </Link>

                <Link
                  href="/design"
                  className="flex items-center gap-4 p-4 border border-neutral-medium rounded-lg hover:border-primary hover:bg-neutral-light transition-all group"
                >
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <svg
                      className="w-6 h-6 text-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-primary-dark">Create Design</div>
                    <div className="text-sm text-neutral-dark">
                      Use our design tool
                    </div>
                  </div>
                </Link>

                <Link
                  href="/dashboard/orders"
                  className="flex items-center gap-4 p-4 border border-neutral-medium rounded-lg hover:border-primary hover:bg-neutral-light transition-all group"
                >
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                    <svg
                      className="w-6 h-6 text-secondary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-primary-dark">Track Order</div>
                    <div className="text-sm text-neutral-dark">
                      Check order status
                    </div>
                  </div>
                </Link>

                <Link
                  href="/dashboard/profile"
                  className="flex items-center gap-4 p-4 border border-neutral-medium rounded-lg hover:border-primary hover:bg-neutral-light transition-all group"
                >
                  <div className="w-12 h-12 bg-primary-dark/10 rounded-lg flex items-center justify-center group-hover:bg-primary-dark/20 transition-colors">
                    <svg
                      className="w-6 h-6 text-primary-dark"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-primary-dark">Edit Profile</div>
                    <div className="text-sm text-neutral-dark">
                      Update your details
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
