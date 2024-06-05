'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';

const theme = createTheme({
    palette: {
      primary: {
        main: '#00796b',  // Updated to a different shade of blue-green
      },
      secondary: {
        main: '#ff5722',  // Updated to a different shade of orange
      },
      text: {
        primary: '#000000',  // Ensure text is white on primary background
        secondary: '#000000',  // Ensure text is black on secondary background
      }
    },
});

export default function ThemeRegistry({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}