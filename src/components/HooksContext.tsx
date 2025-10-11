import React, { createContext, useContext } from 'react'
import { useProducts } from '../scripts/data/products'
import { useCartItems } from '../scripts/data/cart'

type HooksContextType = ReturnType<typeof useProducts> & ReturnType<typeof useCartItems>;

const HooksContext = createContext<HooksContextType | undefined>(undefined);

export const HooksContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const  products  = useProducts();
  const  cart  = useCartItems();

  return (
    <HooksContext.Provider value={{ ...products, ...cart }}>
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
