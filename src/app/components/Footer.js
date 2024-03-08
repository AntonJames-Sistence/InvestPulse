'use client';
import React, { useState, useEffect } from 'react';
import TrendingCoinsSlider from './TrendingCoinsSlider';

const Footer = () => {
    const [trendingCoins, setTrendingCoins] = useState([]);

    useEffect(() => {
        // fetchTrendingCoins();
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
        <div className='h-[400px] bg-white p-10'>
            <div className='font-semibold text-xl mb-8'>You May Also Like</div>
            <TrendingCoinsSlider items={['item1', 'item2', 'item3']} />
            <div className='font-semibold text-xl mb-8'>Trending Coins</div>
        </div>
    );

};

export default Footer;