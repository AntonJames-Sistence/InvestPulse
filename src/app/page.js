import React from "react";
import NavBar from "./components/NavBar";
import CryptoPrices from "./components/CryptoPrices";
import TradingViewWidget from "./components/TradingViewWidget";
import Team from "./components/Team";

export default function Home() {
  return (
    <main className="flex w-full flex-col justify-between bg-gray">
      <NavBar/>

      <div className="flex flex-col self-center w-full px-16">
        <div className="p-4 flex justify-start">Cryptocurrencies &gt;&gt; Bitcoin need to complete this section later and dynamic arrow as well</div>

        {/* <CryptoPrices /> */}
        <div className="w-4/6">

          {/* <TradingViewWidget /> */}
          <Team />
        </div>

      </div>

    </main>
  );
}
