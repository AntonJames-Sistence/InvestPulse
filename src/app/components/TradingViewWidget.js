// TradingViewWidget.jsx
'use client';
import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidget() {
  const container = useRef();

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
          "hide_top_toolbar": true,
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

      </div>
      <div className="tradingview-widget-container" ref={container}>
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);
