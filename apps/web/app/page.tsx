import Link from 'next/link';
import { PRODUCT_CATEGORIES } from '@/lib/constants';

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-dark via-primary to-accent py-20 px-6 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Professional Printing & Custom Products
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              From business cards to custom merchandise, we bring your ideas to life with quality printing and fast delivery.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-dark font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Browse Products
              </Link>
              <Link
                href="/design"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                Start Designing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 px-6 bg-light-bg">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl font-bold text-gray-900 mb-4">
              What Would You Like to Print?
            </h2>
            <p className="text-xl text-gray-600">
              Choose from our wide range of professionally printed products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCT_CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={`/products/${category.slug}`}
                className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-200 hover:border-primary"
              >
                <div className="mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <span className="text-2xl">📄</span>
                  </div>
                </div>
                <h3 className="font-heading text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">Fast Turnaround</h3>
              <p className="text-gray-600">
                Quick production times and reliable delivery to meet your deadlines
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                Professional-grade materials and printing for exceptional results
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎨</span>
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">Easy Design Tools</h3>
              <p className="text-gray-600">
                Use our online designer or upload your own artwork hassle-free
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-primary-dark text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Create an account to access exclusive business pricing and faster checkout
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors"
            >
              Create Account
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
