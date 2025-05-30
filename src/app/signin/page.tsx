import { SignIn } from '@clerk/nextjs';

const Page = () => {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
      <SignIn routing="path" path="/signin" afterSignInUrl="/dashboard" />
    </div>
  );
};

export default Page;
