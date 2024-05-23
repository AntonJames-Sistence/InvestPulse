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

export const formatPercentage = (value: number) => {
    if (typeof value !== 'number') {
        return parseFloat(value).toFixed(2);
    }
    return value.toFixed(2);
};

const Perfomance: React.FC<PerfomanceProps> = ({ coin }) => {
    const [showFundamentalsTip, setShowFundamentalsTip] = useState(false);

    const getTodaysHighTrianglePosition = () => {
        if (!coin) return '0%';

        const low = coin.atl ?? 0;
        const high = coin.ath ?? 0;
        const current = coin.high_24h ?? 0;

        if (high === low) return '0%';

        const percentage = ((current - low) / (high - low)) * 100;
        return `${percentage}%`;
    };

    const getTodaysLowTrianglePosition = () => {
        if (!coin) return '0%';

        const low = coin.atl ?? 0;
        const high = coin.ath ?? 0;
        const current = coin.low_24h ?? 0;

        if (high === low) return '0%';

        const percentage = ((current - low) / (high - low)) * 100;
        return `${percentage}%`;
    };

    if (!coin){
        return (
            <ReusableTile title={`Coin Perfomance`}>
                <div className='m-10 self-center flex justify-center'>
                    <div className="loader"></div>
                </div>
            </ReusableTile>
        )
    }

    return (
        <ReusableTile title={`${coin?.name} Perfomance`}>
            <div className="flex flex-col">

                {/* <div className="flex text-sm mb-8 relative">
                    <div>
                        <p className="mb-2 w-24 text-gray-600">Today&apos;s Low</p>
                        <p>{formatAsUSD(coin?.low_24h ?? 0)}</p>
                    </div>
                    <div className="h-1.5 w-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-lg self-center mx-2 lg:mx-14 relative">
                        <div
                            className="absolute top-1 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[16px] border-transparent border-b-sky-700"
                            style={{ left: getTodayTrianglePosition(), transform: 'translateX(-50%)' }}
                        />
                    </div>
                    <div>
                        <p className="mb-2 w-24 text-end text-gray-600">Today&apos;s High</p>
                        <p className="text-end">{formatAsUSD(coin?.high_24h ?? 0)}</p>
                    </div>
                </div> */}

                <div className="flex text-sm mb-8 relative">
                    <div>
                        <p className="mb-2 w-24 text-gray-600">All Time Low</p>
                        <p>{formatAsUSD(coin?.atl ?? 0)}</p>
                    </div>
                    <div className="h-3 w-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-lg self-center mx-2 lg:mx-14 relative">
                        <div
                            className="absolute top-1 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[16px] border-transparent border-b-sky-700"
                            style={{ left: getTodaysHighTrianglePosition(), transform: 'translateX(-50%)' }}
                        />
                        <div
                            className="absolute top-3 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[16px] border-transparent border-b-sky-700"
                            style={{ left: getTodaysLowTrianglePosition(), transform: 'translateX(-50%)' }}
                            >
                            <div className="relative left-1/2 transform -translate-x-1/2">
                                <p className="text-[10px] mt-3">Today's&nbsp;Low</p>
                            </div>
                        </div>
                    </div>
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
                            <span className="text-gray-500">Market Rank</span>
                            <span>{`# ${coin?.market_cap_rank ?? 777}`}</span>
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
                            <span className="text-gray-500">Current Price</span>
                            <span>{formatAsUSD(coin?.current_price ?? 0)}</span>
                        </div>
                        <hr className="border-gray-400 my-4" />
                    </div>
                    
                    <div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Price Change In 24h</span>
                            <span
                                className={`${
                                    (coin?.price_change_24h ?? 0) >= 0
                                        ? 'text-green-500'
                                        : 'text-red-500'
                                    }`}>
                                    {formatAsUSD(coin?.price_change_24h ?? 0)}
                            </span>
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
                            <span className="text-gray-500">Total Volume</span>
                            <span>{formatAsUSD(coin?.total_volume ?? 0)}</span>
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
                            <span className="text-gray-500">All Time High Change</span>
                            <span
                                className={`${
                                    (coin?.ath_change_percentage ?? 0) >= 0
                                        ? 'text-green-500'
                                        : 'text-red-500'
                                    }`}>
                                {`${formatPercentage(coin?.ath_change_percentage ?? 0)} %`}
                            </span>
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

                    <div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">All Time Low Change</span>
                            <span
                                className={`${
                                    (coin?.atl_change_percentage ?? 0) >= 0
                                        ? 'text-green-500'
                                        : 'text-red-500'
                                    }`}>
                                {`${formatPercentage(coin?.atl_change_percentage ?? 0)} %`}
                            </span>
                        </div>
                        <hr className="border-gray-400 my-4" />
                    </div>

                    <div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Price Change In 7 Days</span>
                            <span
                                className={`${
                                    (coin?.price_change_percentage_7d ?? 0) >= 0
                                        ? 'text-green-500'
                                        : 'text-red-500'
                                    }`}>
                                {`${formatPercentage(coin?.price_change_percentage_7d ?? 0)} %`}
                            </span>
                        </div>
                        <hr className="border-gray-400 my-4" />
                    </div>

                    <div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Price Change In 1 Year</span>
                            <span
                                className={`${
                                    (coin?.price_change_percentage_1y ?? 0) >= 0
                                        ? 'text-green-500'
                                        : 'text-red-500'
                                    }`}>
                                {`${formatPercentage(coin?.price_change_percentage_1y ?? 0)} %`}
                            </span>
                        </div>
                        <hr className="border-gray-400 my-4" />
                    </div>

                </div>
            </div>
        </ReusableTile>
    )
}

export default Perfomance;