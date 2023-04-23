import React from "react";
import { TextField, Grid } from "@mui/material";
import styled from "styled-components";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormData } from "./PropertyInfo";
import ErrorComponent from "../../../components/ErrorComponent";

interface Props {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
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
          {...register("propertyLocation.address")}
          error={!!errors.propertyLocation?.address}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <StyledTextField
          fullWidth
          label="Country"
          variant="outlined"
          {...register("propertyLocation.country")}
          error={!!errors.propertyLocation?.country}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <StyledTextField
          fullWidth
          label="City"
          variant="outlined"
          {...register("propertyLocation.city")}
          error={!!errors.propertyLocation?.city}
        />
      </Grid>
      {errors.propertyLocation && <ErrorComponent />}
    </Grid>
  );
};

export default AddressForm;
