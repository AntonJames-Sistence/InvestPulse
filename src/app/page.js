import React from "react";
import NavBar from "./components/NavBar";
import TradingViewWidget from "./components/TradingViewWidget";
import Team from "./components/Team";
import Tokenomics from "./components/Tokenomics";
import About from "./components/About";
import { HiMiniChevronDoubleRight } from "react-icons/hi2";
import Sentiment from "./components/Sentiment/Sentiment";
import Perfomance from "./components/Perfomance";
import PerfomanceNav from "./components/PerfomanceNav";
import Banner from "./components/Banner";
import TrendingCoins from "./components/TrendingCoins";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="flex w-full flex-col justify-between bg-gray-200">
      <NavBar/>

      <div className="py-4 flex px-2 lg:px-16">
        <p className="text-gray-600">Cryptocurrencies</p>
        <HiMiniChevronDoubleRight className="self-center ml-2 mr-1 text-gray-600" /> 
        <p>Bitcoin </p>
      </div>

      <div className="flex flex-col lg:flex-row self-center w-full px-2 lg:px-16">
        <div className="flex flex-col w-full lg:w-5/6">
          <TradingViewWidget />
          <PerfomanceNav />
          <Perfomance />
          <Sentiment />
          <About />
          <Tokenomics />
          <Team />
        </div>

        <div className="flex flex-col lg:ml-4 w-full lg:w-1/3">
          <Banner />
          <TrendingCoins />
        </div>
      </div>

      <Footer />
    </main>
  );
}
