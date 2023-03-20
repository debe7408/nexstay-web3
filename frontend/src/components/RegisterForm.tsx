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
import axios from "axios";
import CustomButton from "./CustomButton";

type FormInputs = {
  name: string;
  surname: string;
  age: number;
  email: string;
  password: string;
};

const RegisterForm: React.FC = () => {
  const [submitButtonText, setSubmitButtonText] = useState("Sign Up");
  const [isLoading, setIsLoading] = useState(false);

  const formValidationSchema = yup
    .object({
      name: yup.string().required(),
      surname: yup.string().required(),
      age: yup.number().positive().moreThan(18).integer().required(),
      email: yup.string().email().required(),
      password: yup.string().min(8).required().max(20),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(formValidationSchema),
  });

  const onSubmit: SubmitHandler<FormInputs> = async (formValues, event) => {
    event?.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/register",
        formValues
      );
      response.data.token && localStorage.setItem("token", response.data.token);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
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
          id="input-name"
          label="Name"
          variant="outlined"
          error={errors.name ? true : false}
          {...register("name", { required: true })}
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
        <StyledCustomButton
          type="submit"
          fullWidth
          loading={isLoading}
          error={errors}
          variant="contained"
          onMouseEnter={() => handleButtonHover()}
          onMouseLeave={() => handleButtonHoverOver()}
        >
          {submitButtonText}
        </StyledCustomButton>
        <Button component={Link} to="/signin">
          Already have an account? Sign in
        </Button>
      </Box>
    </form>
  );
};

const StyledCustomButton = styled(CustomButton)<{
  error: FieldErrors<FormInputs>;
  loading: boolean;
}>`
  background: ${({ error }) => (error.password ? "red" : themes.dark.main)};
  mt: 3;
  mb: 2;
  color: ${({ error }) => (error.password ? "white" : themes.dark.text)};
  &:hover {
    background: ${({ error, loading }) =>
      loading
        ? themes.dark.main
        : error.password
        ? "red !important"
        : "green !important"};
  }
`;

export default RegisterForm;