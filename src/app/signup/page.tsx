import { SignUp } from '@clerk/nextjs';

const Page = () => {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
      <SignUp routing="path" path="/signup" afterSignUpUrl="/dashboard" />
    </div>
  );
};

export default Page;
