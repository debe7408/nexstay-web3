import React from "react";
import { Box, Grid } from "@mui/material";
import { Skeleton } from "@mui/material";

const SuspensePage: React.FC = () => {
  return (
    <Box
      sx={{
        paddingLeft: "5rem",
        paddingRight: "5rem",
        paddingTop: "2rem",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Skeleton variant="text" height={40} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant="rectangular" height={300} />
        </Grid>
        <Grid item xs={6}>
          <Skeleton variant="text" />
        </Grid>
        <Grid item xs={6}>
          <Skeleton variant="text" />
        </Grid>
        <Grid item xs={6}>
          <Skeleton variant="text" />
        </Grid>
        <Grid item xs={6}>
          <Skeleton variant="text" />
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant="text" height={40} />
        </Grid>
        <Grid item xs={4}>
          <Skeleton variant="rectangular" height={150} />
          <Skeleton variant="text" />
        </Grid>
        <Grid item xs={4}>
          <Skeleton variant="rectangular" height={150} />
          <Skeleton variant="text" />
        </Grid>
        <Grid item xs={4}>
          <Skeleton variant="rectangular" height={150} />
          <Skeleton variant="text" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SuspensePage;
