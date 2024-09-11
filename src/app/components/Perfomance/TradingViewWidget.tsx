'use client';

import React, { useEffect, useRef } from 'react';
import { formatAsUSD } from '../../utils/formatAsUsd';
import Image from 'next/image';
import { StockData } from '../../types/StockDataInterfaces';

interface TradingViewWidgetProps {
  stockData: StockData;
}

const TradingViewWidget: React.FC<TradingViewWidgetProps> = ({ stockData }) => {
  const container = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  const percentageChange24h =
    ((stockData.regularMarketPrice - stockData.regularMarketPreviousClose) /
      stockData.regularMarketPreviousClose) *
    100;

  useEffect(() => {
    generateTradingViewWidget(stockData.symbol, isMobile);
  }, [stockData, isMobile]);

  const generateTradingViewWidget = (
    stockSymbol: string,
    isMobile: boolean
  ) => {
    if (!container.current) return;

    while (container.current.firstChild) {
      container.current.removeChild(container.current.firstChild);
    }

    const script = document.createElement('script');
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = `
      {
        "width": "100%",
        "height": "${isMobile ? 300 : 410}",
        "symbol": "NASDAQ:${stockSymbol}",
        "hide_legend": true,
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "light",
        "style": "3",
        "locale": "en",
        "enable_publishing": false,
        "backgroundColor": "rgba(255, 255, 255, 1)",
        "gridColor": "rgba(0, 0, 0, 0.06)",
        "save_image": false,
        "calendar": false,
        "hide_volume": true,
        "hide_top_toolbar": true,
        "support_host": "https://www.tradingview.com"
      }`;

    container.current.appendChild(script);
  };

  return (
    <div className="flex flex-col mb-4 lg:mb-8">
      <div className="h-auto flex flex-col bg-white rounded-lg">
        <div className="flex flex-col justify-between mx-5">
          <div className="flex flex-row mt-7 mb-10">
            <Image
              className="h-10 w-10 bg-white"
              src={`https://logo.clearbit.com/${stockData.website}`}
              alt={`${stockData.shortName} logo`}
              height={100}
              width={100}
              priority={true}
            />
            <div className="text-black text-2xl font-semibold self-center mx-2">
              {stockData.shortName}
            </div>
            <div className="text-gray-500 font-semibold mr-2">
              {stockData.symbol}
            </div>

            <span className="bg-gray-600 bg-opacity-70 rounded-lg p-2 ml-auto text-white flex items-center">
              {stockData.sector}
            </span>
          </div>

          <div className="flex flex-row">
            <div className="text-black text-3xl font-semibold self-center">
              {formatAsUSD(stockData.regularMarketPrice ?? 0)}
            </div>

            <div
              className={`flex flex-row bg-${
                percentageChange24h < 0 ? 'red' : 'green'
              }-100 bg-opacity-50 rounded-md px-4 py-1 ml-6 mr-2 text-${
                percentageChange24h < 0 ? 'red' : 'green'
              }-600 self-center`}
            >
              <div
                className={`triangle-${
                  percentageChange24h < 0 ? 'red' : 'green'
                } self-center border-${
                  percentageChange24h < 0 ? 'red' : 'green'
                }`}
              ></div>
              <div>{`${Math.abs(percentageChange24h).toFixed(2)}%`}</div>
            </div>

            <div className="text-gray-500 text-sm self-center">{`(24H)`}</div>
          </div>

          <hr className="my-5 border-gray-400" />

          <div className="mb-10 font-semibold text">{`${stockData.shortName} Price Chart (USD)`}</div>
        </div>

        <div className="mx-5 mb-5 z-10">
          <div
            className="tradingview-widget-container self-center"
            ref={container}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TradingViewWidget;
