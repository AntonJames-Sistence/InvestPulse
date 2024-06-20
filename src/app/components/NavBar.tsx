'use client';

import { motion } from "framer-motion";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "../data/navLinks";
import Image from "next/image";
import logo from "../../../public/koiny.jpeg";
import LoginButton from "./Auth/LoginButton";

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const path = usePathname();

  return (
    <nav className="fixed top-0 left-0 w-full z-30 bg-white shadow-md items-center">
      <div className="px-4 pt-2 flex justify-between items-center">
        <Link href="/" className="flex items-center">
            <Image
                src={logo}
                alt="KoinY logo"
                className="rounded-xl h-[50px] w-auto"
                priority={true}
            />
            <span className="ml-2 text-2xl font-bold text-primary">KoinY</span>
        </Link>

        <div className="flex items-center">
          <div className="hidden lg:flex space-x-5">
            {navLinks.map((navlink, index) => (
              <Link
                key={index}
                href={navlink.href}
                className={`hover:text-blue-600 px-3 py-2 rounded-md font-medium transition-colors duration-300 ${
                  path === navlink.href ? "text-blue-600" : "text-gray-800"
                }`}
              >
                {navlink.title}
              </Link>
            ))}
          </div>
          
          <LoginButton />

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-black hover:text-blue-600 focus:outline-none focus:text-blue-600 ml-4"
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      <motion.div animate={isOpen ? "open" : "closed"} className="relative mt-4">
        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: "top" }}
          className="flex flex-col bg-white shadow-xl absolute w-full overflow-hidden"
        >
          {navLinks.map((navlink, index) => (
            <Option
              key={index}
              href={navlink.href}
              title={navlink.title}
              icon={navlink.icon}
              setIsOpen={setIsOpen}
            />
          ))}
        </motion.ul>
      </motion.div>
    </nav>
  );
}

interface OptionProps {
    title: string;
    href: string;
    icon: React.ReactNode;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
  
const Option: React.FC<OptionProps> = ({ title, href, icon, setIsOpen }) => {
    return (
        <motion.li
          variants={itemVariants}
          className="flex justify-left w-full text-2xl ml-2 md:ml-6 font-medium whitespace-nowrap hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors duration-200 cursor-pointer last:mb-4"
        >
          <Link href={href} className="flex flex-row px-3 py-2 items-center" onClick={() => setIsOpen(false)}>
            <span className="mr-2">{icon}</span>
            {title}
          </Link>
        </motion.li>
      );
};

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -25,
    transition: {
      when: "afterChildren",
    },
  },
};

export default NavBar;
