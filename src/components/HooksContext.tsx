import React, { useContext } from 'react'
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

export function useData() {
  const context = useContext(HooksContext);

  if (!context) {
    throw new Error("useData must be used inside HooksContextProvider");
  }
  return context;
}
