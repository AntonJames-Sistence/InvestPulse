'use client';
import ReusableTile from "./ReusableTile";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

const TrendingCoins = () => {
    const [trendingCoins, setTrendingCoins] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetchTrendingCoins();
    }, []);

    const handleClick = (e, coinName) => {
        e.preventDefault();
        router.push(`/?coin=${coinName}`);
    };

    const fetchTrendingCoins = async () => {
        const url = 'api/trending'

        try {
            const response = await fetch(url);
            const data = await response.json();
            let topThree = data.slice(0, 3);
            setTrendingCoins(topThree);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ReusableTile title="Trending Coins (24h)">
            {trendingCoins.length > 0 ? (
                trendingCoins.map((coin, idx) => {
                    const priceChange = parseInt(coin.price_change_percentage_24h).toFixed(2);
                    const isNegative = priceChange < 0;
                    return (
                        <a className={`rounded-lg ${isNegative ? 'hover-red' : 'hover-green'} hover:scale-110 ease-in-out duration-200 h-[200%] mb-6 cursor-pointer "`}
                            onClick={(e) => handleClick(e, coin.name)} 
                            key={idx}>
                            <div className="flex justify-between p-2">
                                <div className="flex self-center">
                                    <img className="h-6 w-6 rounded-full" src={coin.thumb} alt={`${coin.name} image`} />
                                    <div className="flex self-center ml-2 font-[400]">
                                        <p>{coin.name}</p>
                                        <p className="ml-1">{`(${coin.symbol})`}</p>
                                    </div>
                                </div>

                                <div className={`flex flex-row bg-${isNegative ? 'red' : 'green'}-100 bg-opacity-50 rounded-md max-w-[100px] px-6 py-1 text-${isNegative ? 'red' : 'green'}-600 self-center text-sm`}>
                                    <div className={`triangle-${isNegative ? 'red' : 'green'} self-center border-${isNegative ? 'red' : 'green'} mr-1`}></div>
                                    <div>{`${priceChange}%`}</div>
                                </div>
                            </div>
                        </a>
                    );
                })
            ) : (
                <div className="self-center text-black"><div className="loader"></div></div>
            )}
        </ReusableTile>
    )
}

export default TrendingCoins;