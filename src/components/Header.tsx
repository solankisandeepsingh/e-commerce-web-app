import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

export default function Header(): JSX.Element {
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  return (
    <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate('/')}
            className="text-2xl font-bold hover:opacity-80 transition-opacity"
          >
            🛍️ S-Store
          </button>

    
           <button
            onClick={() => navigate('/checkout')}
            className="relative flex items-center justify-center bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-colors"
          >
            <ShoppingCart size={24} />

            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold min-w-[20px] h-5 flex items-center justify-center rounded-full px-1">
                {getTotalItems()}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
