'use client';
import ReusableTile from "./ReusableTile";
import React, { useState } from "react";
import { fundamentals } from "../data/fundamentals";

interface CoinData {
    symbol: string;
    name: string;
    description: string;
    homepage: string;
    image: string;
    market_cap_rank: number;
    current_price: string;
    ath: number;
    ath_change_percentage: number;
    ath_date: Date;
    atl: number;
    atl_change_percentage: number;
    atl_date: Date;
    market_cap: number;
    total_volume: number;
    high_24h: number;
    low_24h: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_1y: number;
    last_updated: Date;
}
    
interface PerfomanceProps {
    coin: CoinData | null;
}

const Perfomance: React.FC<PerfomanceProps> = ({ coin }) => {
    const [showFundamentalsTip, setShowFundamentalsTip] = useState(false);

    return (
        <ReusableTile title="Perfomance">
            <div className="flex flex-col">

                <div className="flex text-sm mb-8">
                    <div>
                        <p className="mb-2 w-24 text-gray-600">Today&apos;s Low</p>
                        <p>46,930.22</p>
                    </div>
                    <div className="h-1.5 w-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-lg self-center mx-2 lg:mx-14"></div>
                    <div>
                        <p className="mb-2 w-24 text-end text-gray-600">Today&apos;s High</p>
                        <p className="text-end">49,343.83</p>
                    </div>
                </div>

                <div className="flex text-sm mb-8">
                    <div>
                        <p className="mb-2 w-24 text-gray-600">52W Low</p>
                        <p>16,930.22</p>
                    </div>
                    <div className="h-1.5 w-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-lg self-center mx-2 lg:mx-14"></div>
                    <div>
                        <p className="mb-2 w-24 text-end text-gray-600">52W High</p>
                        <p className="text-end">49,743.83</p>
                    </div>
                </div>

                <div className="flex mb-3">
                    <p className="text-gray-600 text-lg font-semibold">
                        Fundamentals
                    </p>
                    <div className="relative ml-2 self-center">
                        <div 
                            className="cursor-pointer inline-block w-4 h-4 bg-gray-500 rounded-full flex items-center justify-center"
                            onMouseEnter={() => setShowFundamentalsTip(true)}
                            onMouseLeave={() => setShowFundamentalsTip(false)}
                        >
                            <span className="text-xs text-white font-semibold">i</span>
                        </div>
                        {showFundamentalsTip && (
                            <div className="absolute bg-gray-100 p-2 rounded-lg text-sm text-gray-700 w-60 z-10">
                                <ul className="list-disc pl-4">
                                {fundamentals.map((event, index) => 
                                        <li key={index}>{event.title}</li>
                                )}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20">
                    <div>
                        {fundamentals.slice(0, 5).map((event, index) => 
                            <div key={index}>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">{event.title}</span>
                                    <span>{event.numbers}</span>
                                </div>
                                <hr className="border-gray-400 my-4" />
                            </div>
                        )}
                    </div>
                    <div>
                        {fundamentals.slice(5).map((event, index) => 
                            <div key={index}>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">{event.title}</span>
                                    <span>{event.numbers}</span>
                                </div>
                                <hr className="border-gray-400 my-4" />
                            </div>
                        )}
                        <div className="flex flex justify-between text-sm w-full max-h-[20px]">
                            <span className="text-gray-500 self-center">All-Time High</span>
                            <div className="flex flex-col relative -top-[10px]">
                                <span className="self-end">$69,044.77<p className="text-red-500 inline-block ml-1">-75.6%</p></span>
                                <span className="text-xs">Nov 10, 2021 (about 1 year)</span>
                            </div>
                        </div>
                        <hr className="border-gray-400 my-4" />

                        <div className="flex flex justify-between text-sm w-full max-h-[20px]">
                            <span className="text-gray-500 self-center">All-Time Low</span>
                            <div className="flex flex-col relative -top-[10px]">
                                <span className="self-end">$67.81<p className="text-green-500 inline-block ml-1">24749.1%</p></span>
                                <span className="text-xs">Jul 06, 2013 (over 9 years)</span>
                            </div>
                        </div>
                        <hr className="border-gray-400 my-4" />
                    </div>
                    
                </div>
            </div>
        </ReusableTile>
    )
}

export default Perfomance;