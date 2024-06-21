import ReusableTile from "../ReusableTile";
import { FaArrowRightLong } from "react-icons/fa6";

interface AboutProps {
    coinData: {
        symbol: string,
        name: string,
        description: string,
        homepage: string,
        image: string,
        market_cap_rank: number,
        current_price: number,
        ath: number,
        ath_change_percentage: number,
        ath_date: Date,
        atl: number,
        atl_change_percentage: number,
        atl_date: Date,
        market_cap: number,
        total_volume: number,
        high_24h: number,
        low_24h: number,
        price_change_24h: number,
        price_change_percentage_24h: number,
        price_change_percentage_7d: number,
        price_change_percentage_1y: number,
        last_updated: Date;
    };
}

const About: React.FC<AboutProps> = ({ coinData }) => {
    
    return (
        <ReusableTile title={`About ${coinData.name}`}>
            <hr className="border-gray-200 my-4 lg:block hidden" />
            <div className="text-gray-600">
                {coinData.description}
            </div>
            <hr className="border-gray-200 my-4 hidden lg:block" />

            <div className="font-semibold text-2xl mb-4 mt-2">Already Holding Bitcoin?</div>

            <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:h-40 w-[47%] bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex mr-8">
                    <img className="w-1/3 rounded-lg m-3" src="./placeholder1.png"></img>

                    <div className="self-center ml-3">
                        <p className="font-semibold text-white text-xl w-3/4">Calculate your Profits</p>
                        <a href="https://www.coinbase.com/earn" target="_blanc">
                            <button className="flex bg-white text-black rounded-xl py-1.5 px-4 mt-4 font-semibold text-sm hover:bg-gray-200 hover:scale-110 duration-200 easy-in-out"> 
                                <p>Check Now</p>
                                <FaArrowRightLong className="self-center ml-2" />
                            </button>
                        </a>
                    </div>
                </div>

                <div className="w-full my-4 lg:my-0 lg:h-40 w-[47%] bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex">
                    <img className="w-1/3 rounded-lg m-3" src="./placeholder2.png"></img>

                    <div className="self-center ml-3">
                        <p className="font-semibold text-white text-xl w-3/4">Calculate your tax liability</p>
                        <a href="https://www.coinbase.com/earn" target="_blanc">
                            <button className="flex bg-white text-black rounded-xl py-1.5 px-4 mt-4 font-semibold text-sm hover:bg-gray-200 hover:scale-110 duration-200 easy-in-out"> 
                                <p>Check Now</p>
                                <FaArrowRightLong className="self-center ml-2" />
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </ReusableTile>
    )
}


export default About;