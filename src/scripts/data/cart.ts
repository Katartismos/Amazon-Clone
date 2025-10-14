import { useState, useEffect } from 'react';
import axios from 'axios';

export interface CartItemDTO {
  id: string;
  quantity: number;
  deliveryOptionId: string;
}

export class CartItem {
  id: string;
  quantity: number;
  deliveryOptionId: string;

  constructor (
    id: string,
    quantity: number,
    deliveryOptionId: string,
  ) {
    this.id = id;
    this.quantity = quantity;
    this.deliveryOptionId = deliveryOptionId;
  }

  static fromJSON(obj: CartItemDTO): CartItem {
    return new CartItem(
      obj.id,
      obj.quantity,
      obj.deliveryOptionId
    );
  }
}

export const cartUrl = "http://localhost:3001/cart";


export function useCartItems() {
  const [cart, setCartItem] = useState<CartItem[]>([]);

  useEffect(() => {
    axios.get<CartItem[]>(cartUrl)
      .then(response => {
        const converted = response.data.map(CartItem.fromJSON);
        setCartItem(converted);
      })
      .catch(error => console.error(error));
  }, []);

  return { cart };
}


/*
export function useCartItems() {
  // State to hold the fetched cart data
  const [cart, setCartItem] = useState<CartItem[]>([]); 
  
  // State used to trigger a data refresh. Changing this key forces useEffect to run again.
  const [refreshKey, setRefreshKey] = useState(0); 

  // Stable function to increment the refreshKey, triggering the fetch logic
  const refetch = useCallback(() => {
    // We increment the key to tell React that the dependency has changed
    setRefreshKey(prevKey => prevKey + 1);
    console.log("Refetch triggered, new key:", refreshKey + 1);
  }, []); 

  useEffect(() => {
    console.log("Fetching cart items...");
    
    // Using the .then/.catch Promise chain syntax for Axios
    axios.get<CartItem[]>(cartUrl)
      .then(response => {
        // Assuming CartItem.fromJSON is a helper function you have for mapping/typing
        const converted = response.data.map(item => item); // Simplified map for example
        // const converted = response.data.map(CartItem.fromJSON); // Use this if CartItem.fromJSON exists
        
        setCartItem(converted);
        console.log("Cart items updated successfully.");
      })
      .catch(error => {
        // Use console.error for proper error logging
        console.error("Error fetching cart items:", error);
        // Optionally, you might want to set cart state to an empty array on error
        setCartItem([]);
      });
      
    // The dependency array now includes refreshKey.
    // The effect runs on mount (due to []) and anytime refetch() is called.
  }, [refreshKey]); 

  // Return the data and the function components need to trigger an update
  return { cart, refetch }; 
}
*/

export function updateCartItem() {}
