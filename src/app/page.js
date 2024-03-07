import React from "react";
import NavBar from "./components/NavBar";
import TradingViewWidget from "./components/TradingViewWidget";
import Team from "./components/Team";
import Tokenomics from "./components/Tokenomics";
import About from "./components/About";

export default function Home() {
  return (
    <main className="flex w-full flex-col justify-between bg-gray">
      <NavBar/>

      <div className="flex flex-col self-center w-full px-16">
        <div className="p-4 flex justify-start">Cryptocurrencies &gt;&gt; Bitcoin need to complete this section later and dynamic arrow as well</div>

        
        <div className="w-4/6">

          {/* <TradingViewWidget /> */}
          <About />
          <Tokenomics />
          <Team />
        </div>

      </div>

    </main>
  );
}
