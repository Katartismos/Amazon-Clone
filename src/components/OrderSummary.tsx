import { useData } from './useData'
import OrderCard from './Order'
import EmptyCart from './EmptyCart'

const OrderSummary = () => {
  const { products, cart } = useData();

  if (!cart || cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <section>
      {cart.map(cartItem => {
        const matchingProduct = products.find(product => product.id === cartItem.id);
        if (!matchingProduct) return null;

        return (
          <OrderCard
            key={cartItem.id}
            cartItem={cartItem}
            matchingProduct={matchingProduct}
          />
        )
      })}
    </section>
  )
}

export default OrderSummary