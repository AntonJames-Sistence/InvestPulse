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
import { Auth0Provider } from "@auth0/auth0-react";


export default function Home() {

  const authDomain = process.env.AUTH_PROVIDER_DOMAIN;
  const authClientId = process.env.AUTH_PROVIDER_CLIENTID;

  return (
    <Auth0Provider
      domain={authDomain}
      clientId={authClientId}
      authorizationParams={{
        redirect_uri: 'http://localhost:3000'
      }}
    >
      <main className="flex w-full flex-col justify-between bg-gray-200">
        <Toaster position="top-center" reverseOrder={false} />
        <NavBar/>

        <div className="flex flex-col lg:flex-row self-center w-full px-2 lg:px-16">
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

          <div className="flex flex-col lg:mt-14 lg:ml-4 w-full lg:w-1/3">
            <Banner />
            <TrendingCoins />
          </div>
        </div>

        <Footer />
      </main>
    </Auth0Provider>
  );
}