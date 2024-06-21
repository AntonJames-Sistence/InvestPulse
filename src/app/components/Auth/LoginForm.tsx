import React, { useState } from 'react';
import { TextField, Button, Typography, Box, IconButton, InputAdornment, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import csrfFetch from '../../utils/csrfFetch';
import { useAuth } from './AuthContext';

interface LoginFormProps {
  toggleForm: () => void;
  onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ toggleForm, onClose }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await csrfFetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ identifier, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        sessionStorage.setItem('sessionToken', data.sessionToken);
        login({ username: data.username });
        onClose();
      } else {
        setErrorMessage(data.message || 'Error logging in');
      }
    } catch (error) {
      // Catch error from backend, and process it.
      let message = 'Internal server error';
      if (error instanceof Response) {
        try {
          const errorData = await error.json();
          message = errorData.message || message;
        } catch (parseError) {
          console.error('Error parsing JSON:', parseError);
        }
      }

      setErrorMessage(message);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setter(event.target.value);
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  return (
    <Box mx={3} component="form" onSubmit={handleSubmit} sx={{ borderRadius: 3, p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h5">Login</Typography>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <TextField
        label="Email or Username"
        type="text"
        value={identifier}
        onChange={handleInputChange(setIdentifier)}
        required
      />
      <TextField
        label="Password"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={handleInputChange(setPassword)}
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
            borderRadius: '10px'
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
