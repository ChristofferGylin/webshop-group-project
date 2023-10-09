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

export default function Home() {
  const { data: session } = useSession();
  let homeButton;

  if (!session || !session.user) {
    homeButton = <SignInButton />;
  } else {
    homeButton = (
      <Link href={"/examplepage"}>
        <AiOutlineUser size={30} />
      </Link>
    );
  }

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  console.log(menuOpen, "menu open");
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
        <nav className="flex h-16 items-center justify-between">
          <div className="flex items-center justify-center">
            <GiHamburgerMenu
              className="cursor-pointer md:hidden"
              size={30}
              onClick={() => setMenuOpen((bol) => !bol)}
            />
            <Link
              className="flex h-12 w-24 items-center justify-center rounded-md"
              href="/examplepage"
            >
              <FcHome size={50} />
              <p className="text-l">NAME</p>
            </Link>
          </div>

          <div
            id="nav-categories"
            className="flex h-12 w-128 items-center justify-center max-md:hidden"
          >
            <ul
              id="categories"
              className="flex w-full items-center justify-around font-poppins font-medium"
            >
              <li className="">
                <Link href="/examplepage">Example</Link>
              </li>
              <li>Shoes</li>
              <li>Sportsware</li>
              <li>Hoodies</li>
              <li>Bottoms</li>
              <li>Brands</li>
            </ul>
          </div>

          <div className="flex w-48 items-center justify-around">
            <div>
              <AiOutlineSearch size={30} />
            </div>

            <SignInButton></SignInButton>

            <div>
              <AiOutlineHeart size={30} />
            </div>
            <div>
              <BiShoppingBag size={30} />
            </div>
          </div>

          {menuOpen ? (
            <div
              className="absolute left-0 top-16 z-10 h-screen w-72 border-4 bg-slate-50 md:hidden"
              onClick={() => setMenuOpen((bol) => !bol)}
            >
              <p>menu-div</p>
            </div>
          ) : null}
        </nav>

        <div className="grid h-screen w-full items-center justify-center bg-slate-300 bg-gradient-to-r from-purple-500 to-pink-500"></div>
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
