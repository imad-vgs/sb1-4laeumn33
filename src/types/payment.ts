export interface PaymentIntent {
  clientSecret: string;
}

export interface CheckoutFormData {
  name: string;
  email: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
}