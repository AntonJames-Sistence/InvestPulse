'use client';
import React, { useState, useEffect } from 'react';
import ReusableInfoBlock from "./ReusableInfoBlock";


const Sentiment = () => {
    const [showKeyEventsTip, setShowKeyEventsTip] = useState(false);
    const [showAnalystEstimatesTip, setShowAnalistEstimatesTip] = useState(false);
    const [maxPercentage, setMaxPercentage] = useState(0);
    const [maxColor, setMaxColor] = useState('');

    const buyPercentage = 76;
    const holdPercentage = 8;
    const sellPercentage = 16;

    // Dynamic change of color and number inside the circle graph
    useEffect(() => {
        const max = Math.max(buyPercentage, holdPercentage, sellPercentage);
        setMaxPercentage(max);

        if (max === buyPercentage) {
            setMaxColor('bg-green-100 text-green-600');
        } else if (max === holdPercentage) {
            setMaxColor('bg-gray-100 text-gray-600');
        } else {
            setMaxColor('bg-red-100 text-red-600');
        }
    }, [buyPercentage, holdPercentage, sellPercentage]);

    return (
        <ReusableInfoBlock title="Sentiment">
            <div className='flex flex-col -mt-4'>
                <div className='flex'>
                    <p className="text-gray-600 text-lg font-semibold">
                        Key Events
                    </p>
                    <div className="relative ml-2 self-center">
                        <div 
                            className="cursor-pointer inline-block w-4 h-4 bg-gray-500 rounded-full flex items-center justify-center"
                            onMouseEnter={() => setShowKeyEventsTip(true)}
                            onMouseLeave={() => setShowKeyEventsTip(false)}
                        >
                            <span className="text-xs text-white font-semibold">i</span>
                        </div>
                        {showKeyEventsTip && (
                            <div className="absolute bg-gray-100 p-2 rounded-lg text-sm text-gray-700 w-60 z-10">
                                <ul className="list-disc pl-4">
                                    <li>Bitcoin Halving Event (2020)</li>
                                    <li>Elon Musk Tweets (2021)</li>
                                    <li>Regulatory Crackdown in China (2021)</li>
                                    <li>Institutional Adoption (2021)</li>
                                    <li>Bitcoin ETF Approval (TBD)</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <div className='flex'>
                    <p className="text-gray-600 text-lg font-semibold">
                        Analyst Estimates
                    </p>
                    <div className="relative ml-2 self-center">
                        <div 
                            className="cursor-pointer inline-block w-4 h-4 bg-gray-500 rounded-full flex items-center justify-center"
                            onMouseEnter={() => setShowAnalistEstimatesTip(true)}
                            onMouseLeave={() => setShowAnalistEstimatesTip(false)}
                        >
                            <span className="text-xs text-white font-semibold">i</span>
                        </div>
                        {showAnalystEstimatesTip && (
                            <div className="absolute bg-gray-100 p-2 rounded-lg text-sm text-gray-700 w-60 z-10">
                                <ul className="list-disc pl-4">
                                    <li>Price Target Increase by Leading Analysts</li>
                                    <li>Bullish Sentiment from Wall Street Experts</li>
                                    <li>Analyst Predictions for Bitcoin's Market Cap Growth</li>
                                    <li>Consensus Forecast on Bitcoin's Price Performance</li>
                                    <li>Analyst Upgrades Following Positive Market Trends</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <div className='flex'>
                    <div className={`rounded-full ${maxColor} h-28 w-28 flex justify-center items-center mr-10`}>
                        <p className='font-semibold text-4xl'>{maxPercentage}</p><p className='text-sm'>%</p>
                    </div>
                    
                    <div className="flex flex-col h-12 w-52 text-gray-600 w-[80%]">
                        <div className='flex my-2'>
                            <p className='w-16'>Buy</p>
                            <div className="bg-green-600 rounded-sm h-2 self-center mr-2" style={{ width: `${buyPercentage > 70 ? buyPercentage - 30 : buyPercentage}%` }}></div>
                            <p className='text-sm self-center'>{buyPercentage}%</p>
                        </div>

                        <div className='flex mb-2'>
                            <p className='w-16'>Hold</p>
                            <div className="bg-gray-300 rounded-sm h-2 self-center mr-2" style={{ width: `${holdPercentage > 70 ? holdPercentage - 30 : holdPercentage}%` }}></div>
                            <p className='text-sm self-center'>{holdPercentage}%</p>
                        </div>

                        <div className='flex'>
                            <p className='w-16'>Sell</p>
                            <div className="bg-red-500 rounded-sm h-2 self-center mr-2" style={{ width: `${sellPercentage > 70 ? sellPercentage - 30 : sellPercentage}%` }}></div>
                            <p className='text-sm self-center'>{sellPercentage}%</p>
                        </div>
                    </div>
                </div>
            </div>
        </ReusableInfoBlock>
    )
}

export default Sentiment;