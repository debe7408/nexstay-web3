import { Grid, Box, Typography, Dialog } from "@mui/material";
import { Property } from "../../../types/property";
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface PropertyComponentProps {
  item: Property;
  imageSrc: string;
}

const PropertyBox: React.FC<PropertyComponentProps> = ({ item, imageSrc }) => {
  const navigate = useNavigate();

  const handleOpenPropertyInfo = () => {
    navigate(`/accommodation/${item.id}`);
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
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
