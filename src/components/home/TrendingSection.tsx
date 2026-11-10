import { Link } from 'react-router-dom';
import { trendingProducts } from '../../data/storeData';
import ProductCard from '../ProductCard';

export default function TrendingSection() {
  return (
    <section className="py-10 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex flex-col sm:flex-row gap-5 sm:items-end justify-between mb-16">
          <div className="text-left lg:max-w-lg">
            <h2 className="mb-2 text-5xl font-medium text-gray-800 -tracking-[1.92px]">
              Trending Now
            </h2>
            <p className="text-base text-gray-500">
              Our most-loved gadgets, trusted by thousands of customers.
            </p>
          </div>
          <div className="flex sm:justify-end">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-4 py-2.5 text-white font-medium transition hover:bg-violet-600"
            >
              Explore All
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-11 gap-x-6">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
