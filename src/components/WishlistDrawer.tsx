import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { formatPrice, type Product } from '../utils/ecommerce';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WishlistDrawer({
  isOpen,
  onClose,
}: WishlistDrawerProps) {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (item: Product) => {
    addToCart(item, 1);
    removeFromWishlist(item.id);
  };

  if (!isOpen) return null;

  return (
    <div
      className="relative z-50"
      role="dialog"
      aria-modal="true"
      aria-label="Wishlist"
    >
      <div
        className="fixed inset-0 bg-gray-900/50 bg-opacity-75"
        onClick={onClose}
      />
      <div className="fixed inset-0 overflow-hidden" onClick={onClose}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div
              className="pointer-events-auto w-screen max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex h-full flex-col px-4 py-6 sm:px-6 bg-white shadow-xl">
                <div className="flex items-center justify-between border-b pb-6 border-gray-100">
                  <h2 className="text-lg font-medium text-gray-900">
                    Your Wishlist ({wishlistItems.length})
                  </h2>
                  <div className="ml-3 flex h-7 items-center">
                    <button
                      type="button"
                      onClick={onClose}
                      aria-label="Close wishlist panel"
                      className="relative -m-2 p-2 text-gray-400 hover:text-gray-500 focus:outline-none cursor-pointer"
                    >
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Close panel</span>
                      <svg
                        className="size-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto pt-6">
                  {wishlistItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-20 h-20 text-gray-300 mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      <p className="text-gray-500 text-base">
                        Your wishlist is empty
                      </p>
                      <p className="text-gray-400 text-sm mt-2">
                        Add items you love to your wishlist
                      </p>
                    </div>
                  ) : (
                    <div className="flow-root">
                      <ul className="divide-y divide-dashed divide-gray-200">
                        {wishlistItems.map((item) => (
                          <li
                            key={item.id}
                            className="flex first:pt-0 justify-between last:pb-0 py-5"
                          >
                            <div className="flex">
                              <div className="mr-4 shrink-0 bg-gray-50 rounded-lg">
                                <img
                                  className="rounded-lg w-21 h-24 object-contain"
                                  src={item.image}
                                  alt={item.name}
                                />
                              </div>
                              <div className="grow space-y-3">
                                <div>
                                  <h3 className="text-sm text-gray-800 line-clamp-2 font-semibold">
                                    {item.name}
                                  </h3>
                                  <p className="text-sm text-gray-700 font-semibold mt-1">
                                    {formatPrice(item.price)}
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleMoveToCart(item)}
                                  className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-4 py-2 text-sm font-medium text-white hover:bg-violet-600 transition cursor-pointer"
                                >
                                  Add to Cart
                                </button>
                              </div>
                            </div>
                            <div className="flex flex-col justify-start items-end">
                              <button
                                type="button"
                                aria-label={`Remove ${item.name} from wishlist`}
                                onClick={() => removeFromWishlist(item.id)}
                                className="text-gray-500 cursor-pointer p-1.5 rounded-lg hover:bg-gray-50"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    d="M5.25 5.75V19.75C5.25 20.5784 5.92157 21.25 6.75 21.25H17.25C18.0784 21.25 18.75 20.5784 18.75 19.75V5.75M4 5.75H19.999M5.25 15.8955V9.89551M18.75 15.8955V9.89551M10 16.5V10.5M14 16.5V10.5M15.2495 5.75V4.25C15.2495 3.42157 14.5779 2.75 13.7495 2.75H10.2495C9.42108 2.75 8.74951 3.42157 8.74951 4.25V5.75H15.2495Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {wishlistItems.length > 0 && (
                  <div className="border-t border-gray-100 py-6">
                    <div className="mt-2">
                      <Link
                        to="/shop"
                        onClick={onClose}
                        className="flex w-full items-center justify-center rounded-lg border border-transparent bg-violet-500 px-6 py-3 text-base font-medium text-white h-11 hover:bg-violet-600"
                      >
                        Continue Shopping
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
