import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { StripePaymentForm } from './StripePaymentForm';
import { stripePromise } from '../../services/stripe';

interface PaymentFormProps {
  clientSecret: string;
  onPaymentSuccess: () => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  clientSecret,
  onPaymentSuccess,
}) => {
  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <StripePaymentForm onPaymentSuccess={onPaymentSuccess} />
    </Elements>
  );
};