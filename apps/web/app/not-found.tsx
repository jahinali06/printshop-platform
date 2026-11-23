import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <main className="flex-1 flex items-center justify-center py-12 px-6">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-primary/10 rounded-full mb-6">
            <span className="text-6xl">🔍</span>
          </div>
          <h1 className="font-heading text-6xl font-bold text-gray-900 mb-4">
            404
          </h1>
          <h2 className="font-heading text-3xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/">
              Go to Homepage
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/products">
              Browse Products
            </Link>
          </Button>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="font-heading text-lg font-semibold mb-4">
            Popular Pages
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <Link href="/products/business-printing" className="text-primary hover:text-primary/80">
              Business Printing
            </Link>
            <Link href="/products/clothing-workwear" className="text-primary hover:text-primary/80">
              Clothing & Workwear
            </Link>
            <Link href="/products/promotional-products" className="text-primary hover:text-primary/80">
              Promotional Items
            </Link>
            <Link href="/support" className="text-primary hover:text-primary/80">
              Help & Support
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
