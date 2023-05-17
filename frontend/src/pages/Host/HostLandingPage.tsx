import { Container, Grid, Typography, Slider, Button } from "@mui/material";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";
import { useState } from "react";
import { themes } from "../../constants/colors";
import HostFAQComponent from "./HostFAQ";
import StyledBox from "../../components/StyledBox";
import { Link } from "react-router-dom";

const HostFAQ = () => {
  const [selectedNights, setSelectedNights] = useState(1);
  return (
    <>
      <Container maxWidth="xl" sx={{}}>
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "100px",
          }}
        >
          <Grid item xs={12} md={12} lg={6}>
            <StyledBox>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "500",
                  color: {
                    xs: `${themes.dark.dark_accent}`,
                    md: `${themes.dark.main}`,
                  },
                }}
              >
                Become a Host
              </Typography>
              <Typography variant="h3" sx={{ color: `black` }} gutterBottom>
                ...and earn money
              </Typography>
              <Typography variant="subtitle1">
                <b>{selectedNights} night</b> at an estimated cost of € 57
              </Typography>
              <Typography variant="h2">€ {57 * selectedNights}</Typography>
              <Slider
                size="medium"
                defaultValue={1}
                max={10}
                min={1}
                onChange={(event, value) => setSelectedNights(Number(value))}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value} nights`}
                color="secondary"
              />
            </StyledBox>
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <StyledBox>
              <h2>This will include a map</h2>
            </StyledBox>
          </Grid>
          <Grid item xs={12}>
            <StyledBox>
              <Typography variant="h3">
                Become a host in just few steps with{" "}
                <b
                  style={{
                    color: `${themes.dark.main}`,
                  }}
                >
                  Easy Setup
                </b>
              </Typography>
            </StyledBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <StyledBox>
              <Typography variant="h4" gutterBottom>
                1. Create your listing
              </Typography>
            </StyledBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <StyledBox>
              <Typography variant="h4" gutterBottom>
                2. Set your price
              </Typography>
            </StyledBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <StyledBox>
              <Typography variant="h4" gutterBottom>
                3. Get your first booking
              </Typography>
            </StyledBox>
          </Grid>
          <Grid item xs={12}>
            <StyledBox>
              <Typography variant="overline">
                Ready to become a host?
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: `${themes.dark.main}`,
                  ":hover": {
                    backgroundColor: `${themes.dark.dark_accent}`,
                  },
                }}
                component={Link}
                to="/host/start-hosting"
              >
                <AddHomeOutlinedIcon /> Become a host!
              </Button>
            </StyledBox>
          </Grid>
        </Grid>
      </Container>
      <HostFAQComponent />
    </>
  );
};

export default HostFAQ;
