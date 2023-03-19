import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import { themes } from "../constants/colors";

interface CustomCardProps {
  title: string;
  subtitle: string;
  body: string | JSX.Element;
  imageSrc?: string;
  titleIcon?: JSX.Element;
  cardWidth?: false | "xs" | "sm" | "md" | "lg" | "xl" | undefined;
}

const CardContainer = styled(Card)`
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  background: linear-gradient(
    to bottom,
    ${themes.dark.main} 0%,
    ${themes.dark.dark_accent} 100%
  );
  color: ${themes.dark.text};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
`;

const MediaContainer = styled(CardMedia)`
  height: 140px;
`;

const CustomCardComponent: React.FC<CustomCardProps> = ({
  imageSrc,
  title,
  subtitle,
  body,
  cardWidth,
  titleIcon,
}) => {
  return (
    <Container maxWidth={cardWidth || "xs"}>
      <CardContainer>
        {imageSrc && <MediaContainer image={imageSrc} title={title} />}
        <CardContent>
          <Typography gutterBottom variant="h5">
            {titleIcon}
            {title}
          </Typography>
          <Typography variant="subtitle1" color={themes.dark.secondary_text}>
            {subtitle}
          </Typography>
          <Typography variant="body2" component="div">
            {body}
          </Typography>
        </CardContent>
      </CardContainer>
    </Container>
  );
};

export default CustomCardComponent;
