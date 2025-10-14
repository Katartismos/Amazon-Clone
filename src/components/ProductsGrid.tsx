import { useState } from 'react'
import axios from 'axios'
import { useData } from './HooksContext'
import { cartUrl, type CartItem } from '../scripts/data/cart'
import ProductCard from './Product'

const ProductsGrid = () => {
  const { products, cart } = useData();

  return (
    <main 
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-20"
    >
      {products.map(product => {
        const [quantity, setQuantity] = useState(1);

        const handleQuantityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
          setQuantity(Number(event.target.value));
        };

        const isAlreadyInCart = cart.some((item: CartItem) => item.id === product.id);

        const addToCart = (id: string) => {
          if (isAlreadyInCart) 
            axios.patch(`${cartUrl}/${id}`, { quantity: quantity })
            .then(response => {
              console.log("Product quantity updated in cart:", response.data);
              alert("This item is already in your cart. It's quantity has been updated.");
            })
            .catch(error => {
              console.error("Error updating product quantity in cart:", error);
            });
          
          else 
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
        };

        return (
          <ProductCard 
            product={product} 
            handleQuantityChange={handleQuantityChange} 
            quantity={quantity} 
            addToCart={addToCart} 
          />
        )
    })}
    </main>
  )
}

export default ProductsGrid