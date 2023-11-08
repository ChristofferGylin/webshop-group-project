import { signOut } from "next-auth/react";

const SignOutButton = () => {
  return (
    <button
      className="rounded-lg border border-slate-300 bg-slate-100 px-2 py-1 hover:bg-slate-200"
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
