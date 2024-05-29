import React from 'react';

const LogoutButton: React.FC = () => {

  return (
    <a href="/api/auth/logout">
        <button className="hidden lg:block bg-blue-700 hover:bg-blue-400 duration-200 easy-in-out text-white font-[500] py-2 px-6 h-10 self-center rounded-xl" onClick={() => logout()}>Logout</button>
    </a>
  );
};

export default LogoutButton;
