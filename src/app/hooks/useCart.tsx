import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Product } from '@/data/products';

type BoardType = 'complete' | 'deck';

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  slug: string;
  imageUrl: string;
  boardType: BoardType;
  quantity: number;
  completePrice: number;
  deckOnlyPrice: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (product: Product, boardType?: BoardType, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateBoardType: (id: string, boardType: BoardType) => void;
  clearCart: () => void;
  subtotal: number;
  itemCount: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = 'eastside_cart';

const getUnitPrice = (item: CartItem) =>
  item.boardType === 'complete' ? item.completePrice : item.deckOnlyPrice;

const clampQuantity = (value: number) => Math.min(99, Math.max(1, Math.floor(value)));

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        setItems(parsed);
      }
    } catch {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product, boardType: BoardType = 'complete', quantity = 1) => {
    const key = `${product.id}-${boardType}`;
    const imageUrl = product.images?.[0] || product.image;
    setItems((prev) => {
      const existing = prev.find((item) => item.id === key);
      if (existing) {
        return prev.map((item) =>
          item.id === key ? { ...item, quantity: clampQuantity(item.quantity + quantity) } : item,
        );
      }
      return [
        ...prev,
        {
          id: key,
          productId: product.id,
          name: product.name,
          slug: product.slug,
          imageUrl,
          boardType,
          quantity: clampQuantity(quantity),
          completePrice: product.completePrice,
          deckOnlyPrice: product.deckOnlyPrice,
        },
      ];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    const nextQuantity = clampQuantity(quantity);
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: nextQuantity } : item)));
  };

  const updateBoardType = (id: string, boardType: BoardType) => {
    setItems((prev) => {
      const current = prev.find((item) => item.id === id);
      if (!current || current.boardType === boardType) return prev;
      const nextId = `${current.productId}-${boardType}`;
      const existing = prev.find((item) => item.id === nextId);
      const withoutCurrent = prev.filter((item) => item.id !== id && item.id !== nextId);
      if (existing) {
        return [
          ...withoutCurrent,
          {
            ...existing,
            quantity: clampQuantity(existing.quantity + current.quantity),
          },
        ];
      }
      return [
        ...withoutCurrent,
        {
          ...current,
          id: nextId,
          boardType,
        },
      ];
    });
  };

  const clearCart = () => setItems([]);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + getUnitPrice(item) * item.quantity, 0),
    [items],
  );

  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      updateBoardType,
      clearCart,
      subtotal,
      itemCount,
    }),
    [items, subtotal, itemCount],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
