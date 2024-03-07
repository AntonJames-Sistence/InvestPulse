'use client';
import ReusableInfoBlock from "./ReusableInfoBlock";
import React, { useState, useEffect } from "react";


const TrendingCoins = () => {
    const [trendingCoins, setTrendingCoins] = useState([]);

    useEffect(() => {
        fetchTrendingCoins();
    }, [])

    const fetchTrendingCoins = async () => {
        const url = 'https://api.coingecko.com/api/v3/search/trending'

        try {
            const response = await fetch(url);
            const data = await response.json();
            let topThree = data.coins.slice(0, 3);
            
            setTrendingCoins(topThree);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ReusableInfoBlock title="Trending Coins (24h)">
            {trendingCoins.length > 0 ? (
                trendingCoins.map((coin, idx) => {
                    const priceChange = coin.item.data.price_change_percentage_24h.usd.toFixed(2);
                    const isNegative = priceChange < 0;
                    return (
                        <div className="flex justify-between mb-6" key={idx}>
                            <div className="flex self-center">
                                <img className="h-6 w-6 rounded-full" src={coin.item.thumb} alt={`${coin.item.name} image`} />
                                <div className="flex self-center ml-2 font-[400]">
                                    <p>{coin.item.name}</p>
                                    <p className="ml-1">{`(${coin.item.symbol})`}</p>
                                </div>
                            </div>

                            <div className={`flex flex-row bg-${isNegative ? 'red' : 'green'}-100 bg-opacity-50 rounded-md max-w-[100px] px-6 py-1 text-${isNegative ? 'red' : 'green'}-600 self-center text-sm`}>
                                <div className={`triangle-${isNegative ? 'red' : 'green'} self-center border-${isNegative ? 'red' : 'green'} mr-1`}></div>
                                <div>{`${priceChange}%`}</div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className="text-black">Loading...</div>
            )}
        </ReusableInfoBlock>
    )
}
// text-sm

export default TrendingCoins;