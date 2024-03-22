'use client';
import { FaArrowRightLong } from "react-icons/fa6";

const Banner = () => {

    const hadleUpdateDB = async () => {
        await fetch('api/trending',
        {
            method: 'PUT'
        })
    }

    return (
        <div className="p-10 bg-[#1f54f4] rounded-xl flex flex-col items-center text-center text-white mb-4">
            <p className="text-xl font-semibold mb-4 max-w-[300px]">Get Started with KoinY for FREE</p>
            <p className="text-xs">
                With our range of features that you can equip for free, KoinY 
                allows you to be more educated and aware or your lax reports.
            </p>
            <img className="w-40 h-40 mt-4" src="./placeholder3.png" />
            
            <a href="https://accounts.coinbase.com/signup" target="_blanc">
                <button onClick={hadleUpdateDB} className="flex bg-white text-black rounded-xl py-3 px-4 mt-4 font-semibold text-sm hover:bg-black hover:text-white duration-200 easy-in-out"> 
                    <p>Get Started for FREE</p>
                    <FaArrowRightLong className="self-center ml-2" />
                </button>
            </a>
        </div>
    )
}
{/* <a href="https://accounts.coinbase.com/signup" target="_blanc"></a> */}

export default Banner;