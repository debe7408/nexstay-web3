import {
  Container,
  Grid,
  Box,
  Typography,
  Slider,
  Button,
} from "@mui/material";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";
import { useState } from "react";
import styled from "styled-components";
import { themes } from "../../constants/colors";
import HostFAQComponent from "./HostFAQ";
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
            <CustomBox>
              <Typography
                variant="h3"
                sx={{ fontWeight: "500", color: `${themes.dark.main}` }}
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
            </CustomBox>
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <CustomBox>
              <h2>This will include a map</h2>
            </CustomBox>
          </Grid>
          <Grid item xs={12}>
            <CustomBox>
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
            </CustomBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <CustomBox>
              <Typography variant="h4" gutterBottom>
                1. Create your listing
              </Typography>
            </CustomBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <CustomBox>
              <Typography variant="h4" gutterBottom>
                2. Set your price
              </Typography>
            </CustomBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <CustomBox>
              <Typography variant="h4" gutterBottom>
                3. Get your first booking
              </Typography>
            </CustomBox>
          </Grid>
          <Grid item xs={12}>
            <CustomBox>
              <Typography variant="overline">Read to become a host?</Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: `${themes.dark.main}`,
                  ":hover": {
                    backgroundColor: `${themes.dark.dark_accent}`,
                  },
                }}
              >
                <AddHomeOutlinedIcon /> Become a host!
              </Button>
            </CustomBox>
          </Grid>
        </Grid>
      </Container>
      <HostFAQComponent />
    </>
  );
};

const CustomBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export default HostFAQ;
