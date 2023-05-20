import React from "react";
import { Grid } from "@mui/material";
import PropertyBox from "./PropertyBox";
import { Property } from "../types/property";

interface PropertyContainerProps {
  properties: Property[];
  itemsPerRow?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
  };
}

const PropertyContainer: React.FC<PropertyContainerProps> = ({
  properties,
  itemsPerRow,
}) => {
  return (
    <Grid container spacing={2}>
      {properties.map((item) => (
        <PropertyBox
          item={item}
          imageSrc={`https://source.unsplash.com/random/?houses,accommodation,${item.country}`}
          key={item.id}
          itemsPerRow={itemsPerRow}
        ></PropertyBox>
      ))}
    </Grid>
  );
};

export default PropertyContainer;
