import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  products,
  shopCategories,
  shopAvailabilities,
  shopBrands,
  shopColors,
  shopSizes,
  sortOptions,
} from '../data/storeData';
import ProductCard from '../components/ProductCard';
import {
  filterAndSortProducts,
  getPaginationRange,
} from '../utils/ecommerce';

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

function PlusIcon() {
  return (
    <svg
      className="w-6 h-6 text-gray-700"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 5.25C12.4142 5.25 12.75 5.58579 12.75 6V11.25H18.001L18.0771 11.2539C18.4554 11.2922 18.7509 11.6117 18.751 12C18.751 12.3884 18.4554 12.7078 18.0771 12.7461L18.001 12.75H12.75V18.001L12.7461 18.0771C12.7078 18.4554 12.3884 18.751 12 18.751C11.6117 18.7509 11.2922 18.4554 11.2539 18.0771L11.25 18.001V12.75H6C5.58579 12.75 5.25 12.4142 5.25 12C5.25013 11.5859 5.58587 11.25 6 11.25H11.25V6C11.25 5.58587 11.5859 5.25013 12 5.25Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg
      className="w-6 h-6 text-gray-700"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M6 11.25C5.58579 11.25 5.25 11.5858 5.25 12C5.25 12.4142 5.58579 12.75 6 12.75V11.25ZM18.0007 12.75C18.4149 12.75 18.7507 12.4142 18.7507 12C18.7507 11.5858 18.4149 11.25 18.0007 11.25V12.75ZM6 12V12.75H18.0007V12V11.25H6V12Z"
        fill="currentColor"
      />
    </svg>
  );
}

interface PriceRangeSliderProps {
  min: number;
  max: number;
  minVal: number;
  maxVal: number;
  onChange: (range: { min: number; max: number }) => void;
}

function PriceRangeSlider({
  min,
  max,
  minVal,
  maxVal,
  onChange,
}: PriceRangeSliderProps) {
  const rangeRef = useRef<HTMLDivElement>(null);

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxVal);
    if (rangeRef.current) {
      rangeRef.current.style.left = `${minPercent}%`;
      rangeRef.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, maxVal, getPercent]);

  return (
    <div className="relative w-full h-8 flex items-center">
      <div className="absolute w-full h-2 rounded-full bg-gray-200" />
      <div
        ref={rangeRef}
        className="absolute h-2 rounded-full bg-indigo-600"
        style={{ left: '0%', width: '0%' }}
      />
      <input
        type="range"
        aria-label="Minimum price"
        min={min}
        max={max}
        value={minVal}
        onChange={(e) => {
          const val = Math.min(Number(e.target.value), maxVal - 1);
          onChange({ min: val, max: maxVal });
        }}
        className="range-thumb"
        style={{ zIndex: minVal > max - 100 ? 5 : 3 }}
      />
      <input
        type="range"
        aria-label="Maximum price"
        min={min}
        max={max}
        value={maxVal}
        onChange={(e) => {
          const val = Math.max(Number(e.target.value), minVal + 1);
          onChange({ min: minVal, max: val });
        }}
        className="range-thumb"
        style={{ zIndex: 4 }}
      />
    </div>
  );
}

