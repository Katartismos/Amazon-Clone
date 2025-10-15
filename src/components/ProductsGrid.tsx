import { useState } from 'react'
import axios from 'axios'
import { useData } from './useData'
import { cartUrl, type CartItem } from '../scripts/data/cart'
import ProductCard from './Product'

const ProductsGrid = () => {
  const { products, cart } = useData();

  // top-level state to track per-product quantities. Hooks must be at top-level.
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const handleQuantityChange = (productId: string, event: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantities(prev => ({ ...prev, [productId]: Number(event.target.value) }));
  };

  const addToCart = (id: string) => {
    const quantity = quantities[id] ?? 1;
    const isAlreadyInCart = cart.some((item: CartItem) => item.id === id);

    if (isAlreadyInCart) {
      axios.patch(`${cartUrl}/${id}`, { quantity: quantity })
      .then(response => {
        console.log("Product quantity updated in cart:", response.data);
        alert("This item is already in your cart. It's quantity has been updated.");
      })
      .catch(error => {
        console.error("Error updating product quantity in cart:", error);
      });
    } else {
      axios.post<CartItem>(cartUrl, {
        id: id,
        quantity: quantity,
        deliveryOptionId: "1"
      })
      .then(response => {
        console.log("Product added to cart:", response.data);
      })
      .catch(error => {
        console.error("Error adding product to cart:", error);
      });
    }
  };

  return (
    <main 
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-20"
    >
      {products.map(product => {
        const quantity = quantities[product.id] ?? 1;

        return (
          <ProductCard 
            key={product.id}
            product={product} 
            handleQuantityChange={(e) => handleQuantityChange(product.id, e)} 
            quantity={quantity} 
            addToCart={addToCart} 
          />
        )
    })}
    </main>
  )
}

export default ProductsGrid