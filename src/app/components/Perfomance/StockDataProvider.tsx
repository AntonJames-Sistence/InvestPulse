'use client';

import React, { useEffect, useState } from 'react';
import About from './About';
import TradingViewWidget from './TradingViewWidget';
import Performance from './Perfomance';
import { useSearchParams } from 'next/navigation';
import ReusableTile from '../ReusableTile';
import { CircularProgress } from '@mui/material';
import { StockData } from '../../types/StockDataInterfaces';

const StockDataProvider: React.FC = () => {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const stock = searchParams.get('stock');
  const stockSymbol = stock?.toUpperCase() || 'AAPL'; // Default to Apple stock

  useEffect(() => {
    const fetchStockData = async () => {
      const apiUrl = `/api/stock/${stockSymbol}`; // Fetch from the new API route
    
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        setStockData(data);
        console.log(data)
      } catch (err) {
        setError(`Failed to fetch stock data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    

    fetchStockData();
  }, [stockSymbol]);

  if (loading || !stockData) {
    return (
      <ReusableTile title="Loading Performance">
        <div className="m-10 self-center flex justify-center">
          <CircularProgress />
        </div>
      </ReusableTile>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <TradingViewWidget stockData={stockData} />
      <Performance stockData={stockData} />
      <About stockData={stockData} />
    </div>
  );
};

export default StockDataProvider;
