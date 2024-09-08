'use client';

import React, { useEffect, useState } from 'react';
import About from './About';
import TradingViewWidget from './TradingViewWidget';
import Performance from './Perfomance';
import { useSearchParams } from 'next/navigation';
import ReusableTile from '../ReusableTile';
import { StockData } from '../../types/StockDataInterfaces';
import SkeletonLoader from '../SkeletonLoader';

const StockDataProvider: React.FC = () => {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const stock = searchParams.get('stock');
  const stockSymbol = stock?.toUpperCase() || 'AAPL'; // Default to Apple stock

  useEffect(() => {
    const fetchStockData = async () => {
      const apiUrl = `/api/stock/${stockSymbol}`;

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        setStockData(data);
        console.log(data);
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
      <ReusableTile title="Loading Perfomance">
        <div className="flex flex-col">
          <div className="h-auto flex flex-col bg-white">
            <div className="flex flex-row">
              <SkeletonLoader variant="circular" width={50} height={50} borderRadius={50} />
              <div className="ml-4 flex flex-col justify-end w-full">
                <SkeletonLoader variant="text" width="20%" height={40} borderRadius={10} />
              </div>
            </div>
            <SkeletonLoader variant="text" width="60%" height={70} borderRadius={15} />
            <hr className="mb-4 border-gray-400" />
            <SkeletonLoader
              variant="rectangular"
              borderRadius={15}
              width="100%"
              height={410}
            />
          </div>
        </div>
      </ReusableTile>
    );
  }

  return (
    <>
      <TradingViewWidget stockData={stockData} />
      <Performance stockData={stockData} /> 
      <About stockData={stockData} />
    </>
  );
};

export default StockDataProvider;
