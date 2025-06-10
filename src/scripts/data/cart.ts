import { useState, useEffect } from 'react';
import axios from 'axios';

interface CartItemDTO {
  productId: string;
  quantity: number;
  deliveryOptionId: string;
}

class CartItem {
  productId: string;
  quantity: number;
  deliveryOptionId: string;

  constructor (
    productId: string,
    quantity: number,
    deliveryOptionId: string,
  ) {
    this.productId = productId;
    this.quantity = quantity;
    this.deliveryOptionId = deliveryOptionId;
  }

  static fromJSON(obj: CartItemDTO): CartItem {
    return new CartItem(
      obj.productId,
      obj.quantity,
      obj.deliveryOptionId
    );
  }
}

export function useCartItems() {
  const [cart, setCartItem] = useState<CartItem[]>([]);

  useEffect(() => {
    axios.get<CartItemDTO[]>("http://localhost:3001/cart")
      .then(response => {
        const converted = response.data.map(CartItem.fromJSON);
        setCartItem(converted);
      })
      .catch(error => console.error(error));
  }, []);

  return { cart };
}