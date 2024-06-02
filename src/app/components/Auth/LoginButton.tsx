import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import Login from './LoginForm';
import Signup from './SignupForm';

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
        className="bg-blue-700 hover:bg-blue-400 transition duration-200 ease-in-out text-white font-medium py-2 px-6 h-10 rounded-xl"
      >
        Login
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {isLogin ? (
          <>
            <Login />
            <div className="mt-4 text-center">
              <p className="text-gray-600 text-lg">Don't have an account?</p>
              <button
                className="mt-2 bg-blue-700 hover:bg-blue-400 transition duration-200 ease-in-out text-white font-medium py-2 px-6 h-10 rounded-xl"
                onClick={toggleForm}
              >
                Sign Up
              </button>
            </div>
          </>
        ) : (
          <>
            <Signup />
            <div className="mt-4 text-center">
              <p className="text-gray-600 text-lg">Already have an account?</p>
              <button
                className="mt-2 bg-blue-700 hover:bg-blue-400 transition duration-200 ease-in-out text-white font-medium py-2 px-6 h-10 rounded-xl"
                onClick={toggleForm}
              >
                Login
              </button>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default LoginButton;
