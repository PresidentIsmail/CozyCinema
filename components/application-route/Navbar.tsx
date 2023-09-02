"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/images/netflix-logo.png";
import { Button } from "../ui/button";

type Props = {};

const Navbar = (props: Props) => {
  // check for a scroll event and add a class to the navbar
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  function handleScroll() {
    if (window.scrollY > 10) {
      setScroll(true);
      console.log("scrolling");
    } else {
      setScroll(false);
    }
  }

  // define classes based on the scroll state. the navbar will remain fixed at the top of the page when the user scrolls down
  const navbarClasses = scroll ? "bg-black bg-opacity-90" : "";

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 flex items-center px-16 py-4 ${navbarClasses}`}
    >
      <div className="flex items-center mr-4">
        <Link href="/">
          <Image src={logo} alt="Netflix Logo" width={125} priority />
        </Link>
      </div>

      <div className="flex  uppercase items-center">
        <NavLink href="#">movies</NavLink>
        <NavLink href="#">shows</NavLink>
        <NavLink href="#">documentaries</NavLink>
        <NavLink href="#">my list</NavLink>
      </div>

      <div className="ml-auto flex items-center justify-center gap-x-4">
        <Button
          asChild
          variant="ghost"
          className="rounded-lg px-[25px] py-[10px] text- font-bold uppercase text-white hover:bg-[#40445999] hover:text-white"
        >
          <Link href="/login">Sign In</Link>
        </Button>
        <Button
          asChild
          // variant="ghost"
          className="rounded-lg border-[#c11119] bg-[#e50914] px-[25px] py-[10px] text-base font-bold uppercase text-white  outline outline-0 outline-[#c11119] hover:bg-[#c11119] hover:text-white hover:outline-2"
        >
          <Link href="/login">Log In</Link>
        </Button>
      </div>
    </nav>
  );
};

// component for displaying navbar links
type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};

const NavLink = ({ href, children }: NavLinkProps) => {
  return (
    <Button
      asChild
      variant="ghost"
      className="rounded-lg px-[10px] py-[10px] h-fit text-sm font-bold uppercase text-white hover:bg-[#40445999] hover:text-white"
    >
      <Link href={`${href}`}>{children}</Link>
    </Button>
  );
};

export default Navbar;
