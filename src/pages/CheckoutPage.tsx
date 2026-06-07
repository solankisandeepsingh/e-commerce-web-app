import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ArrowLeft, Trash2, Plus, Minus, Check } from 'lucide-react';

interface Quantities {
  [productId: string]: number;
}

export default function CheckoutPage(): JSX.Element {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, removeFromCart, updateQty } = useCart();
  const [quantities, setQuantities] = useState<Quantities>({});
  const [orderPlaced] = useState(false);

  const handleQuantityChange = (productId: number | string, newQuantity: number): void => {
    if (newQuantity < 1) return;
    setQuantities((prev) => ({
      ...prev,
      [productId]: newQuantity,
    }));
    updateQty(productId, newQuantity);
  };

  const handleRemoveItem = (productId: number | string): void => {
    removeFromCart(productId);
    const newQuantities = { ...quantities };
    delete newQuantities[productId];
    setQuantities(newQuantities);
  };

  if (orderPlaced) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-2xl p-8 text-center max-w-md">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 rounded-full p-3">
              <Check className="text-green-600" size={48} />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Order Placed!</h1>
          <p className="text-gray-600 mb-2">Thank you for your purchase</p>
          <p className="text-gray-600 mb-6">You will be redirected to home page...</p>
          <p className="text-2xl font-bold text-green-600">✓ Success</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Add some products before checking out</p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="pb-12">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold mb-8 transition-colors"
      >
        <ArrowLeft size={20} />
        Continue Shopping
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-gray-200">
              

                   <img
                                   src={item.images?.[0] || "/defaultImage.jpg"}
                                     onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                       e.currentTarget.onerror = null;
                                       e.currentTarget.src = "/defaultImage.jpg";
                                    }}
                                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg border"
                                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-sm sm:text-md  text-gray-900">{item.title}</h3>
        
                    <p className="font-bold text-gray-900">
                      ${(item.price * (quantities[item.id] || item.quantity)).toFixed(2)}
                    </p>
                           </div>

                  <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => handleQuantityChange(item.id, (quantities[item.id] || item.quantity) - 1)}
                      className="p-1 hover:bg-gray-200 rounded transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-1 sm:px-3 font-semibold text-gray-900">
                      {quantities[item.id] || item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item.id, (quantities[item.id] || item.quantity) + 1)}
                      className="p-1 hover:bg-gray-200 rounded transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                 

                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Total</h2>

            <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>${getTotalPrice()}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span className="text-green-600 font-semibold">FREE</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Tax</span>
                <span>${(parseFloat(getTotalPrice()) * 0.1).toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-bold text-gray-900">Total</span>
              <span className="text-3xl font-bold text-red-600">
                ${(parseFloat(getTotalPrice()) + parseFloat(getTotalPrice()) * 0.1).toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => navigate('/')}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-3 rounded-lg transition-colors"
            >
              Continue Shopping
            </button>

            <div className="mt-6 space-y-2 text-sm text-gray-600">
              <p>✓ Secure checkout</p>
              <p>✓ 30-day returns</p>
              <p>✓ Free shipping</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
