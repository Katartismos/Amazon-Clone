import { useCartItems } from '../scripts/data/cart'
import { useProducts } from '../scripts/data/products'
import { getDeliveryOption } from '../scripts/data/deliveryOptions'
import formatCurrency from '../scripts/utils/money'

const PaymentSummary = () => {
  const { cart } = useCartItems();
  const { products } = useProducts();

  function calculateCartQuantity() {
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    return cartQuantity;
  }

  const cartQuantity = calculateCartQuantity();

  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach(cartItem => {
    const product = products.find(product => cartItem.productId === product.id);
    if (!product) return null;
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  return (
    <div className="border border-[hsl(0,0%,87.1%)] rounded-md p-5 pb-3">
      <div className="font-[700] text-[18px] mb-4">
        Order Summary
      </div>

      <div className="grid grid-cols-[1fr_auto] text-[15px] mb-3">
        <div>{`Items (${cartQuantity}):`}</div>
        <div className="text-right border-t-[1px_solid_hsl(0,0%,87%)]">
          ${formatCurrency(productPriceCents)}
        </div>
      </div>

      <div className="grid grid-cols-[1fr_auto] text-[15px] mb-3">
        <div>Shipping &amp; handling:</div>
        <div className="text-right border-t-[1px_solid_hsl(0,0%,87%)]">
          ${formatCurrency(shippingPriceCents)}
        </div>
      </div>

      <div className="grid grid-cols-[1fr_auto] text-[15px] mb-3 border-t-[1px_solid_hsl(0,0%,87%)] pt-2.5">
        <div className="pt-5">Total before tax:</div>
        <div className="text-right border-t border-t-[hsl(0,0%,87%)] pt-5">
          ${formatCurrency(totalBeforeTaxCents)}
        </div>
      </div>

      <div className="grid grid-cols-[1fr_auto] text-[15px] mb-3">
        <div>Estimated tax (10%):</div>
        <div className="text-right border-t-[1px_solid_hsl(0,0%,87%)]">
          ${formatCurrency(taxCents)}
        </div>
      </div>

      <div className="grid grid-cols-[1fr_auto] mb-3 font-[700] text-[18px] pt-3 text-[hsl(9,96%,35%)] border-t border-t-[hsl(0,0%,87%)]">
        <div>Order total:</div>
        <div className="text-right">
          ${formatCurrency(totalCents)}
        </div>
      </div>

      <button className="text-[hsl(0,0%,13%)] bg-[hsl(49,100%,54%)] border border-[hsl(50,100%,49%)] cursor-pointer hover:bg-[hsl(49,100%,48%)] hover:border hover:border-[hsl(49,100%,54%)] active:bg-[hsl(49,100%,54%)] shadow-sm w-full py-4 rounded-2xl mt-3 mb-4">
        Place your order
      </button>
    </div>
  )
}

export default PaymentSummary