import {
  Box,
  Divider,
  Grid,
  Typography,
  Paper,
  TextField,
} from "@mui/material";
import SectionTitle from "../../../components/SectionTitle";
import styled from "styled-components";
import StepperButton from "../../../components/StepperButton";
import { useEffect, useState } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { PropertyInfoForm } from "../../../types/property";
interface Props {
  errors: FieldErrors<PropertyInfoForm>;
  setValue: UseFormSetValue<PropertyInfoForm>;
}

const SizingInfo: React.FC<Props> = ({ errors, setValue }) => {
  const [guestCount, setGuestCount] = useState(1);
  const [bedCount, setBedCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);

  console.log(errors);

  useEffect(() => {
    setValue("size.guests", guestCount);
    setValue("size.beds", bedCount);
    setValue("size.bathrooms", bathroomCount);
  }, [guestCount, bedCount, setBathroomCount]);

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
      <Paper component={GridItem} item xs={12} md={12} lg={12}>
        <Typography variant="h5">Guests</Typography>
        <Box sx={{ flex: "1 1 auto" }} />
        <TextField key={"size.guests"} value={guestCount} type="hidden">
          {guestCount}
        </TextField>
        <StepperButton count={guestCount} setCount={setGuestCount} />
      </Paper>

      <Paper component={GridItem} item xs={12} md={12} lg={12}>
        <Typography variant="h5">Beds</Typography>
        <Box sx={{ flex: "1 1 auto" }} />
        <TextField key={"size.beds"} value={bedCount} type="hidden">
          {bedCount}
        </TextField>
        <StepperButton count={bedCount} setCount={setBedCount} />
      </Paper>

      <Paper component={GridItem} item xs={12} md={12} lg={12}>
        <Typography variant="h5">Bathrooms</Typography>
        <Box sx={{ flex: "1 1 auto" }} />
        <TextField key={"size.bathrooms"} value={bathroomCount} type="hidden" />
        <StepperButton count={bathroomCount} setCount={setBathroomCount} />
      </Paper>
    </Grid>
  );
};

const GridItem = styled(Grid)`
  display: flex;
  flex-direction: row;
  padding-left: 10px;
  margin-bottom: 10px;
  border: 1px solid white;
`;

export default SizingInfo;
