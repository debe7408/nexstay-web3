import { Grid, Box, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Property } from "../types/property";

interface PropertyComponentProps {
  item: Property;
  handleClick?: () => void;
  itemsPerRow?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
  };
}

const PropertyBox: React.FC<PropertyComponentProps> = ({
  item,
  itemsPerRow,
}) => {
  const navigate = useNavigate();

  const handleOpenPropertyInfo = () => {
    navigate(`/accommodation/${item.id}`);
  };

  const imageSrc = `${process.env.REACT_APP_BASE_API_URL}/images/${item.picture_paths[0]}`;

  return (
    <Grid
      item
      xs={itemsPerRow?.xs || 12}
      sm={itemsPerRow?.md || 6}
      md={itemsPerRow?.md || 4}
      lg={itemsPerRow?.lg || 3}
      key={item.id}
    >
      <StyledBox onClick={handleOpenPropertyInfo}>
        <Image src={imageSrc} alt={item.name} />
        <Content>
          <Typography variant="h6" component="h6">
            {item.name}
          </Typography>
          <Typography variant="body2" component="p">
            {item.city}, {item.country}
          </Typography>

          <Typography variant="overline" component="p">
            {item.price} $ night
          </Typography>
          <Typography variant="overline" component="p">
            {item.type}
          </Typography>
        </Content>
      </StyledBox>
    </Grid>
  );
};

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 1px;
  transition: transform 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    backdrop-filter: blur(8px);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
`;

const Content = styled(Box)`
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default PropertyBox;
