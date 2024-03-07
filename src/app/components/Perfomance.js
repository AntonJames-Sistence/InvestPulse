'use client';
import ReusableInfoBlock from "./ReusableInfoBlock";
import React, { useState } from "react";
import { fundamentals } from "../data/fundamentals";

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
                                {fundamentals.map((event, index) => 
                                        <li key={index}>{event.title}</li>
                                )}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-x-20">
                    <div>
                        {fundamentals.slice(0, 5).map((event, index) => 
                            <div>
                                <div key={index} className="flex justify-between text-sm">
                                    <span className="text-gray-700">{event.title}</span>
                                    <span className="">{event.numbers}</span>
                                </div>
                                <hr className="border-gray-400 my-4" />
                            </div>
                        )}
                    </div>
                    <div>
                        {fundamentals.slice(5).map((event, index) => 
                            <div>
                                <div key={index} className="flex justify-between text-sm">
                                    <span className="text-gray-500">{event.title}</span>
                                    <span>{event.numbers}</span>
                                </div>
                                <hr className="border-gray-400 my-4" />
                            </div>
                        )}
                        <div className="flex flex justify-between text-sm w-full max-h-[20px]">
                            <span className="text-gray-500 self-center">All-Time High</span>
                            <div className="flex flex-col relative -top-[10px]">
                                <span className="self-end">$69,044.77<p className="text-red-500 inline-block ml-1">-75.6%</p></span>
                                <span className="text-xs">Nov 10, 2021 (about 1 year)</span>
                            </div>
                        </div>
                        <hr className="border-gray-400 my-4" />

                        <div className="flex flex justify-between text-sm w-full max-h-[20px]">
                            <span className="text-gray-500 self-center">All-Time Low</span>
                            <div className="flex flex-col relative -top-[10px]">
                                <span className="self-end">$67.81<p className="text-green-500 inline-block ml-1">24749.1%</p></span>
                                <span className="text-xs">Jul 06, 2013 (over 9 years)</span>
                            </div>
                        </div>
                        <hr className="border-gray-400 my-4" />
                    </div>
                    
                    
                </div>
            </div>
        </ReusableInfoBlock>
    )
}

export default Perfomance;