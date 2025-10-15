import { useContext } from 'react'
import HooksContext from '../scripts/data/context'
import type { HooksContextType } from '../scripts/data/context'

export function useData() {
  const context = useContext(HooksContext);

  if (!context) {
    throw new Error("useData must be used inside HooksContextProvider");
  }
  return context as HooksContextType;
}

export default useData;
