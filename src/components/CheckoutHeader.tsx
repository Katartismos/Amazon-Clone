const CheckoutHeader = () => {
  return (
    <nav className="h-20 px-7.5 bg-white flex justify-center fixed top-0 left-0 right-0 font-[Roboto]">
      <div className="w-full flex items-center justify-between">
        <div className="w-37.5 max-sm:w-20">
          <a 
            href="/" 
            className="inline-block p-1.5 rounded-xs cursor-pointer no-underline border border-solid border-transparent mt-3"
          >
            <img className="hidden md:block w-35"
            src="/images/amazon-logo.png" alt="Amazon logo" />
            <img className="block md:hidden size-12"
            src="/images/amazon-mobile-logo.png" alt="Amazon logo" />
          </a>
        </div>

        <div className="flex-1 shrink-0 text-center mr-2 sm:mr-17.5 text-[30px] lg:text-4xl font-[600] flex justify-center">
          Checkout (<a href="/" className="text-[hsl(187,100%,26%)] text-[28px] lg:text-3xl no-underline cursor-pointer">3 items</a>)
        </div>

        <div className="w-auto lg:w-40 flex justify-end">
          <img src="/images/icons/checkout-lock-icon.png" />
        </div>
      </div>
    </nav>
  )
}

export default CheckoutHeader