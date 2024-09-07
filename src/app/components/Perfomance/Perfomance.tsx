'use client';

import ReusableTile from '../ReusableTile';
import React from 'react';
import { formatDate } from '../../utils/formatDate';
import { formatAsUSD } from '../../utils/formatAsUsd';
import { formatPercentage } from '../../utils/formatPercentage';
import Image from 'next/image';
import { StockData } from '../../types/StockDataInterfaces';

interface PerformanceProps {
  stockData: StockData
}

const Performance: React.FC<PerformanceProps> = ({ stockData }) => {

  const getTodaysHighTrianglePosition = () => {
    if (!stockData) return '0%';

    const low = stockData.price.regularMarketDayLow ?? 0;
    const high = stockData.price.regularMarketDayHigh ?? 0;
    const current = stockData.price.regularMarketPrice ?? 0;

    if (high === low) return '0%';

    const percentage = ((current - low) / (high - low)) * 100;
    return `${percentage}%`;
  };

  const getTodaysLowTrianglePosition = () => {
    if (!stockData) return '0%';

    const low = stockData.price.regularMarketDayLow ?? 0;
    const high = stockData.price.regularMarketDayHigh ?? 0;
    const current = stockData.price.regularMarketPrice ?? 0;

    if (high === low) return '0%';

    const percentage = ((current - low) / (high - low)) * 100;
    return `${percentage}%`;
  };

  return (
    <ReusableTile title={`${stockData?.price.shortName} Performance`}>
      <div className="flex flex-col">
        <div className="flex flex-row text-xs md:text-sm my-10 md:mt-2 md:mb-10 relative">
          <div>
            <p className="mb-2 text-gray-600">Today's Low</p>
            <p className="font-semibold">{formatAsUSD(stockData?.price.regularMarketDayLow ?? 0)}</p>
          </div>
          <div className="h-3 mx-4 w-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-lg self-center mx-2 lg:mx-14 relative">
            <div
              className="absolute -top-4 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[16px] border-transparent border-t-sky-500"
              style={{
                left: getTodaysHighTrianglePosition(),
                transform: 'translateX(-50%)',
              }}
            >
              <div className="relative text-[10px] md:text-sm">
                <div className="absolute -mt-12 md:-mt-14 -left-8">
                  <p className="whitespace-nowrap">Today's High</p>
                  <p className="font-semibold">
                    {formatAsUSD(stockData?.price.regularMarketDayHigh ?? 0)}
                  </p>
                </div>
              </div>
            </div>
            <div
              className="absolute top-3 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[16px] border-transparent border-b-sky-500"
              style={{
                left: getTodaysLowTrianglePosition(),
                transform: 'translateX(-50%)',
              }}
            >
              <div className="relative text-[10px] md:text-sm">
                <div className="absolute mt-4 -left-8">
                  <p className="whitespace-nowrap">Current Price</p>
                  <p className="font-semibold">
                    {formatAsUSD(stockData?.price.regularMarketPrice ?? 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="mb-2 text-end text-gray-600">Previous Close</p>
            <p className="text-end font-semibold">
              {formatAsUSD(stockData?.price.regularMarketPreviousClose ?? 0)}
            </p>
          </div>
        </div>

        <div className="flex mb-3">
          <p className="text-gray-600 text-lg font-semibold">Fundamentals</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20">
          <div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Market Rank</span>
              <span>{`# ${stockData?.price.marketCap ?? 'N/A'}`}</span>
            </div>
            <hr className="border-gray-400 my-4" />
          </div>

          <div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Symbol</span>
              <div className="flex items-center">
                <Image
                  className="h-5 w-5 inline-block mr-2"
                  src={`https://logo.clearbit.com/${stockData.assetProfile.website}`}
                  alt={stockData?.price.symbol}
                  height={50}
                  width={50}
                  priority={true}
                />
                <div>{stockData?.price.symbol.toUpperCase()}</div>
              </div>
            </div>
            <hr className="border-gray-400 my-4" />
          </div>

          <div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Market Cap</span>
              <span>{formatAsUSD(stockData?.price.marketCap ?? 0)}</span>
            </div>
            <hr className="border-gray-400 my-4" />
          </div>

          <div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Price Change In 24h</span>
              <span
                className={`${
                  (stockData?.price.regularMarketChange ?? 0) >= 0
                    ? 'text-green-500'
                    : 'text-red-500'
                }`}
              >
                {formatAsUSD(stockData?.price.regularMarketChange ?? 0)}
              </span>
            </div>
            <hr className="border-gray-400 my-4" />
          </div>

          <div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Total Volume</span>
              <span>{formatAsUSD(stockData?.price.regularMarketVolume ?? 0)}</span>
            </div>
            <hr className="border-gray-400 my-4" />
          </div>

          <div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{`52 Week High`}</span>
              <span>{formatAsUSD(stockData?.summaryDetail.fiftyTwoWeekHigh ?? 0)}</span>
            </div>
            <hr className="border-gray-400 my-4" />
          </div>

          <div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{`52 Week Low`}</span>
              <span>{formatAsUSD(stockData?.summaryDetail.fiftyTwoWeekLow ?? 0)}</span>
            </div>
            <hr className="border-gray-400 my-4" />
          </div>

          <div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Dividend Rate</span>
              <span>{formatAsUSD(stockData?.summaryDetail.dividendRate ?? 0)}</span>
            </div>
            <hr className="border-gray-400 my-4" />
          </div>
        </div>
      </div>
    </ReusableTile>
  );
};

export default Performance;
