import React, { useState } from 'react';
import csrfFetch from '../../utils/csrfFetch';

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (password.length < 6 || !/[^A-Za-z0-9]/.test(password)) {
      alert('Password must be at least 6 characters long and contain at least one symbol');
      return;
    }

    try {
      const response = await csrfFetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify({ username, email, password, confirmPassword }),
      });
      const data = await response.json();
      alert(data.message);
      if (data.sessionToken) {
        sessionStorage.setItem('sessionToken', data.sessionToken);
      }
    } catch (error) {
      alert('Error signing up');
    }
  };

  return (
    <form className="flex flex-col p-6 max-w-sm mx-auto bg-white rounded-lg shadow-md space-y-4" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold text-gray-700">Sign Up</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
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
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="mt-4 bg-blue-700 hover:bg-blue-400 text-white font-medium py-2 px-4 rounded-xl transition duration-200 ease-in-out"
      >
        Sign Up
      </button>
    </form>
  );
};

export default Signup;
