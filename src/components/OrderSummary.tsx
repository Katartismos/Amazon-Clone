import { useData } from './HooksContext'
import OrderCard from './Order'

const OrderSummary = () => {
  const { products, cart } = useData();

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