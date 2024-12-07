import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { products } from './data/products';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <h1 className="text-3xl font-bold mb-6">Our Products</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </div>
                  <div className="md:col-span-1">
                    <Cart />
                  </div>
                </div>
              </main>
            }
          />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment-success" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;