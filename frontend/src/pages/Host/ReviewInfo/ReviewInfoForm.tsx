import { Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { PropertyForm } from "../../../types/property";
import styled from "styled-components";

interface Props {
  register: UseFormRegister<PropertyForm>;
  errors: FieldErrors<PropertyForm>;
}

const StyledTextField = styled(TextField)`
  margin-bottom: 10px;
`;

const ReviewInfoForm: React.FC<Props> = ({ register, errors }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <StyledTextField
          fullWidth
          margin="normal"
          id="input-price-register"
          key={"price"}
          label="Price per night"
          variant="outlined"
          type="number"
          helperText="Price is in $ value."
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          {...register("price")}
          error={errors.price ? true : false}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <StyledTextField
          fullWidth
          margin="normal"
          id="input-name-register"
          key={"name"}
          label="Name of property"
          variant="outlined"
          helperText="Give your place a short but sweet name (min 10 characters)."
          {...register("name")}
          error={errors.name ? true : false}
        />
      </Grid>
      <Grid item xs={12}>
        <StyledTextField
          fullWidth
          margin="normal"
          id="input-description-register"
          key={"description"}
          label="Description"
          variant="outlined"
          helperText="Describe your place with at least 100 characters."
          multiline
          rows={4}
          {...register("description")}
          error={errors.description ? true : false}
        />
      </Grid>
      {errors && (
        <Grid item xs={12} textAlign={"center"}>
          <Typography color="secondary">
            Please fill out all the information
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default ReviewInfoForm;
