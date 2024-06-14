import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { Button, Typography } from '@mui/material';
import { useAuth } from './AuthContext';

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
        <Typography variant="body1" sx={{ mx: 2 }}>
          {authState.user?.email}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={logout}
          sx={{
            mx: 2,
            // Ensure this style has higher specificity
            '&.MuiButton-root': {
              backgroundColor: '#d32f2f',
              color: '#ffffff',
            },
          }}
        >
          Logout
        </Button>
      </>
    );
  }

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={openModal}
        sx={{
          mx: 2,
          // Ensure this style has higher specificity
          '&.MuiButton-root': {
            backgroundColor: '#1976d2',
            color: '#ffffff',
          },
        }}
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