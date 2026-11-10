import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { megaMenuColumns } from '../data/storeData';
import CartDrawer from './CartDrawer';
import WishlistDrawer from './WishlistDrawer';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const {
    cartCount,
    isDrawerOpen: isCartOpen,
    openDrawer: openCart,
    closeDrawer: closeCart,
  } = useCart();

  const {
    wishlistCount,
    isDrawerOpen: isWishlistOpen,
    openDrawer: openWishlist,
    closeDrawer: closeWishlist,
  } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchValue.trim())}`);
    } else {
      navigate('/shop');
    }
  };

  return (
    <nav
      className={`bg-white py-4 lg:py-0 border-b border-gray-100 ${
        isSticky
          ? 'fixed top-0 left-0 w-full z-50 transition-all duration-300'
          : 'relative'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <button
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden inline-flex items-center justify-center rounded-lg w-10 h-10 text-gray-700 bg-gray-100 focus:outline-none cursor-pointer"
          >
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.6163 5.97449L16.5411 6.04285L11.999 10.5849L7.45711 6.04299C7.06658 5.65247 6.43342 5.65247 6.04289 6.04299C5.65237 6.43351 5.65237 7.06668 6.04289 7.4572L10.5848 11.9991L6.04289 16.541C5.65237 16.9316 5.65237 17.5647 6.04289 17.9553C6.43342 18.3458 7.06658 18.3458 7.45711 17.9553L11.999 13.4133L16.5411 17.9554L16.6163 18.0238C17.0091 18.3443 17.5891 18.3216 17.9553 17.9554C18.3215 17.5892 18.3442 17.0092 18.0237 16.6164L17.9553 16.5412L13.4132 11.9991L17.9553 7.45706L18.0237 7.38179C18.3442 6.98902 18.3215 6.40904 17.9553 6.04285C17.5891 5.67666 17.0091 5.65392 16.6163 5.97449Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M20 5C20.5523 5 21 5.44772 21 6C21 6.55228 20.5523 7 20 7L4 7C3.44772 7 3 6.55229 3 6C3 5.44772 3.44772 5 4 5H20ZM20 17C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19L4 19C3.44772 19 3 18.5523 3 18C3 17.4477 3.44772 17 4 17L20 17ZM21 12C21 11.4477 20.5523 11 20 11L4 11C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13L20 13C20.5523 13 21 12.5523 21 12Z"
                  fill="currentColor"
                />
              </svg>
            )}
          </button>

          <div className="flex items-center">
            <Link to="/">
              <img src="/images/logo/header-logo.svg" alt="TechSelf Logo" />
            </Link>
            <form
              onSubmit={handleSearchSubmit}
              className="relative ml-6 hidden lg:block"
            >
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search products.."
                aria-label="Search products"
                className="px-4 py-2.5 pl-10 w-[350px] border focus:border-violet-300 h-11 placeholder:text-gray-400 placeholder:text-base text-gray-800 border-gray-300 rounded-lg focus:outline-0 text-base ring-3 ring-transparent focus:ring-violet-500/30"
              />
              <button
                type="submit"
                aria-label="Submit search"
                className="absolute top-1/2 left-3 -translate-y-1/2 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M9.4375 2.3125C13.3726 2.3125 16.5634 5.5019 16.5635 9.43652C16.5635 11.1342 15.9681 12.6921 14.9766 13.916L17.4688 16.4082C17.7609 16.7011 17.7604 17.1761 17.4678 17.4688C17.175 17.7612 16.7 17.7612 16.4072 17.4688L13.915 14.9756C12.6911 15.9656 11.1343 16.5605 9.4375 16.5605C5.50258 16.5603 2.3125 13.3711 2.3125 9.43652C2.31258 5.50205 5.50263 2.31273 9.4375 2.3125ZM9.4375 3.8125C6.33077 3.81273 3.81258 6.33076 3.8125 9.43652C3.8125 12.5424 6.33073 15.0603 9.4375 15.0605C12.5445 15.0605 15.0635 12.5425 15.0635 9.43652C15.0634 6.33062 12.5444 3.8125 9.4375 3.8125Z"
                    fill="#6B7280"
                  />
                </svg>
              </button>
            </form>
          </div>

          <div className="hidden lg:flex items-center">
            <Link
              to="/"
              className="text-gray-800 hover:text-violet-500 py-7 px-3.5 text-base font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="text-gray-800 hover:text-violet-500 py-7 px-3.5 text-base font-medium transition-colors"
            >
              Shop
            </Link>
            <div className="group px-3.5 py-7">
              <Link
                to="/shop"
                className="inline-flex items-center text-gray-800 transition-all cursor-pointer group-hover:text-violet-500 text-base font-medium"
              >
                Products
                <svg
                  className="transition-transform duration-300 group-hover:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M4.79175 7.39575L10.0001 12.6041L15.2084 7.39575"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <div className="absolute left-0 right-0 border-t mt-7 w-full py-7 border-gray-100 bg-white z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col xl:flex-row divide-y xl:divide-y-0 xl:divide-x divide-gray-100 gap-7">
                    <div className="xl:w-2/3 flex divide-x divide-gray-100 pb-7">
                      {megaMenuColumns.map((col, idx) => (
                        <div
                          key={col.title}
                          className={`${idx === 0 ? 'pr-7' : 'px-7'} w-1/3`}
                        >
                          <h3 className="text-gray-800 text-xl mb-3 font-medium">
                            {col.title}
                          </h3>
                          <div className="space-y-3">
                            {col.items.map((item) => (
                              <Link
                                key={item}
                                to="/shop"
                                className="block text-gray-500 text-base transition-colors hover:text-gray-800"
                              >
                                {item}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="xl:w-1/3">
                      <div className="pl-7 relative">
                        <img
                          src="/images/logo/menu-image.jpg"
                          className="rounded-lg w-full"
                          alt="Best Seller"
                        />
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                          <Link
                            to="/shop"
                            className="bg-white py-2.5 px-3.5 rounded-lg hover:bg-gray-100 text-gray-800 border border-gray-300 font-medium text-sm"
                          >
                            Best Seller
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Link
              to="/shop"
              className="text-gray-800 hover:text-violet-500 py-7 px-3.5 text-base font-medium transition-colors"
            >
              Sale
              <span className="bg-violet-50 text-violet-700 inline-flex items-center justify-center h-5 rounded-full px-2 py-1 text-xs font-medium z-10 ml-1">
                20% OFF
              </span>
            </Link>
          </div>

          <div className="lg:flex items-center space-x-5 hidden">
            <div className="flex space-x-3">
              <button
                type="button"
                aria-label="Open wishlist"
                onClick={openWishlist}
                className="text-gray-700 border size-11 rounded-lg border-gray-200 inline-flex items-center justify-center hover:text-gray-900 relative cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M4.21563 5.3023C2.26145 7.25648 2.26146 10.4248 4.21563 12.379L10.9393 19.1028C11.5251 19.6886 12.4749 19.6886 13.0606 19.1028L19.7844 12.3791C21.7385 10.4249 21.7385 7.25659 19.7844 5.30241C17.8302 3.34823 14.6618 3.34823 12.7076 5.30241L12 6.01001L11.2923 5.3023C9.33816 3.34813 6.16981 3.34813 4.21563 5.3023Z"
                    stroke="#374151"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {wishlistCount > 0 && (
                  <span className="rounded-full w-4.5 h-4.5 absolute -top-1 -right-1 bg-violet-500 text-white text-[10px] font-semibold inline-flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                aria-label="Open shopping cart"
                onClick={openCart}
                className="text-gray-700 border size-11 rounded-lg border-gray-200 inline-flex items-center justify-center hover:text-gray-900 relative cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="18"
                  viewBox="0 0 21 18"
                  fill="none"
                >
                  <path
                    d="M0.75 0.75H1.93055C2.67828 0.75 3.31181 1.30068 3.41594 2.04112L3.56788 3.12161M3.56788 3.12161L4.67 10.9589C4.77412 11.6993 5.40766 12.25 6.15538 12.25L15.5169 12.25C16.1139 12.25 16.6541 11.896 16.8923 11.3486L19.5596 5.22023C19.9908 4.2295 19.2648 3.12161 18.1843 3.12161H3.56788Z"
                    stroke="#374151"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.2168 16.25H6.2268M14.7539 16.25H14.7639"
                    stroke="#374151"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="rounded-full w-4.5 h-4.5 absolute -top-1 -right-1 bg-violet-500 text-white text-[10px] font-semibold inline-flex items-center justify-center">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>

          <div className="flex lg:hidden items-center gap-2.5">
            <button
              type="button"
              aria-label="Open wishlist"
              onClick={openWishlist}
              className="text-gray-700 border size-10 rounded-lg border-gray-200 inline-flex items-center justify-center hover:text-gray-900 relative cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4.21563 5.3023C2.26145 7.25648 2.26146 10.4248 4.21563 12.379L10.9393 19.1028C11.5251 19.6886 12.4749 19.6886 13.0606 19.1028L19.7844 12.3791C21.7385 10.4249 21.7385 7.25659 19.7844 5.30241C17.8302 3.34823 14.6618 3.34823 12.7076 5.30241L12 6.01001L11.2923 5.3023C9.33816 3.34813 6.16981 3.34813 4.21563 5.3023Z"
                  stroke="#374151"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {wishlistCount > 0 && (
                <span className="rounded-full w-4 h-4 absolute -top-1 -right-1 bg-violet-500 text-white text-[10px] font-semibold inline-flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              type="button"
              aria-label="Open shopping cart"
              onClick={openCart}
              className="text-gray-700 border size-10 rounded-lg border-gray-200 inline-flex items-center justify-center hover:text-gray-900 relative cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="18"
                viewBox="0 0 21 18"
                fill="none"
              >
                <path
                  d="M0.75 0.75H1.93055C2.67828 0.75 3.31181 1.30068 3.41594 2.04112L3.56788 3.12161M3.56788 3.12161L4.67 10.9589C4.77412 11.6993 5.40766 12.25 6.15538 12.25L15.5169 12.25C16.1139 12.25 16.6541 11.896 16.8923 11.3486L19.5596 5.22023C19.9908 4.2295 19.2648 3.12161 18.1843 3.12161H3.56788Z"
                  stroke="#374151"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.2168 16.25H6.2268M14.7539 16.25H14.7639"
                  stroke="#374151"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="rounded-full w-4 h-4 absolute -top-1 -right-1 bg-violet-500 text-white text-[10px] font-semibold inline-flex items-center justify-center">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden px-2">
          <div className="px-2 pt-2 pb-3 mt-5 space-y-1 bg-white rounded-xl">
            <Link
              to="/"
              className="text-gray-800 block w-full hover:bg-gray-100 font-medium text-left px-3 py-2 text-base rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="text-gray-800 block w-full hover:bg-gray-100 font-medium text-left px-3 py-2 text-base rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <div>
              <button
                type="button"
                onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                className={`w-full text-left px-3 py-2 rounded-lg font-medium text-gray-800 hover:bg-gray-100 inline-flex items-center text-base justify-between cursor-pointer ${
                  isMobileProductsOpen ? 'text-violet-500' : ''
                }`}
              >
                Products
                <svg
                  className={`w-5 h-5 ${
                    isMobileProductsOpen ? 'rotate-180 text-violet-500' : ''
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M4.79163 7.39648L9.99996 12.6048L15.2083 7.39648"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {isMobileProductsOpen && (
                <div className="p-2 mt-1">
                  <div className="space-y-6 border-b border-gray-200 pb-5">
                    {megaMenuColumns.map((col) => (
                      <div key={col.title}>
                        <h3 className="text-gray-800 text-xl mb-3 font-medium">
                          {col.title}
                        </h3>
                        <div className="space-y-3">
                          {col.items.map((item) => (
                            <Link
                              key={item}
                              to="/shop"
                              className="block text-gray-500 text-base transition-colors hover:text-gray-800"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {item}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div className="relative">
                      <img
                        src="/images/logo/menu-image.jpg"
                        className="rounded-lg w-full"
                        alt="Best Seller"
                      />
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                        <Link
                          to="/shop"
                          className="bg-white py-2.5 px-3.5 rounded-lg hover:bg-gray-100 text-gray-800 border border-gray-300 font-medium text-sm"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Best Seller
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Link
              to="/shop"
              className="text-gray-800 block w-full hover:bg-gray-100 font-medium text-left px-3 py-2 text-base rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sale
            </Link>
          </div>
        </div>
      )}

      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      <WishlistDrawer isOpen={isWishlistOpen} onClose={closeWishlist} />
    </nav>
  );
}
