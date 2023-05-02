import {
  Container,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import StyledBox from "../../components/StyledBox";
import { themes } from "../../constants/colors";
import StepperNavigation from "./components/StepperNavigation";

interface Props {
  steps: string[];
  activeStep: number;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

const BecomeHostComponent: React.FC<Props> = ({
  activeStep,
  steps,
  handleNextStep,
  handlePreviousStep,
}) => {
  return (
    <>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "100px",
            paddingBottom: "20px",
          }}
        >
          <Grid item xs={12} md={12} lg={6}>
            <StyledBox textAlign="left">
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                  color: { xs: `${themes.dark.dark_accent}`, md: "black" },
                }}
              >
                Creating a listing has never been easier...
              </Typography>
            </StyledBox>
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <StyledBox>
              <List>
                <ListItem>
                  <ListItemText
                    primary="1. Describe your place"
                    secondary="Just need the basic information to get started."
                    primaryTypographyProps={{
                      variant: "h4",
                    }}
                    secondaryTypographyProps={{
                      variant: "body1",
                    }}
                  ></ListItemText>
                  <ListItemIcon>
                    <DescriptionOutlinedIcon />
                  </ListItemIcon>
                </ListItem>
                <Divider variant="inset" component="li" />

                <ListItem>
                  <ListItemText
                    primary="2. Add amenities and photos"
                    secondary="Make your place unique by adding available amenities and pictures of the place."
                    primaryTypographyProps={{
                      variant: "h4",
                    }}
                    secondaryTypographyProps={{
                      variant: "body1",
                    }}
                  ></ListItemText>
                  <ListItemIcon>
                    <AddAPhotoOutlinedIcon />
                  </ListItemIcon>
                </ListItem>
                <Divider variant="inset" component="li" />

                <ListItem>
                  <ListItemText
                    primary="3. Set price and finish"
                    secondary="Set your price and you're ready to go!"
                    primaryTypographyProps={{
                      variant: "h4",
                    }}
                    secondaryTypographyProps={{
                      variant: "body1",
                    }}
                  ></ListItemText>
                  <ListItemIcon>
                    <CheckCircleOutlineOutlinedIcon />
                  </ListItemIcon>
                </ListItem>
                <Divider variant="inset" component="li" />
              </List>
            </StyledBox>
          </Grid>
        </Grid>
        <StepperNavigation
          activeStep={activeStep}
          steps={steps}
          handlePreviousStep={handlePreviousStep}
          handleNextStep={handleNextStep}
        />
      </Container>
    </>
  );
};

export default BecomeHostComponent;
