import { useState, useEffect } from 'react'
import { useData } from '../scripts/data/useData'

const Navbar = () => {
  const { cart } = useData();
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    let total = 0;
    cart.forEach((cartItem) => {
      total += cartItem.quantity;
    });
    setCartQuantity(total);
  }, [cart]);

  return (
    <nav className="bg-[hsl(214,27%,10%)] text-white px-3.75 flex items-center justify-between fixed top-0 left-0 right-0 h-20">
      <div className="md:w-60 w-auto">
        <a 
          href="/" 
          className="inline-block p-1.5 rounded-xs cursor-pointer no-underline border border-solid border-transparent hover:border-white mt-2"
        >
          <img className="hidden md:block w-35"
            src="/images/amazon-logo-white.png" alt="Amazon logo" />
          <img className="block md:hidden size-12"
            src="/images/amazon-mobile-logo-white.png" alt="Amazon logo" />
        </a>
      </div>

      <div className="md:w-auto flex flex-1 mx-2.5">
        <input className="bg-white text-[hsl(0,0%,0%)] flex-1 w-0 text-xl font-[Arial] h-14 pl-3.75 rounded-tl-sm rounded-bl-sm rounded-tr-none rounded-br-none" type="text" placeholder="Search" />

        <button className="bg-[hsl(34,99%,70%)] w-15 h-14 flex justify-center items-center rounded-tr-sm rounded-br-sm shrink-0 cursor-pointer">
          <img className="h-8 ml-0.5 mt-0.75" src="/images/icons/search-icon.png" alt="Search button" />
        </button>
      </div>

      <div className="md:w-60 w-auto flex shrink-0 justify-end">
        <a className="text-white inline-block p-1.5 rounded-xs cursor-pointer no-underline border border-solid border-transparent hover:border-white" href="/orders">
          <span className="block text-lg">Returns</span>
          <span className="block text-xl font-bold">& Orders</span>
        </a>

        <a className="text-white flex items-center relative p-1.5 rounded-xs cursor-pointer no-underline border border-solid border-transparent hover:border-white" href="/checkout">
          <img className="w-15" src="/images/icons/cart-icon.png" alt="Cart icon" />
          <div className="text-amber-600 text-2xl font-bold absolute top-1 left-5.5 w-10 text-center">
            {cartQuantity}
          </div>
          <div className="mt-3 text-lg font-bold">Cart</div>
        </a>
      </div>
    </nav>
  )
}

export default Navbar