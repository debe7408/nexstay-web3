import { Grid, Typography } from "@mui/material";
import StyledBox from "../../../components/StyledBox";
import { themes } from "../../../constants/colors";
import MapsComponent from "../../../components/Maps";
import AddressForm from "./AddressForm";

const containerStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "10px",
};

const center = {
  lat: 54.73154104932955,
  lng: 25.26221793326186,
};

const PropertType = () => {
  return (
    <>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "20px",
          paddingBottom: "20px",
          gap: "10px",
        }}
      >
        <Grid item xs={12} md={12} lg={12}>
          <StyledBox textAlign="left">
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: { xs: `${themes.dark.dark_accent}`, md: "black" },
              }}
            >
              Where is your property located?
            </Typography>
          </StyledBox>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <StyledBox>
            <MapsComponent containerStyle={containerStyle} center={center} />
          </StyledBox>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <StyledBox>
            <AddressForm />
          </StyledBox>
        </Grid>
      </Grid>
    </>
  );
};

export default PropertType;
