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
        className="hidden lg:block bg-blue-700 hover:bg-blue-400 duration-200 easy-in-out text-white font-[500] py-2 px-6 h-10 self-center rounded-xl"
      >
        Login
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {isLogin ? (
          <>
            <Login />
            <div>
              <p>Don't have an account?</p>
              <button className="hidden my-2 lg:block bg-blue-700 hover:bg-blue-400 duration-200 easy-in-out text-white font-[500] px-6 h-8 self-center rounded-xl" onClick={toggleForm}>Sign Up</button>
            </div>
          </>
        ) : (
          <>
            <Signup />
            <div>
              <p>Already have an account?</p>
              <button className="hidden my-2 lg:block bg-blue-700 hover:bg-blue-400 duration-200 easy-in-out text-white font-[500] px-6 h-8 self-center rounded-xl" onClick={toggleForm}>Login</button>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default LoginButton;
