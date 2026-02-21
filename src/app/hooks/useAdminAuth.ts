import { useCallback, useEffect, useState } from 'react';
import { getIdTokenResult, onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from 'firebase/auth';
import { auth, callFunction } from '@/app/lib/firebase';
import { STORE_ID } from '@/app/lib/store';

type AdminClaims = {
  role?: string;
  storeId?: string;
};

export function useAdminAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [claims, setClaims] = useState<AdminClaims | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshClaims = useCallback(
    async (targetUser: User) => {
      const result = await getIdTokenResult(targetUser, true);
      const tokenClaims = result.claims as AdminClaims;
      setClaims(tokenClaims);
      return tokenClaims;
    },
    [],
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser);
      setError(null);
      if (!nextUser) {
        setClaims(null);
        setLoading(false);
        return;
      }
      try {
        await refreshClaims(nextUser);
      } catch {
        setError('Unable to verify admin access.');
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [refreshClaims]);

  const signIn = useCallback(async (email: string, password: string) => {
    setError(null);
    const credential = await signInWithEmailAndPassword(auth, email, password);
    await refreshClaims(credential.user);
  }, [refreshClaims]);

  const signOutUser = useCallback(async () => {
    await signOut(auth);
  }, []);

  const bootstrapAdmin = useCallback(async () => {
    if (!STORE_ID) {
      setError('Missing store configuration.');
      return;
    }
    setError(null);
    await callFunction('bootstrapAdminClaims', { storeId: STORE_ID });
    if (auth.currentUser) {
      await refreshClaims(auth.currentUser);
    }
  }, [refreshClaims]);

  const isAdmin = Boolean(
    user &&
      claims &&
      claims.role === 'admin' &&
      claims.storeId &&
      STORE_ID &&
      claims.storeId === STORE_ID,
  );

  return {
    user,
    claims,
    loading,
    error,
    isAdmin,
    signIn,
    signOutUser,
    bootstrapAdmin,
    storeId: STORE_ID,
  };
}
