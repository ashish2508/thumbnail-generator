import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
    CLERK_SECRET_KEY: z.string(),
    BASE_URL: z.string().url(),
    MY_AWS_ACCESS_KEY: z.string(),
    MY_AWS_SECRET_KEY: z.string(),
    MY_AWS_REGION: z.string(),
    MY_AWS_BUCKET_NAME: z.string(),
    STRIPE_PUBLISHABLE_KEY: z.string(),
    STRIPE_SECRET_KEY: z.string(),
    STRIPE_WEBHOOK_SECRET: z.string(),
    STRIPE_10_PACK: z.string(),
    STRIPE_25_PACK: z.string(),
    STRIPE_100_PACK: z.string(),
  },

  client: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
  },

  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    BASE_URL: process.env.BASE_URL,
    MY_AWS_ACCESS_KEY: process.env.MY_AWS_ACCESS_KEY,
    MY_AWS_SECRET_KEY: process.env.MY_AWS_SECRET_KEY,
    MY_AWS_REGION: process.env.MY_AWS_REGION,
    MY_AWS_BUCKET_NAME: process.env.MY_AWS_BUCKET_NAME,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    STRIPE_10_PACK: process.env.STRIPE_10_PACK,
    STRIPE_25_PACK: process.env.STRIPE_25_PACK,
    STRIPE_100_PACK: process.env.STRIPE_100_PACK,
  },

  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  emptyStringAsUndefined: true,
});

