'use client';
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
import { Suspense } from 'react';
import { Toaster } from "react-hot-toast";
import News from "./components/News";


export default function Home() {

  return (
    <main className="flex w-full flex-col justify-between">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex flex-col lg:flex-row self-center w-full mt-28 px-2 lg:px-16">
        {/* Left side of the page */}
        <div className="flex flex-col w-full lg:w-5/6">
          <Suspense>
            <TradingViewWidget />
          </Suspense>
          {/* <PerfomanceNav /> */}
          
          <Sentiment />
          <About />
          <Tokenomics />
          <Team />
        </div>

        {/* Right side of the page */}
        <div className="flex flex-col lg:ml-4 w-full lg:w-1/3">
          {/* <Banner /> */}
          <News />
          <TrendingCoins />
        </div>
      </div>
    </main>
  );
}