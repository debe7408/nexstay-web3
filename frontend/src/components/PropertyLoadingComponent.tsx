import React from "react";
import { Grid, Skeleton } from "@mui/material";

interface PropertyLoadingComponentProps {
  count?: number;
  itemsPerRow?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
  };
}

const PropertyLoadingComponent: React.FC<PropertyLoadingComponentProps> = ({
  itemsPerRow,
  count,
}) => {
  const skeletons = Array.from({ length: count || 4 }, (_, i) => i);

  return (
    <Grid container spacing={2} marginTop={2}>
      {skeletons.map((_, index) => (
        <Grid
          item
          xs={itemsPerRow?.xs || 12}
          sm={itemsPerRow?.md || 6}
          md={itemsPerRow?.md || 4}
          lg={itemsPerRow?.lg || 3}
          key={index}
        >
          <Skeleton variant="rectangular" height={200} />
          <Skeleton variant="text" height={32} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PropertyLoadingComponent;
