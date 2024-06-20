import React, { useEffect, useState } from 'react';
import { Container, Card, CardContent, CardMedia, Typography, CircularProgress, Grid, Button } from '@mui/material';
import { styled } from '@mui/system';
import ReusableTile from './ReusableTile';

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
//   backgroundColor: `rgba(224, 242, 254, 0.6)`, // Light blue with 50% transparency
  width: '100%',
  height: '400px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const CardContentStyled = styled(CardContent)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%', 
});

const DateStyled = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
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
    marginTop: 'auto',
});

const News: React.FC = () => {
  const [news, setNews] = useState<NewsData[]>([]);
  const [visibleNewsCount, setVisibleNewsCount] = useState(3);

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

  const handleLoadMore = () => {
    setVisibleNewsCount((prevCount) => prevCount + 3);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // Set your placeholder image path here
    e.currentTarget.src = 'https://mpost.io/wp-content/uploads/UXUY-1024x608.jpg';
  };

  if (!news.length) {
    return (
        <ReusableTile title="Latest News">
            <div className='m-10 self-center flex justify-center'>
                <CircularProgress />
            </div>
        </ReusableTile>
    );
  }

  return (
    <ReusableTile title="Latest News">
        <Grid container spacing={4}>
          {news.slice(0, visibleNewsCount).map((article) => (
            <Grid item key={article.article_id} xs={12} sm={6} md={4}>
              <NewsCard className='shadow-xl rounded-lg'>
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
                    <DateStyled variant="caption">
                      {new Date(article.pub_date ?? '').toLocaleDateString()}
                    </DateStyled>
                    <ReadMoreStyled href={article.link} target="_blank" rel="noopener noreferrer">
                      Read more
                    </ReadMoreStyled>
                  </FooterStyled>
                </CardContentStyled>
              </NewsCard>
            </Grid>
          ))}
        </Grid>
        {visibleNewsCount < news.length && (
          <div className="flex justify-center mt-4">
            <Button 
                variant="contained" 
                sx={{
                    mx: 2,
                    '&.MuiButton-root': {
                        backgroundColor: '#1976d2',
                        color: '#ffffff',
                    },}} 
                onClick={handleLoadMore}
            >
              Load More
            </Button>
          </div>
        )}
    </ReusableTile>
  );
};

export default News;
