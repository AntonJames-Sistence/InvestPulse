'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Perfomance from './Perfomance';
import { CircularProgress } from '@mui/material';
import ReusableTile from '../ReusableTile';
import { formatAsUSD } from '../../utils/formatAsUsd';

interface CoinData {
  symbol: string,
  name: string,
  description: string,
  homepage: string,
  image: string,
  market_cap_rank: number,
  current_price: number,
  ath: number,
  ath_change_percentage: number,
  ath_date: Date,
  atl: number,
  atl_change_percentage: number,
  atl_date: Date,
  market_cap: number,
  total_volume: number,
  high_24h: number,
  low_24h: number,
  price_change_24h: number,
  price_change_percentage_24h: number,
  price_change_percentage_7d: number,
  price_change_percentage_1y: number,
  last_updated: Date;
}

const TradingViewWidget: React.FC = () => {
  const searchParams = useSearchParams();
  const coin = searchParams.get('coin');
  let coinName = coin?.toLowerCase() || 'bitcoin';

  const container = useRef<HTMLDivElement>(null);
  const [coinData, setCoinData] = useState<CoinData | null>(null);
  // const [coinPrice, setCoinPrice] = useState<CoinPrice | null>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  useEffect(() => {
    fetchCoinInfo(coinName);
  }, [coinName])

  useEffect(() => {
    if (coinData){
      generateTradingViewWidget(coinData.symbol, isMobile);
    }
  }, [coinData, coinName])

  const formatCoinName = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const fetchCoinInfo = async (name: string) => {
    const apiUrl = `/api/coin?id=${name}`;
    
    try {
      let data = await fetch(apiUrl);
      let jsonData = await data.json();
      
      setCoinData(jsonData);
    } catch (error) {
      console.log(error)
    }
  }

  const generateTradingViewWidget = (coinSymbol: string, isMobile: boolean) => {
    if (!container.current) return;

    while (container.current.firstChild) {
      container.current.removeChild(container.current.firstChild);
    }

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "width": "100%",
        "height": "${isMobile ? 300 : 410}",
        "symbol": "BITSTAMP:${coinSymbol.toUpperCase()}USD",
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

  if (!coinData){
    return (
      <ReusableTile title={`${coinName[0].toUpperCase() + coinName.slice(1)} Perfomance`}>
        <div className='m-10 self-center flex justify-center'>
            <CircularProgress />
        </div>
      </ReusableTile>
    )
  }
  
  return (
    <>
      <div className="flex flex-col mb-4 lg:mb-8">

        <div className="h-auto flex flex-col bg-white rounded-lg">
          
            <div className='flex flex-col justify-between mx-5'>
              <div className='flex flex-row mt-7 mb-10'>
                <img src={coinData.image} alt={`${coinData.name} logo`} className='h-10 w-10 bg-white'></img>
                <div className='text-black text-2xl font-semibold self-center mx-2'>{coinData.name}</div>
                <div className='text-gray-500 self-center font-semibold mr-2'>{coinData.symbol}</div>

                <div className='flex flex-row bg-gray-600 bg-opacity-70 rounded-lg p-2 ml-10 text-white self-center'>
                  {`Rank #${coinData.market_cap_rank}`}
                </div>
              </div>

              <div className='flex flex-row'>
                <div className='text-black text-3xl font-semibold self-center'>{formatAsUSD(coinData?.current_price ?? 0)}</div>

                <div className={`flex flex-row bg-${coinData.price_change_percentage_24h < 0 ? 'red' : 'green'}-100 bg-opacity-50 rounded-md px-4 py-1 ml-6 mr-2 text-${coinData.price_change_percentage_24h < 0 ? 'red' : 'green'}-600 self-center`}>
                  <div className={`triangle-${coinData.price_change_percentage_24h < 0 ? 'red' : 'green'} self-center border-${coinData.price_change_percentage_24h < 0 ? 'red' : 'green'}`}></div>
                  <div>{`${Math.abs(coinData.price_change_percentage_24h)}%`}</div>
                </div>

                <div className="text-gray-500 text-sm self-center">{`(24H)`}</div>
              </div>

              <hr className='my-5 border-gray-400' />

              <div className='mb-10 font-semibold text'>{`${coinData.name} Price Chart (USD)`}</div>
            </div>
          
          <div className='mx-5 mb-5 z-10'>
            <div className="tradingview-widget-container self-center" ref={container}></div>
          </div>

        </div>                                                                 
      </div>
      <Perfomance coin={coinData} />
    </>
  );
}

export default TradingViewWidget;