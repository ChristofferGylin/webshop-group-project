import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

export default function Example() {
  return (
    <div className="flex flex-col justify-center items-center border-solid border-slate-950 border-2 h-96">
      <p>example-page for dev</p>
      <Link href="/">Home</Link>
    </div>
  );
}