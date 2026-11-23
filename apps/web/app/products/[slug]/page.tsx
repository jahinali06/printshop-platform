'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockProducts } from '@/lib/mock-data';
import { useCart } from '@/contexts/cart-context';

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const { addItem } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [params.slug]);

  const fetchProduct = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const data = mockProducts.find(p => p.slug === params.slug);

      if (!data) {
        throw new Error('Product not found');
      }

      setProduct(data);

      // Initialize selected options with first value of each option
      const initialOptions: { [key: string]: string } = {};
      data.options?.forEach((option: any) => {
        if (option.values && option.values.length > 0) {
          initialOptions[option.name] = option.values[0].value;
        }
      });
      setSelectedOptions(initialOptions);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Product not found');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    setAddingToCart(true);

    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      sku: product.sku,
      quantity: 1,
      price: parseFloat(product.basePrice),
      image: product.images?.[0]?.url,
      options: selectedOptions,
    });

    setTimeout(() => {
      setAddingToCart(false);
      // Show brief success feedback
      alert('Added to cart!'); // TODO: Replace with toast notification
    }, 300);
  };

  if (isLoading) {
    return (
      <main className="flex-1 py-12 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <div className="aspect-square bg-gray-200 rounded-xl mb-4" />
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-square bg-gray-200 rounded-lg" />
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/4" />
                <div className="h-10 bg-gray-200 rounded w-3/4" />
                <div className="h-20 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="flex-1 py-12 px-6">
        <div className="container mx-auto max-w-7xl text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="font-heading text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">{error || 'The product you\'re looking for doesn\'t exist.'}</p>
          <Button asChild>
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1">
      {/* Breadcrumb */}
      <section className="bg-light-bg py-4 px-6">
        <div className="container mx-auto max-w-7xl">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-primary">Products</Link>
            <span>/</span>
            <Link href={`/products/${product.category.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-primary">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Product Detail */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mb-4 overflow-hidden">
                {product.images && product.images[0]?.url ? (
                  <img
                    src={product.images[0].url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-9xl opacity-20">📄</span>
                )}
              </div>
              <div className="grid grid-cols-3 gap-4">
                {product.images && product.images.length > 1 ? (
                  product.images.slice(1, 4).map((image: any, i: number) => (
                    <div
                      key={image.id || i}
                      className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center cursor-pointer hover:opacity-75 transition-opacity overflow-hidden"
                    >
                      <img
                        src={image.url}
                        alt={`${product.name} ${i + 2}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))
                ) : (
                  [1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center"
                    >
                      <span className="text-3xl opacity-20">📄</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <Badge variant="info" className="mb-3">{product.category?.name || 'Product'}</Badge>
              <h1 className="font-heading text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                {product.description || 'Quality printing and custom products'}
              </p>

              {/* Price */}
              <div className="bg-light-bg rounded-xl p-6 mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-sm text-gray-600">From</span>
                  <span className="font-heading text-4xl font-bold text-gray-900">
                    £{parseFloat(product.basePrice).toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-600">ex. VAT</span>
                </div>
                <p className="text-sm text-gray-600">
                  SKU: <span className="font-medium text-gray-900">{product.sku}</span>
                </p>
              </div>

              {/* Configuration Options */}
              {product.options && product.options.length > 0 && (
                <div className="space-y-6 mb-8">
                  {product.options.map((option: any) => (
                    <div key={option.id}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {option.name}
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {option.values?.map((valueObj: any) => (
                          <button
                            key={valueObj.id}
                            onClick={() =>
                              setSelectedOptions((prev) => ({
                                ...prev,
                                [option.name]: valueObj.value,
                              }))
                            }
                            className={`px-4 py-3 border-2 rounded-lg transition-all text-sm font-medium ${
                              selectedOptions[option.name] === valueObj.value
                                ? 'border-primary bg-primary/10 text-primary'
                                : 'border-gray-300 hover:border-primary hover:bg-primary/5'
                            }`}
                          >
                            {valueObj.value}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={addingToCart}
                >
                  {addingToCart ? 'Adding...' : 'Add to Cart'}
                </Button>
                <Button variant="outline" size="lg" className="flex-1">
                  Get a Quote
                </Button>
              </div>

              {/* Product Info */}
              {product.requiresArtwork && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-blue-800">
                    <strong>📄 Artwork Required:</strong> This product requires you to upload print-ready artwork during checkout.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Product Description */}
          {product.longDescription && (
            <div className="mt-16 max-w-4xl">
              <h2 className="font-heading text-2xl font-bold mb-4">Product Details</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed">{product.longDescription}</p>
              </div>
            </div>
          )}

          {/* Related Products */}
          <div className="mt-16">
            <h2 className="font-heading text-2xl font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Link
                  key={i}
                  href="#"
                  className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <span className="text-5xl opacity-20">📄</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                      Related Product {i}
                    </h3>
                    <p className="font-heading text-lg font-bold text-gray-900">
                      £12.99
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
