'use client';

import { Box } from '@mui/system';
import React, { useEffect, useRef } from 'react';

interface GenerateViewProps {
  stockSymbol: string;
}

const GenerateView: React.FC<GenerateViewProps> = ({ stockSymbol }) => {
  const container = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  const generateTradingViewWidget = (symbol: string, isMobile: boolean) => {
    if (!container.current) return;

    // Clear existing children
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
        "symbol": "${symbol}",
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

    // script.onload = () => setLoading(false);
    container.current.appendChild(script);
  };

  useEffect(() => {
    generateTradingViewWidget(stockSymbol, isMobile);
  }, [stockSymbol, isMobile]);

  return (
    <Box
      className="tradingview-widget-container self-center"
      ref={container}
    ></Box>
  );
};

export default GenerateView;
