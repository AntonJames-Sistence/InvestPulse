'use client';

import ReusableTile from '../ReusableTile';
// import { FaArrowRightLong } from 'react-icons/fa6';
import { Link } from '@mui/material';
// import Image from 'next/image';
import { stripHTMLTags } from '../../utils/stripHTMLTags';
import React from 'react';
import { StockData } from '../../types/StockDataInterfaces';

interface AboutProps {
  stockData: StockData;
}

const About: React.FC<AboutProps> = ({ stockData }) => {
  const noDescriptionMessage = (
    <>
      {`Company description is currently unavailable. For the latest updates and detailed information, please visit the official webpage:`}
      <Link
        href={stockData.website}
        underline="hover"
        target="_blank"
        rel="noopener noreferrer"
      >
        {stockData.website}
      </Link>
    </>
  );

  const companyDescription = (
    <>
      <div>{stripHTMLTags(stockData.description ?? '')}</div>
      <Link
        href={stockData.website}
        underline="hover"
        sx={{ mt: 4, alignSelf: 'self-end' }}
        target="_blank"
        rel="noopener noreferrer"
      >
        {`Learn more about ${stockData.shortName}`}
      </Link>
    </>
  );

  return (
    <ReusableTile title={`About ${stockData.shortName}`}>
      <hr className="border-gray-200 -mt-4 mb-4 hidden lg:block" />
      {stockData.description ? companyDescription : noDescriptionMessage}
      {/* <hr className="border-gray-200 mt-4 hidden lg:block" /> */}

      {/* <div className="font-semibold text-2xl mb-4 mt-2">{`Investing in ${stockData.shortName}`}</div> */}

      {/* <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:h-40 w-[47%] bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex mr-8">
          <Image
            className="w-1/3 rounded-lg m-3"
            width={500}
            height={500}
            alt="investment illustration"
            src="/placeholder1.webp"
            priority={false}
          />

          <div className="self-center m-2 p-3 h-full flex flex-col justify-between">
            <p className="font-semibold text-white text-xl w-3/4">
              Calculate your Profits
            </p>
            <Button
              variant="contained"
              size="small"
              href={stockData.irWebsite || 'https://www.investing.com'}
              target="_blanc"
              endIcon={<FaArrowRightLong />}
              sx={{ borderRadius: '50px', m: 'auto', ml: 0, mb: 0 }}
            >
              Check now
            </Button>
          </div>
        </div>

        <div className="w-full my-4 lg:my-0 lg:h-40 w-[47%] bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex">
          <Image
            className="w-1/3 rounded-lg m-3"
            height={500}
            width={500}
            alt="tax liability illustration"
            src="/placeholder2.webp"
            priority={false}
          />

          <div className="self-center m-2 p-3 h-full flex flex-col justify-between">
            <p className="font-semibold text-white text-xl w-3/4">
              Calculate your Tax Liability
            </p>
            <Button
              variant="contained"
              size="small"
              href="https://www.taxact.com"
              target="_blanc"
              endIcon={<FaArrowRightLong />}
              sx={{ borderRadius: '50px', m: 'auto', ml: 0, mb: 0 }}
            >
              Check now
            </Button>
          </div>
        </div>
      </div> */}
    </ReusableTile>
  );
};

export default About;
