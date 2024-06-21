import { FaChartLine } from "react-icons/fa";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import { GiWallet } from "react-icons/gi";
import { FaBook } from "react-icons/fa6";

export const navLinks = [
    { href: "/news", title: "News", icon: <FaChartLine />, },
    { href: "https://www.coinbase.com/cloud", title: "Explore", icon: <FaChartLine />, },
    { href: "https://www.coinbase.com/learn", title: "Learn", icon: <FaBook />, },
    { href: "https://www.coinbase.com/wallet", title: "Wallet", icon: <GiWallet />, },
    { href: "https://www.coinbase.com/exchange", title: "Exchange", icon: <MdOutlineCurrencyExchange />, },
];