'use client';

import ReusableTile from '../ReusableTile';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box } from '@mui/material';
import { StockData } from '../../types/StockDataInterfaces';
import TrendingStock from './TrendingStock';
import SkeletonLoader from '../SkeletonLoader';

const TrendingStocks: React.FC = () => {
  const [trendingStocks, setTrendingStocks] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const symbols = ['AAPL', 'NVDA', 'MSFT', 'META'];

  useEffect(() => {
    fetchTrendingStocks();
  }, []);

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    symbol: string
  ) => {
    e.preventDefault();
    router.push(`/?stock=${symbol}`);
  };

  const fetchTrendingStocks = async () => {
    try {
      const results = await Promise.all(
        symbols.map(async (symbol) => {
          const response = await fetch(`api/stock/${symbol}`);

          if (!response.ok)
            throw new Error(`Failed to fetch data for ${symbol}`);

          return response.json();
        })
      );
      console.log(results);
      setTrendingStocks(results);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (!trendingStocks || loading) {
    return (
      <ReusableTile title="Trending Stocks">
        {symbols.map((_, idx) => (
          <Box
            key={idx}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <SkeletonLoader
              variant="circular"
              width={40}
              height={40}
              borderRadius={50}
            />

            <SkeletonLoader
              variant="rectangular"
              width={'40%'}
              height={30}
              borderRadius={3}
            />

            <SkeletonLoader
              variant="rectangular"
              width={'20%'}
              height={20}
              borderRadius={3}
            />
          </Box>
        ))}
      </ReusableTile>
    );
  }

  return (
    <ReusableTile title="Trending Stocks">
      <Box display="flex" flexDirection="column">
        {trendingStocks.map((data, idx) => (
          <TrendingStock key={idx} stockData={data} handleClick={handleClick} />
        ))}
      </Box>
    </ReusableTile>
  );
};

export default TrendingStocks;
