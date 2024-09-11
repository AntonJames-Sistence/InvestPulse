'use client';

import { StockData } from '../../types/StockDataInterfaces';
import { Box, Typography, ButtonBase } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';
import SkeletonLoader from '../SkeletonLoader';

interface TrendingStockProps {
  stockData: StockData;
}

const TrendingStock: React.FC<TrendingStockProps> = ({ stockData }) => {
  const router = useRouter();
  // Parse and process the price change percentage
  const percentageChange24h =
    ((stockData.regularMarketPrice - stockData.regularMarketPreviousClose) /
      stockData.regularMarketPreviousClose) *
    100;
  const priceChange = Math.abs(percentageChange24h);
  const isNegative = percentageChange24h < 0;

  const handleStockClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    symbol: string
  ) => {
    e.preventDefault();
    router.push(`/?symbol=${symbol}`);
  };

  if (!stockData) {
    return (
      <Box
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
    );
  }

  return (
    <ButtonBase
      sx={{
        display: 'block',
        borderRadius: 6,
        transition: '0.3s',
        mb: 1,
        p: 1,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        '&:hover': {
          backgroundColor: 'rgba(217, 225, 253, 0.5);',
          scale: '105%',
        },
      }}
      onClick={(e) => handleStockClick(e, stockData.symbol)}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center">
          {/* Logo */}
          <Box
            sx={{
              width: 40,
              height: 40,
              overflow: 'hidden',
              mx: 2,
            }}
          >
            <Image
              src={`https://logo.clearbit.com/${stockData.website}`}
              alt={`${stockData.shortName} logo`}
              width={40}
              height={40}
            />
          </Box>

          {/* Company Name and Stock Symbol */}
          <Box>
            <Typography align="left" variant="body2" fontWeight="400">
              {stockData.shortName}
            </Typography>
            <Typography align="left" variant="body2" color="textSecondary">
              {`(${stockData.symbol})`}
            </Typography>
          </Box>
        </Box>

        {/* Price Change Indicator */}
        <Box
          display="flex"
          alignItems="center"
          bgcolor={isNegative ? 'rgba(255, 0, 0, 0.1)' : 'rgba(0, 255, 0, 0.1)'}
          color={isNegative ? 'rgba(255, 0, 0, 0.8)' : 'green'}
          borderRadius={5}
          width={100}
          px={2}
          py={0.5}
        >
          {/* Arrow Indicator */}
          <Box
            component="span"
            sx={{
              width: 0,
              height: 0,
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: isNegative ? '5px solid red' : 'none',
              borderBottom: isNegative ? 'none' : '5px solid green',
              mr: 1,
            }}
          />
          {/* Percentage Change */}
          <Typography variant="body2">
            {`${priceChange.toFixed(2)}%`}
          </Typography>
        </Box>
      </Box>
    </ButtonBase>
  );
};

export default TrendingStock;
