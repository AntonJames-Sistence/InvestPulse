'use client';
import React from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useRouter } from 'next/navigation';

interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  price: string;
  price_change_percentage_24h: string;
  sparkline: string;
}

interface TrendingCoinsSliderProps {
  trendingCoins: Coin[];
}

const TrendingCoinsSlider: React.FC<TrendingCoinsSliderProps> = ({ trendingCoins }) => {
  const router = useRouter();

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, coinId: string) => {
    e.preventDefault();
    router.push(`/?coin=${coinId}`);
  };

  const NextArrow: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <div className="slick-arrow next-arrow bg-white flex justify-center items-center" onClick={onClick}>
      <FaChevronRight />
    </div>
  );

  const PrevArrow: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <div className="slick-arrow prev-arrow bg-white flex justify-center items-center" onClick={onClick}>
      <FaChevronLeft />
    </div>
  );

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 6000,
    autoplay: true,
    autoplaySpeed: 1,
    cssEase: 'linear',
    waitForAnimate: true,
    pauseOnFocus: false, 
    pauseOnHover: true,
    slidesToShow: 5,
    slidesToScroll: 3,
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

  const isPepe = (s: string) => {
    return s.includes('title');
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {trendingCoins.map((coin, index) => {
          const priceChange = parseFloat(coin.price_change_percentage_24h);
          const isNegative = priceChange < 0;
          
          return (
            <a className="rounded-lg ease-in-out duration-300 cursor-pointer" 
                onClick={(e) => handleNavigation(e, coin.id)} 
                key={index}>
              <div className={`rounded-lg bg-white border-2 p-4 flex flex-col ${isNegative ? 'hover-red' : 'hover-green'}`}>
                <div className="flex">
                  <img className="h-6 w-6 rounded-full self-center mr-2 mb-2" src={coin.image} alt={coin.name} />
                  <p className="self-center mr-2">{coin.symbol}</p>
                  <div className={`flex flex-row bg-${isNegative ? 'red' : 'green'}-100 bg-opacity-50 rounded-md max-w-[100px] px-3 py-1 text-${isNegative ? 'red' : 'green'}-600 self-center text-sm`}>
                      <p>{isNegative ? '' : '+'}</p>
                      <div>{`${priceChange.toFixed(2)}%`}</div>
                  </div>
                </div>
                <div className="overflow-auto text-lg">{isPepe(coin.price) ? '$0.000' : (coin.price.includes('.') ? '$' + coin.price.substring(0, coin.price.indexOf('.') + 4) : coin.price)}</div>
                <div className="flex justify-center">
                  <img src={coin.sparkline}></img>
                </div>
              </div>
            </a>
          )
        })}
      </Slider>
    </div>
  );
}

export default TrendingCoinsSlider;

interface SliderSettings {
  dots: boolean;
  arrows: boolean;
  infinite: boolean;
  speed: number;
  autoplay: boolean;
  autoplaySpeed: number;
  cssEase: string;
  waitForAnimate: boolean;
  pauseOnFocus: boolean;
  pauseOnHover: boolean;
  slidesToShow: number;
  slidesToScroll: number;
  nextArrow: React.ReactNode;
  prevArrow: React.ReactNode;
  responsive: ResponsiveSetting[];
}

interface ResponsiveSetting {
  breakpoint: number;
  settings: SliderSettings;
}