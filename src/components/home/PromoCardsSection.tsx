import { Link } from 'react-router-dom';
import { promoCards } from '../../data/storeData';

export default function PromoCardsSection() {
  return (
    <section className="py-10 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {promoCards.map((card, idx) => (
            <article
              key={idx}
              className={`p-5 ${card.bgColor} rounded-xl flex flex-col gap-8`}
            >
              <div className="p-2">
                <span className="text-red-500 px-3 py-1 inline-flex items-center justify-center h-8 mb-3 font-semibold bg-white rounded text-base">
                  {card.discount}
                </span>
                <h3 className="text-3xl text-gray-700 font-semibold mb-4 leading-9">
                  {card.title}
                </h3>
                <Link
                  to="/shop"
                  className="text-gray-800 font-medium text-base border-b border-gray-500 pb-1"
                >
                  Shop Now
                </Link>
              </div>
              <div className="rounded-xl overflow-hidden">
                <img
                  src={card.image}
                  className="rounded-xl w-full"
                  alt={card.title}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
