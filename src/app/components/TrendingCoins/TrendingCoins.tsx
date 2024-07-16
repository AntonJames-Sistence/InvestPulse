"use client";
import ReusableTile from "../ReusableTile";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { CircularProgress, Button, Box, Skeleton, Typography } from "@mui/material";
import { useAuth } from "../Auth/AuthContext";
import Modal from "../Modal/Modal";
import LoginForm from "../Auth/LoginForm";
import SignupForm from "../Auth/SignupForm";
import { RxUpdate } from "react-icons/rx";
import LoadingButton from "@mui/lab/LoadingButton";
import TrendingCoin from "./TrendingCoin";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  price_change_percentage_24h: string;
}

const TrendingCoins: React.FC = () => {
  // State of the user
  const { authState } = useAuth();

  const [trendingCoins, setTrendingCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  // Modal manipulation states
  const [openModal, setOpenModal] = useState(false);
  const [isLogin, setIsLogin] = useState(!authState.isAuthenticated);

  const router = useRouter();

  useEffect(() => {
    fetchTrendingCoins();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    router.push(`/?coin=${id}`);
  };

  const fetchTrendingCoins = async () => {
    const url = "api/trending";

    try {
      const response = await fetch(url);
      const data = await response.json();
      let topTrending = data.slice(0, 4);
      setTrendingCoins(topTrending);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateTrendingCoins = async () => {
    try {
      const response = await fetch("api/trending", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Trending API error: ${response.status} - ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("Failed to update trending coins:", error);
      throw new Error("Failed to update trending coins.");
    }
  };

  const updateNews = async () => {
    try {
      const response = await fetch("api/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(`News API error: ${response.status} - ${data.message}`);
      }
    } catch (error) {
      throw new Error(`Failed to update news. ${error}`);
    }
  };

  const handleUpdateDB = async () => {
    setLoading(true);

    try {
      await updateTrendingCoins();
      await updateNews();
      await fetchTrendingCoins();

      toast.success("Trending Coins are up-to-date");
    } catch (error) {
      toast.error("Failed to update the database.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <ReusableTile title="Trending Coins (24h)">
      <Modal isOpen={openModal} onClose={handleCloseModal}>
        {isLogin ? (
          <LoginForm toggleForm={toggleForm} onClose={handleCloseModal} />
        ) : (
          <SignupForm toggleForm={toggleForm} onClose={handleCloseModal} />
        )}
      </Modal>
      <Box display="flex" flexDirection="column" mt={-2}>
      {!trendingCoins.length ? (
        Array.from(new Array(4)).map((_, idx) => (
          <Box key={idx} display="flex" justifyContent="space-between" p={1} alignItems="center">
            <Box display="flex" alignItems="center">
              <Skeleton variant="circular" width={25} height={25} sx={{ mr: 2 }} />
              <Skeleton width={100} height={40} />
            </Box>
            <Skeleton width={100} height={40} />
          </Box>
        ))
      ) : (
        trendingCoins.map((coin, idx) => (
          <TrendingCoin key={idx} coinData={coin} handleClick={handleClick} />
        ))
      )}
      <LoadingButton
        variant="contained"
        size="small"
        loading={loading}
        sx={{ mx: "auto", borderRadius: "50px" }}
        onClick={authState.isAuthenticated ? handleUpdateDB : handleLoginClick}
        startIcon={<RxUpdate />}
      >
        {authState.isAuthenticated ? "Update Prices" : "Login to Update Prices"}
      </LoadingButton>
    </Box>
  </ReusableTile>
  );
};

export default TrendingCoins;