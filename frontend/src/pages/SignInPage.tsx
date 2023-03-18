import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

export const SignIn = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (formValues, event) => {
    event?.preventDefault();
    console.log(formValues);
    alert("Form submitted!");
  };

  const onError = (error: any) => console.log(error);

  console.log(watch("email"));

  return (
    <Container component="main" maxWidth="xs">
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            {...register("email", { required: true })}
          />
          {errors.email && <span>Invalid email address</span>}
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register("password", { required: true })}
          />
          {errors.password && <span>This field is required</span>}

          <FormControlLabel
            control={<Checkbox value="true" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to={""}>Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link to={""}>Don't have an account? Sign Up</Link>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Container>
  );
};
