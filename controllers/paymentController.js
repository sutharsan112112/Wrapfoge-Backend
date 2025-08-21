import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // put your secret key here

export const createCheckoutSession = async (req, res) => {
  try {
    const { customizationId, amount } = req.body;

    if (!amount) return res.status(400).json({ message: 'Amount is required' });

    // Create a Payment Intent (amount in cents)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      metadata: { customizationId }, // optional to track customization
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('Stripe Error:', err);
    res.status(500).json({ message: 'Failed to create payment intent' });
  }
};
