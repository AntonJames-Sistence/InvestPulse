import React, { useState } from 'react';
import { TextField, Button, Typography, Box, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import csrfFetch from '../../utils/csrfFetch';
import { useAuth } from './AuthContext';

interface LoginFormProps {
  toggleForm: () => void;
  onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ toggleForm, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await csrfFetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        sessionStorage.setItem('sessionToken', data.sessionToken);
        login({ username: data.username });
        onClose();
      }
    } catch (error) {
      alert('Error logging in');
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box mx={3} component="form" onSubmit={handleSubmit} sx={{ borderRadius: 3, p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h5">Login</Typography>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        label="Password"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        sx={{
          '&.MuiButton-root': {
            backgroundColor: '#1976d2',
            color: '#ffffff',
          },
        }}
      >
        Login
      </Button>
      <Typography variant="body2" align="center">
        Don&apos;t have an account?
      </Typography>
      <Button onClick={toggleForm} variant="outlined" color="primary">
        Sign Up
      </Button>
    </Box>
  );
};

export default LoginForm;
