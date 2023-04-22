import React from "react";
import { TextField, Grid } from "@mui/material";
import styled from "styled-components";

interface AddressFormProps {
  streetAddress?: string;
  setStreetAddress?: (value: string) => void;
  city?: string;
  setCity?: (value: string) => void;
  country?: string;
  setCountry?: (value: string) => void;
  zipCode?: string;
  setZipCode?: (value: string) => void;
}

const StyledTextField = styled(TextField)`
  margin-bottom: 20px;
`;

const AddressForm: React.FC<AddressFormProps> = ({
  streetAddress,
  setStreetAddress,
  country,
  setCountry,
  city,
  setCity,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <StyledTextField
          fullWidth
          label="Street Address"
          variant="outlined"
          value={streetAddress}
          // onChange={(e) => setStreetAddress(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <StyledTextField
          fullWidth
          label="Country"
          variant="outlined"
          value={country}
          // onChange={(e) => setCity(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <StyledTextField
          fullWidth
          label="City"
          variant="outlined"
          value={city}
          // onChange={(e) => setState(e.target.value)}
        />
      </Grid>
    </Grid>
  );
};

export default AddressForm;
