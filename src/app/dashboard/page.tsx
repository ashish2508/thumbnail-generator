"use server"

import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import Recent from "~/components/recent";
import ThumbnailCreator from "~/components/thumbnail-creator";
import { Button } from "~/components/ui/button";
import { db } from "~/server/db";

const Page = async () => {
  const { userId } = await auth();

  if (!userId) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <p>Please sign in to access this page.</p>
        <Button className="mt-6 w-full">
          <Link href="/signin">Sign In</Link>
        </Button>
      </div>
    );
  }

  const user = await db.user.findUnique({
    where: { id: userId },
    select: { credits: true },
  });

  return (
    <div className="flex h-screen max-w-full items-center justify-center px-4 md:max-w-3xl md:px-0">
      <div className="flex max-w-full flex-col gap-10">
        {user?.credits === 0 ? (
          <div className="flex flex-col px-10 md:mt-10">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Hi there
            </h1>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Want to create a thumbnail?
            </h1>
            <div className="mt-2 flex flex-col gap-3">
              <p className="leading-7 text-muted-foreground">
                Buy more credits to continue generating thumbnails.
              </p>
              <Link href="/dashboard/pricing">
                <Button>Buy credits</Button>
              </Link>
            </div>
            <div className="mt-8">
              <Recent userId={userId} />
            </div>
          </div>
        ) : (
          <ThumbnailCreator>
            <Recent userId={userId} />
          </ThumbnailCreator>
        )}
      </div>
    </div>
  );
};

export default Page;

