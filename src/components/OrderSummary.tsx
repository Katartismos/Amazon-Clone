import { useState } from 'react'
import axios from 'axios'
import { useData } from './HooksContext'
import { cartUrl } from '../scripts/data/cart'
import OrderCard from './Order'

const OrderSummary = () => {
  const { products, cart } = useData();

  console.log(products);
  console.log(cart);

  return (
    <section>
      {cart.map(cartItem => {
        const matchingProduct = products.find(product => product.id === cartItem.id);

        if (!matchingProduct) {
          return null; // Skip rendering if no matching product is found
        }

        const [isEditing, setIsEditing] = useState(false);
        const [tempQuantity, setTempQuantity] = useState(cartItem.quantity);
        const [quantity, setQuantity] = useState<number>(cartItem.quantity);

        function handleUpdateClick() {
          setIsEditing(true);
          setTempQuantity(cartItem.quantity);
        }

        function handleSaveClick() {
          const prev = cartItem.quantity;

          // apply the temp value to the displayed quantity immediately
          setQuantity(tempQuantity);

          // update the cartItem locally to keep UI in sync
          cartItem.quantity = tempQuantity;

          // send update to backend (using axios with .then/.catch as requested)
          // assuming an API endpoint like /api/cart/:id or /cart/:id; adjust as needed
          axios.patch(`${cartUrl}/${cartItem.id}`, { quantity: tempQuantity })
          .then(() => {
            console.log(cartItem);
            setIsEditing(false);
          })
          .catch(() => {
            // revert local change on failure
            cartItem.quantity = prev;
            setQuantity(prev);
          });
        }

        function handleDeleteClick() {
          const answer = confirm("Are you sure you want to delete this item from your cart?");
          if (!answer) return;

          axios.delete(`${cartUrl}/${cartItem.id}`)
          .then(() => {
            console.log('Item deleted successfully.');
          })
          .catch(() => {
            console.error('Failed to delete item');
          });
        }

        const [selectedDeliveryOptionId, setSelectedDeliveryOptionId] = useState<string>(cartItem.deliveryOptionId);

        const handleDeliveryOptionChange = (newDeliveryOptionId: string) => {
          setSelectedDeliveryOptionId(newDeliveryOptionId);
          // Update the cart item locally to keep UI in sync
          // cartItem.deliveryOptionId = newDeliveryOptionId;
          axios.patch(`${cartUrl}/${cartItem.id}`, { deliveryOptionId: newDeliveryOptionId })
          .then(() => {
            console.log(cartItem);
          })
          .catch(() => {
            console.error('Failed to update deliveryOptionId')
          });
        };

        return (
          <OrderCard
            key={cartItem.id}
            cartItem={cartItem} 
            matchingProduct={matchingProduct} 
            isEditing={isEditing} 
            handleUpdateClick={handleUpdateClick} 
            handleSaveClick={handleSaveClick}
            handleDeleteClick={handleDeleteClick}
            quantity={quantity}
            currentSelectedId={selectedDeliveryOptionId}
            onDeliveryChange={handleDeliveryOptionChange}
            setTempQuantity={setTempQuantity}
          />
        )
      })}
    </section>
  )
}

export default OrderSummary