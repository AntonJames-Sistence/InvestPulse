import React, { useState } from "react";
import { TextField, Button, Typography, Box, Alert } from "@mui/material";
import csrfFetch from "../../utils/csrfFetch";
import { useAuth } from "./AuthContext";
import LoadingButton from "@mui/lab/LoadingButton";

interface SignupFormProps {
  toggleForm: () => void;
  onClose: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ toggleForm, onClose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      setLoading(false);
      return;
    }
    if (password.length < 10 || !/[^A-Za-z0-9]/.test(password)) {
      setErrorMessage(
        "Password must be at least 10 characters long and contain at least one symbol"
      );
      setLoading(false);
      return;
    }

    try {
      const response = await csrfFetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        sessionStorage.setItem("sessionToken", data.sessionToken);
        // Log in the user
        login({ username: data.username });
        onClose();
      } else {
        setErrorMessage(data.message || "Error signing up");
      }
      setLoading(false);
    } catch (error) {
      let message = "Internal server error";
      if (error instanceof Response) {
        try {
          const errorData = await error.json();
          message = errorData.message || message;
        } catch (parseError) {
          console.error("Error parsing JSON:", parseError);
        }
      }

      setErrorMessage(message);
      setLoading(false);
    }
  };

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value);
      if (errorMessage) {
        setErrorMessage(null);
      }
    };

  return (
    <Box
      mx={3}
      component="form"
      onSubmit={handleSubmit}
      autoComplete="off"
      sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography variant="h5">Sign Up</Typography>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <TextField
        label="Username"
        type="text"
        value={username}
        onChange={handleInputChange(setUsername)}
        required
      />
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={handleInputChange(setEmail)}
        required
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={handleInputChange(setPassword)}
        required
      />
      <TextField
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={handleInputChange(setConfirmPassword)}
        required
      />
      <LoadingButton
        variant="contained"
        color="primary"
        type="submit"
        loading={loading}
      >
        Sign Up
      </LoadingButton>
      <Typography variant="body2" align="center">
        Already have an account?
      </Typography>
      <Button onClick={toggleForm} variant="outlined" color="primary">
        Login
      </Button>
    </Box>
  );
};

export default SignupForm;
