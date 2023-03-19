import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";

import {
  Box,
  Button,
  CssBaseline,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";

import { useState } from "react";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { themes } from "../constants/colors";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type FormInputs = {
  firstName: string;
  surname: string;
  age: number;
  email: string;
  password: string;
};

const RegisterForm: React.FC = () => {
  const [submitButtonText, setSubmitButtonText] = useState("Sign Up");

  const schema = yup
    .object({
      firstName: yup.string().required(),
      surname: yup.string().required(),
      age: yup.number().positive().integer().required(),
      email: yup.string().email().required(),
      password: yup.string().min(8).required().max(20),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormInputs> = (formValues, event) => {
    event?.preventDefault();
    console.log(formValues);
    alert("Form submitted!");
  };

  const onError = (error: FieldErrors<FormInputs>) => console.log(error);

  const handleButtonHover = () => {
    setSubmitButtonText("Let's go! 🚀");
  };

  const handleButtonHoverOver = () => {
    setSubmitButtonText("Sign Up");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <Box
        sx={{
          marginTop: "3px",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          maxWidth: "100%",
          backgroundColor: themes.dark.text,
          borderRadius: "5px",
        }}
      >
        <CssBaseline />
        <TextField
          margin="normal"
          id="input-firstName"
          label="Name"
          variant="outlined"
          error={errors.firstName ? true : false}
          {...register("firstName", { required: true })}
        />

        <TextField
          margin="normal"
          id="input-surname"
          label="Surname"
          variant="outlined"
          error={errors.surname ? true : false}
          {...register("surname", { required: true })}
        />

        <TextField
          margin="normal"
          id="input-age"
          label="Age"
          type="number"
          variant="outlined"
          error={errors.age ? true : false}
          {...register("age", { required: true, max: 100, min: 1 })}
        />

        <TextField
          margin="normal"
          id="input-email-address"
          label="Email address"
          type="email"
          helperText="We'll never share your email."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          error={errors.email ? true : false}
          {...register("email", { required: true })}
        ></TextField>

        <TextField
          margin="normal"
          id="input-password"
          label="Password"
          helperText="Password must be at least 8 and not longer than 20 characters."
          type="password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PasswordIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          error={errors.password ? true : false}
          {...register("password", { required: true })}
        ></TextField>
        <StyledButton
          type="submit"
          fullWidth
          error={errors}
          variant="contained"
          onMouseEnter={() => handleButtonHover()}
          onMouseLeave={() => handleButtonHoverOver()}
        >
          {submitButtonText}
        </StyledButton>
        <Button component={Link} to="/signin">
          Already have an account? Sign in
        </Button>
      </Box>
    </form>
  );
};

const StyledButton = styled(Button)<{ error: FieldErrors<FormInputs> }>`
  background: ${({ error }) => (error.password ? "red" : themes.dark.main)};
  mt: 3;
  mb: 2;
  color: ${({ error }) => (error.password ? "white" : themes.dark.text)};
  &:hover {
    background: ${({ error }) =>
      error.password ? "red !important" : "green !important"};
  }
`;

export default RegisterForm;
