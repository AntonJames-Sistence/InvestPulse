import { ReactElement } from "react";
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Link,
  Box,
} from "@mui/material";

export interface NewsData {
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
    <Container sx={{ mt: 8, mb: 4 }}>
      <Grid container spacing={4}>
        {newsData.map((article: NewsData) => (
          <Grid item key={article.article_id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                width: "100%",
                height: "500px",
                display: "flex",
                flexDirection: "column",
                borderRadius: "20px",
                justifyContent: "space-between",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                transition: "box-shadow 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: "0 8px 10px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              {article.image_url && (
                <CardMedia
                  component="img"
                  alt={article.title}
                  sx={{ height: "200px", width: "100%", objectFit: "cover" }}
                  image={article.image_url}
                />
              )}
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <Typography gutterBottom variant="h6" component="div">
                  {article.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {article.description}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    mt: "auto",
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
                  <Typography
                    component="span"
                    sx={{ color: "text.secondary", alignSelf: "flex-end" }}
                  >
                    {new Date(article.pub_date ?? "").toLocaleDateString()}
                  </Typography>
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
