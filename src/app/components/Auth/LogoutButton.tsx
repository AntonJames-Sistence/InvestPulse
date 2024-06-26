import React from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation'
import { useAuth } from './AuthContext';
import { CgLogOut } from "react-icons/cg";

const LogoutButton: React.FC = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    // Clear authentication tokens
    localStorage.removeItem('token');
    sessionStorage.removeItem('sessionToken');
    // Update the authentication state
    logout();
    // Redirect to the home page or login page
    if (router) {
      router.push('/');
    }
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      size='small'
      onClick={handleLogout}
      startIcon={<CgLogOut />}
      sx={{ borderRadius: '10px', px: 2 }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
