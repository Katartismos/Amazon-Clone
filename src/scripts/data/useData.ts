import { useContext } from 'react'
import HooksContext from './context'
import type { HooksContextType } from './context'

export function useData() {
  const context = useContext(HooksContext);

  if (!context) {
    throw new Error("useData must be used inside HooksContextProvider");
  }
  return context as HooksContextType;
}

export default useData;
