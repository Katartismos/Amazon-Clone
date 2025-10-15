import React from 'react'
import { Link } from 'react-router-dom'

const EmptyCart: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6 mt-10">
      <div className="bg-white border border-[hsl(0,0%,87.1%)] rounded-lg shadow-sm p-6 w-full max-w-2xl">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-3 pb-10">There are currently no items in your cart.</h2>

        <div className="flex justify-center">
          <Link to="/" className="inline-block bg-[hsl(49,100%,54%)] hover:bg-[hsl(49,100%,48%)] text-[hsl(0,0%,13%)] font-semibold py-2 px-5 rounded-full shadow-sm">
            Start shopping!
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EmptyCart
