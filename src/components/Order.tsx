import React from 'react'
import { calculateDeliveryDate, deliveryOptions, getDeliveryOption } from '../scripts/data/deliveryOptions'
import type { CartItem } from '../scripts/data/cart'
import type { Product } from '../scripts/data/products'
import formatCurrency from '../scripts/utils/money'

interface OrderProps {
  cartItem: CartItem,
  matchingProduct: Product,
  isEditing: boolean,
  handleUpdateClick: () => void,
  handleSaveClick: () => void,
  handleDeleteClick: () => void,
  quantity: number,
  currentSelectedId: string,
  onDeliveryChange: (newDeliveryOptionId: string) => void,
  setTempQuantity: (value: React.SetStateAction<number>) => void
}

const OrderCard: React.FC<OrderProps> = ({ cartItem, matchingProduct, isEditing, handleUpdateClick, quantity, handleSaveClick, handleDeleteClick, currentSelectedId, onDeliveryChange, setTempQuantity }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSaveClick();
    }
  }

  return (
    <div key={cartItem.id} className="border border-[hsl(0,0%,87.1%)] rounded-md p-5 mb-4">
      <div className="text-[hsl(120,100%,23.15%)] font-semibold text-[19px] mt-2 mb-6">
        {calculateDeliveryDate(getDeliveryOption(cartItem.deliveryOptionId))}
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

              const isSelected = deliveryOption.id === currentSelectedId;

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