import { FaArrowRightLong } from "react-icons/fa6";

const Banner = () => {
    return (
        <div className="p-10 bg-[#1f54f4] w-auto rounded-xl w-[35%] flex flex-col items-center text-center text-white">
            <p className="text-lg font-semibold mb-4">Get Started with KoinX for FREE</p>
            <p className="text-xs">
                With our range of features that you can equip for free, KoinX 
                allows you to be more educated and aware or your lax reports.
            </p>
            <img className="w-40 h-40 " src="./Placeholder3.png" />
            
            <button className="flex bg-white text-black rounded-lg py-1.5 px-4 mt-4 font-semibold text-sm"> 
                <p>Get Started for FREE</p>
                <FaArrowRightLong className="self-center ml-2" />
            </button>
        </div>
        
    )
}

export default Banner;