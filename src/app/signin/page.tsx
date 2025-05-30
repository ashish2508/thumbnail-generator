"use server";

import { getAuth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Signin from "~/components/ui/signin";

const Page = async () => {
  const { userId } = getAuth();

  if (userId) {
    redirect("/dashboard");
  }

  return <Signin />;
};

export default Page;

