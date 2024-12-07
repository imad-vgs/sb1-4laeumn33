import { CheckoutFormData } from '../types/payment';
import { CartItem } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

export async function createPaymentIntent(data: CheckoutFormData, cart: CartItem[]) {
  try {
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: cart,
        customer: data,
      }),
    });

    if (!response.ok) {
      throw new Error('Payment processing failed. Please try again.');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
}