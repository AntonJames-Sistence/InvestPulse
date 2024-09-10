import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const NotFoundPage: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        p: 3,
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 80, mb: 2, color: 'error.main' }} />

      <Typography
        variant="h1"
        component="h1"
        sx={{ fontWeight: 'bold', mb: 2 }}
      >
        404
      </Typography>

      <Typography variant="h5" component="p" sx={{ mb: 2 }}>
        {`Oops! The page you're looking for doesn't exist.`}
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, textAlign: 'center' }}>
        {`It looks like the page you are trying to reach is no longer available or
        the URL is incorrect.`}
      </Typography>

      <Link href="/" passHref>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            textTransform: 'none',
            fontSize: '1rem',
            px: 4,
            py: 1,
          }}
        >
          Back to Home
        </Button>
      </Link>
    </Box>
  );
};

export default NotFoundPage;
