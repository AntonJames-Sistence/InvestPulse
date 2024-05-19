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
    current_price: number;
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

export const formatAsUSD = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
};

export const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
    }).format(new Date(date));
};

const Perfomance: React.FC<PerfomanceProps> = ({ coin }) => {
    const [showFundamentalsTip, setShowFundamentalsTip] = useState(false);
    console.log(coin)

    return (
        <ReusableTile title={`${coin?.name} Perfomance`}>
            <div className="flex flex-col">

                <div className="flex text-sm mb-8">
                    <div>
                        <p className="mb-2 w-24 text-gray-600">Today&apos;s Low</p>
                        <p>{formatAsUSD(coin?.low_24h ?? 0)}</p>
                    </div>
                    <div className="h-1.5 w-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-lg self-center mx-2 lg:mx-14"></div>
                    <div>
                        <p className="mb-2 w-24 text-end text-gray-600">Today&apos;s High</p>
                        <p className="text-end">{formatAsUSD(coin?.high_24h ?? 0)}</p>
                    </div>
                </div>

                <div className="flex text-sm mb-8">
                    <div>
                        <p className="mb-2 w-24 text-gray-600">All Time Low</p>
                        <p>{formatAsUSD(coin?.atl ?? 0)}</p>
                    </div>
                    <div className="h-1.5 w-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-lg self-center mx-2 lg:mx-14"></div>
                    <div>
                        <p className="mb-2 w-24 text-end text-gray-600">All Time High</p>
                        <p className="text-end">{formatAsUSD(coin?.ath ?? 0)}</p>
                    </div>
                </div>

                <div className="flex mb-3">
                    <p className="text-gray-600 text-lg font-semibold">
                        Fundamentals
                    </p>
                    {/* <div className="relative ml-2 self-center">
                        <div 
                            className="cursor-pointer inline-block w-4 h-4 bg-gray-500 rounded-full flex items-center justify-center"
                            onMouseEnter={() => setShowFundamentalsTip(true)}
                            onMouseLeave={() => setShowFundamentalsTip(false)}
                        >
                            <span className="text-xs text-white font-semibold">i</span>
                        </div>
                        {showFundamentalsTip && (
                            <div className="absolute bg-gray-100 p-2 rounded-lg text-sm text-gray-700 z-10">
                                {coin?.description}
                            </div>
                        )}
                    </div> */}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20">
                    <div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Current Price</span>
                            <span>{formatAsUSD(coin?.current_price ?? 0)}</span>
                        </div>
                        <hr className="border-gray-400 my-4" />
                    </div>
                    <div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">{`All Time High Date`}</span>
                            <span>{formatDate(coin?.ath_date ?? new Date())}</span>
                        </div>
                        <hr className="border-gray-400 my-4" />
                    </div>

                    <div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Symbol</span>
                            <div className="flex items-center">
                                <img className="h-5 inline-block mr-2" src={coin?.image} alt={coin?.symbol}></img>
                                <div>{coin?.symbol.toUpperCase()}</div>
                            </div>
                        </div>
                        <hr className="border-gray-400 my-4" />
                    </div>
                    <div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">{`All Time High Change`}</span>
                            <span>{`${coin?.ath_change_percentage}%`}</span>
                        </div>
                        <hr className="border-gray-400 my-4" />
                    </div>

                    <div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Market Cap</span>
                            <span>{formatAsUSD(coin?.market_cap ?? 0)}</span>
                        </div>
                        <hr className="border-gray-400 my-4" />
                    </div>
                    <div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">{`All Time Low Date`}</span>
                            <span>{formatDate(coin?.atl_date ?? new Date())}</span>
                        </div>
                        <hr className="border-gray-400 my-4" />
                    </div>
                    
                </div>
            </div>
        </ReusableTile>
    )
}

export default Perfomance;