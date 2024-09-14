import { Box, Typography, Divider, Chip } from '@mui/material';
import { formatAsUSD } from '../../utils/formatAsUsd';
import Image from 'next/image';
import { StockData } from '../../types/StockDataInterface';
import GenerateView from './GenerateView';

interface TradingViewWidgetProps {
  stockData: StockData;
}

const TradingViewWidget: React.FC<TradingViewWidgetProps> = ({ stockData }) => {
  if (!stockData) return null;

  const percentageChange24h =
    ((stockData.regularMarketPrice - stockData.regularMarketPreviousClose) /
      stockData.regularMarketPreviousClose) *
      100 || 0;
  const isNegative = percentageChange24h < 0;

  return (
    <Box display="flex" flexDirection="column" mb={4}>
      <Box
        display="flex"
        flexDirection="column"
        bgcolor="background.paper"
        borderRadius={2}
        p={3}
        boxShadow={1}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          mx={2}
        >
          {/* Stock Information */}
          <Box display="flex" alignItems="center" mt={2} mb={5}>
            <Image
              src={`https://logo.clearbit.com/${stockData.website}`}
              alt={`${stockData.shortName} logo`}
              width={40}
              height={40}
            />
            <Typography variant="h5" fontWeight="600" ml={2}>
              {stockData.shortName}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" ml={2}>
              {stockData.symbol}
            </Typography>

            <Chip
              label={stockData.sector}
              color="primary"
              sx={{
                ml: 'auto',
                fontWeight: 'bold',
                backgroundColor: 'rgba(75, 85, 99, 0.8)',
                color: 'white',
              }}
            />
          </Box>

          {/* Price and Percentage Change */}
          <Box display="flex" alignItems="center">
            <Typography variant="h4" fontWeight="bold">
              {formatAsUSD(stockData.regularMarketPrice ?? 0)}
            </Typography>

            {/* Price Change Indicator */}
            <Box
              display="flex"
              alignItems="center"
              bgcolor={
                isNegative ? 'rgba(255, 0, 0, 0.1)' : 'rgba(0, 255, 0, 0.1)'
              }
              color={isNegative ? 'rgba(255, 0, 0, 0.8)' : 'green'}
              borderRadius={2}
              width={100}
              px={2}
              py={0.5}
              ml={4}
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
              <Typography>{`${Math.abs(percentageChange24h).toFixed(2)}%`}</Typography>
            </Box>

            <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
              (24H)
            </Typography>
          </Box>

          {/* Divider */}
          <Divider sx={{ my: 3 }} />

          {/* Chart Title */}
          <Typography variant="subtitle1" fontWeight="bold" mb={4}>
            {`${stockData.shortName} Price Chart (USD)`}
          </Typography>
        </Box>

        {/* TradingView Widget */}
        <Box mx={2} mb={4}>
          <GenerateView stockSymbol={stockData.symbol} />
        </Box>
      </Box>
    </Box>
  );
};

export default TradingViewWidget;
