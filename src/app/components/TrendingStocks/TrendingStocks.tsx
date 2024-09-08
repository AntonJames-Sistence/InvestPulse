'use client';

import ReusableTile from '../ReusableTile';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Box, Skeleton } from '@mui/material';
import { useAuth } from '../Auth/AuthContext';
import Modal from '../Modal/Modal';
import LoginForm from '../Auth/LoginForm';
import SignupForm from '../Auth/SignupForm';
import { RxUpdate } from 'react-icons/rx';
import LoadingButton from '@mui/lab/LoadingButton';
import { StockData } from '../../types/StockDataInterfaces';
import TrendingStock from './TrendingStock';

const TrendingStocks: React.FC = () => {
  // State of the user
  const { authState } = useAuth();

  const [trendingStocks, setTrendingStocks] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  // Modal manipulation states
  const [openModal, setOpenModal] = useState(false);
  const [isLogin, setIsLogin] = useState(!authState.isAuthenticated);


  useEffect(() => {
    fetchTrendingStocks();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, symbol: string) => {
    e.preventDefault();
    router.push(`/?stock=${symbol}`);
  };

  const fetchTrendingStocks = async () => {
    try {
      const response = await fetch('api/trending');
      const data = await response.json();
    //   const topTrending = data.slice(0, 4);
    console.log(data)
      setTrendingStocks(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

//   const updateTrendingStocks = async () => {
//     try {
//       const response = await fetch('api/trending', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error(
//           `Trending API error: ${response.status} - ${response.statusText}`
//         );
//       }
//     } catch (error) {
//       console.error('Failed to update trending coins:', error);
//       throw new Error('Failed to update trending coins.');
//     }
//   };

//   const updateNews = async () => {
//     try {
//       const response = await fetch('api/news', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(`News API error: ${response.status} - ${data.message}`);
//       }
//     } catch (error) {
//       throw new Error(`Failed to update news. ${error}`);
//     }
//   };

//   const handleUpdateDB = async () => {
//     setLoading(true);

//     try {
//       await updateTrendingCoins();
//     //   await updateNews();
//       await fetchTrendingCoins();

//       toast.success('Trending Coins are up-to-date');
//     } catch (error) {
//       toast.error('Failed to update the database.');
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

  const handleLoginClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  if (!trendingStocks.length) {
    return (
      <ReusableTile title="Trending Stocks">
        {Array.from(new Array(3)).map((_, idx) => (
          <Box
            key={idx}
            display="flex"
            justifyContent="space-between"
            px={1}
            mb={1}
            alignItems="center"
            sx={{
              borderRadius: 7,
              borderTop: '.5px solid rgba(0, 0, 0, 0.12)',
              borderBottom: '.5px solid rgba(0, 0, 0, 0.12)',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            }}
          >
            <Box display="flex" alignItems="center">
              <Skeleton
                animation="wave"
                variant="circular"
                width={40}
                height={40}
                sx={{ mr: 2 }}
              />
              <Skeleton animation="wave" width={100} height={60} />
            </Box>
            <Skeleton animation="wave" width={80} height={40} />
          </Box>
        ))}
        <LoadingButton
          variant="contained"
          size="medium"
          loading={loading}
          sx={{ m: 'auto', borderRadius: '10px', mt: 2 }}
          onClick={
            authState.isAuthenticated ? handleLoginClick : handleLoginClick
          }
          startIcon={<RxUpdate />}
        >
          {authState.isAuthenticated
            ? 'Update Prices'
            : 'Login to Update Prices'}
        </LoadingButton>
      </ReusableTile>
    );
  }

  return (
    <ReusableTile title="Trending Stocks">
      <Modal isOpen={openModal} onClose={handleCloseModal}>
        {isLogin ? (
          <LoginForm toggleForm={toggleForm} onClose={handleCloseModal} />
        ) : (
          <SignupForm toggleForm={toggleForm} onClose={handleCloseModal} />
        )}
      </Modal>
      <Box display="flex" flexDirection="column">
        {trendingStocks.map((data, idx) => (
          <TrendingStock key={idx} stockData={data} handleClick={handleClick} />
        ))}
        <LoadingButton
          variant="contained"
          size="medium"
          loading={loading}
          sx={{ m: 'auto', borderRadius: '10px', mt: 2 }}
          onClick={
            authState.isAuthenticated ? handleLoginClick : handleLoginClick
          }
          startIcon={<RxUpdate />}
        >
          {authState.isAuthenticated
            ? 'Update Prices'
            : 'Login to Update Prices'}
        </LoadingButton>
      </Box>
    </ReusableTile>
  );
};

export default TrendingStocks;
