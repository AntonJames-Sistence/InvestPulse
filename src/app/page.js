"use client";

import Team from "./components/Team";
import Tokenomics from "./components/Tokenomics";
import TrendingCoins from "./components/TrendingCoins/TrendingCoins";
import { Toaster } from "react-hot-toast";
import News from "./components/News/News";
import { Suspense } from "react";
import CoinDataProvider from "./components/Perfomance/CoinDataProvider";


export default function Home() {
  return (
    <main className="flex w-full flex-col justify-between">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex flex-col lg:flex-row self-center w-full mt-28 px-2 lg:px-16">
        {/* Left side of the page */}
        <div className="flex flex-col w-full lg:w-5/6">
          <Suspense>
            <CoinDataProvider />
          </Suspense>
          {/* <Sentiment /> */}
          <Tokenomics />
          <Team />
        </div>

        {/* Right side of the page */}
        <div className="flex flex-col lg:ml-4 w-full lg:w-1/3">
          <News limit={3}/>
          <TrendingCoins />
        </div>
      </div>
    </main>
  );
}
