'use client';
import React, { useState, useEffect } from 'react';

function CryptoPrices({ bitcoin }) {
  const [priceData, setPriceData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/cryptoprices`);
        const data = await response.json();
        if (data) {
          setPriceData(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [bitcoin]);

  return (
    <div>
      <h1>{bitcoin} Price</h1>
      {priceData ? (
        <div>
          <p>{bitcoin} Price (INR): {priceData.bitcoin.inr}</p>
          <p>{bitcoin} Price (USD): {priceData.bitcoin.usd}</p>
          <p>24hr Change: {priceData.bitcoin.inr_24h_change}% (INR), {priceData.bitcoin.usd_24h_change}% (USD)</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

// export async function getServerSideProps(context) {
//   const { bitcoin } = context.query;
//   return { props: { bitcoin } };
// }

export default CryptoPrices;
