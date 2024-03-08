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
    slidesToScroll: 1,
    nextArrow: <CiCircleChevRight />
    ,
    prevArrow: <CiCircleChevLeft />
    ,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {trendingCoins.map((coin, index) => (
            <div key={index} className="rounded-lg bg-white border-2 p-4 flex flex-col" style={{ margin: '10px 10px' }}>
              <div className="flex">
                <img className="h-6 w-6 rounded-full mr-2 mb-2" src={coin.item.thumb} alt={coin.name} />
                <p>{coin.item.symbol}</p>
              </div>
              <div className="overflow-auto">{coin.item.data.price}</div>
              <div className="flex justify-center">
                <img src={coin.item.data.sparkline}></img>
              </div>
            </div>
        ))}
      </Slider>
    </div>
  );
}

export default TrendingCoinsSlider;
