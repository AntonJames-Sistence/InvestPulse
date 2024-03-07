'use client';
import React, { useState } from 'react';
import ReusableInfoBlock from "./ReusableInfoBlock";


const Sentiment = () => {
    const [showKeyEventsTip, setShowKeyEventsTip] = useState(false);
    const [showAnalystEstimatesTip, setShowAnalistEstimatesTip] = useState(false);

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
            </div>
        </ReusableInfoBlock>
    )
}

export default Sentiment;