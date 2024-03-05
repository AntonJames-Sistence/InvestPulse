import Image from "next/image";
import NavBar from "./components/navBar";
import React from "react";

export default function Home() {
  return (
    <main className="flex w-full flex-col justify-between">
      <NavBar/>

      <div className="p-4 flex justify-start">Cryptocurrencies &gt;&gt; Bitcoin</div>

    </main>
  );
}
