import ReusableTile from "../ReusableTile";
import { FaArrowRightLong } from "react-icons/fa6";
import { styled } from '@mui/system';
import { Link, Button } from "@mui/material";

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
    const noDescriptionMessage = (
        <>
            {`Coin description is currently unavailable. For the latest updates and detailed information, please visit the official webpage:`}
            <Link href={coinData.homepage} underline="hover" target="_blank" rel="noopener noreferrer">
                {coinData.homepage}
            </Link>
        </>
    )
    const coinDescription = (
        <>
            <div>
                {coinData.description}
            </div>
            <Link href={coinData.homepage} underline="hover" sx={{mt: 4, alignSelf: 'self-end'}} target="_blank" rel="noopener noreferrer">
                {`Learn more about ${coinData.name}`}
            </Link>
        </>
    )
    
    return (
        <ReusableTile title={`About ${coinData.name}`}>
            <hr className="border-gray-200 -mt-4 mb-4 hidden lg:block" />
            {coinData.description ? coinDescription : noDescriptionMessage}
            <hr className="border-gray-200 mt-4 hidden lg:block" />

            <div className="font-semibold text-2xl mb-4 mt-2">{`Already Holding ${coinData.name}`}</div>

            <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:h-40 w-[47%] bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex mr-8">
                    <img className="w-1/3 rounded-lg m-3" src="./placeholder1.png"></img>

                    <div className="self-center m-2 p-3 h-full flex flex-col justify-between">
                        <p className="font-semibold text-white text-xl w-3/4">Calculate your Profits</p>
                        <Button 
                            variant="contained" 
                            size="small"
                            href="https://www.coinbase.com/earn"
                            target="_blanc"
                            endIcon={<FaArrowRightLong />}
                            sx={{ borderRadius: '50px', m: 'auto', ml: 0, mb: 0}}>
                            Check now
                        </ Button>
                    </div>
                </div>

                <div className="w-full my-4 lg:my-0 lg:h-40 w-[47%] bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex">
                    <img className="w-1/3 rounded-lg m-3" src="./placeholder2.png"></img>

                    <div className="self-center m-2 p-3 h-full flex flex-col justify-between">
                        <p className="font-semibold text-white text-xl w-3/4">Calculate your tax liability</p>
                        <Button 
                            variant="contained" 
                            size="small"
                            href="https://www.coinbase.com/earn"
                            target="_blanc"
                            endIcon={<FaArrowRightLong />}
                            sx={{ borderRadius: '50px', m: 'auto', ml: 0, mb: 0}}>
                            Check now
                        </ Button>
                    </div>
                </div>
            </div>
        </ReusableTile>
    )
}


export default About;