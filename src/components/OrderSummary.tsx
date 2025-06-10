import { useCartItems } from '../scripts/data/cart'
import { useProducts } from '../scripts/data/products'
import { calculateDeliveryDate, deliveryOptions, getDeliveryOption } from '../scripts/data/deliveryOptions'
import formatCurrency from '../scripts/utils/money'

const OrderSummary = () => {
  const { cart } = useCartItems();
  const { products } = useProducts();

  console.log(products);
  console.log(cart);

  return (
    <div>
      {cart.map(cartItem => {
        const matchingProduct = products.find(product => product.id === cartItem.productId);

        if (!matchingProduct) {
          return null; // Skip rendering if no matching product is found
        }

        return (
          <div key={cartItem.productId} className="border border-[hsl(0,0%,87.1%)] rounded-md p-5 mb-4">
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
                    Quantity: <span className="">{cartItem.quantity}</span>
                  </span>

                  <span className="text-[hsl(187,97%,36%)] hover:text-amber-600 cursor-pointer"> Update </span>

                  <input className="w-10 hidden" type="text" />
                  <span className="text-[hsl(187,97%,36%)] hover:text-amber-600 cursor-pointer">Save</span>

                  <span className="text-[hsl(187,97%,36%)] hover:text-amber-600 cursor-pointer">Delete</span>
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

                    const isSelected = deliveryOption.id === cartItem.deliveryOptionId;

                    return (
                      <div key={deliveryOption.id} className="grid grid-cols-[24px_1fr] cursor-pointer mb-3">
                        <input 
                          type="radio"
                          {...isSelected ? { checked: true } : { checked: false }}
                          className="ml-0 cursor-pointer"
                          name={`delivery-option-${matchingProduct.id}`} 
                        />
                        <div>
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
      })}
    </div>
  )
}

export default OrderSummary