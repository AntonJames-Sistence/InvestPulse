import React from "react";
import NavBar from "./components/NavBar";
import CryptoPrices from "./components/CryptoPrices";

export default function Home() {
  return (
    <main className="flex w-full flex-col justify-between bg-gray">
      <NavBar/>

      <div className="p-4 flex justify-start">Cryptocurrencies &gt;&gt; Bitcoin</div>

      <CryptoPrices />

    </main>
  );
}
