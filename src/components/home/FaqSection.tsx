import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { faqs } from '../../data/storeData';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-10 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="max-w-xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-2 text-5xl font-medium text-gray-800 -tracking-[1.92px]">
              Frequently asked questions
            </h2>
            <p className="text-base text-gray-500">
              Everything you need to know before placing your order.
            </p>
          </div>

          <div className="divide-y divide-gray-200 border-b border-gray-200">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                className="py-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="flex w-full items-center justify-between text-left cursor-pointer"
                >
                  <h3 className="text-lg font-medium text-gray-900">
                    {faq.question}
                  </h3>
                  <motion.div
                    className="relative size-6"
                    animate={{ rotate: openIndex === idx ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {openIndex !== idx ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute inset-0"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 5.25V18.75M5.25 12H18.75"
                          stroke="#374151"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute inset-0"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M5.25 12H18.75"
                          stroke="#374151"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-6 text-base text-gray-500">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
