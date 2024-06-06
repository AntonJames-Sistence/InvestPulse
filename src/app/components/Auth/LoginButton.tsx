import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { Button } from '@mui/material';

const LoginButton: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  // Toggle between login and signup
  const [isLogin, setIsLogin] = useState(true); 

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={openModal}
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