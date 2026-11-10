import { testimonials } from '../../data/storeData';

function YellowStar() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M10.0002 2.375C10.2854 2.37513 10.5464 2.53691 10.6728 2.79248L12.7322 6.96484L17.3366 7.63379C17.6189 7.67486 17.8538 7.87412 17.9421 8.14526C18.03 8.41652 17.9558 8.71396 17.7517 8.91309L14.4192 12.1602L15.2065 16.7476C15.2547 17.0288 15.1394 17.3134 14.9087 17.4812C14.6779 17.6489 14.3715 17.6711 14.1189 17.5386L10.0002 15.373L5.88157 17.5386C5.62898 17.6714 5.3227 17.6488 5.09177 17.4812C4.86114 17.3134 4.74454 17.0287 4.7927 16.7476L5.57883 12.1602L2.24753 8.91309C2.04375 8.71392 1.97041 8.41635 2.05832 8.14526C2.14665 7.87404 2.3815 7.67486 2.66379 7.63379L7.26706 6.96484L9.32761 2.79248L9.38132 2.70093C9.51978 2.49887 9.75079 2.37507 10.0002 2.375Z"
        fill="#FACC15"
      />
    </svg>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="py-10 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-2 text-5xl font-medium text-gray-800 -tracking-[1.92px]">
            What Our Customers Say
          </h2>
          <p className="text-base text-gray-500">
            Real reviews from customers who trust our quality, design, and
            style.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((review, idx) => (
            <article
              key={idx}
              className="p-6 bg-gray-50 rounded-xl flex flex-col justify-between"
            >
              <div className="flex items-center mb-5">
                {[...Array(5)].map((_, sIdx) => (
                  <YellowStar key={sIdx} />
                ))}
              </div>
              <p className="text-base text-gray-700 leading-6 mb-7">
                {review.text}
              </p>
              <div className="flex items-center gap-2">
                <div>
                  <img
                    src={review.avatar}
                    className="size-10 rounded-full"
                    alt={review.name}
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{review.name}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
