import { Box, Typography, ButtonBase } from "@mui/material";
import Image from "next/image";
import React from "react";

interface CoinData {
  price_change_percentage_24h: string;
  id: string;
  image: string;
  name: string;
  symbol: string;
}

interface TrendingCoinProps {
  coinData: CoinData;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
}

const TrendingCoin: React.FC<TrendingCoinProps> = ({
  coinData,
  handleClick,
}) => {
  const { price_change_percentage_24h, id, image, name, symbol } = coinData;
  // setup positive / negative flag for styling component
  const priceChange = Math.abs(parseFloat(price_change_percentage_24h.toString()));
  const isNegative = parseFloat(price_change_percentage_24h.toString()) < 0;

  return (
    <ButtonBase
      sx={{
        display: 'block',
        borderRadius: 4,
        transition: '0.2s',
        mb: 0,
        p: 1,
        '&:hover': {
          backgroundColor: 'rgba(229, 231, 235, 0.5);',
        },
      }}
      onClick={(e) => handleClick(e, id)}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center">
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              overflow: 'hidden',
              mr: 2,
            }}
          >
            <Image
              src={image}
              alt={`${name} logo`}
              width={40}
              height={40}
              objectFit="cover"
            />
          </Box>
          <Box>
            <Typography align="left" variant="body1" fontWeight="400">
              {name}
            </Typography>
            <Typography align="left" variant="body2" color="textSecondary">
              {`(${symbol})`}
            </Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          bgcolor={isNegative ? 'rgba(255, 0, 0, 0.1)' : 'rgba(0, 255, 0, 0.1)'}
          color={isNegative ? 'rgba(255, 0, 0, 0.8)' : 'green'}
          borderRadius={1}
          width={100}
          px={2}
          py={0.5}
        >
          <Box
            component="span"
            sx={{
              width: 0,
              height: 0,
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: isNegative ?  '5px solid red' : 'none',
              borderBottom: isNegative ? 'none' : '5px solid green',
              mr: 1,
            }}
          />
          <Typography variant="body2">
            {`${priceChange.toFixed(2)}%`}
          </Typography>
        </Box>
      </Box>
    </ButtonBase>
  );
};

export default TrendingCoin;
