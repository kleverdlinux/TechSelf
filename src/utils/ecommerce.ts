export interface ProductVariant {
  color?: string;
  size?: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  priceStr: string;
  originalPrice?: number;
  originalPriceStr?: string;
  image: string;
  badge?: string;
  badgeColor?: 'green' | 'violet' | 'blue';
  description: string;
  rating: number;
  reviewCount: number;
  colors?: string[];
  category?: string;
  availability?: 'In stock' | 'Out of stock';
  brand?: string;
  colorFilter?: string[];
  sizeFilter?: string[];
}

export interface CartItem extends Product {
  quantity: number;
  variant: ProductVariant | null;
}

export interface ShopFilterState {
  categories: string[];
  availabilities: string[];
  brands: string[];
  colors: string[];
  sizes: string[];
  priceRange: { min: number; max: number };
  searchQuery?: string;
  sortBy: string;
}

export function formatPrice(price: number | string | undefined | null): string {
  if (typeof price === 'number') {
    return `$${price.toFixed(2)}`;
  }
  if (typeof price === 'string') {
    if (price.startsWith('$')) return price;
    const parsed = parseFloat(price);
    return isNaN(parsed) ? price : `$${parsed.toFixed(2)}`;
  }
  return '$0.00';
}

export function parsePrice(price: number | string | undefined | null): number {
  if (typeof price === 'number') return price;
  if (typeof price === 'string') {
    const parsed = parseFloat(price.replace(/[^0-9.]/g, ''));
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
}

export function addItemToCart(
  cartItems: CartItem[],
  product: Product,
  quantity = 1,
  variant: ProductVariant | null = null
): CartItem[] {
  const existingIndex = cartItems.findIndex(
    (item) =>
      item.id === product.id &&
      JSON.stringify(item.variant) === JSON.stringify(variant)
  );
  if (existingIndex > -1) {
    const updated = [...cartItems];
    updated[existingIndex] = {
      ...updated[existingIndex],
      quantity: updated[existingIndex].quantity + quantity,
    };
    return updated;
  }
  return [...cartItems, { ...product, quantity, variant }];
}

export function removeItemFromCart(
  cartItems: CartItem[],
  productId: number,
  variant: ProductVariant | null = null
): CartItem[] {
  return cartItems.filter(
    (item) =>
      !(
        item.id === productId &&
        JSON.stringify(item.variant) === JSON.stringify(variant)
      )
  );
}

export function updateCartItemQuantity(
  cartItems: CartItem[],
  productId: number,
  newQuantity: number,
  variant: ProductVariant | null = null
): CartItem[] {
  if (newQuantity < 1) return cartItems;
  return cartItems.map((item) =>
    item.id === productId &&
    JSON.stringify(item.variant) === JSON.stringify(variant)
      ? { ...item, quantity: newQuantity }
      : item
  );
}

export function calculateCartTotals(cartItems: CartItem[]): {
  cartCount: number;
  subtotal: number;
} {
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.quantity,
    0
  );
  return { cartCount, subtotal };
}

export function calculateCheckoutSummary(
  subtotal: number,
  shipping = 5.99,
  taxes = 20,
  baseDiscount = 5,
  promoCode = ''
): {
  subtotal: number;
  shipping: number;
  taxes: number;
  discount: number;
  total: number;
} {
  const normalizedCode = promoCode.trim().toUpperCase();
  let extraDiscount = 0;
  if (normalizedCode === 'SAVE20' || normalizedCode === 'TECH30') {
    extraDiscount = Math.round(subtotal * 0.2 * 100) / 100;
  } else if (normalizedCode === 'WELCOME10') {
    extraDiscount = 10;
  }
  const discount = baseDiscount + extraDiscount;
  const total = Math.max(0, subtotal + shipping + taxes - discount);
  return {
    subtotal,
    shipping,
    taxes,
    discount,
    total,
  };
}

export function filterAndSortProducts(
  products: Product[],
  filters: ShopFilterState
): Product[] {
  let result = products.filter((p) => {
    if (
      p.price < filters.priceRange.min ||
      p.price > filters.priceRange.max
    ) {
      return false;
    }
    if (
      filters.searchQuery &&
      filters.searchQuery.trim() !== '' &&
      !p.name.toLowerCase().includes(filters.searchQuery.trim().toLowerCase()) &&
      !p.description
        .toLowerCase()
        .includes(filters.searchQuery.trim().toLowerCase())
    ) {
      return false;
    }
    if (
      filters.categories.length > 0 &&
      (!p.category || !filters.categories.includes(p.category))
    ) {
      return false;
    }
    if (
      filters.availabilities.length > 0 &&
      (!p.availability || !filters.availabilities.includes(p.availability))
    ) {
      return false;
    }
    if (
      filters.brands.length > 0 &&
      (!p.brand || !filters.brands.includes(p.brand))
    ) {
      return false;
    }
    if (
      filters.colors.length > 0 &&
      (!p.colorFilter ||
        !p.colorFilter.some((c) => filters.colors.includes(c)))
    ) {
      return false;
    }
    if (
      filters.sizes.length > 0 &&
      (!p.sizeFilter || !p.sizeFilter.some((s) => filters.sizes.includes(s)))
    ) {
      return false;
    }
    return true;
  });

  result = [...result];
  switch (filters.sortBy) {
    case 'Price, Low to high':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'Price, high to low':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'Alphabetically, A-Z':
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'Alphabetically, Z-A':
      result.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'Featured':
      result.sort((a, b) => b.rating - a.rating);
      break;
    case 'Best selling':
    default:
      break;
  }

  return result;
}

export function getPaginationRange(
  currentPage: number,
  totalPages: number
): (number | '...')[] {
  const pages: (number | '...')[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);
    if (currentPage <= 3) end = 4;
    if (currentPage >= totalPages - 2) start = totalPages - 3;
    if (start > 2) pages.push('...');
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (end < totalPages - 1) pages.push('...');
    pages.push(totalPages);
  }
  return pages;
}
