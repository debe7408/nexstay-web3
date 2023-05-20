import { useState } from "react";
import styled from "styled-components";
import { Box, Container, Grid, Rating, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const ratingLabels: { [index: string]: string } = {
  1: "Horrible",
  2: "Poor",
  3: "Okay",
  4: "Good",
  5: "Excellent",
};

const getRatingLabel = (rating: number) => {
  return ratingLabels[rating];
};

interface Props {
  rating: number | null;
  setRating(rating: number | null): void;
  disabled?: boolean;
  label?: string;
}

const RatingComponent: React.FC<Props> = ({
  rating,
  setRating,
  disabled,
  label,
}) => {
  const [hover, setHover] = useState(-1);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {label}
        </Typography>{" "}
      </Grid>
      <Grid item xs={12}></Grid>
      <Rating
        name="hover-feedback"
        value={rating}
        security="large"
        disabled={disabled}
        getLabelText={getRatingLabel}
        onChange={(event, newRating) => {
          setRating(newRating);
        }}
        onChangeActive={(event, newRating) => {
          setHover(newRating);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {rating !== null && (
        <Box sx={{ ml: 2 }}>{ratingLabels[hover !== -1 ? hover : rating]}</Box>
      )}
    </Grid>
  );
};

export default RatingComponent;
