import React from "react";
import { TextField, Grid } from "@mui/material";
import styled from "styled-components";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import ErrorComponent from "../../../components/ErrorComponent";
import { PropertyInfoForm } from "../../../types/property";

interface Props {
  register: UseFormRegister<PropertyInfoForm>;
  errors: FieldErrors<PropertyInfoForm>;
}

const StyledTextField = styled(TextField)`
  margin-bottom: 20px;
`;

const AddressForm: React.FC<Props> = ({ register, errors }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <StyledTextField
          fullWidth
          label="Street Address"
          variant="outlined"
          {...register("location.address")}
          error={!!errors.location?.address}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <StyledTextField
          fullWidth
          label="Country"
          variant="outlined"
          {...register("location.country")}
          error={!!errors.location?.country}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <StyledTextField
          fullWidth
          label="City"
          variant="outlined"
          {...register("location.city")}
          error={!!errors.location?.city}
        />
      </Grid>
      {errors.location && <ErrorComponent />}
    </Grid>
  );
};

export default AddressForm;
