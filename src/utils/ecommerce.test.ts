import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatPrice,
  parsePrice,
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
  calculateCartTotals,
  calculateCheckoutSummary,
  filterAndSortProducts,
  getPaginationRange,
  type Product,
} from './ecommerce';

const sampleProducts: Product[] = [
  {
    id: 1,
    name: 'Meta Quest 2 VR Headset',
    price: 399,
    priceStr: '$399.00',
    image: '/images/products/image-1.png',
    badge: 'New',
    badgeColor: 'green',
    description: 'VR headset',
    rating: 4.8,
    reviewCount: 124,
    category: 'Accessories',
    availability: 'In stock',
    brand: 'Aymar',
    colorFilter: ['White', 'Black'],
    sizeFilter: ['M', 'L'],
  },
  {
    id: 2,
    name: 'ASUS ROG Zephyrus 14',
    price: 349,
    priceStr: '$349.00',
    originalPrice: 499,
    originalPriceStr: '$499.00',
    image: '/images/products/image-4.png',
    badge: '20% OFF',
    badgeColor: 'violet',
    description: 'Gaming laptop',
    rating: 4.6,
    reviewCount: 56,
    category: 'Mens',
    availability: 'In stock',
    brand: 'Burberry',
    colorFilter: ['Black'],
    sizeFilter: ['L', 'XL'],
  },
  {
    id: 3,
    name: 'iPhone 16',
    price: 799,
    priceStr: '$799.00',
    image: '/images/products/image-5.png',
    description: 'Smartphone',
    rating: 4.9,
    reviewCount: 342,
    category: 'Women',
    availability: 'Out of stock',
    brand: 'Angel',
    colorFilter: ['Blue'],
    sizeFilter: ['S'],
  },
];

test('formatPrice and parsePrice handle numbers and currency strings accurately', () => {
  assert.equal(formatPrice(399), '$399.00');
  assert.equal(formatPrice('$1,799.00'), '$1,799.00');
  assert.equal(formatPrice('49.5'), '$49.50');
  assert.equal(parsePrice(399), 399);
  assert.equal(parsePrice('$2,499.00'), 2499);
});

test('cart operations add, merge variants, update quantities, and compute totals', () => {
  let cart = addItemToCart([], sampleProducts[0], 1, {
    color: 'Black',
    size: '128 GB',
  });
  assert.equal(cart.length, 1);
  assert.equal(cart[0].quantity, 1);

  // Adding same product + same variant increments quantity
  cart = addItemToCart(cart, sampleProducts[0], 2, {
    color: 'Black',
    size: '128 GB',
  });
  assert.equal(cart.length, 1);
  assert.equal(cart[0].quantity, 3);

  // Adding same product + different variant creates new entry
  cart = addItemToCart(cart, sampleProducts[0], 1, {
    color: 'White',
    size: '256 GB',
  });
  assert.equal(cart.length, 2);

  const totals = calculateCartTotals(cart);
  assert.equal(totals.cartCount, 4);
  assert.equal(totals.subtotal, 399 * 4);

  // Update quantity
  cart = updateCartItemQuantity(cart, 1, 5, {
    color: 'Black',
    size: '128 GB',
  });
  assert.equal(cart[0].quantity, 5);

  // Remove item
  cart = removeItemFromCart(cart, 1, { color: 'Black', size: '128 GB' });
  assert.equal(cart.length, 1);
});

test('filterAndSortProducts filters by price, category, and sorts correctly', () => {
  const filtered = filterAndSortProducts(sampleProducts, {
    categories: [],
    availabilities: [],
    brands: [],
    colors: [],
    sizes: [],
    priceRange: { min: 0, max: 500 },
    sortBy: 'Price, Low to high',
  });
  assert.equal(filtered.length, 2);
  assert.equal(filtered[0].name, 'ASUS ROG Zephyrus 14');
  assert.equal(filtered[1].name, 'Meta Quest 2 VR Headset');
});

test('calculateCheckoutSummary computes shipping, tax, and promo code discounts', () => {
  const base = calculateCheckoutSummary(399);
  assert.equal(base.total, 399 + 5.99 + 20 - 5);

  const withPromo = calculateCheckoutSummary(400, 5.99, 20, 5, 'SAVE20');
  assert.equal(withPromo.discount, 85);
  assert.equal(withPromo.total, 400 + 5.99 + 20 - 85);
});

test('getPaginationRange returns expected page numbers', () => {
  assert.deepEqual(getPaginationRange(1, 4), [1, 2, 3, 4]);
  assert.deepEqual(getPaginationRange(5, 10), [1, '...', 4, 5, 6, '...', 10]);
});
