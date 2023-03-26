import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import {
  Box,
  Button,
  CssBaseline,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
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
  name: string;
  surname: string;
  age: number;
  email: string;
  password: string;
};

const RegisterForm: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [submitButtonText, setSubmitButtonText] = useState("Sign Up");
  const [isLoading, setIsLoading] = useState(false);

  const formValidationSchema = yup
    .object({
      name: yup.string().required(),
      surname: yup.string().required(),
      age: yup.number().positive().min(18).integer().required(),
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
      .post("/users/register", formValues)
      .then((response) => {
        enqueueSnackbar("You have successfully registered!", {
          variant: "success",
        });
        dispatch(login(response.data.token));
        navigate("/profile");
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

  const handleButtonHover = () => {
    setSubmitButtonText("Let's go! 🚀");
  };

  const handleButtonHoverOver = () => {
    setSubmitButtonText("Sign Up");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          id="input-name-register"
          key={"name"}
          label="Name"
          variant="outlined"
          error={errors.name ? true : false}
          {...register("name", { required: true })}
        />

        <TextField
          margin="normal"
          id="input-surname-register"
          key={"surname"}
          label="Surname"
          variant="outlined"
          error={errors.surname ? true : false}
          {...register("surname", { required: true })}
        />

        <TextField
          margin="normal"
          id="input-age-register"
          key={"age"}
          label="Age"
          type="number"
          variant="outlined"
          error={errors.age ? true : false}
          {...register("age", { required: true, max: 100, min: 1 })}
        />

        <TextField
          margin="normal"
          id="input-email-address-register"
          key={"email"}
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
          id="input-password-register"
          key={"password"}
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
        <Button component={Link} to="/login">
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
  background: ${({ error }) =>
    error.password || error.email || error.age || error.name || error.age
      ? "red"
      : themes.dark.main};
  mt: 3;
  mb: 2;
  color: ${({ error }) =>
    error.password || error.email || error.age || error.name || error.age
      ? "white"
      : themes.dark.text};
  &:hover {
    background: ${({ error, loading }) =>
      loading
        ? themes.dark.main
        : error.password || error.email || error.age || error.name || error.age
        ? "red !important"
        : "green !important"};
  }
`;

export default RegisterForm;
