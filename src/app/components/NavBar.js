'use client';
import React, { useState } from "react";
import { navLinks } from "../data/navLinks";
import { GiHamburgerMenu } from "react-icons/gi";

const NavBar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="flex w-full bg-white px-4 lg:px-16 justify-between shadow-lg h-16 lg:h-20 relative">
            <a href="/" className="flex">
                <img className="h-[50px] self-center lg:h-full" src="https://www.koinx.com/_next/static/media/Logo.5f2ad8d5.svg" alt="Logo" />
            </a>

            <div className="flex items-center">
                <div className="lg:hidden">
                    <button 
                        className="block self-center ml-4 focus:outline-none"
                        onClick={toggleDropdown}
                    >
                        <GiHamburgerMenu className="text-xl" />
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute top-full left-0 bg-white w-full border shadow-lg">
                            {navLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    className="block px-4 py-2 font-[500] text-center border-b last:border-0"
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    {link.title}
                                </a>
                            ))}
                        </div>
                    )}
                </div>

                <div className="hidden lg:flex justify-between flex-grow">
                    {navLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            className="self-center mx-4 font-[500]"
                        >
                            {link.title}
                        </a>
                    ))}
                </div>

                <button className="hidden lg:block bg-blue-700 hover:bg-blue-900 text-white font-[500] py-2 px-6 ml-10 h-10 self-center rounded-xl">
                    Get Started
                </button>
            </div>
        </nav>
    )
}

export default NavBar;
