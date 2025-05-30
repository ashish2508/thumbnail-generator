"use server";

import { revalidatePath } from "next/cache";
import { db } from "~/server/db";
import { auth } from "@clerk/nextjs/server";

export const generate = async () => {
  const { userId } = await auth();

  if (!userId) throw new Error("Not authenticated");

  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      credits: {
        decrement: 1,
      },
    },
  });
};

export const refresh = async () => {
  revalidatePath("/dashboard");
};

