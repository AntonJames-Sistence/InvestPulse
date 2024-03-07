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
            let topThree = data.coins.slice(0, 3)
            setTrendingCoins(topThree);
        } catch (error) {
            console.log(error);
        }
    };
    console.log(trendingCoins);

    return (
        <ReusableInfoBlock title="Trending Coins (24h)">
            {trendingCoins ? (
                trendingCoins.map((coin) => (
                    <div className="flex justify-between mb-6">
                        <div className="flex">
                            <img className="h-6 w-6 rounded-full" src={coin.item.thumb} alt={`${coin.item.name} image`} />
                            <div className="flex self-center ml-2 font-[400]">
                                <p>{coin.item.name}</p>
                                <p className="ml-1">{`(${coin.item.symbol})`}</p>
                            </div>
                        </div>
                        <div></div>
                    </div>
                ))
            ) : (
                <div>Loading...</div>
            )}
        </ReusableInfoBlock>
    )
}

export default TrendingCoins;