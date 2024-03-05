'use client';
import React, { useState, useEffect } from 'react';

function CryptoPrices({ bitcoin }) {
  const [coinName, setCoinName] = useState('bitcoin');
  const [priceData, setPriceData] = useState(null);

  const fetchData = async (coin) => {
    try {
      const response = await fetch(`/api/cryptoprices?coin=${coinName}`);
      const data = await response.json();
      if (data) {
        setPriceData(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(coinName);
  }, [coinName]);

  return (
    <div>
      <h1>{bitcoin} Price</h1>
      {priceData ? (
        <div>
          <p>{bitcoin} Price (INR): {priceData.bitcoin?.inr}</p>
          <p>{bitcoin} Price (USD): {priceData.bitcoin?.usd}</p>
          <p>24hr Change: {priceData.bitcoin?.inr_24h_change}% (INR), {priceData.bitcoin?.usd_24h_change}% (USD)</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CryptoPrices;
