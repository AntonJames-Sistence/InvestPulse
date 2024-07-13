'use client';
import { Card, CardContent, Box } from '@mui/material';
import {styled} from '@mui/system';

export const NewsCard = styled(Card)(({ theme }) => ({
  width: '100%',
  height: '500px',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius,
  justifyContent: 'space-between',
  boxShadow: theme.shadows[1],
  transition: 'box-shadow 0.3s ease-in-out',
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}));

export const CardContentStyled = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%', 
});

export const DateStyled = styled('span')(({ theme }) => ({
  color: theme.palette.text.secondary,
  alignSelf: 'flex-end',
}));

export const FooterStyled = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  marginTop: 'auto',
});
