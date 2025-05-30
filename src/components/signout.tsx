"use client";

import { useClerk } from "@clerk/nextjs";
import { PiSignOutLight } from "react-icons/pi";

const Signout = () => {
  const { signOut } = useClerk();

  return (
    <PiSignOutLight
      onClick={() => signOut()}
      className="h-6 w-6 cursor-pointer"
    />
  );
};

export default Signout;

