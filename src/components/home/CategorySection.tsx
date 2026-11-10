import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { categories } from '../../data/storeData';

export default function CategorySection() {
  return (
    <section className="py-10 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex flex-col sm:flex-row gap-5 sm:items-end justify-between mb-16">
          <div className="text-left lg:max-w-lg">
            <h2 className="mb-2 text-5xl font-medium text-gray-800 -tracking-[1.92px]">
              Shop by Category
            </h2>
            <p className="text-base text-gray-500">
              Explore our curated selection of products across premium
              categories, from everyday essentials to exclusive limited
              collections.
            </p>
          </div>
          <div className="flex sm:justify-end gap-4">
            <button
              type="button"
              aria-label="Previous categories"
              className="category-slider-prev size-11 ring ring-gray-300 hover:text-white cursor-pointer hover:bg-violet-500 transition-all hover:ring-violet-500 rounded-full inline-flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M15.25 6L9 12.25L15.25 18.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next categories"
              className="category-slider-next size-11 ring ring-gray-300 hover:bg-violet-500 cursor-pointer transition-all hover:ring-violet-500 rounded-full inline-flex items-center justify-center hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M8.75 19L15 12.75L8.75 6.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: '.category-slider-prev',
            nextEl: '.category-slider-next',
          }}
          spaceBetween={24}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 6 },
          }}
        >
          {categories.map((cat, idx) => (
            <SwiperSlide key={`${cat.name}-${idx}`}>
              <article className="flex flex-col items-center gap-5 text-center group">
                <Link to="/shop" className="bg-gray-50 rounded-[18px] p-5">
                  <img src={cat.image} alt={cat.name} />
                </Link>
                <h3 className="text-gray-800 font-medium text-base group-hover:text-violet-500 transition-colors">
                  <Link to="/shop">{cat.name}</Link>
                </h3>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
