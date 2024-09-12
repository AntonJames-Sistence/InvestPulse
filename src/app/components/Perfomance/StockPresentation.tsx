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
import { Divider } from '@mui/material';

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
        const data = await getStockData(stockSymbol);

        if (data) {
          // console.log(data)
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
      <div className="flex flex-col bg-white rounded-lg p-2 lg:p-4 mb-4 lg:mb-8">
        <div className="flex w-full justify-between">
          <div className="flex w-full">
            <SkeletonLoader
              variant="circular"
              width={50}
              height={50}
              borderRadius={10}
              marginRight={1}
            />
            <SkeletonLoader
              variant="text"
              width="30%"
              height={60}
              borderRadius={2}
              marginBottom={1}
            />
          </div>

          <SkeletonLoader
            variant="text"
            width="10%"
            height={50}
            borderRadius={10}
            marginBottom={1}
          />
        </div>
        <SkeletonLoader
          variant="text"
          width="60%"
          height={60}
          borderRadius={2}
          marginBottom={1}
        />

        <Divider sx={{ mb: 2 }} />

        <SkeletonLoader
          variant="text"
          width="30%"
          height={40}
          borderRadius={2}
          marginBottom={1}
        />

        <SkeletonLoader
          variant="rectangular"
          borderRadius={3}
          width="100%"
          height={510}
        />
      </div>
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
