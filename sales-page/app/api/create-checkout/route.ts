import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST() {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2024-11-20.acacia' as any,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'ReviewRush - Local Business Review Toolkit',
              description: 'Complete system: 10 email templates, 5 SMS scripts, verbal scripts, QR code guide, timing strategy, 7-day follow-up sequence.',
            },
            unit_amount: 4700, // $47.00
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://reviewrush-pacino-bots-projects.vercel.app'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://reviewrush-pacino-bots-projects.vercel.app'}/`,
    }, {
      stripeAccount: process.env.STRIPE_ACCOUNT_ID || 'acct_1T4AreCDxYH1XF8F',
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe error:', error);
    return NextResponse.json(
      { 
        error: 'Payment processing error',
        details: error.message,
        type: error.type,
        hasKey: !!process.env.STRIPE_SECRET_KEY
      },
      { status: 500 }
    );
  }
}
