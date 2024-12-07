import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ShoppingCart } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Navbar: React.FC = () => {
  const cart = useStore((state) => state.cart);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center">
            <ShoppingBag className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-800">E-Store</span>
          </Link>
          <Link to="/checkout" className="relative">
            <ShoppingCart className="h-6 w-6 text-gray-600" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};