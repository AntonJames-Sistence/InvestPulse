'use client';
import React, { useState, useEffect } from 'react';
import TrendingCoinsSlider from './TrendingCoinsSlider';

const Footer = () => {
    const [trendingCoins, setTrendingCoins] = useState([]);

    useEffect(() => {
        fetchTrendingCoins();
    }, [])

    const fetchTrendingCoins = async () => {
        const url = 'api/trending'

        try {
            const response = await fetch(url);
            const data = await response.json();
            setTrendingCoins(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='min-h-[400px] bg-white lg:p-10 p-2 py-4 lg:py-16'>
            <div className='font-semibold text-xl mb-8'>You May Also Like</div>
            <TrendingCoinsSlider trendingCoins={trendingCoins} />
            <div className='font-semibold text-xl my-8'>Trending Coins</div>
            <TrendingCoinsSlider trendingCoins={trendingCoins} />
        </div>
    );

};

export default Footer;