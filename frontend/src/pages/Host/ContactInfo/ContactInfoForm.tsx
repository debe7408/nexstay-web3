import EmailIcon from "@mui/icons-material/Email";
import { Box, CssBaseline, InputAdornment, TextField } from "@mui/material";

interface Props {}

const ContactInfoForm: React.FC<Props> = () => {
  return (
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
      />

      <TextField
        margin="normal"
        id="input-surname-register"
        key={"surname"}
        label="Surname"
        variant="outlined"
      />

      <TextField
        margin="normal"
        id="input-age-register"
        key={"age"}
        label="Age"
        type="number"
        variant="outlined"
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
      ></TextField>
    </Box>
  );
};

// const StyledCustomButton = styled(CustomButton)<{
//   error: FieldErrors<FormInputs>;
//   loading: boolean;
// }>`
//   background: ${({ error }) =>
//     error.password || error.email || error.age || error.name || error.age
//       ? "red"
//       : themes.dark.main};
//   mt: 3;
//   mb: 2;
//   color: ${({ error }) =>
//     error.password || error.email || error.age || error.name || error.age
//       ? "white"
//       : themes.dark.text};
//   &:hover {
//     background: ${({ error, loading }) =>
//       loading
//         ? themes.dark.main
//         : error.password || error.email || error.age || error.name || error.age
//         ? "red !important"
//         : "green !important"};
//   }
// `;

export default ContactInfoForm;
