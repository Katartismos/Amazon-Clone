import React, { useEffect, useState } from 'react'
import { calculateDeliveryDate, deliveryOptions, getDeliveryOption } from '../scripts/data/deliveryOptions'
import type { CartItem } from '../scripts/data/cart'
import type { Product } from '../scripts/data/products'
import formatCurrency from '../scripts/utils/money'
import { useData } from './HooksContext'

interface OrderProps {
  cartItem: CartItem,
  matchingProduct: Product,
}

const OrderCard: React.FC<OrderProps> = ({ cartItem, matchingProduct }) => {
  // per-item state lives inside this component so hooks are called at top-level
  const { updateCartItem, removeCartItem } = useData();

  const [isEditing, setIsEditing] = useState(false);
  const [tempQuantity, setTempQuantity] = useState<number>(cartItem.quantity);
  const [quantity, setQuantity] = useState<number>(cartItem.quantity);
  const [selectedDeliveryOptionId, setSelectedDeliveryOptionId] = useState<string>(cartItem.deliveryOptionId);

  // Resync local component state if cartItem changes externally
  useEffect(() => {
    setQuantity(cartItem.quantity);
    setTempQuantity(cartItem.quantity);
    setSelectedDeliveryOptionId(cartItem.deliveryOptionId);
  }, [cartItem.quantity, cartItem.deliveryOptionId]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSaveClick();
    }
  }

  function handleUpdateClick() {
    setIsEditing(true);
    setTempQuantity(cartItem.quantity);
  }

  function handleSaveClick() {
    const prev = cartItem.quantity;

    // apply the temp value to the displayed quantity immediately
    setQuantity(tempQuantity);

    // update via context updater which patches server and updates local context state
    updateCartItem(cartItem.id, { quantity: tempQuantity })
    .then(() => {
      setIsEditing(false);
    })
    .catch(() => {
      // revert local change on failure
      setQuantity(prev);
    });
  }

  function handleDeleteClick() {
    const answer = confirm("Are you sure you want to delete this item from your cart?");
    if (!answer) return;

    // use context removeCartItem to keep local context state consistent
    removeCartItem(cartItem.id)
    .then(() => {
      console.log('Item deleted successfully.');
    })
    .catch(() => {
      console.error('Failed to delete item');
    });
  }

  const onDeliveryChange = (newDeliveryOptionId: string) => {
    setSelectedDeliveryOptionId(newDeliveryOptionId);
    updateCartItem(cartItem.id, { deliveryOptionId: newDeliveryOptionId })
    .then(() => {
      // no-op; context already updated
    })
    .catch(() => {
      console.error('Failed to update deliveryOptionId')
    });
  };

  return (
    <div key={cartItem.id} className="border border-[hsl(0,0%,87.1%)] rounded-md p-5 mb-4">
      <div className="text-[hsl(120,100%,23.15%)] font-semibold text-[19px] mt-2 mb-6">
            {calculateDeliveryDate(getDeliveryOption(selectedDeliveryOptionId))}
      </div>

      <div className="grid grid-cols-[100px_1fr] lg:grid-cols-[100px_1fr_1fr] gap-7.5">
        <img src={matchingProduct.image} alt="No product found" className="max-w-full max-h-32.5 " />

        <div>
          <div className="font-[600] mb-2.5">
            {matchingProduct.name}
          </div>

          <div className="text-[hsl(9,96%,35%)] font-[600] mb-2">{matchingProduct.getPrice()}</div>

          <div className="ml-1">
            <span>
              Quantity: <span className="">{quantity}</span>
            </span>

            {!isEditing && (
              <>
                <span className="text-[hsl(187,97%,36%)] hover:text-amber-600 cursor-pointer" onClick={handleUpdateClick}> Update </span>
              </>
            )}

            {isEditing && (
              <>
                <input 
                  className="w-10 border" 
                  type="number" 
                  value={tempQuantity}
                  onChange={(e) => setTempQuantity(Number(e.target.value))}
                  onKeyDown={handleKeyDown}
                />
                <span className="text-[hsl(187,97%,36%)] hover:text-amber-600 cursor-pointer" onClick={handleSaveClick}>Save</span>
              </>
            )}

            <span className="text-[hsl(187,97%,36%)] hover:text-amber-600 cursor-pointer" onClick={handleDeleteClick}>Delete</span>
          </div>
        </div>

        <div className="max-lg:col-span-full">
          <div className="font-[600] mb-2.5">
            Choose a delivery option:
          </div>
          {
            deliveryOptions.map(deliveryOption => {
              const dateString = calculateDeliveryDate(deliveryOption)
              const priceString = deliveryOption.priceCents === 0
                ? 'FREE'
                : formatCurrency(deliveryOption.priceCents)

              const isSelected = deliveryOption.id === selectedDeliveryOptionId;

              const handleDeliveryChange = () => {
                onDeliveryChange(deliveryOption.id);
              };

              return (
                <div key={deliveryOption.id} className="grid grid-cols-[24px_1fr] cursor-pointer mb-3">
                  <input 
                    type="radio"
                    checked={isSelected}
                    onChange={handleDeliveryChange}
                    className="ml-0 cursor-pointer"
                    name={`delivery-option-${matchingProduct.id}`} 
                  />
                  <div className="ml-3">
                    <div className="text-[hsl(120,100%,23.15%)] font-[600] mb-2.5">
                      ${dateString}
                    </div>
                    <div className="text-[hsl(0,0%,47%)]">
                      ${priceString} - Shipping
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default OrderCard