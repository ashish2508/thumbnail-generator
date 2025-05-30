import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.redirect(new URL('/sign-in', process.env.NEXT_PUBLIC_BASE_URL));
  }

  revalidatePath('/dashboard');

  return NextResponse.redirect(new URL('/dashboard', process.env.NEXT_PUBLIC_BASE_URL));
}

