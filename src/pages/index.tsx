import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import SignInButton from "~/component/SignInButton";
import { api } from "~/utils/api";
import { useState } from "react";
import Image from "next/image";
import {
  AiOutlineUser,
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineMenu,
} from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { FcHome } from "react-icons/fc";
import ProductCollection from "~/component/ProductCollection";

import Navbar from "~/component/navbar/Navbar";
import Hamburger from "~/component/navbar/Hamburger";

export default function Home() {
  const { data: session } = useSession();

  const allProducts = api.product.getAllProducts.useQuery().data;

  let homeButton;
  if (!session || !session.user) {
    homeButton = <SignInButton />;
  } else {
    homeButton = (
      <Link href={"/"}>
        <AiOutlineUser size={30} />
      </Link>
    );
  }

  return (
    <>
      <Head>
        <title>Clothing store</title>
        <meta name="description" content="clothes" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,400;0,700;0,900;1,100&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main className="flex h-screen min-h-screen w-full flex-col bg-slate-50">
        <Navbar />

        <div className="grid h-screen w-full items-center justify-center bg-slate-50 ">
          {allProducts && <ProductCollection products={allProducts} />}
        </div>
      </main>
    </>
  );
}
// const hello = api.example.hello.useQuery({ text: "from tRPC" });
// {hello.data ? hello.data.greeting : "Loading tRPC query..."}
/* function AuthShowcase() {
  const { data: sessionData } = useSession();
  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
} */
