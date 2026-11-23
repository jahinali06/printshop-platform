'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  slug: string;
  sku: string;
  quantity: number;
  price: number;
  image?: string;
  options: {
    [key: string]: string;
  };
  variantId?: string;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string, options?: { [key: string]: string }) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'printshop_cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart));
      } catch (error) {
        console.error('Failed to parse cart:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  const generateItemId = (
    productId: string,
    options: { [key: string]: string }
  ): string => {
    const optionsString = Object.keys(options)
      .sort()
      .map((key) => `${key}:${options[key]}`)
      .join('|');
    return `${productId}-${optionsString}`;
  };

  const addItem = (itemData: Omit<CartItem, 'id'>) => {
    const itemId = generateItemId(itemData.productId, itemData.options);

    setItems((currentItems) => {
      const existingItemIndex = currentItems.findIndex((item) => item.id === itemId);

      if (existingItemIndex > -1) {
        // Item already exists, update quantity
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + itemData.quantity,
        };
        return updatedItems;
      } else {
        // Add new item
        return [
          ...currentItems,
          {
            ...itemData,
            id: itemId,
          },
        ];
      }
    });
  };

  const removeItem = (itemId: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const isInCart = (
    productId: string,
    options?: { [key: string]: string }
  ): boolean => {
    if (!options) {
      return items.some((item) => item.productId === productId);
    }

    const itemId = generateItemId(productId, options);
    return items.some((item) => item.id === itemId);
  };

  const value: CartContextType = {
    items,
    itemCount,
    subtotal,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
