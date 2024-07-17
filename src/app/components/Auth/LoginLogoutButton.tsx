import React, { useState } from "react";
import Modal from "../Modal/Modal";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { Button, Typography, Box } from "@mui/material";
import { useAuth } from "./AuthContext";
import { CgLogIn, CgLogOut } from "react-icons/cg";
import { useRouter } from 'next/navigation'

const LoginLogoutButton: React.FC = () => {
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);
  // Toggle between login and signup
  const [isLogin, setIsLogin] = useState(true);
  const { authState, logout } = useAuth();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const toggleForm = () => setIsLogin(!isLogin);

  

  const handleLogout = () => {
    // Clear authentication tokens
    localStorage.removeItem('token');
    sessionStorage.removeItem('sessionToken');
    // Update the authentication state
    logout();
    // Redirect to the home page or login page
    if (router) {
      router.push('/');
    }
  };

  const logoutButton = (
    <Box>
    <Typography variant="body1" sx={{ ml: 6, mr: 4 }}>
          {`Welcome back ${authState.user?.username}`}
        </Typography>
    <Button
      variant="contained"
      color="secondary"
      size='small'
      onClick={handleLogout}
      startIcon={<CgLogOut />}
      sx={{ m: "10px", px: "20px", py: "8px", borderRadius: "10px" }}
    >
      Logout
    </Button>
    </Box>
  )

  const loginButton = (
    <Box>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={openModal}
        startIcon={<CgLogIn />}
        sx={{ m: "10px", px: "20px", py: "8px", borderRadius: "10px" }}
      >
        Login
      </Button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {isLogin ? (
          <LoginForm toggleForm={toggleForm} onClose={closeModal} />
        ) : (
          <SignupForm toggleForm={toggleForm} onClose={closeModal} />
        )}
      </Modal>
    </Box>
  )

  return (
    authState.isAuthenticated ? logoutButton : loginButton
  );
};

export default LoginLogoutButton;