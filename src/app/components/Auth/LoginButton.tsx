import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import LogoutButton from './LogoutButton';
import { Button, Typography } from '@mui/material';
import { useAuth } from './AuthContext';
import { CgLogIn } from "react-icons/cg";

const LoginButton: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  // Toggle between login and signup
  const [isLogin, setIsLogin] = useState(true); 
  const { authState, logout } = useAuth();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const toggleForm = () => setIsLogin(!isLogin);

  if (authState.isAuthenticated) {
    return (
      <>
        <Typography variant="body1" sx={{ ml: 6, mr: 4 }}>
          {`Welcome back ${authState.user?.username}`}
        </Typography>
        <LogoutButton />
      </>
    );
  }

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        size='small'
        onClick={openModal}
        startIcon={<CgLogIn />}
        sx={{ m: "10px", px: "20px", py: "10px", borderRadius: "10px" }}
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
    </>
  );
};

export default LoginButton;