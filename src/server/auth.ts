import { getAuth } from "@clerk/nextjs/server";

export const getCurrentUser = () => {
  const { userId } = getAuth();
  if (!userId) return null;
  return { id: userId };
};

