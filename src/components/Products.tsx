import { useState } from 'react'
import axios from 'axios'
import { useData } from './HooksContext'
import type { CartItemDTO } from '../scripts/data/cart'

const Products = () => {
  const { products } = useData();

  return (
    <main 
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-20"
    >
      {products.map(product => {
        const [quantity, setQuantity] = useState(1);

        const handleQuantityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
          setQuantity(Number(event.target.value));
        };

        const addToCart = (id: string) => {
          axios.post<CartItemDTO>("http://localhost:3001/cart", {
            productId: id,
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
          <div key={product.id} className="p-6.25 pt-15 border-r border-b border-neutral-200 flex flex-col font-[Arial]">
            <div className="flex justify-center items-center h-59 mb-5">
              <img src={product.image} alt={product.name} className="max-h-full max-w-full" />
            </div>

            <div className="h-15 mb-2 mx-2">
              {product.name}
            </div>

            <div className="flex items-center mb-2.5 mx-2.5">
              <img src={product.getStarsUrl()} alt="Rating" className="w-30 mr-2" />
              <div className="text-[hsl(199,99%,36%)] hover:text-amber-700 cursor-pointer">{product.rating.count}</div>
            </div>

            <div className="font-bold mb-2.5 mx-2.5 font-[Arial]">
              {product.getPrice()}
            </div>

            <div>
              <select 
                id={product.id}
                onChange={handleQuantityChange}
                className="bg-gray-200 border border-gray-300 rounded-xl shadow-xs w-16 h-10 pl-1 text-lg font-[Arial] cursor-pointer mx-2.5" 
                value={quantity}
              >
                {
                  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))
                }
              </select>
            </div>

            {
              product.sizeChartLink && 
              <a href={product.sizeChartLink} target="_blank" className="text-purple-900 underline mx-2.5 mt-5">
                Size chart
              </a>
            }

            <div className="flex-1"></div>

            <div className="text-green-600 text-lg flex items-center mb-2 opacity-0">
              <img src="/images/icons/checkmark.png" alt="Added" className="h-5 mr-2" />
              Added
            </div>

            <button 
              className="w-full p-2 rounded-full text-[hsl(0,0%,13%)] bg-[hsl(49,100%,54%)] border border-[hsl(50,100%,49%)] cursor-pointer shadow-sm hover:bg-[hsl(49,100%,48%)] hover:border hover:border-[hsl(49,100%,54%)] active:bg-[hsl(49,100%,54%)] mt-1"
              onClick={() => addToCart(product.id)}
            >
              Add to Cart
            </button>
          </div>
        )
    })}
    </main>
  )
}

export default Products