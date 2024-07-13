import React from "react";
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Link,
} from "@mui/material";
import {
  NewsCard,
  CardContentStyled,
  DateStyled,
  FooterStyled,
} from "./NewsStyledComponents";
import { truncateText } from "../../utils/truncateText";

export interface NewsData {
  article_id: string;
  title: string;
  link: string;
  description: string | null;
  pub_date: string | null;
  image_url: string | null;
  source_url: string | null;
}

interface NewsProps {
  newsData: NewsData[];
}

// const NewsCard = styled(Card)(({ theme }) => ({
//   width: '100%',
//   height: '500px',
//   display: 'flex',
//   flexDirection: 'column',
//   borderRadius: '20px',
//   justifyContent: 'space-between',
//   boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Consistent shadow
//   transition: 'box-shadow 0.3s ease-in-out',
//   '&:hover': {
//     boxShadow: '0 8px 10px rgba(0, 0, 0, 0.15)', // Slightly deeper shadow on hover
//   },
// }));

// const CardContentStyled = styled(CardContent)({
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'space-between',
//   height: '100%',
// });

// const DateStyled = styled('span')(({ theme }) => ({
//   color: theme.palette.text.secondary,
//   alignSelf: 'flex-end',
// }));

// const FooterStyled = styled('div')({
//   display: 'flex',
//   justifyContent: 'space-between',
//   alignItems: 'flex-end',
//   marginTop: 'auto',
// });

const News: React.FC<NewsProps> = ({ newsData }) => {
  if (!newsData) {
    return (
      <Container>
        <div className="mt-24 mb-8 self-center flex justify-center">
          <Typography variant="h6">No news data available</Typography>
        </div>
      </Container>
    );
  }

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src =
      "https://mpost.io/wp-content/uploads/UXUY-1024x608.jpg";
  };

  return (
    <Container className="mt-24 mb-8">
      <Grid container spacing={4}>
        {newsData.map((article: NewsData) => (
          <Grid item key={article.article_id} xs={12} sm={6} md={4}>
            <NewsCard>
              {article.image_url && (
                <CardMedia
                  component="img"
                  alt={article.title}
                  style={{ height: "200px", width: "100%", objectFit: "cover" }}
                  image={article.image_url}
                />
              )}
              <CardContentStyled>
                <Typography gutterBottom variant="h6" component="div">
                  {truncateText(article.title, 100)}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {truncateText(article.description, 150)}
                </Typography>
                <FooterStyled>
                  <Link
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                  >
                    Read more
                  </Link>
                  <DateStyled>
                    {new Date(article.pub_date ?? "").toLocaleDateString()}
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
