'use client'
import Link from "next/link";
import React, { useState } from "react";
import { navLinks } from "../data/navLinks";
import { GiHamburgerMenu } from "react-icons/gi";

const NavBar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="flex w-full bg-white px-4 lg:px-16 justify-between shadow-lg h-16 lg:h-20">
            <Link href="/" className="flex">
                <img className="h-[50px] self-center lg:h-full" src="https://www.koinx.com/_next/static/media/Logo.5f2ad8d5.svg" />
            </Link>

            <div className="flex">
                <button 
                    className="block lg:hidden self-center mr-4 focus:outline-none"
                    onClick={toggleDropdown}
                >
                    <GiHamburgerMenu className="text-xl" />
                </button>
                {isDropdownOpen ? (
                    <div className="flex flex-col lg:hidden">
                        {navLinks.map((link, index) => (
                            <Link
                                key={index}
                                href={link.href}
                                className="self-center mx-4 font-[500] text-center"
                            >
                                {link.title}
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="hidden lg:flex">
                        {navLinks.map((link, index) => (
                            <Link
                                key={index}
                                href={link.href}
                                className="self-center mx-4 font-[500]"
                            >
                                {link.title}
                            </Link>
                        ))}
                    </div>
                )}

                <button className="hidden lg:block bg-blue-700 hover:bg-blue-900 text-white font-[500] py-2 px-6 ml-10 h-10 self-center rounded-xl">
                    Get Started
                </button>
            </div>
        </nav>
    )
}

export default NavBar;