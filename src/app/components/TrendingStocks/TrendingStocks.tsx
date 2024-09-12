import ReusableTile from '../ReusableTile';
import { Box } from '@mui/material';
import TrendingStock from './TrendingStock';

async function fetchTrendingStocks() {
  const symbols = ['AAPL', 'NVDA', 'MSFT', 'META', 'TSLA'];

  // Fetch data from the server
  const results = await Promise.all(
    symbols.map(async (symbol) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/stock/${symbol}`,
          {next: { revalidate: 10800 }} // revalidate every 3 hours
        );
        if (!response.ok) throw new Error(`Failed to fetch data for ${symbol}`);
        return response.json();
      } catch (error) {
        console.error(error);
        return null;
      }
    })
  );

  return results;
}

export default async function TrendingStocks() {
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
}
