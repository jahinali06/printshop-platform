'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );

  // Mock user data - will be replaced with real API calls
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+44 7700 900000',
    company: 'Example Ltd',
    vatNumber: 'GB123456789',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    // TODO: Implement actual API call
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setTimeout(() => setMessage(null), 3000);
    }, 1000);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    // Basic validation
    if (passwordData.newPassword.length < 8) {
      setMessage({
        type: 'error',
        text: 'Password must be at least 8 characters long',
      });
      setIsSaving(false);
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      setIsSaving(false);
      return;
    }

    // TODO: Implement actual API call
    setTimeout(() => {
      setIsSaving(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setMessage({ type: 'success', text: 'Password changed successfully!' });
      setTimeout(() => setMessage(null), 3000);
    }, 1000);
  };

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
            <span>Profile Settings</span>
          </div>
          <h1 className="font-heading text-3xl font-bold text-primary-dark">
            Profile Settings
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
                className="block px-4 py-3 bg-primary text-white font-medium"
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
          <main className="lg:col-span-3 space-y-6">
            {/* Success/Error Message */}
            {message && (
              <div
                className={`p-4 rounded-lg ${
                  message.type === 'success'
                    ? 'bg-green-100 text-green-800 border border-green-200'
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}
              >
                {message.text}
              </div>
            )}

            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-2xl font-bold text-primary-dark">
                  Personal Information
                </h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-all font-medium"
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveProfile}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-neutral-dark mb-2"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-neutral-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-neutral-light disabled:cursor-not-allowed"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-neutral-dark mb-2"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-neutral-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-neutral-light disabled:cursor-not-allowed"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-neutral-dark mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-neutral-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-neutral-light disabled:cursor-not-allowed"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-neutral-dark mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-neutral-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-neutral-light disabled:cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-neutral-dark mb-2"
                    >
                      Company Name (Optional)
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-neutral-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-neutral-light disabled:cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="vatNumber"
                      className="block text-sm font-medium text-neutral-dark mb-2"
                    >
                      VAT Number (Optional)
                    </label>
                    <input
                      type="text"
                      id="vatNumber"
                      name="vatNumber"
                      value={formData.vatNumber}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-neutral-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-neutral-light disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex gap-4 mt-6">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      disabled={isSaving}
                      className="px-6 py-2 border border-neutral-medium text-neutral-dark rounded-lg hover:border-primary hover:text-primary transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </form>
            </div>

            {/* Change Password */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-heading text-2xl font-bold text-primary-dark mb-6">
                Change Password
              </h2>

              <form onSubmit={handleChangePassword}>
                <div className="space-y-6 max-w-md">
                  <div>
                    <label
                      htmlFor="currentPassword"
                      className="block text-sm font-medium text-neutral-dark mb-2"
                    >
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-2 border border-neutral-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="newPassword"
                      className="block text-sm font-medium text-neutral-dark mb-2"
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-2 border border-neutral-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                    <p className="text-sm text-neutral-dark mt-1">
                      Must be at least 8 characters long
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-neutral-dark mb-2"
                    >
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-2 border border-neutral-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? 'Updating...' : 'Update Password'}
                  </button>
                </div>
              </form>
            </div>

            {/* Account Settings */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-heading text-2xl font-bold text-primary-dark mb-6">
                Account Settings
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-neutral-medium rounded-lg">
                  <div>
                    <div className="font-medium text-primary-dark">
                      Email Notifications
                    </div>
                    <div className="text-sm text-neutral-dark">
                      Receive updates about your orders and promotions
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-neutral-medium peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-medium after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-neutral-medium rounded-lg">
                  <div>
                    <div className="font-medium text-primary-dark">
                      Marketing Emails
                    </div>
                    <div className="text-sm text-neutral-dark">
                      Receive promotional offers and discounts
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-neutral-medium peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-medium after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-medium">
                <h3 className="font-medium text-red-600 mb-2">Danger Zone</h3>
                <p className="text-sm text-neutral-dark mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
                  Delete Account
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
