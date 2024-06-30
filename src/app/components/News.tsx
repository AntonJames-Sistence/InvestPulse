import React, { useEffect, useState } from 'react';
import { Container, Card, CardContent, CardMedia, Typography, CircularProgress, Grid, Button } from '@mui/material';
import { styled } from '@mui/system';
import ReusableTile from './ReusableTile';
import Link from 'next/link';
import { truncateText } from '../utils/truncateText';
import { IoNewspaperOutline } from "react-icons/io5";
// Redux imports
import { fetchNews } from '../features/news/newsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../store';

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
  height: '360px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
  borderRadius: '15px',
}));

const CardContentStyled = styled(CardContent)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%', 
});

const DateStyled = styled(Typography)(({ theme }) => ({
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
    marginTop: 'auto',
});

const News: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const news = useSelector((state: any) => state.news.news);
  const newsStatus = useSelector((state: any) => state.news.status);
  const error = useSelector((state: any) => state.news.error);
  // const [news, setNews] = useState<NewsData[]>([]);

  useEffect(() => {
    if (newsStatus === 'idle') {
      dispatch(fetchNews());
    }

  }, [newsStatus, dispatch]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // Set your placeholder image path here
    e.currentTarget.src = 'https://mpost.io/wp-content/uploads/UXUY-1024x608.jpg';
  };

  if (newsStatus === 'loading') {
    return (
      <ReusableTile title="Latest News">
        <div className='m-10 self-center flex justify-center'>
          <CircularProgress />
        </div>
      </ReusableTile>
    );
  }

  if (newsStatus === 'failed') {
    return (
      <ReusableTile title="Latest News">
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      </ReusableTile>
    );
  }

  return (
    <ReusableTile title="Latest News">
        <Grid container spacing={4}>
          {news.slice(0, 3).map((article: NewsData) => (
            <Grid item key={article.article_id} xs={12}>
              <NewsCard>
                {article.image_url && (
                  <CardMedia
                    component="img"
                    alt={article.title}
                    style={{ height: '200px', width: '100%', objectFit: 'cover' }}
                    image={article.image_url}
                    onError={handleImageError} // Handle image loading errors
                  />
                )}
                <CardContentStyled>
                  <Typography gutterBottom variant="body1" component="div">
                    {truncateText(article.title, 80)}
                  </Typography>
                  <FooterStyled>
                    <ReadMoreStyled href={article.link} target="_blank" rel="noopener noreferrer">
                      Read more
                    </ReadMoreStyled>
                    <DateStyled variant="caption">
                      {new Date(article.pub_date ?? '').toLocaleDateString()}
                    </DateStyled>
                  </FooterStyled>
                </CardContentStyled>
              </NewsCard>
            </Grid>
          ))}
        </Grid>
        <Link href="/news" passHref className="flex justify-center mt-4">
          <Button 
              variant="contained"
              size='small'
              startIcon={<IoNewspaperOutline />}
              sx={{ mx: 'auto', borderRadius: '50px' }}
          >
            All News
          </Button>
        </Link>
    </ReusableTile>
  );
};

export default News;
