import { StockData } from '../../types/StockDataInterfaces';
import { Box, Typography, ButtonBase } from '@mui/material';
import Image from 'next/image';
import React from 'react';

interface TrendingStockProps {
  stockData: StockData;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
}

const TrendingStock: React.FC<TrendingStockProps> = ({
  stockData,
  handleClick,
}) => {
  // Parse and process the price change percentage
  const priceChange = Math.abs(stockData.price.percentageChange24h);
  const isNegative = stockData.price.percentageChange24h < 0;

  return (
    <ButtonBase
      sx={{
        display: 'block',
        borderRadius: 7,
        transition: '0.2s',
        mb: 1,
        p: 1,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        '&:hover': {
          backgroundColor: 'rgba(229, 231, 235, 0.5);',
        },
      }}
      onClick={(e) => handleClick(e, stockData.price.symbol)}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center">
          {/* Logo */}
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 5,
              overflow: 'hidden',
              mr: 2,
            }}
          >
            <Image
              src={`https://logo.clearbit.com/${stockData.assetProfile.website}`}
              alt={`${stockData.price.shortName} logo`}
              width={40}
              height={40}
              objectFit="cover"
            />
          </Box>

          {/* Company Name and Stock Symbol */}
          <Box>
            <Typography align="left" variant="body1" fontWeight="400">
              {stockData.price.shortName}
            </Typography>
            <Typography align="left" variant="body2" color="textSecondary">
              {`(${stockData.price.symbol})`}
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
