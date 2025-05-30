"use server";

import { getAuth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Signup from "~/components/ui/signup";

const Page = async () => {
  const { userId } = getAuth();

  if (userId) {
    redirect("/dashboard");
  }

  return <Signup />;
};

export default Page;

