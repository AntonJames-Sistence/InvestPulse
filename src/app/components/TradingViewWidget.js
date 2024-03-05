// TradingViewWidget.jsx
'use client';
import React, { useEffect, useRef, memo } from 'react';

const TradingViewWidget = () => {
  let coinName = "bitcoin";
  const [coinData, setCoinData] = useState(null);
  const container = useRef();


  const handleFetchPrices = async () => {
    const priceUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${coinName}&vs_currencies=inr%2Cusd&include_24hr_change=true`;
    
    try {
      let data = await fetch(priceUrl);
      let jsonData = await data.json();
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

  return (
    <div className="flex flex-col">
      <div className="h-40 bg-white">
        {coinData ? (
          <div>loading...</div>
        ):(
          <div>loading...</div>
        )}
      </div>
      <div className="tradingview-widget-container" ref={container}>
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);
