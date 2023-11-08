import { signIn, signOut, useSession } from "next-auth/react";

const SignInOutButton = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <button
        className="rounded-lg border border-slate-300 bg-slate-100 px-2 py-1 hover:bg-slate-200"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    );
  }

  return (
    <button
      className="rounded-lg border border-slate-300 bg-slate-100 px-2 py-1 hover:bg-slate-200"
      onClick={() => signIn()}
    >
      Sign In
    </button>
  );
};

export default SignInOutButton;
