import EmailIcon from "@mui/icons-material/Email";
import { Box, CssBaseline, InputAdornment, TextField } from "@mui/material";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ContactInfo } from "../../../types/contactInfo";
interface Props {
  register: UseFormRegister<ContactInfo>;
  errors: FieldErrors<ContactInfo>;
}

const ContactInfoForm: React.FC<Props> = ({ register, errors }) => {
  return (
    <Box
      sx={{
        marginTop: "3px",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        maxWidth: "100%",
        width: "100%",
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
        {...register("firstName")}
        error={errors.firstName ? true : false}
      />

      <TextField
        margin="normal"
        id="input-surname-register"
        key={"surname"}
        label="Surname"
        variant="outlined"
        {...register("lastName")}
        error={errors.lastName ? true : false}
      />

      <TextField
        margin="normal"
        id="input-age-register"
        key={"age"}
        label="Age"
        type="number"
        variant="outlined"
        {...register("age")}
        error={errors.age ? true : false}
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
        {...register("email")}
        error={errors.email ? true : false}
      ></TextField>
    </Box>
  );
};

export default ContactInfoForm;
