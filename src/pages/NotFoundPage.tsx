import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  useEffect(() => {
    document.title =
      'Page Not Found | TechSelf - React Electronics E-Commerce Template';
  }, []);

  return (
    <div className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 text-center">
        <h1 className="text-6xl lg:text-8xl font-bold text-gray-800 mb-4">
          404
        </h1>
        <h2 className="text-2xl lg:text-3xl font-semibold text-gray-700 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-500 text-lg mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-6 py-3 text-white font-medium transition hover:bg-violet-600"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
