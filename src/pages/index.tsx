import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import SignInButton from "~/component/SignInButton";

import { api } from "~/utils/api";
import { useState } from "react"
import Image from 'next/image'

import { AiOutlineUser, AiOutlineSearch, AiOutlineHeart, AiOutlineMenu } from "react-icons/ai"
import { BiShoppingBag } from "react-icons/bi"
import { GiHamburgerMenu } from "react-icons/gi"
import { FcHome } from "react-icons/fc"


export default function Home() {

  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  console.log(menuOpen, "menu open")
  return (
    <>
      <Head>
        <title>Clothing store</title>
        <meta name="description" content="clothes" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,400;0,700;0,900;1,100&display=swap" rel="stylesheet" />
      </Head>

      <main className="flex flex-col h-screen min-h-screen w-full bg-slate-50">

         <nav className="flex justify-between items-center h-16">
          <div className="flex justify-center items-center">
            <GiHamburgerMenu className="md:hidden cursor-pointer" size={30} onClick={() => setMenuOpen(bol => !bol)}/> 
            <Link className="flex justify-center items-center h-12 w-24 rounded-md" href="/examplepage">
              <FcHome size={50}/>
              <p className="text-l">NAME</p>
            </Link>
          </div>
<<<<<<< HEAD
           
            <div id="nav-categories" className="flex justify-center items-center h-12 w-128 max-md:hidden">
              <ul id="categories" className="w-full flex justify-around items-center font-poppins font-medium">
                <li className="">
                  <Link href="/examplepage">Example</Link>
                </li> 
                <li>
                  Shoes
                </li>
                <li>
                  Sportsware
                </li>
                <li>
                  Hoodies
                </li>
                <li>
                  Bottoms
                </li>
                <li>
                  Brands
                </li>
              </ul>
            </div>
            
            <div className="flex justify-around items-center w-48">    
              <div><AiOutlineSearch size={30}/></div>
              <Link href={"/examplepage"}><AiOutlineUser size={30}/></Link>
              <div><AiOutlineHeart size={30}/></div>
              <div><BiShoppingBag size={30}/></div>  
            </div>

            {menuOpen ? 
              <div className="z-10 bg-slate-50 h-screen w-72 absolute left-0 top-16 border-4 md:hidden" onClick={() => setMenuOpen(bol => !bol)}>
                <p>menu-div</p>
              </div> : null
            }
          </nav>

          

          <div className="w-full h-screen grid justify-center items-center bg-slate-300 bg-gradient-to-r from-purple-500 to-pink-500"> 
           
=======
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
            <SignInButton />
>>>>>>> auth
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
    { enabled: sessionData?.user !== undefined }
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
