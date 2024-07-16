import { Box } from "@mui/system";
import Image from "next/image";
import React from 'react';

interface CoinData {
  price_change_percentage_24h: string;
  id: string;
  image: string;
  name: string;
  symbol: string;
}

interface TrendingCoinProps {
  coinData: CoinData;
  handleClick: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
}

const TrendingCoin: React.FC<TrendingCoinProps> = ({ coinData, handleClick }) => {
    const {price_change_percentage_24h, id, image, name, symbol} = coinData;
  // setup positive / negative flag for styling component
  const priceChange = parseFloat(
    price_change_percentage_24h.toString()
  );
  const isNegative = priceChange < 0;

  return (
    <a
      className={`rounded-lg ${
        isNegative ? "hover-red" : "hover-green"
      } ease-in-out duration-200 h-[200%] mb-4 cursor-pointer`}
      onClick={(e) => handleClick(e, id)}
    >
      <div className="flex justify-between p-2">
        <div className="flex self-center">
          <Image
            className="h-6 w-6 rounded-full"
            width={60}
            height={60}
            src={image}
            alt={`${name} logo`}
            priority={true}
          />
          <div className="flex self-center ml-2 font-[400]">
            <p>{name}</p>
            <p className="ml-1">{`(${symbol})`}</p>
          </div>
        </div>
        <div
          className={`flex flex-row bg-${
            isNegative ? "red" : "green"
          }-100 bg-opacity-50 rounded-md max-w-[100px] px-6 py-1 text-${
            isNegative ? "red" : "green"
          }-600 self-center text-sm`}
        >
          <div
            className={`triangle-${
              isNegative ? "red" : "green"
            } self-center border-${isNegative ? "red" : "green"} mr-1`}
          ></div>
          <div>{`${priceChange.toFixed(2)}%`}</div>
        </div>
      </div>
    </a>
  );
};

export default TrendingCoin;
