import { useSession } from "next-auth/react";
import SignInButton from "~/component/SignInButton";
import { useState } from "react";
import Link from "next/link";
import {
  AiOutlineUser,
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineMenu,
} from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { FcHome } from "react-icons/fc";
import Hamburger from "./Hamburger";
import Searchbar from "./Searchbar";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { data: session } = useSession();
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

  const handleMenu = (): void => {
    console.log("handlemenu clicked");
    setMenuOpen((value) => !value);
  };

  return (
    <nav className="flex h-16 items-center justify-between">
      <div className="flex items-center justify-center">
        <GiHamburgerMenu
          className="cursor-pointer pl-2 md:hidden"
          size={30}
          onClick={() => handleMenu()}
        />
        <Link
          className="flex h-12 w-24 items-center justify-center rounded-md"
          href="/examplepage"
        >
          <FcHome size={50} />
        </Link>
      </div>
      <div
        id="nav-categories"
        className="flex h-12 w-128 items-center justify-center max-md:hidden"
      >
        <ul
          id="categories"
          className="flex w-full items-center justify-around px-6 font-poppins font-medium"
        >
          <li className="">
            <Link href="/examplepage">Example</Link>
          </li>
          <li>Shoes</li>
          <li>Sportsware</li>
          <li>Hoodies</li>
          <li>Brands</li>
        </ul>
      </div>
      <div id="icons" className="flex w-auto items-center justify-around pr-2">
        <Searchbar />

        {homeButton}
        <div>
          <AiOutlineHeart size={30} />
        </div>
        <div>
          <BiShoppingBag size={30} />
        </div>
      </div>
      {menuOpen ? <Hamburger handleMenu={handleMenu} /> : null}
    </nav>
  );
};

export default Navbar;
