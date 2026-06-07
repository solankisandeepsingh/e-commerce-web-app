import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';

const HomePage = React.lazy(() => import('./pages/HomePage'));
const ProductDetailPage = React.lazy(() => import('./pages/ProductDetailPage'));
const CheckoutPage = React.lazy(() => import('./pages/CheckoutPage'));

export default function App(): JSX.Element {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
      <CartProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />

            <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto w-full">
              <Suspense
                fallback={
                  <div className="flex justify-center items-center h-64">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                }
              >
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/product/:id/details" element={<ProductDetailPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                </Routes>
              </Suspense>
            </main>

            <Footer />
          </div>
        </Router>
      </CartProvider>
    </>
  );
}
