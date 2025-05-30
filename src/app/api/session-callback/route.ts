import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { env } from "~/env";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.redirect(new URL('/sign-in', env.BASE_URL));
  }

  revalidatePath('/dashboard');

  return NextResponse.redirect(new URL('/dashboard', env.BASE_URL));
}

