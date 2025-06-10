import CheckoutHeader from '../components/CheckoutHeader'
import OrderSummary from '../components/OrderSummary'
import PaymentSummary from '../components/PaymentSummary'

const Checkout = () => {

  return (
    <>
      <CheckoutHeader />
      <main 
        className="max-w-lg sm:max-w-full sm:max-custom-4xs:px-30 px-10 custom-4xs:px-12.5 custom-3xs:px-15 custom-2xs:px-17.5 custom-xs:px-20 custom-sm:px-22.5 custom-md:px-25 custom-lg:px-27.5 custom-xl:px-30 custom-2xl:px-32.5 custom-3xl:px-35 custom-4xl:px-60 mt-45 mb-26.25 font-[Roboto]"
      >
        <div className="font-semibold text-[22px] mb-5">Review your order</div>

        <div className="grid grid-cols-1 custom-4xs:grid-cols-[1fr_350px] gap-4 items-start">
          <OrderSummary />
          <PaymentSummary />
        </div>
      </main>
    </>
  )
}

export default Checkout