import React from "react";
import NavBar from "./components/NavBar";
import TradingViewWidget from "./components/TradingViewWidget";
import Team from "./components/Team";
import Tokenomics from "./components/Tokenomics";
import About from "./components/About";
import { HiMiniChevronDoubleRight } from "react-icons/hi2";
import Sentiment from "./components/Sentiment/Sentiment";
import Perfomance from "./components/Perfomance";

export default function Home() {
  return (
    <main className="flex w-full flex-col justify-between bg-gray">
      <NavBar/>

      <div className="flex flex-col self-center w-full px-16">
        <div className="py-4 flex justify-start">
          <p className="text-gray-600">Cryptocurrencies</p>
          <HiMiniChevronDoubleRight className="self-center ml-2 mr-1 text-gray-600" /> 
          <p className="font-semibold">Bitcoin </p>
        </div>

        
        <div className="w-4/6">

          {/* <TradingViewWidget /> */}
          <Perfomance />
          <Sentiment />
          <About />
          <Tokenomics />
          <Team />
        </div>

      </div>

    </main>
  );
}
