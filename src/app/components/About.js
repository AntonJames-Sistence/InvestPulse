import ReusableTile from "./ReusableTile";
import { FaArrowRightLong } from "react-icons/fa6";


const About = () => {
    const whatIsBitcoin = `Bitcoin's price today is US$16,951.82, with a 24-hour trading volume of $19.14 B. BTC is +0.36% in the last 24 hours. It is currently -7.70% from its 7-day all-time high of $18,366.66, and 3.40% from its 7-day all-time low of $16,394.75. BTC has a circulating supply of 19.24 M BTC and a max supply of 21 M BTC.`

    return (
        <ReusableTile title="About Bitcoin">
            <div className="font-semibold mb-2 -mt-2">What is Bitcoin?</div>
            <div className="text-gray-600">{whatIsBitcoin}</div>
            <hr className="border-gray-200 my-4 lg:block hidden" />
            <div className="font-semibold mb-2 mt-2 lg:mt-0">Lorem ipsum dolor sit amet</div>
            <div className="text-gray-600">
                Bitcoin is a decentralized digital currency, often referred to as cryptocurrency, that 
                operates without the need for a central authority or intermediary. Introduced in 2009 by 
                an anonymous person or group using the pseudonym Satoshi Nakamoto, Bitcoin revolutionized 
                the concept of money by enabling peer-to-peer transactions on a global scale. Built on 
                blockchain technology, Bitcoin transactions are recorded on a public ledger maintained 
                by a network of computers called nodes, ensuring transparency and security.
                <br></br><br></br>
                At its core, 
                Bitcoin represents a shift towards a trustless financial system, where transactions are 
                verified by network participants through a process called mining. The limited supply of 
                21 million bitcoins and the decentralized nature of its network contribute to Bitcoins 
                value proposition as a store of value and a hedge against traditional financial systems.
                <br></br><br></br>
                Despite its volatile price history and regulatory challenges, Bitcoin has gained 
                widespread adoption as a viable alternative to fiat currencies, sparking interest 
                from investors, institutions, and technologists alike in its potential to reshape the 
                future of finance.
            </div>
            <hr className="border-gray-200 my-4 hidden lg:block" />

            <div className="font-semibold text-2xl mb-4 mt-2">Already Holding Bitcoin?</div>

            <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:h-40 w-[47%] bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex mr-8">
                    <img className="w-1/3 rounded-lg m-3" src="./placeholder1.png"></img>

                    <div className="self-center ml-3">
                        <p className="font-semibold text-white text-xl w-3/4">Calculate your Profits</p>
                        <button className="flex bg-white text-black rounded-lg py-1.5 px-4 mt-4 font-semibold text-sm hover:bg-gray-200"> 
                            <p>Check Now</p>
                            <FaArrowRightLong className="self-center ml-2" />
                        </button>
                    </div>
                </div>

                <div className="w-full my-4 lg:my-0 lg:h-40 w-[47%] bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex">
                    <img className="w-1/3 rounded-lg m-3" src="./placeholder2.png"></img>

                    <div className="self-center ml-3">
                        <p className="font-semibold text-white text-xl w-3/4">Calculate your tax liability</p>
                        <button className="flex bg-white text-black rounded-lg py-1.5 px-4 mt-4 font-semibold text-sm hover:bg-gray-200"> 
                            <p>Check Now</p>
                            <FaArrowRightLong className="self-center ml-2" />
                        </button>
                    </div>
                </div>
            </div>

            <hr className="border-gray-200 my-4 hidden lg:block" />
            
            <div className="text-gray-600 hidden lg:block">
                Start your journey into the world of Bitcoin today. Invest in the future of finance with the worlds leading cryptocurrency. Join millions of users worldwide and experience the power of decentralized currency firsthand. Get started now!
            </div>
        </ReusableTile>
    )
}


export default About;