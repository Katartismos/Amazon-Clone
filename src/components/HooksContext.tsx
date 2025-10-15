import React from 'react'
import { useProducts } from '../scripts/data/products'
import { useCartItems } from '../scripts/data/cart'
import HooksContext from '../scripts/data/context'

export const HooksContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const products = useProducts();
  const cartHooks = useCartItems();

  // combine hooks into one provider value
  const value = { ...products, ...cartHooks };

  return (
    <HooksContext.Provider value={value}>
      { children }
    </HooksContext.Provider>
  );
};

// Note: `useData` has been moved to `src/components/useData.ts` to keep this file
// exporting components only (improves Fast Refresh behavior).
