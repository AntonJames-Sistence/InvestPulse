'use client';

import { Box } from '@mui/system';
import React, { useEffect, useRef } from 'react';

interface GenerateViewProps {
  stockSymbol: string;
}

const GenerateView: React.FC<GenerateViewProps> = ({ stockSymbol }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  useEffect(() => {
    const scriptId = 'tradingview-widget-script';

    const loadWidget = () => {
      if (containerRef.current) {
        // Clear the container
        containerRef.current.innerHTML = '';

        // Create the widget
        new window.TradingView.widget({
          width: '100%',
          height: isMobile ? 300 : 410,
          symbol: stockSymbol,
          hide_legend: true,
          interval: 'D',
          timezone: 'Etc/UTC',
          theme: 'light',
          style: '3',
          locale: 'en',
          enable_publishing: false,
          backgroundColor: 'rgba(255, 255, 255, 1)',
          gridColor: 'rgba(0, 0, 0, 0.06)',
          save_image: false,
          calendar: false,
          hide_volume: true,
          hide_top_toolbar: true,
          container_id: containerRef.current.id,
        });
      }
    };

    const loadTradingViewScript = () => {
      if (typeof window.TradingView === 'undefined') {
        const script = document.createElement('script');
        script.id = scriptId;
        script.type = 'text/javascript';
        script.src = 'https://s3.tradingview.com/tv.js';
        script.async = true;
        script.onload = () => {
          loadWidget();
        };
        document.head.appendChild(script);
      } else {
        loadWidget();
      }
    };

    loadTradingViewScript();

    return () => {
      // Clean up the widget when the component unmounts
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [stockSymbol, isMobile]);

  return (
    <Box
      className="tradingview-widget-container self-center"
      ref={containerRef}
      id="tradingview-widget"
    ></Box>
  );
};

export default GenerateView;
