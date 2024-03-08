'use client';
import React, { useState, useEffect } from 'react';
import TrendingCoinsSlider from './TrendingCoinsSlider';

const Footer = () => {
    const [trendingCoins, setTrendingCoins] = useState([]);

    useEffect(() => {
        fetchTrendingCoins();
    }, [])

    const fetchTrendingCoins = async () => {
        const url = 'https://api.coingecko.com/api/v3/search/trending'

        try {
            const response = await fetch(url);
            const data = await response.json();
            let topThree = data.coins;
            
            setTrendingCoins(topThree);
        } catch (error) {
            console.log(error);
        }
    };
    console.log(trendingCoins);

    return (
        <div className='min-h-[400px] bg-white p-10 py-16'>
            <div className='font-semibold text-xl mb-8'>You May Also Like</div>
            <TrendingCoinsSlider trendingCoins={trendingCoins} />
            <div className='font-semibold text-xl my-8'>Trending Coins</div>
            <TrendingCoinsSlider trendingCoins={trendingCoins} />
        </div>
    );

};

export default Footer;