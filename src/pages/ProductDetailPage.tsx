import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import {
  products,
  productSliderImages,
  productColors,
  productSizes,
  productSpecifications,
  productReviews,
} from '../data/storeData';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import type { Product } from '../utils/ecommerce';

function BreadcrumbChevron() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M5.83333 12.6667L10 8.50008L5.83333 4.33341"
        stroke="#6B7280"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RatingStar({ half = false }: { half?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {half ? (
        <>
          <path
            d="M10 14.7176L4.12215 17.9337L5.36244 11.4552L0.552988 6.94132L7.09886 6.1118L10 0.166687"
            fill="#FBBF24"
          />
          <path
            d="M10 14.7176L15.8779 17.9337L14.6376 11.4552L19.447 6.94132L12.9011 6.1118L10 0.166687"
            fill="#E5E7EB"
          />
        </>
      ) : (
        <path
          d="M10 14.7176L15.8779 17.9337L14.6376 11.4552L19.447 6.94132L12.9011 6.1118L10 0.166687L7.09886 6.1118L0.552988 6.94132L5.36244 11.4552L4.12215 17.9337L10 14.7176Z"
          fill="#FBBF24"
        />
      )}
    </svg>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState('128 GB');
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<
    'specification' | 'information' | 'review'
  >('specification');

  useEffect(() => {
    document.title =
      'Product Details | TechSelf - React Electronics E-Commerce Template';
  }, []);

  useEffect(() => {
    const found = products.find((p) => p.id === parseInt(id || '1', 10));
    if (found) {
      setProduct(found);
      setSelectedColorIdx(0);
      setSelectedSize('128 GB');
      setQuantity(1);
      setThumbsSwiper(null);
    }
  }, [id]);

  if (!product) {
    return <div className="py-20 text-center">Loading...</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, {
      color: productColors[selectedColorIdx].name,
      size: selectedSize,
    });
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
  };

  const inWishlist = isInWishlist(product.id);

  return (
    <section className="lg:pt-20 pt-14 pb-20">
      <div className="max-w-7xl px-4 lg:px-6 mx-auto">
        <nav className="flex mb-7" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 text-sm">
            <li className="inline-flex items-center">
              <Link
                to="/"
                className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-900"
              >
                Home
              </Link>
            </li>
            <li>
              <BreadcrumbChevron />
            </li>
            <li>
              <Link to="/shop" className="text-gray-500 hover:text-gray-900">
                Shop
              </Link>
            </li>
            <li>
              <BreadcrumbChevron />
            </li>
            <li className="inline-flex items-center">
              <span className="inline-flex items-center gap-1 font-medium text-gray-900">
                {product.name}
              </span>
            </li>
          </ol>
        </nav>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-1/2">
            <div className="bg-gray-50 rounded-3xl overflow-hidden mb-4">
              <Swiper
                modules={[Thumbs]}
                thumbs={{
                  swiper:
                    thumbsSwiper && !thumbsSwiper.destroyed
                      ? thumbsSwiper
                      : null,
                }}
                className="productMainSwiper"
              >
                <SwiperSlide>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto"
                  />
                </SwiperSlide>
                {productSliderImages.large.slice(1).map((imgSrc, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      src={imgSrc}
                      alt={`Product Image ${idx + 2}`}
                      className="w-full h-auto"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <Swiper
              modules={[Thumbs]}
              onSwiper={setThumbsSwiper}
              slidesPerView={4}
              spaceBetween={16}
              watchSlidesProgress
              className="productThumbSwiper"
            >
              <SwiperSlide className="cursor-pointer">
                <div className="bg-gray-50 rounded-xl overflow-hidden transition-all duration-300">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto"
                  />
                </div>
              </SwiperSlide>
              {productSliderImages.thumbnails.slice(1).map((thumbSrc, idx) => (
                <SwiperSlide key={idx} className="cursor-pointer">
                  <div className="bg-gray-50 rounded-xl overflow-hidden transition-all duration-300">
                    <img
                      src={thumbSrc}
                      alt={`Thumbnail ${idx + 2}`}
                      className="w-full h-auto"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="space-y-10">
              <div>
                <h3 className="mb-2.5 font-semibold text-gray-800 text-3xl sm:text-4xl sm:leading-10">
                  {product.name}
                </h3>
                <div className="flex">
                  <div className="flex items-center">
                    <RatingStar />
                    <RatingStar />
                    <RatingStar />
                    <RatingStar />
                    <RatingStar half />
                  </div>
                  <p className="ml-2">
                    4.5 ({product.reviewCount || 124} reviews)
                  </p>
                </div>

                <div className="flex gap-3 my-5 items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-800">
                      {product.priceStr}
                    </span>
                    {product.originalPriceStr && (
                      <span className="line-through -tracking-wide text-base text-gray-500 font-normal">
                        {product.originalPriceStr}
                      </span>
                    )}
                  </div>
                  {product.badge && (
                    <span
                      className={`px-2 py-0.5 text-xs inline-block leading-4 font-medium rounded-full ${
                        product.badgeColor === 'violet'
                          ? 'text-violet-700 bg-violet-50'
                          : 'text-green-700 bg-green-50'
                      }`}
                    >
                      {product.badge}
                    </span>
                  )}
                </div>

                <p className="text-gray-500 text-base leading-6">
                  {product.description ||
                    '6.1" OLED Display · A17 Pro Chip · 48MP Pro Camera · 256GB Storage · Titanium Design · 5G Ready'}
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-800 text-base mb-4">
                    Color:
                  </h4>
                  <div className="flex items-center gap-2">
                    {productColors.map((col, idx) => (
                      <button
                        key={col.name}
                        type="button"
                        aria-label={`Select color ${col.name}`}
                        onClick={() => setSelectedColorIdx(idx)}
                        style={{ backgroundColor: col.bg }}
                        className={`relative w-7 h-7 ring-2 ring-offset-2 ring-offset-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 ${
                          selectedColorIdx === idx
                            ? col.ring
                            : 'ring-transparent'
                        }`}
                      >
                        {selectedColorIdx === idx && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M10.0517 3.26953L4.59172 8.72953L1.94922 6.08706"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 text-base mb-4">
                    Size:
                  </h4>
                  <div className="flex gap-2">
                    {productSizes.map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setSelectedSize(sz)}
                        className={`px-3.5 py-2 h-9 text-sm leading-5 inline-flex items-center justify-center font-medium border rounded-lg cursor-pointer transition ${
                          selectedSize === sz
                            ? 'bg-violet-50 text-violet-500 border-violet-500'
                            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <p className="text-gray-900 text-base mb-6">
                  Hurry up! Only{' '}
                  <span className="text-red-500">(20 items)</span> left in stock
                </p>

                <div className="flex gap-4">
                  <div className="flex w-[146px] divide-gray-200 divide-x h-11 rounded-lg border border-gray-200 overflow-hidden">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-11 h-11 flex items-center justify-center hover:bg-gray-100 transition cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M5 9.25C4.59 9.25 4.25 9.59 4.25 10C4.25 10.41 4.59 10.75 5 10.75H15C15.41 10.75 15.75 10.41 15.75 10C15.75 9.59 15.41 9.25 15 9.25H5Z"
                          fill="#6B7280"
                        />
                      </svg>
                    </button>
                    <div className="flex-1 flex items-center justify-center">
                      {quantity}
                    </div>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-11 h-11 flex items-center justify-center hover:bg-gray-100 transition cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M10 4.25C10.41 4.25 10.75 4.59 10.75 5V9.25H15C15.41 9.25 15.75 9.59 15.75 10C15.75 10.41 15.41 10.75 15 10.75H10.75V15C10.75 15.41 10.41 15.75 10 15.75C9.59 15.75 9.25 15.41 9.25 15V10.75H5C4.59 10.75 4.25 10.41 4.25 10C4.25 9.59 4.59 9.25 5 9.25H9.25V5C9.25 4.59 9.59 4.25 10 4.25Z"
                          fill="#6B7280"
                        />
                      </svg>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="inline-flex grow justify-center text-base leading-5 cursor-pointer focus:ring-3 focus:ring-violet-500/20 items-center bg-violet-500 transition hover:bg-violet-600 py-2.5 px-3.5 rounded-lg text-white font-medium"
                  >
                    Add to Cart
                  </button>

                  <button
                    type="button"
                    aria-label="Add to wishlist"
                    onClick={handleToggleWishlist}
                    className={`inline-flex text-sm justify-center leading-5 w-11 h-11 cursor-pointer focus:ring-3 items-center transition rounded-lg border font-medium ${
                      inWishlist
                        ? 'bg-violet-50 border-violet-300 text-violet-600 focus:ring-violet-500/20'
                        : 'bg-white border-gray-300 text-gray-800 hover:bg-gray-100 focus:ring-gray-500/20'
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill={inWishlist ? 'currentColor' : 'none'}
                    >
                      <path
                        d="M3.51311 4.41851C1.88463 6.04699 1.88463 8.68728 3.51311 10.3158L9.11618 15.9189C9.60433 16.4071 10.3958 16.4071 10.884 15.9189L16.487 10.3158C18.1155 8.68737 18.1155 6.04707 16.487 4.41859C14.8586 2.79011 12.2183 2.79011 10.5898 4.41859L10.0001 5.00826L9.41037 4.4185C7.78188 2.79002 5.14159 2.79002 3.51311 4.41851Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>

                <div className="flex-col flex items-center mt-11">
                  <div className="flex gap-4">
                    <img src="/images/payment/ms-1.png" alt="Mastercard" />
                    <img src="/images/payment/vs-1.png" alt="Visa" />
                    <img src="/images/payment/pl-1.png" alt="PayPal" />
                    <img src="/images/payment/ae-1.png" alt="Amex" />
                    <img src="/images/payment/wu-1.png" alt="Western Union" />
                  </div>
                  <div className="flex text-center justify-center flex-col sm:flex-row gap-1 items-center mt-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="29"
                      height="28"
                      viewBox="0 0 29 28"
                      fill="none"
                    >
                      <path
                        d="M6.07178 8.18676C6.07177 7.50195 6.4712 6.88006 7.09397 6.59526L13.7719 3.54133C14.2341 3.32997 14.7654 3.32997 15.2276 3.54133L21.9056 6.59527C22.5283 6.88007 22.9277 7.50193 22.9278 8.18672L22.9278 14.5626C22.9279 16.2022 22.4254 17.8057 21.3948 19.0808C19.5488 21.3648 16.4535 24.7918 14.4999 24.7918C12.5463 24.7918 9.45087 21.3647 7.6049 19.0807C6.57437 17.8057 6.07189 16.2022 6.07187 14.5628L6.07178 8.18676Z"
                        fill="#16A34A"
                      />
                      <path
                        d="M17.9728 10.785L13.2923 15.4655L11.0271 13.2003M14.4999 24.7918C16.4535 24.7918 19.5488 21.3648 21.3948 19.0808C22.4254 17.8057 22.9279 16.2022 22.9278 14.5626L22.9278 8.18672C22.9277 7.50193 22.5283 6.88007 21.9056 6.59527L15.2276 3.54133C14.7654 3.32997 14.2341 3.32997 13.7719 3.54133L7.09397 6.59526C6.4712 6.88006 6.07177 7.50195 6.07178 8.18676L6.07187 14.5628C6.07189 16.2022 6.57437 17.8057 7.6049 19.0807C9.45087 21.3647 12.5463 24.7918 14.4999 24.7918Z"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="text-gray-500 -tracking-tight text-base">
                      Secure checkout with encrypted payment processing
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-11">
          <div className="flex border-b border-gray-200">
            {(
              [
                { key: 'specification', label: 'Specification' },
                { key: 'information', label: 'Information' },
                { key: 'review', label: 'Review' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 text-base font-medium cursor-pointer transition-colors relative ${
                  activeTab === tab.key
                    ? 'text-violet-600'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-violet-600 rounded-t" />
                )}
              </button>
            ))}
          </div>

          <div className="py-8">
            {activeTab === 'specification' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <tbody className="divide-y divide-gray-100">
                    {productSpecifications.map(([specKey, specVal]) => (
                      <tr key={specKey}>
                        <td className="py-3 pr-8 font-medium text-gray-800 whitespace-nowrap w-1/3">
                          {specKey}
                        </td>
                        <td className="py-3 text-gray-500">{specVal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'information' && (
              <div className="space-y-4 text-gray-500 text-base leading-7">
                <p>
                  Experience the pinnacle of mobile innovation with a device
                  engineered for performance and elegance. Featuring a stunning
                  OLED display with vibrant, true-to-life colors and deep
                  blacks, every swipe and scroll feels immersive.
                </p>
                <p>
                  The pro-grade camera system captures breathtaking photos and
                  cinematic videos in any lighting condition. With advanced
                  computational photography and optical zoom, your creativity
                  knows no bounds.
                </p>
                <p>
                  Built with a durable titanium frame and ceramic shield front,
                  this device is designed to withstand everyday use while
                  maintaining a premium feel. It also features all-day battery
                  life, fast charging, and MagSafe compatibility.
                </p>
                <h4 className="font-medium text-gray-800 pt-2">
                  What&apos;s in the Box
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Smartphone</li>
                  <li>USB-C to USB-C Cable</li>
                  <li>Documentation</li>
                  <li>SIM Eject Tool</li>
                </ul>
              </div>
            )}

            {activeTab === 'review' && (
              <div className="space-y-8">
                {productReviews.map((rev, idx) => (
                  <div
                    key={idx}
                    className="border-b border-gray-100 pb-6 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center text-sm font-semibold">
                          {rev.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 text-sm">
                            {rev.name}
                          </p>
                          <p className="text-xs text-gray-400">{rev.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, sIdx) => (
                          <RatingStar key={sIdx} half={sIdx >= rev.rating} />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm leading-6">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
