import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

const LoginButton: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button className="hidden lg:block bg-blue-700 hover:bg-blue-400 duration-200 easy-in-out text-white font-[500] py-2 px-6 h-10 self-center rounded-xl" onClick={() => loginWithRedirect()}>Log In</button>
  );
};

export default LoginButton;
