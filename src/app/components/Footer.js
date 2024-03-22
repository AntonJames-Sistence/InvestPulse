'use client';
import React, { useState, useEffect } from 'react';
import TrendingCoinsSlider from './TrendingCoinsSlider';

const Footer = () => {
    const [trendingCoins, setTrendingCoins] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTrendingCoins();
    }, [])

    const fetchTrendingCoins = async () => {
        const url = 'api/trending'

        try {
            const response = await fetch(url);
            const data = await response.json();
            setTrendingCoins(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='flex flex-col min-h-[400px] bg-white lg:p-10 p-2 py-4 lg:py-16'>
            {loading ? (
                <div className="self-center lg:mt-20 text-black">
                    <div className="loader"></div>
                </div>
            ) : (
                <div>
                    <div className='font-semibold text-xl mb-8'>You May Also Like</div>
                    <TrendingCoinsSlider trendingCoins={trendingCoins} />
                    <div className='font-semibold text-xl my-8'>Trending Coins</div>
                    <TrendingCoinsSlider trendingCoins={trendingCoins} />
                </div>
            )}
        </div>
    );

};

export default Footer;