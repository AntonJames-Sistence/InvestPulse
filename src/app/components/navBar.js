import Link from "next/link";
import React from "react";
import { navLinks } from "../data/navLinks";

const NavBar = () => {


    return (
        <nav className="flex w-full bg-white px-10 justify-between shadow-lg h-20">
            <Link href="/">
                <img className="h-[50px] lg:h-full" src="https://www.koinx.com/_next/static/media/Logo.5f2ad8d5.svg" />
            </Link>
            <div className="flex">
                {navLinks.map((link, index) => (
                    <Link 
                        key={index}
                        href={link.href}
                        className="self-center mx-4 font-[500]"
                        >
                        {link.title}
                    </Link>
                ))}

                <button className="bg-blue-700 hover:bg-blue-900 text-white font-[500] py-2 px-6 ml-10 h-10 self-center rounded-xl">
                    Get Started
                </button>
            </div>
        </nav>
    )
}

export default NavBar;