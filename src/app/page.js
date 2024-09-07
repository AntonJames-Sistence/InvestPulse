'use client';

import Team from './components/Team';
import Tokenomics from './components/Tokenomics';
import TrendingCoins from './components/TrendingCoins/TrendingCoins';
import { Toaster } from 'react-hot-toast';
import HomePageNews from './components/HomePageNews';
import { Suspense } from 'react';
import StockDataProvider from './components/Perfomance/StockDataProvider';

export default function Home() {
  return (
    <main className="flex w-full flex-col justify-between">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex flex-col lg:flex-row self-center w-full mt-20 px-2 lg:px-16">
        {/* Left side of the page */}
        <div className="flex flex-col w-full lg:w-5/6">
          <Suspense>
            <StockDataProvider />
          </Suspense>
          {/* <Sentiment /> */}
          {/* <Tokenomics />
          <Team /> */}
        </div>

        {/* Right side of the page */}
        <div className="flex flex-col lg:ml-4 w-full lg:w-1/3">
          {/* <TrendingCoins />
          <HomePageNews /> */}
        </div>
      </div>
    </main>
  );
}