interface FilterAccordionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function FilterAccordion({
  title,
  isOpen,
  onToggle,
  children,
}: FilterAccordionProps) {
  return (
    <div className="py-7">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex justify-between items-center cursor-pointer font-medium text-base text-left text-gray-800 transition"
      >
        {title}
        {isOpen ? <MinusIcon /> : <PlusIcon />}
      </button>
      {isOpen && <div className="mt-5">{children}</div>}
    </div>
  );
}

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState('Best selling');
  const sortRef = useRef<HTMLDivElement>(null);

  const [priceRange, setPriceRange] = useState({ min: 0, max: 1278 });
  const [isPriceFilterActive, setIsPriceFilterActive] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAvailabilities, setSelectedAvailabilities] = useState<
    string[]
  >([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const [openSections, setOpenSections] = useState({
    category: true,
    availability: true,
    price: true,
    brand: true,
    color: true,
    size: true,
  });

  useEffect(() => {
    document.title = 'Shop | TechSelf - React Electronics E-Commerce Template';
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsSortOpen(false);
      }
    }
    if (isSortOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSortOpen]);

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleItem = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    item: string
  ) => {
    setCurrentPage(1);
    setList((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleResetAll = () => {
    setSelectedCategories([]);
    setSelectedAvailabilities([]);
    setSelectedBrands([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setPriceRange({ min: 0, max: 1278 });
    setIsPriceFilterActive(false);
    setSortBy('Best selling');
    setCurrentPage(1);
    if (queryParam) {
      setSearchParams({});
    }
  };

  const filteredProducts = useMemo(() => {
    return filterAndSortProducts(products, {
      categories: selectedCategories,
      availabilities: selectedAvailabilities,
      brands: selectedBrands,
      colors: selectedColors,
      sizes: selectedSizes,
      priceRange: isPriceFilterActive
        ? priceRange
        : { min: 0, max: 10000 },
      searchQuery: queryParam,
      sortBy,
    });
  }, [
    selectedCategories,
    selectedAvailabilities,
    selectedBrands,
    selectedColors,
    selectedSizes,
    priceRange,
    isPriceFilterActive,
    queryParam,
    sortBy,
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const endIndex = currentPage * itemsPerPage;
  const startIndex = endIndex - itemsPerPage;
  const visibleProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const paginationRange = getPaginationRange(currentPage, totalPages);

  return (
    <>
      <section className="lg:pt-20 pt-14 pb-10 lg:pb-16">
        <div className="max-w-7xl mx-auto px-4 xl:px-6">
          <div className="mx-auto max-w-lg mb-4 text-center">
            <h1 className="text-4xl lg:text-5xl font-medium text-gray-900 mb-4">
              Shop all
            </h1>
            <p className="text-base text-gray-500">
              Our most-loved gadgets, trusted by thousands of customers.
            </p>
          </div>
          <nav className="flex" aria-label="Breadcrumb">
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
              <li className="inline-flex items-center">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-1 font-medium text-gray-900"
                >
                  Shop
                </Link>
              </li>
            </ol>
          </nav>
        </div>
      </section>

      <section className="bg-white pb-10 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 xl:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {isMobileFilterOpen && (
              <div
                onClick={() => setIsMobileFilterOpen(false)}
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              />
            )}

            <aside
              className={`fixed top-0 left-0 h-full w-80 lg:rounded-xl lg:translate-x-0 lg:static lg:w-auto xl:col-span-3 lg:col-span-4 px-5 lg:px-0 bg-white overflow-y-auto z-40 transition-transform duration-300 ${
                isMobileFilterOpen ? 'translate-x-0' : '-translate-x-full'
              }`}
            >
              <div className="divide-y divide-gray-100">
                <div className="py-7 lg:pb-7 flex justify-between items-center">
                  <h4 className="font-semibold text-lg text-gray-800">Filter</h4>
                  <div className="flex gap-3 items-center">
                    <button
                      type="button"
                      onClick={handleResetAll}
                      className="text-violet-500 font-medium text-sm cursor-pointer hover:text-violet-600"
                    >
                      Reset All
                    </button>
                    <button
                      type="button"
                      aria-label="Close filter sidebar"
                      onClick={() => setIsMobileFilterOpen(false)}
                      className="bg-gray-100 w-9 h-9 lg:hidden rounded-lg text-gray-500 z-40 cursor-pointer inline-flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M13.805 15.0724L13.7366 15.0109L9.99907 11.2734L6.26156 15.0109C5.91009 15.3624 5.33969 15.3624 4.98821 15.0109C4.63674 14.6594 4.63674 14.089 4.98821 13.7376L8.72573 10L4.98821 6.26253C4.63674 5.91106 4.63674 5.34066 4.98821 4.98919C5.33969 4.63772 5.91009 4.63772 6.26156 4.98919L9.99907 8.7267L13.7366 4.98919L13.805 4.92773C14.1584 4.63936 14.6797 4.66035 15.0092 4.98988C15.3388 5.3194 15.3598 5.84067 15.0714 6.19417L15.0099 6.26253L11.2724 10L15.0099 13.7376L15.0714 13.8059C15.3598 14.1594 15.3388 14.6807 15.0092 15.0102C14.6797 15.3397 14.1584 15.3607 13.805 15.0724Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <FilterAccordion
                  title="Product Category"
                  isOpen={openSections.category}
                  onToggle={() => toggleSection('category')}
                >
                  <ul className="space-y-3">
                    {shopCategories.map((cat) => (
                      <li key={cat} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id={`cat-${cat}`}
                          checked={selectedCategories.includes(cat)}
                          onChange={() =>
                            toggleItem(
                              selectedCategories,
                              setSelectedCategories,
                              cat
                            )
                          }
                          className="w-4 h-4 text-violet-500 bg-white checked:bg-violet-500 border-gray-300 rounded focus:ring-0"
                        />
                        <label
                          htmlFor={`cat-${cat}`}
                          className="text-sm text-gray-700 cursor-pointer"
                        >
                          {cat}
                        </label>
                      </li>
                    ))}
                  </ul>
                </FilterAccordion>

                <FilterAccordion
                  title="Availability"
                  isOpen={openSections.availability}
                  onToggle={() => toggleSection('availability')}
                >
                  <ul className="space-y-3">
                    {shopAvailabilities.map((avail) => (
                      <li key={avail} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id={`avail-${avail}`}
                          checked={selectedAvailabilities.includes(avail)}
                          onChange={() =>
                            toggleItem(
                              selectedAvailabilities,
                              setSelectedAvailabilities,
                              avail
                            )
                          }
                          className="w-4 h-4 text-violet-500 bg-white checked:bg-violet-500 border-gray-300 rounded focus:ring-0"
                        />
                        <label
                          htmlFor={`avail-${avail}`}
                          className="text-sm text-gray-700 cursor-pointer"
                        >
                          {avail}
                        </label>
                      </li>
                    ))}
                  </ul>
                </FilterAccordion>

                <FilterAccordion
                  title="Price"
                  isOpen={openSections.price}
                  onToggle={() => toggleSection('price')}
                >
                  <div className="flex items-center gap-3 my-6">
                    <div className="flex-1">
                      <div className="flex items-center rounded-lg border border-gray-200 bg-white px-3">
                        <span className="text-gray-500 pr-2">$</span>
                        <input
                          type="text"
                          aria-label="Minimum price value"
                          value={priceRange.min}
                          readOnly
                          className="w-full bg-transparent border-l border-l-gray-200 border-0 focus:ring-0 px-2 py-2.5 text-sm font-medium text-gray-800 focus:outline-none"
                        />
                      </div>
                    </div>
                    <span className="text-gray-500">to</span>
                    <div className="flex-1">
                      <div className="flex items-center rounded-lg border border-gray-300 bg-white px-3">
                        <span className="text-gray-500 pr-2">$</span>
                        <input
                          type="text"
                          aria-label="Maximum price value"
                          value={priceRange.max}
                          readOnly
                          className="w-full bg-transparent border-l border-l-gray-200 border-0 focus:ring-0 px-2 py-2.5 text-sm font-medium text-gray-800 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                  <PriceRangeSlider
                    min={0}
                    max={2000}
                    minVal={priceRange.min}
                    maxVal={priceRange.max}
                    onChange={(range) => {
                      setPriceRange(range);
                      setIsPriceFilterActive(true);
                      setCurrentPage(1);
                    }}
                  />
                </FilterAccordion>

                <FilterAccordion
                  title="Brand"
                  isOpen={openSections.brand}
                  onToggle={() => toggleSection('brand')}
                >
                  <ul className="space-y-3">
                    {shopBrands.map((brand) => (
                      <li key={brand} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id={`brand-${brand}`}
                          checked={selectedBrands.includes(brand)}
                          onChange={() =>
                            toggleItem(
                              selectedBrands,
                              setSelectedBrands,
                              brand
                            )
                          }
                          className="w-4 h-4 text-violet-500 bg-white checked:bg-violet-500 border-gray-300 rounded focus:ring-0"
                        />
                        <label
                          htmlFor={`brand-${brand}`}
                          className="text-sm text-gray-700 cursor-pointer"
                        >
                          {brand}
                        </label>
                      </li>
                    ))}
                  </ul>
                </FilterAccordion>

                <FilterAccordion
                  title="Color"
                  isOpen={openSections.color}
                  onToggle={() => toggleSection('color')}
                >
                  <ul className="space-y-3">
                    {shopColors.map((col) => (
                      <li key={col.name} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id={`color-${col.name}`}
                          checked={selectedColors.includes(col.name)}
                          onChange={() =>
                            toggleItem(
                              selectedColors,
                              setSelectedColors,
                              col.name
                            )
                          }
                          className="w-4 h-4 text-violet-500 bg-white checked:bg-violet-500 border-gray-300 rounded focus:ring-0"
                        />
                        <label
                          htmlFor={`color-${col.name}`}
                          className="text-sm text-gray-500 flex items-center cursor-pointer"
                        >
                          <span
                            className={`${col.color} ring-1 ${col.ring} rounded-full w-3.5 h-3.5 inline-block mr-1`}
                          />
                          {col.name}
                        </label>
                      </li>
                    ))}
                  </ul>
                </FilterAccordion>

                <FilterAccordion
                  title="Size"
                  isOpen={openSections.size}
                  onToggle={() => toggleSection('size')}
                >
                  <ul className="space-y-3">
                    {shopSizes.map((sz) => (
                      <li
                        key={sz.name}
                        className="flex items-center justify-between"
                      >
                        <div className="grow flex items-center gap-3">
                          <input
                            type="checkbox"
                            id={`size-${sz.name}`}
                            checked={selectedSizes.includes(sz.name)}
                            onChange={() =>
                              toggleItem(
                                selectedSizes,
                                setSelectedSizes,
                                sz.name
                              )
                            }
                            className="w-4 h-4 text-violet-500 bg-white checked:bg-violet-500 border-gray-300 rounded focus:ring-0"
                          />
                          <label
                            htmlFor={`size-${sz.name}`}
                            className="text-sm text-gray-700 cursor-pointer"
                          >
                            {sz.name}
                          </label>
                        </div>
                        <span className="text-xs text-gray-500">
                          ({sz.count})
                        </span>
                      </li>
                    ))}
                  </ul>
                </FilterAccordion>
              </div>
            </aside>

            <div className="lg:col-span-8 xl:col-span-9 flex flex-col">
              <div className="pb-4 lg:flex items-center justify-between hidden">
                <div>
                  <p className="text-gray-500 text-base">
                    Showing {filteredProducts.length > 0 ? 1 : 0}-
                    {filteredProducts.length} of {filteredProducts.length}{' '}
                    Results
                  </p>
                </div>

                <div className="relative shrink-0" ref={sortRef}>
                  <button
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    type="button"
                    className="inline-flex justify-end items-center gap-2 sm:min-w-60 sm:max-w-2xs rounded-lg bg-transparent text-sm font-medium cursor-pointer focus:outline-none"
                  >
                    <div className="text-gray-500 font-normal">
                      Sort By :{' '}
                      <span className="text-gray-800 font-medium">
                        {sortBy}
                      </span>
                    </div>
                    <svg
                      className={`w-4 h-4 transform transition-transform ${
                        isSortOpen ? 'rotate-180' : ''
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M4.79102 7.39648L9.99935 12.6048L15.2077 7.39648"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {isSortOpen && (
                    <div className="absolute z-30 mt-2 w-60 origin-top-right rounded-lg bg-white shadow-md">
                      <ul className="p-1.5 text-sm text-gray-700">
                        {sortOptions.map((opt) => (
                          <li key={opt}>
                            <button
                              type="button"
                              onClick={() => {
                                setSortBy(opt);
                                setIsSortOpen(false);
                              }}
                              className="block w-full text-left cursor-pointer px-4 py-2 hover:bg-gray-100 text-gray-500 rounded-lg hover:text-gray-800"
                            >
                              {opt}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="block lg:hidden">
                <div className="border border-gray-200 p-5 rounded-xl flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setIsMobileFilterOpen(true)}
                    className="rounded-lg border border-gray-200 py-2.5 px-3.5 font-medium text-sm text-gray-800 h-10 flex gap-1.5 items-center justify-center cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="18"
                      viewBox="0 0 14 18"
                      fill="none"
                    >
                      <path
                        d="M0.75 2.54102C0.75 1.85066 1.30964 1.29102 2 1.29102H11.375C12.0654 1.29102 12.625 1.85066 12.625 2.54102V3.67479C12.625 4.22313 12.4447 4.75627 12.1119 5.19207L8.50654 9.9134C8.34014 10.1313 8.25 10.3979 8.25 10.672V15.8706C8.25 16.5184 7.54336 16.9185 6.98792 16.5852L5.73188 15.8316C5.35537 15.6057 5.125 15.1988 5.125 14.7597V10.672C5.125 10.3979 5.03486 10.1313 4.86846 9.9134L1.26308 5.19207C0.930283 4.75627 0.75 4.22313 0.75 3.67479V2.54102Z"
                        stroke="#1F2937"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Filter
                  </button>

                  <select
                    aria-label="Sort products"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="rounded-lg border border-gray-200 py-2.5 px-3.5 font-medium text-sm text-gray-800 h-10"
                  >
                    <option value="">Sort</option>
                    {sortOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-gray-500 text-base py-5 text-center">
                  Showing {filteredProducts.length > 0 ? startIndex + 1 : 0}-
                  {Math.min(endIndex, filteredProducts.length)} of{' '}
                  {filteredProducts.length} Results
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {visibleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <div className="flex justify-center items-center mt-10 gap-2">
                <button
                  type="button"
                  onClick={() =>
                    currentPage > 1 && handlePageChange(currentPage - 1)
                  }
                  disabled={currentPage === 1}
                  className={`px-4 h-10 rounded-lg flex gap-1.5 cursor-pointer items-center justify-center border font-medium transition-all ${
                    currentPage === 1
                      ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <svg
                    className="size-5"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.99976 11.9966L20.0011 11.9966M9.99575 6L3.99976 11.9998L9.99575 18"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Prev
                </button>

                {paginationRange.map((page, idx) =>
                  page === '...' ? (
                    <span
                      key={`ellipsis-${idx}`}
                      className="w-10 h-10 flex items-center justify-center text-gray-500"
                    >
                      ...
                    </span>
                  ) : (
                    <button
                      key={page}
                      type="button"
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 rounded-lg cursor-pointer font-medium transition-all ${
                        currentPage === page
                          ? 'bg-violet-500 text-white shadow-sm'
                          : 'border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  type="button"
                  onClick={() =>
                    currentPage < totalPages &&
                    handlePageChange(currentPage + 1)
                  }
                  disabled={currentPage === totalPages}
                  className={`px-4 h-10 rounded-lg flex cursor-pointer gap-1.5 items-center justify-center border font-medium transition-all ${
                    currentPage === totalPages
                      ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  Next{' '}
                  <svg
                    className="size-5"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.7226 11.9966L3.72125 11.9966M13.7266 6L19.7226 11.9998L13.7266 18"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
