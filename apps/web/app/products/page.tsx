'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { PRODUCT_CATEGORIES } from '@/lib/constants';
import { mockProducts } from '@/lib/mock-data';

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      setProducts(mockProducts);
      setTotalPages(1);
      setTotal(mockProducts.length);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-1">
      {/* Page Header */}
      <section className="bg-light-bg py-12 px-6">
        <div className="container mx-auto max-w-7xl">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            All Products
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Browse our complete range of professional printing services and custom products
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="border-b border-gray-200 bg-white sticky top-16 md:top-20 z-40">
        <div className="container mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center gap-4 overflow-x-auto">
            <button className="px-4 py-2 rounded-lg bg-primary text-white font-medium whitespace-nowrap">
              All Products
            </button>
            {PRODUCT_CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={`/products/${category.slug}`}
                className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 font-medium whitespace-nowrap transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-8">
              <p className="font-medium">Error loading products</p>
              <p className="text-sm">{error}</p>
              <button
                onClick={() => fetchProducts()}
                className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
              >
                Try again
              </button>
            </div>
          )}

          {/* Filters and Sort */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <p className="text-gray-600">
              {isLoading ? (
                'Loading products...'
              ) : (
                <>
                  Showing <span className="font-semibold">{products.length}</span> of{' '}
                  <span className="font-semibold">{total}</span> products
                </>
              )}
            </p>
            <div className="flex items-center gap-4">
              <label htmlFor="sort" className="text-sm text-gray-700 font-medium">
                Sort by:
              </label>
              <select
                id="sort"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={isLoading}
              >
                <option>Popular</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden animate-pulse">
                  <div className="aspect-square bg-gray-200" />
                  <div className="p-4 space-y-3">
                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                    <div className="h-5 bg-gray-200 rounded w-2/3" />
                    <div className="h-3 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-4/5" />
                    <div className="h-6 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Product Grid */}
          {!isLoading && products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
                >
                  {/* Product Image */}
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    {product.images && product.images[0]?.url ? (
                      <img
                        src={product.images[0].url}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-6xl opacity-20">📄</span>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <p className="text-xs text-primary font-medium mb-1">
                      {product.category?.name || 'Product'}
                    </p>
                    <h3 className="font-heading text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {product.description || 'Quality printing and custom products'}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm text-gray-500">From</span>
                      <span className="font-heading text-xl font-bold text-gray-900">
                        £{parseFloat(product.basePrice).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && products.length === 0 && !error && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="font-heading text-2xl font-bold text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600">
                Check back soon for new products
              </p>
            </div>
          )}

          {/* Pagination */}
          {!isLoading && totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <div className="flex items-center gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-lg font-medium ${
                      currentPage === i + 1
                        ? 'bg-primary text-white'
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-primary-dark to-primary py-16 px-6 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Contact our team for custom quotes and bespoke printing solutions
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-dark font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </main>
  );
}
