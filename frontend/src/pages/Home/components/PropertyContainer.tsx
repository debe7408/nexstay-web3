import React from "react";
import { Grid, Container } from "@mui/material";
import { Property } from "../types/property";
import PropertyBox from "./PropertyBox";

interface PropertyContainerProps {
  properties: Property[];
}

const PropertyContainer: React.FC<PropertyContainerProps> = ({
  properties,
}) => {
  return (
    <Grid container spacing={2}>
      {properties.map((item) => (
        <PropertyBox
          item={item}
          imageSrc="https://source.unsplash.com/random"
          key={item.id}
        ></PropertyBox>
      ))}
    </Grid>
  );
};

export default PropertyContainer;