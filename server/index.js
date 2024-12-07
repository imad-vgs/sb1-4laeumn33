import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  try {
    const { items, customer } = req.body;
    
    if (!items?.length) {
      return res.status(400).json({ error: 'No items in cart' });
    }

    // Calculate total amount
    const amount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        customerName: customer.name,
        customerEmail: customer.email,
        shippingAddress: `${customer.address}, ${customer.city}, ${customer.country} ${customer.postalCode}`,
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ 
      error: 'Payment processing failed. Please try again.' 
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});