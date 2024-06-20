'use client'
import React, { useEffect, useState } from 'react';
import { Container, Card, CardContent, CardMedia, Typography, CircularProgress, Grid } from '@mui/material';
import { styled } from '@mui/system';

interface NewsData {
  article_id: string;
  title: string;
  link: string;
  description: string | null;
  pub_date: string | null;
  image_url: string | null;
  source_url: string | null;
}

const NewsCard = styled(Card)(({ theme }) => ({
  width: '100%',
  height: '400px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Consistent shadow
  transition: 'box-shadow 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 8px 10px rgba(0, 0, 0, 0.15)', // Slightly deeper shadow on hover
  },
}));

const CardContentStyled = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%', 
});

const DateStyled = styled('span')(({ theme }) => ({
  color: theme.palette.text.secondary,
  alignSelf: 'flex-end',
}));

const ReadMoreStyled = styled('a')(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  fontWeight: 'bold',
  marginTop: 'auto',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const FooterStyled = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  marginTop: 'auto',
});

const News: React.FC = () => {
  const [news, setNews] = useState<NewsData[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news');
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://mpost.io/wp-content/uploads/UXUY-1024x608.jpg';
  };

  if (!news.length) {
    return (
      <Container>
        <div className='m-10 self-center flex justify-center'>
            <CircularProgress />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Grid container spacing={4}>
        {news.map((article) => (
          <Grid item key={article.article_id} xs={12}>
            <NewsCard className='rounded-lg'>
              {article.image_url && (
                <CardMedia
                  component="img"
                  alt={article.title}
                  height="140"
                  image={article.image_url}
                  onError={handleImageError} // Handle image loading errors
                />
              )}
              <CardContentStyled>
                <Typography gutterBottom variant="body1" component="div">
                  {article.title}
                </Typography>
                <FooterStyled>
                  <ReadMoreStyled href={article.link} target="_blank" rel="noopener noreferrer">
                    Read more
                  </ReadMoreStyled>
                  <DateStyled>
                    {new Date(article.pub_date ?? '').toLocaleDateString()}
                  </DateStyled>
                </FooterStyled>
              </CardContentStyled>
            </NewsCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default News;
