import { Container, Grid, Typography } from "@mui/material";
import StyledBox from "../../../components/StyledBox";
import { themes } from "../../../constants/colors";
import ContactInfoForm from "./ContactInfoForm";
import CustomCard from "../../../components/CustomCard";

interface Props {}

const BecomeHostComponent: React.FC<Props> = () => {
  return (
    <>
      <Container maxWidth="lg">
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "50px",
            paddingBottom: "20px",
          }}
        >
          <Grid item xs={12} md={12} lg={12}>
            <StyledBox textAlign="left">
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                  color: { xs: `${themes.dark.dark_accent}`, md: "black" },
                }}
              >
                Let's setup your contact information first...
              </Typography>
            </StyledBox>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <StyledBox>
              <CustomCard body={<ContactInfoForm />} cardWidth="lg" />
            </StyledBox>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default BecomeHostComponent;
