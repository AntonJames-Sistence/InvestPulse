import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import Login from './Login';
import Signup from './Signup';

const LoginButton: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <>
      <button
        onClick={openModal}
        className="hidden lg:block bg-blue-700 hover:bg-blue-400 duration-200 easy-in-out text-white font-[500] py-2 px-6 h-10 self-center rounded-xl"
      >
        Log In
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {isLogin ? (
          <>
            <Login />
            <p>
              Don't have an account? <button onClick={toggleForm}>Sign Up</button>
            </p>
          </>
        ) : (
          <>
            <Signup />
            <p>
              Already have an account? <button onClick={toggleForm}>Log In</button>
            </p>
          </>
        )}
      </Modal>
    </>
  );
};

export default LoginButton;
