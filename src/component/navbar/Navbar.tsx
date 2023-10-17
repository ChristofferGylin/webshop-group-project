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
  console.log(menuOpen);
  const handleMenu = (): void => {
    console.log("handlemenu clicked");
    setMenuOpen((value) => !value);
  };

  return (
    <nav className="flex h-16 items-center justify-between">
      <div className="flex items-center justify-center">
        <GiHamburgerMenu
          className="cursor-pointer md:hidden"
          size={30}
          onClick={() => handleMenu()}
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
