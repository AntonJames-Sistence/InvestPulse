import ReusableTile from '../ReusableTile';
import { Box } from '@mui/material';
import { StockData } from '../../types/StockDataInterfaces';
import TrendingStock from './TrendingStock';

async function fetchTrendingStocks(): Promise<StockData[]> {
  const symbols = ['AAPL', 'NVDA', 'MSFT', 'META'];

  // Fetch data from the server
  const results = await Promise.all(
    symbols.map(async (symbol) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stock/${symbol}`, {
        next: { revalidate: 10800 }, // Revalidate after 3 hours
      });

      if (!response.ok) {
        return new Error(`Failed to fetch data for ${symbol}`);
      }

      return response.json();
    })
  );

  return results;
}

const TrendingStocks = async () => {
  const trendingStocks = await fetchTrendingStocks();

  return (
    <ReusableTile title="Trending Stocks">
      <Box display="flex" flexDirection="column">
        {trendingStocks.map((data, idx) => (
          <TrendingStock key={idx} stockData={data} />
        ))}
      </Box>
    </ReusableTile>
  );
};

export default TrendingStocks;
