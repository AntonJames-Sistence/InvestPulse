'use client';
import React, { useState } from "react";
import { navLinks } from "../data/navLinks";
import { GiHamburgerMenu } from "react-icons/gi";
import LoginButton from "./Auth/LoginButton";
import LogoutButton from "./Auth/LogoutButton";
import Profile from "./Auth/Profile";
import { useAuth0 } from '@auth0/auth0-react';

const NavBar: React.FC = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { isAuthenticated } = useAuth0();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="flex w-full bg-white px-4 lg:px-16 justify-between shadow-lg h-16 lg:h-20 relative">
            <a href="/" className="flex h-3/4 self-center">
                <img className="rounded-xl self-center h-[50px] lg:h-full" src="/koiny.jpeg" alt="Logo" />
                <p className="self-center text-xl text-blue-700 uppercase font-bold ml-2">KoinY</p>
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
                            className="self-center mx-4 font-[500] hover:text-blue-500 duration-200 easy-in-out"
                        >
                            {link.title}
                        </a>
                    ))}
                </div>

                <div className="flex flex-row">
                    {isAuthenticated ? (
                        <div className="flex items-center">
                            {/* <Profile /> */}
                            <LogoutButton />
                        </div>
                    ) : (
                        <LoginButton />
                    )}
                </div>
                {/* <a href="https://www.coinbase.com/signup" target="_blanc">
                    <button className="hidden lg:block bg-blue-700 hover:bg-blue-400 duration-200 easy-in-out text-white font-[500] py-2 px-6 ml-10 h-10 self-center rounded-xl">
                        Get Started
                    </button>
                </a> */}
            </div>
        </nav>
    )
}

export default NavBar;
