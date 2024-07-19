import { ReactElement } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  Link,
  Divider,
  Box,
} from "@mui/material";
import Image from "next/image";

interface NewsData {
  article_id: string;
  title: string;
  link: string;
  description: string | null;
  pub_date: string | null;
  image_url: string | null;
  source_url: string | null;
}

async function fetchNewsData(): Promise<NewsData[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${apiUrl}/api/news`, {
    next: { revalidate: 86400 }, // Revalidate every 24h
  });

  if (!response.ok) {
    throw new Error("Failed to fetch news data");
  }

  const data: NewsData[] = await response.json();
  return data;
}

const NewsPage = async (): Promise<ReactElement> => {
  const newsData = await fetchNewsData();

  return (
    <Container className="mt-24 mb-8">
      <Grid container spacing={4}>
        {newsData.map((article: NewsData) => (
          <Grid item key={article.article_id} xs={12} sm={6} md={4}>
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
                  {article.description}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    marginTop: 'auto',
                  }}
                >
                  <Link
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                  >
                    Read more
                  </Link>
                  <Box
                    sx={{
                      alignSelf: 'flex-end',
                    }}
                  >
                    {new Date(article.pub_date ?? "").toLocaleDateString()}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default NewsPage;
