'use client';
import React from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";

const TrendingCoinsSlider = ({ trendingCoins }) => {
  
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 5,
    slidesToScroll: 3,
    nextArrow: <CiCircleChevRight />
    ,
    prevArrow: <CiCircleChevLeft />
    ,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false
        }
      },
    ]
  };

  const isPepe = (s) => {
    return s.includes('title');
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {trendingCoins.map((coin, index) => {
          const priceChange = coin.item?.data.price_change_percentage_24h.usd.toFixed(2);
          const isNegative = priceChange < 0;
          
          return (
            <div key={index} className="rounded-lg bg-white border-2 p-4 flex flex-col">
              <div className="flex">
                <img className="h-6 w-6 rounded-full self-center mr-2 mb-2" src={coin.item.thumb} alt={coin.name} />
                <p className="self-center mr-2">{coin.item.symbol}</p>
                <div className={`flex flex-row bg-${isNegative ? 'red' : 'green'}-100 bg-opacity-50 rounded-md max-w-[100px] px-3 py-1 text-${isNegative ? 'red' : 'green'}-600 self-center text-sm`}>
                    <p>{isNegative ? '' : '+'}</p>
                    <div>{`${priceChange}%`}</div>
                </div>
              </div>
              <div className="overflow-auto">{isPepe(coin.item.data.price) ? '$0.0' : coin.item.data.price}</div>
              <div className="flex justify-center">
                <img src={coin.item.data.sparkline}></img>
              </div>
            </div>
          )
        })}
      </Slider>
    </div>
  );
}

export default TrendingCoinsSlider;
