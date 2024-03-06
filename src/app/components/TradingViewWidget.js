// TradingViewWidget.jsx
'use client';
import React, { useEffect, useState, useRef, memo } from 'react';

const TradingViewWidget = () => {
  let coinName = "bitcoin";
  const [coinData, setCoinData] = useState(null);
  const container = useRef();


  const handleFetchPrices = async () => {
    const priceUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${coinName}&vs_currencies=inr%2Cusd&include_24hr_change=true`;
    
    try {
      let data = await fetch(priceUrl);
      let jsonData = await data.json();
      // console.log(jsonData);
      setCoinData(jsonData);
    } catch (error) {
      console.log(error)
    }
    
  }

  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "height": "510",
          "symbol": "BITSTAMP:BTCUSD",
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
          "support_host": "https://www.tradingview.com"
        }`;
      container.current.appendChild(script);
      // handleFetchPrices();
      
      // "hide_top_toolbar": true,

      // Cleanup function to remove the script when the component unmounts
      return () => {
        if (container.current && container.current.removeChild) {
          container.current.removeChild(script);
        }
      };
    },
    []
  );
  console.log(coinData)

  return (
    <div className="flex flex-col">
      <div className="h-40 bg-white rounded-t-lg">
        {coinData ? (
          <div>
            <div className='text-black font-xl'>{`${coinData[0].usd}`}</div>
            <div className='text-black font-xl'>$46,953.04</div>
            {/* <div className='text-black'>loading...</div> */}
          </div>
        ):(
          <>
          <div></div>

          <div>
            <div></div>
          </div>
          <div className='flex flex-row my-2'>
            <div className='text-black text-3xl font-semibold pl-4 self-center'>{`$46,953.04`}</div>

            <div class="flex flex-row bg-green-100 bg-opacity-50 rounded-md px-6 py-1 mx-4 text-green-600 self-center relative">
              <div className="triangle-green self-center border-red"></div>
              <div>2.51%</div>
            </div>

            <div className="text-gray-500 text-sm self-center">{`(24H)`}</div>
          </div>
          <div className='text-black text-lg pl-5'>{`\u20B9 ${56,97,177 }`}</div>
          </>
        )}
      </div>
      <div className="tradingview-widget-container" ref={container}>
      </div>
    </div>
  );
}

// "bitcoin": {
//   "inr": 5697177,
//   "inr_24h_change": 3.6596920153414336,
//   "usd": 68726,
//   "usd_24h_change": 3.6767559459431545
// }

export default memo(TradingViewWidget);
