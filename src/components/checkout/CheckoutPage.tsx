import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { CheckoutForm } from './CheckoutForm';
import { PaymentForm } from './PaymentForm';
import { CheckoutFormData } from '../../types/payment';
import { createPaymentIntent } from '../../services/api';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'checkout' | 'payment'>('checkout');
  const [clientSecret, setClientSecret] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { cart, clearCart } = useStore();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckoutSubmit = async (data: CheckoutFormData) => {
    try {
      setError(null);
      const { clientSecret } = await createPaymentIntent(data, cart);
      setClientSecret(clientSecret);
      setStep('payment');
    } catch (err) {
      setError('Failed to process payment. Please try again.');
      console.error('Error creating payment intent:', err);
    }
  };

  const handlePaymentSuccess = () => {
    clearCart();
    navigate('/payment-success');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
          <div className="border-t pt-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between mb-2">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2 font-bold flex justify-between">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        {step === 'checkout' ? (
          <CheckoutForm onSubmit={handleCheckoutSubmit} />
        ) : (
          <PaymentForm
            clientSecret={clientSecret}
            onPaymentSuccess={handlePaymentSuccess}
          />
        )}
      </div>
    </div>
  );
};