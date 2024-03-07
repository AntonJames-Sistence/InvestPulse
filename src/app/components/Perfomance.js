'use client';
import ReusableInfoBlock from "./ReusableInfoBlock";
import React, { useState } from "react";

const Perfomance = () => {
    const [showFundamentalsTip, setShowFundamentalsTip] = useState(false);

    return (
        <ReusableInfoBlock title="Perfomance">
            <div className="flex flex-col">


                <div className='flex mb-3'>
                    <p className="text-gray-600 text-lg font-semibold">
                        Fundamentals
                    </p>
                    <div className="relative ml-2 self-center">
                        <div 
                            className="cursor-pointer inline-block w-4 h-4 bg-gray-500 rounded-full flex items-center justify-center"
                            onMouseEnter={() => setShowFundamentalsTip(true)}
                            onMouseLeave={() => setShowFundamentalsTip(false)}
                        >
                            <span className="text-xs text-white font-semibold">i</span>
                        </div>
                        {showFundamentalsTip && (
                            <div className="absolute bg-gray-100 p-2 rounded-lg text-sm text-gray-700 w-60 z-10">
                                <ul className="list-disc pl-4">
                                <li>Price</li>
                                <li>Market Capitalization</li>
                                <li>Trading Volume</li>
                                <li>Hash Rate</li>
                                <li>Transaction Speed</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ReusableInfoBlock>
    )
}

export default Perfomance;