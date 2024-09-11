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
import Image from 'next/image';

interface NewsData {
  uuid: string;
  title: string;
  description: string | null;
  snippet: string | null;
  url: string;
  image_url: string | null;
  published_at: string | null;
  source: string;
}

// Fetch the news data on the server-side
async function fetchNewsData(): Promise<NewsData[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${apiUrl}/api/news`, {
    next: { revalidate: 43200 },
    // cache: 'no-store',
  });

  // Important to return empty array, because error of the production caused by not supported type
  if (!response.ok) return [];

  const data = await response.json();
  // console.log(data);

  return data;
}

// Use this as a server-side component
export default async function NewsPage() {
  const newsData = await fetchNewsData(); // Fetch data on the server
  // const newsData = [
  //   {
  //     uuid: 'test-id',
  //     title: 'Test Title',
  //     description: 'Test description',
  //     snippet: 'Test snippet',
  //     url: 'https://example.com',
  //     image_url: 'https://example.com/image.jpg',
  //     published_at: '2024-09-11T14:35:10.000000Z',
  //     source: 'example.com',
  //   },
  // ];

  return (
    <Container>
      <Grid sx={{ my: '56px' }} container spacing={4}>
        {newsData.map((article: NewsData) => (
          <Grid item key={article.uuid} xs={12} sm={6} md={4}>
            <Card
              sx={{
                width: '100%',
                height: '500px',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 10,
                justifyContent: 'space-between',
                transition: 'box-shadow 0.3s ease-in-out',
              }}
            >
              {article.image_url && (
                <Image
                  className="h-48 w-full object-cover"
                  alt={article.title}
                  src={article.image_url}
                  height={200}
                  width={400}
                />
              )}
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
                  {article.snippet || article.description}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    marginTop: 'auto',
                  }}
                >
                  <Box
                    sx={{
                      alignSelf: 'flex-end',
                    }}
                  >
                    {new Date(article.published_at ?? '').toLocaleDateString()}
                  </Box>
                  <Link
                    href={article.url}
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
