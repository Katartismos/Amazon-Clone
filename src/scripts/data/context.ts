import { createContext } from 'react'
import { useProducts } from './products'
import { useCartItems } from './cart'

// Compose the provider type from the hooks it will contain
export type HooksContextType = ReturnType<typeof useProducts> & ReturnType<typeof useCartItems>;

const HooksContext = createContext<HooksContextType | undefined>(undefined);

export default HooksContext;
