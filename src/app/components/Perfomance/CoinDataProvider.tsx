'use client';

import React, { useEffect, useState } from 'react';
import About from './About';
import TradingViewWidget from './TradingViewWidget';
import Performance from './Perfomance';
import { useSearchParams } from 'next/navigation';
import ReusableTile from '../ReusableTile';
import { CircularProgress } from '@mui/material';

interface CoinData {
  symbol: string;
  name: string;
  description: string;
  homepage: string;
  image: string;
  market_cap_rank: number;
  current_price: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: Date;
  atl: number;
  atl_change_percentage: number;
  atl_date: Date;
  market_cap: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d: number;
  price_change_percentage_1y: number;
  last_updated: Date;
}

const CoinDataProvider: React.FC = () => {
  const [coinData, setCoinData] = useState<CoinData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const coin = searchParams.get('coin');
  const coinName = coin?.toLowerCase() || 'bitcoin';

  useEffect(() => {
    const fetchCoinData = async () => {
      const apiUrl = `/api/coin?id=${coinName}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setCoinData(data);
      } catch (err) {
        setError(`Failed to fetch coin data ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [coinName]);

  if (loading || !coinData) {
    return (
      <ReusableTile title="Loading Perfomance">
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
      <TradingViewWidget coinData={coinData} />
      <Performance coinData={coinData} />
      <About coinData={coinData} />
    </div>
  );
};

export default CoinDataProvider;
