import { Box, Divider, Grid, Typography } from "@mui/material";
import SectionTitle from "../../../components/SectionTitle";
import styled from "styled-components";
import StepperButton from "../../../components/StepperButton";
import { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { PropertyInfoForm } from "../../../types/property";
interface Props {
  register: UseFormRegister<PropertyInfoForm>;
  errors: FieldErrors<PropertyInfoForm>;
}

/**
 * TODO: Fix the state update issue
 */
const SizingInfo: React.FC<Props> = ({ register, errors }) => {
  const [guestCount, setGuestCount] = useState(1);
  const [bedCount, setBedCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);

  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "20px",
        paddingBottom: "20px",
        gap: "10px",
      }}
    >
      <SectionTitle title="How many guests can your place accommodate?" />
      <GridItem item xs={12} md={12} lg={12}>
        <Typography variant="h5">Guests</Typography>
        <Box sx={{ flex: "1 1 auto" }} />
        <input type="hidden" value={guestCount} {...register("size.guests")} />
        <StepperButton count={guestCount} setCount={setGuestCount} />
      </GridItem>
      <Divider
        flexItem
        sx={{
          width: "100%",
        }}
      />

      <GridItem item xs={12} md={12} lg={12}>
        <Typography variant="h5">Beds</Typography>
        <Box sx={{ flex: "1 1 auto" }} />
        <input type="hidden" value={bedCount} {...register("size.beds")} />
        <StepperButton count={bedCount} setCount={setBedCount} />
      </GridItem>
      <Divider
        flexItem
        sx={{
          width: "100%",
        }}
      />

      <GridItem item xs={12} md={12} lg={12}>
        <Typography variant="h5">Bathrooms</Typography>
        <Box sx={{ flex: "1 1 auto" }} />
        <input
          type="hidden"
          value={bathroomCount}
          {...register("size.bathrooms")}
        />
        <StepperButton count={bathroomCount} setCount={setBathroomCount} />
      </GridItem>
    </Grid>
  );
};

const GridItem = styled(Grid)`
  display: flex;
  flex-direction: row;
`;

export default SizingInfo;
