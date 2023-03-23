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
import CustomButton from "./CustomButton";
import { useSnackbar } from "notistack";
import axiosClient from "../axios/axiosClient";
import { useAppDispatch } from "../app/hooks";
import { login } from "../app/loginSlice";

type FormInputs = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const formValidationSchema = yup
    .object({
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

    await axiosClient
      .post("/login", formValues)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        dispatch(login());
        enqueueSnackbar("Login successful.", {
          variant: "success",
        });
      })
      .catch((error) => {
        if (!error.response) {
          enqueueSnackbar("Internal error. Please try again later.", {
            variant: "error",
          });
          return;
        }
        enqueueSnackbar(error.response.data, {
          variant: "error",
        });
      });

    setIsLoading(false);
  };

  const onError = (error: FieldErrors<FormInputs>) => console.log(error);

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
          backgroundColor: "#e0e0e0",
          borderRadius: "15px",
        }}
      >
        <CssBaseline />

        <TextField
          margin="normal"
          id="input-email-address-login"
          key={"email"}
          label="Email address"
          type="email"
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
        />

        <TextField
          margin="normal"
          id="input-password-login"
          key={"password"}
          label="Password"
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
        />

        <StyledCustomButton
          type="submit"
          fullWidth
          loading={isLoading}
          error={errors}
          variant="contained"
        >
          Log In
        </StyledCustomButton>
        <Button component={Link} to="/login">
          Forgot password?
        </Button>
      </Box>
    </form>
  );
};

const StyledCustomButton = styled(CustomButton)<{
  error: FieldErrors<FormInputs>;
  loading: boolean;
}>`
  background: ${({ error }) =>
    error.password || error.email ? "red" : themes.dark.main};
  mt: 3;
  mb: 2;
  color: ${({ error }) =>
    error.password || error.email ? "white" : themes.dark.text};
  &:hover {
    background: ${({ error, loading }) =>
      loading
        ? themes.dark.main
        : error.password || error.email
        ? "red !important"
        : "green !important"};
  }
`;

export default LoginForm;
