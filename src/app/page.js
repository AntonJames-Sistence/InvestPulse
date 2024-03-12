'use client'
import NavBar from "./components/NavBar";
import TradingViewWidget from "./components/TradingViewWidget";
import Team from "./components/Team";
import Tokenomics from "./components/Tokenomics";
import About from "./components/About";
import Sentiment from "./components/Sentiment/Sentiment";
import Perfomance from "./components/Perfomance";
import PerfomanceNav from "./components/PerfomanceNav";
import Banner from "./components/Banner";
import TrendingCoins from "./components/TrendingCoins";
import Footer from "./components/Footer";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import { useRouter } from "next/navigation";

export default function Home() {
  const path = usePathname();

  let coinName;
  if(path){
    coinName = path.substring(1);
  } else {
    coinName = 'bitcoin';
  }
  console.log(coinName)

  return (
    <main className="flex w-full flex-col justify-between bg-gray-200">
      <NavBar/>

      <div className="flex flex-col lg:flex-row self-center w-full px-2 lg:px-16">
        <div className="flex flex-col w-full lg:w-5/6">
          <TradingViewWidget coinName={coinName} />
          <PerfomanceNav />
          <Perfomance />
          <Sentiment />
          <About />
          <Tokenomics />
          <Team />
        </div>

        <div className="flex flex-col lg:mt-14 lg:ml-4 w-full lg:w-1/3">
          <Banner />
          <TrendingCoins />
        </div>
      </div>

      <Footer />
    </main>
  );
}