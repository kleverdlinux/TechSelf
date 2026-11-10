import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  type Product,
  type CartItem,
  type ProductVariant,
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
  calculateCartTotals,
} from '../utils/ecommerce';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (
    product: Product,
    quantity?: number,
    variant?: ProductVariant | null
  ) => void;
  removeFromCart: (productId: number, variant?: ProductVariant | null) => void;
  updateQuantity: (
    productId: number,
    newQuantity: number,
    variant?: ProductVariant | null
  ) => void;
  clearCart: () => void;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  cartCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } catch {
      // Ignore storage errors
    }
  }, [cartItems]);

  const addToCart = (
    product: Product,
    quantity = 1,
    variant: ProductVariant | null = null
  ) => {
    setCartItems((prev) => addItemToCart(prev, product, quantity, variant));
    setIsDrawerOpen(true);
  };

  const removeFromCart = (
    productId: number,
    variant: ProductVariant | null = null
  ) => {
    setCartItems((prev) => removeItemFromCart(prev, productId, variant));
  };

  const updateQuantity = (
    productId: number,
    newQuantity: number,
    variant: ProductVariant | null = null
  ) => {
    setCartItems((prev) =>
      updateCartItemQuantity(prev, productId, newQuantity, variant)
    );
  };

  const clearCart = () => setCartItems([]);
  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const { cartCount, subtotal } = calculateCartTotals(cartItems);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        cartCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
