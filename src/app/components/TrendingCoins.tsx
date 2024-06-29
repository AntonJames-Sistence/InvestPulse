'use client';
import ReusableTile from "./ReusableTile";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import toast, { Toaster } from "react-hot-toast";
import { CircularProgress, Button } from "@mui/material";
import { useAuth } from "./Auth/AuthContext";
import Modal from "./Modal/Modal";
import LoginForm from "./Auth/LoginForm";
import SignupForm from "./Auth/SignupForm";
import { RxUpdate } from "react-icons/rx";
import LoadingButton from '@mui/lab/LoadingButton';

interface Coin {
    id: string,
    name: string,
    symbol: string,
    image: string,
    sparkline: string,
    price_change_percentage_24h: string;
}

const TrendingCoins: React.FC = () => {
    // State of the user
    const { authState } = useAuth();

    const [trendingCoins, setTrendingCoins] = useState<Coin[]>([]);;
    const [loading, setLoading] = useState(true);
    // Modal manipulation states
    const [openModal, setOpenModal] = useState(false);
    const [isLogin, setIsLogin] = useState(!authState.isAuthenticated);
    
    const router = useRouter();

    useEffect(() => {
        fetchTrendingCoins();
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, coinId: string) => {
        e.preventDefault();
        router.push(`/?coin=${coinId}`);
    };

    const fetchTrendingCoins = async () => {
        const url = 'api/trending'

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
            const response = await fetch('api/trending', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                throw new Error(`Trending API error: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            console.error("Failed to update trending coins:", error);
            throw new Error("Failed to update trending coins.");
        }
    };
    
    const updateNews = async () => {
        try {
            const response = await fetch('api/news', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json()
    
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

    if (!trendingCoins.length) {
        return (
            <ReusableTile title="Trending Coins (24h)">
                <div className="self-center text-black"><CircularProgress /></div>
            </ReusableTile>
        )
    }

    return (
        <ReusableTile title="Trending Coins (24h)">
            <Modal isOpen={openModal} onClose={handleCloseModal}>
            {isLogin ? (
                <LoginForm toggleForm={toggleForm} onClose={handleCloseModal} />
                ) : (
                <SignupForm toggleForm={toggleForm} onClose={handleCloseModal} />
                )}
            </Modal>
            <div className="flex flex-col -mt-4">
                {trendingCoins.map((coin, idx) => {
                    const priceChange = parseFloat(coin.price_change_percentage_24h);
                    const isNegative = priceChange < 0;
                    return (
                        <a className={`rounded-lg ${isNegative ? 'hover-red' : 'hover-green'} ease-in-out duration-200 h-[200%] mb-4 cursor-pointer "`}
                            onClick={(e) => handleClick(e, coin.id)} 
                            key={idx}>
                            <div className="flex justify-between p-2">
                                <div className="flex self-center">
                                    <img className="h-6 w-6 rounded-full" src={coin.image} alt={`${coin.name} image`} />
                                    <div className="flex self-center ml-2 font-[400]">
                                        <p>{coin.name}</p>
                                        <p className="ml-1">{`(${coin.symbol})`}</p>
                                    </div>
                                </div>

                                <div className={`flex flex-row bg-${isNegative ? 'red' : 'green'}-100 bg-opacity-50 rounded-md max-w-[100px] px-6 py-1 text-${isNegative ? 'red' : 'green'}-600 self-center text-sm`}>
                                    <div className={`triangle-${isNegative ? 'red' : 'green'} self-center border-${isNegative ? 'red' : 'green'} mr-1`}></div>
                                    <div>{`${priceChange.toFixed(2)}%`}</div>
                                </div>
                            </div>
                        </a>
                    );
                })}
                <LoadingButton 
                    variant="contained"
                    size="small"
                    loading={loading}
                    sx={{ mx: 'auto', borderRadius: '10px'}} 
                    onClick={authState.isAuthenticated ? handleUpdateDB : handleLoginClick}
                    startIcon={<RxUpdate />}
                    >
                {authState.isAuthenticated ? 'Update Prices' : 'Login to Update Prices'}
                </LoadingButton>
            </div>
        </ReusableTile>
    )
}

export default TrendingCoins;