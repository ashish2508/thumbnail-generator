"use server";

import { redirect } from "next/navigation";
import { env } from "~/env";
import { db } from "~/server/db";
import Stripe from "stripe";
import { auth } from "@clerk/nextjs/server";

export const redirectToBillingSession = async (priceId: string) => {
  if (![env.STRIPE_10_PACK, env.STRIPE_25_PACK, env.STRIPE_100_PACK].includes(priceId)) {
    throw new Error("Invalid priceId");
  }

  const { userId } = await auth();

  if (!userId) throw new Error("Not authenticated");

  const user = await db.user.findUnique({
    where: { id: userId },
    select: { stripeCustomerId: true },
  });

  if (!user?.stripeCustomerId) {
    throw new Error("User has no stripeCustomerId");
  }

  const stripe = new Stripe(env.STRIPE_SECRET_KEY);

  const session = await stripe.checkout.sessions.create({
    line_items: [{ price: priceId, quantity: 1 }],
    customer: user.stripeCustomerId,
    mode: "payment",
    success_url: `${env.BASE_URL}/api/session-callback`,
  });

  if (!session.url) throw new Error("No session URL");

  redirect(session.url);
};

