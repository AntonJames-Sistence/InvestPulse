// 'use client';

// import React, { useEffect, useState } from 'react';
// import About from './About';
// import TradingViewWidget from './TradingViewWidget';
// import Performance from './Perfomance';
// import { useSearchParams } from 'next/navigation';
// import ReusableTile from '../ReusableTile';
// import { CircularProgress } from '@mui/material';

// interface CoinData {
//   symbol: string;
//   name: string;
//   description: string;
//   homepage: string;
//   image: string;
//   market_cap_rank: number;
//   current_price: number;
//   ath: number;
//   ath_change_percentage: number;
//   ath_date: Date;
//   atl: number;
//   atl_change_percentage: number;
//   atl_date: Date;
//   market_cap: number;
//   total_volume: number;
//   high_24h: number;
//   low_24h: number;
//   price_change_24h: number;
//   price_change_percentage_24h: number;
//   price_change_percentage_7d: number;
//   price_change_percentage_1y: number;
//   last_updated: Date;
// }

// const CoinDataProvider: React.FC = () => {
//   const [coinData, setCoinData] = useState<CoinData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const searchParams = useSearchParams();
//   const coin = searchParams.get('coin');
//   const coinName = coin?.toLowerCase() || 'bitcoin';

//   useEffect(() => {
//     const fetchCoinData = async () => {
//       const apiUrl = `/api/coin?id=${coinName}`;

//       try {
//         const response = await fetch(apiUrl);
//         const data = await response.json();
//         setCoinData(data);
//       } catch (err) {
//         setError(`Failed to fetch coin data ${err}`);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCoinData();
//   }, [coinName]);

//   if (loading || !coinData) {
//     return (
//       <ReusableTile title="Loading Perfomance">
//         <div className="m-10 self-center flex justify-center">
//           <CircularProgress />
//         </div>
//       </ReusableTile>
//     );
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div>
//       <TradingViewWidget coinData={coinData} />
//       <Performance coinData={coinData} />
//       <About coinData={coinData} />
//     </div>
//   );
// };

// export default CoinDataProvider;
'use client';

import React, { useEffect, useState } from 'react';
import About from './About';
import TradingViewWidget from './TradingViewWidget';
import Performance from './Perfomance';
import { useSearchParams } from 'next/navigation';
import ReusableTile from '../ReusableTile';
import { CircularProgress } from '@mui/material';
import yahooFinance from 'yahoo-finance2'; // Import Yahoo Finance

interface StockData {
  symbol: string;
  name: string;
  currentPrice: number;
  marketCap: number;
  high_24h: number;
  low_24h: number;
  priceChange_24h: number;
  priceChangePercentage_24h: number;
  totalVolume: number;
  lastUpdated: Date;
}

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
