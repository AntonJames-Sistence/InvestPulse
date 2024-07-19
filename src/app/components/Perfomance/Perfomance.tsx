"use client";

import ReusableTile from "../ReusableTile";
import React, { useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { formatAsUSD } from "../../utils/formatAsUsd";
import { formatPercentage } from "../../utils/formatPercentage";
import Image from "next/image";

interface PerformanceProps {
  coinData: {
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
  };
}

const Performance: React.FC<PerformanceProps> = ({ coinData }) => {
  const [showFundamentalsTip, setShowFundamentalsTip] = useState(false);

  const getTodaysHighTrianglePosition = () => {
    if (!coinData) return "0%";

    const low = coinData.atl ?? 0;
    const high = coinData.ath ?? 0;
    const current = coinData.high_24h ?? 0;

    if (high === low) return "0%";

    const percentage = ((current - low) / (high - low)) * 100;
    return `${percentage}%`;
  };

  const getTodaysLowTrianglePosition = () => {
    if (!coinData) return "0%";

    const low = coinData.atl ?? 0;
    const high = coinData.ath ?? 0;
    const current = coinData.low_24h ?? 0;

    if (high === low) return "0%";

    const percentage = ((current - low) / (high - low)) * 100;
    return `${percentage}%`;
  };

  return (
    <ReusableTile title={`${coinData?.name} Performance`}>
      <div className="flex flex-col">
        <div className="flex flex-row text-xs md:text-sm my-10 md:mt-2 md:mb-10 relative">
          <div>
            <p className="mb-2 text-gray-600">All&nbsp;Time Low</p>
            <p className="font-semibold">{formatAsUSD(coinData?.atl ?? 0)}</p>
          </div>
          <div className="h-3 mx-4 w-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-lg self-center mx-2 lg:mx-14 relative">
            <div
              className="absolute -top-4 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[16px] border-transparent border-t-sky-500"
              style={{
                left: getTodaysHighTrianglePosition(),
                transform: "translateX(-50%)",
              }}
            >
              <div className="relative text-[10px] md:text-sm">
                <div className="absolute -mt-12 md:-mt-14 -left-8">
                  <p className="whitespace-nowrap">Today&apos;s High</p>
                  <p className="font-semibold">
                    {formatAsUSD(coinData?.high_24h ?? 0)}
                  </p>
                </div>
              </div>
            </div>
            <div
              className="absolute top-3 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[16px] border-transparent border-b-sky-500"
              style={{
                left: getTodaysLowTrianglePosition(),
                transform: "translateX(-50%)",
              }}
            >
              <div className="relative text-[10px] md:text-sm">
                <div className="absolute mt-4 -left-8">
                  <p className="whitespace-nowrap">Today&apos;s Low</p>
                  <p className="font-semibold">
                    {formatAsUSD(coinData?.low_24h ?? 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="mb-2 text-end text-gray-600">All&nbsp;Time High</p>
            <p className="text-end font-semibold">
              {formatAsUSD(coinData?.ath ?? 0)}
            </p>
          </div>
        </div>

        <div className="flex mb-3">
          <p className="text-gray-600 text-lg font-semibold">Fundamentals</p>
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
              <span>{`# ${coinData?.market_cap_rank ?? 777}`}</span>
            </div>
            <hr className="border-gray-400 my-4" />
          </div>

          <div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Symbol</span>
              <div className="flex items-center">
                <Image
                  className="h-5 w-5 inline-block mr-2"
                  src={coinData?.image}
                  alt={coinData?.symbol}
                  height={50}
                  width={50}
                  priority={true}
                />
                <div>{coinData?.symbol.toUpperCase()}</div>
              </div>
            </div>
            <hr className="border-gray-400 my-4" />
          </div>

          <div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Current Price</span>
              <span>{formatAsUSD(coinData?.current_price ?? 0)}</span>
            </div>
            <hr className="border-gray-400 my-4" />
          </div>

          <div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Price Change In 24h</span>
              <span
                className={`${
                  (coinData?.price_change_24h ?? 0) >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {formatAsUSD(coinData?.price_change_24h ?? 0)}
              </span>
            </div>
            <hr className="border-gray-400 my-4" />
          </div>

          <div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Market Cap</span>
              <span>{formatAsUSD(coinData?.market_cap ?? 0)}</span>
            </div>
            <hr className="border-gray-400 my-4" />
          </div>

          <div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Total Volume</span>
              <span>{formatAsUSD(coinData?.total_volume ?? 0)}</span>
            </div>
            <hr className="border-gray-400 my-4" />
          </div>

          <div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{`All Time High Date`}</span>
              <span>{formatDate(coinData?.ath_date ?? new Date())}</span>
            </div>
            <hr className="border-gray-400 my-4" />
          </div>

          <div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">All Time High Change</span>
              <span
                className={`${
                  (coinData?.ath_change_percentage ?? 0) >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {`${formatPercentage(coinData?.ath_change_percentage ?? 0)} %`}
              </span>
            </div>
            <hr className="border-gray-400 my-4" />
          </div>

          <div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{`All Time Low Date`}</span>
              <span>{formatDate(coinData?.atl_date ?? new Date())}</span>
            </div>
            <hr className="border-gray-400 my-4" />
          </div>

          <div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">All Time Low Change</span>
              <span
                className={`${
                  (coinData?.atl_change_percentage ?? 0) >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {`${formatPercentage(coinData?.atl_change_percentage ?? 0)} %`}
              </span>
            </div>
            <hr className="border-gray-400 my-4" />
          </div>

          <div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Price Change In 7 Days</span>
              <span
                className={`${
                  (coinData?.price_change_percentage_7d ?? 0) >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {`${formatPercentage(
                  coinData?.price_change_percentage_7d ?? 0
                )} %`}
              </span>
            </div>
            <hr className="border-gray-400 my-4" />
          </div>

          <div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Price Change In 1 Year</span>
              <span
                className={`${
                  (coinData?.price_change_percentage_1y ?? 0) >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {`${formatPercentage(
                  coinData?.price_change_percentage_1y ?? 0
                )} %`}
              </span>
            </div>
            <hr className="border-gray-400 my-4" />
          </div>
        </div>
      </div>
    </ReusableTile>
  );
};

export default Performance;
