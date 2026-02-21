import { useEffect, useMemo, useState } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { Product } from '@/data/products';
import { callFunction, db } from '@/app/lib/firebase';
import { STORE_ID } from '@/app/lib/store';

export function useProducts() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!STORE_ID) {
      setError('Missing store configuration.');
      setLoading(false);
      return;
    }

    const productsRef = collection(db, 'stores', STORE_ID, 'products');
    const q = query(productsRef);
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const nextProducts = snapshot.docs
          .map((doc) => {
            const data = doc.data() as Partial<Product>;
            if (!data) return null;
            return {
              id: data.id ?? doc.id,
              name: data.name ?? '',
              slug: data.slug ?? '',
              description: data.description ?? '',
              completePrice: Number(data.completePrice ?? 0),
              deckOnlyPrice: Number(data.deckOnlyPrice ?? 0),
              image: data.image ?? (Array.isArray(data.images) ? data.images[0] ?? '' : ''),
              images: Array.isArray(data.images)
                ? data.images.filter((value) => typeof value === 'string')
                : data.image
                  ? [data.image]
                  : [],
              specs: {
                camber: data.specs?.camber ?? '',
                concave: data.specs?.concave ?? '',
                wheelbase: data.specs?.wheelbase ?? '',
              },
              components: {
                trucks: data.components?.trucks ?? undefined,
                wheels: data.components?.wheels ?? '',
                bearings: data.components?.bearings ?? '',
              },
              features: Array.isArray(data.features) ? data.features : [],
            } satisfies Product;
          })
          .filter(Boolean) as Product[];
        setItems(nextProducts);
        setLoading(false);
        setError(null);
      },
      () => {
        setError('Unable to load products.');
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const addProduct = async (productData: Omit<Product, 'id'>) => {
    if (!STORE_ID) throw new Error('Missing store configuration.');
    await callFunction('addProduct', { storeId: STORE_ID, productData });
  };

  const updateProduct = async (productId: string, updates: Omit<Product, 'id'>) => {
    if (!STORE_ID) throw new Error('Missing store configuration.');
    await callFunction('updateProduct', { storeId: STORE_ID, productId, updates });
  };

  const deleteProduct = async (productId: string) => {
    if (!STORE_ID) throw new Error('Missing store configuration.');
    await callFunction('deleteProduct', { storeId: STORE_ID, productId });
  };

  const value = useMemo(
    () => ({
      products: items,
      loading,
      error,
      addProduct,
      updateProduct,
      deleteProduct,
    }),
    [items, loading, error],
  );

  return value;
}
