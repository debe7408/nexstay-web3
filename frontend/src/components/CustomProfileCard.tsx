import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
  Avatar,
  Grid,
  Box,
} from "@mui/material";
import styled from "styled-components";
import { themes } from "../constants/colors";

interface CustomCardProps {
  title: string;
  subtitle: string;
  body: string | JSX.Element;
  bannerImageSrc?: string;
  titleIcon?: JSX.Element;
  cardWidth?: false | "xs" | "sm" | "md" | "lg" | "xl" | undefined;
}

const CardContainer = styled(Card)`
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 20px;
  background: linear-gradient(
    to bottom,
    ${themes.dark.main} 0%,
    ${themes.dark.dark_accent} 100%
  );
  color: black;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const MediaContainer = styled(CardMedia)`
  display: flex;
  height: 140px;
  width: 100%;
`;

const CustomProfileCard: React.FC<CustomCardProps> = ({
  bannerImageSrc,
  title,
  subtitle,
  body,
  cardWidth,
}) => {
  return (
    <Container maxWidth={cardWidth || "xs"}>
      <CardContainer>
        {bannerImageSrc && (
          <MediaContainer image={bannerImageSrc} title={title} />
        )}
        <StyledGrid container>
          <Grid item xs={12}>
            <StyledBox>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  backgroundColor: themes.dark.main,
                  border: "1px solid white",
                  boxShadow: "0 10px 8px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Typography
                gutterBottom
                variant="h3"
                sx={{
                  paddingTop: "10px",
                }}
              >
                {title}
              </Typography>
            </StyledBox>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              marginBottom="10px"
              color={themes.dark.text}
            >
              {subtitle}
            </Typography>
            <StyledBox>
              <Typography variant="body2" component="div">
                {body}
              </Typography>
            </StyledBox>
          </Grid>
        </StyledGrid>

        <CardContent></CardContent>
      </CardContainer>
    </Container>
  );
};

const StyledGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const StyledBox = styled(Box)`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  padding: 10px;
  flex-wrap: wrap;
  align-items: stretch;
`;

export default CustomProfileCard;
