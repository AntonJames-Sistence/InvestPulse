import React, { useState } from 'react';
import csrfFetch from '../../utils/csrfFetch';

interface LoginFormProps {
  toggleForm: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ toggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await csrfFetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      alert(data.message);
      if (data.token) {
        localStorage.setItem('token', data.token);
        sessionStorage.setItem('sessionToken', data.sessionToken);
      }
    } catch (error) {
      alert('Error logging in');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col p-6 space-y-4">
      <h2 className="text-2xl font-semibold text-gray-700">Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="mt-4 bg-blue-700 hover:bg-blue-400 text-white font-medium py-2 px-4 rounded-xl transition duration-200 ease-in-out"
      >
        Login
      </button>
      <div className="mt-4 text-center">
        <p className="text-gray-600">Don't have an account?</p>
        <button
          type="button"
          className="mt-2 bg-blue-700 hover:bg-blue-400 transition duration-200 ease-in-out text-white font-medium py-2 px-6 h-10 rounded-xl"
          onClick={toggleForm}
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default LoginForm;