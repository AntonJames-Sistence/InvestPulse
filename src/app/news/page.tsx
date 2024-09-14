import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  Link,
  Divider,
  Box,
} from '@mui/material';
// import Image from 'next/image';
import { NewsData } from '../types/NewsDataInterface';

// Fetch the news data on the server-side
async function fetchNewsData(): Promise<NewsData[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${apiUrl}/api/news`, {
    next: { revalidate: 43200 },
    // cache: 'no-store',
  });

  // Important to return empty array, because error of the production caused by not supported type
  if (!response.ok) return null;

  const data = await response.json();
  // console.log(data);

  return data;
}

// Use this as a server-side component
export default async function NewsPage() {
  const newsData = (await fetchNewsData()) || []; // Fetch data on the server
  // console.log(newsData)
  if (!newsData) return null;

  return (
    <Container>
      <Grid sx={{ my: '56px' }} container spacing={4}>
        {newsData.map((article: NewsData) => (
          <Grid item key={article.title} xs={12} sm={6} md={4}>
            <Card
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 10,
                justifyContent: 'space-between',
                transition: 'box-shadow 0.3s ease-in-out',
              }}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                }}
              >
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    WebkitLineClamp: 2, // Adjust the number of lines to truncate here
                  }}
                >
                  {article.title}
                </Typography>
                <Divider orientation="horizontal" sx={{ my: 2 }} flexItem />
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  sx={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    WebkitLineClamp: 4, // Adjust the number of lines to truncate here
                  }}
                >
                  {article.description}
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    marginTop: 4,
                  }}
                >
                  <Box>
                    <Typography variant="caption" color="textSecondary">
                      {article.source}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      sx={{ display: 'block', fontWeight: 'bold' }}
                    >
                      {article.fetchedAt}
                    </Typography>
                  </Box>
                  <Link
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                  >
                    Read more
                  </Link>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
