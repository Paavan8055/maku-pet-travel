import Stripe from 'stripe';

// Only initialize Stripe if we have the secret key
export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-07-30.basil',
    })
  : null;

export async function createPaymentIntent(amount: number, currency = 'usd') {
  if (!stripe) {
    throw new Error('Stripe not configured - missing API key');
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency,
      metadata: {
        integration_check: 'accept_a_payment',
      },
    });
    return paymentIntent;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
}
