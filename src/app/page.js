'use client';

import Team from "./components/Team";
import Tokenomics from "./components/Tokenomics";
import Sentiment from "./components/Sentiment/Sentiment";
import Banner from "./components/Banner";
import TrendingCoins from "./components/TrendingCoins";
import { Toaster } from "react-hot-toast";
import News from "./components/News";
import { Suspense } from "react";
import CoinDataProvider from "./components/Perfomance/CoinDataProvider";
import { Provider } from "react-redux";
import store from "./store";

export default function Home() {

  return (
    <Provider store={store}>
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
            {/* <Banner /> */}
            <News />
            <TrendingCoins />
          </div>
        </div>
      </main>
    </Provider>
  );
}