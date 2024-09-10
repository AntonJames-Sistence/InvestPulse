'use client';

import React, { useEffect, useState } from 'react';
import About from './About';
import TradingViewWidget from './TradingViewWidget';
import Performance from './Perfomance';
import { useSearchParams } from 'next/navigation';
import ReusableTile from '../ReusableTile';
import { StockData } from '../../types/StockDataInterfaces';
import SkeletonLoader from '../SkeletonLoader';
import { getStockData } from './GetStockData';

const StockPresentation: React.FC = () => {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const stockSymbol = searchParams.get('symbol')?.toUpperCase() || 'AAPL'; // Default to AAPL if no symbol is provided

  useEffect(() => {
    const getData = async () => {
      setLoading(true); // Start loading
      setError(null); // Clear previous errors

      try {
        const data = await getStockData(stockSymbol); // Fetch data based on the stock symbol
        if (data) {
          setStockData(data); // Update stock data
        } else {
          setError('Failed to fetch stock data');
        }
      } catch {
        setError('An error occurred while fetching stock data');
      } finally {
        setLoading(false); // End loading
      }
    };

    getData(); // Call the function to fetch data
  }, [stockSymbol]);

  if (loading || !stockData) {
    return (
      <ReusableTile title="Stock Perfomance">
        <div className="flex flex-col">
          <div className="h-auto flex flex-col bg-white">
            <div className="flex flex-row">
              <SkeletonLoader
                variant="circular"
                width={50}
                height={50}
                borderRadius={3}
              />
              <div className="ml-4 flex flex-col justify-end w-full">
                <SkeletonLoader
                  variant="text"
                  width="20%"
                  height={40}
                  borderRadius={4}
                />
              </div>
            </div>
            <SkeletonLoader
              variant="text"
              width="60%"
              height={70}
              borderRadius={2}
              spaceBetween={1}
            />
            <SkeletonLoader
              variant="rectangular"
              borderRadius={3}
              width="100%"
              height={410}
            />
          </div>
        </div>
      </ReusableTile>
    );
  }

  if (error) {
    return (
      <ReusableTile title="Stock Perfomance">
        <div>{error}</div>
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

export default StockPresentation;
