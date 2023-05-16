import { Typography, Grid, Container, Button } from "@mui/material";
import { User } from "../../../types/user";
import PropertyContainer from "../../../components/PropertyContainer";
import Divider from "../../../components/DividerComponent";
import EditProfileForm from "./EditProfileForm";
import { Property } from "../../../types/property";
import { useNavigate } from "react-router-dom";

interface Props {
  user: User;
  bookmarkedProperties?: Property[];
}

const ProfileUserInfo: React.FC<Props> = ({ user, bookmarkedProperties }) => {
  const navigate = useNavigate();

  const openManageReservations = () => {
    navigate("/myProfile/manage-reservations");
  };

  const greetingMessage = user.firstName
    ? `Welcome back, ${user.firstName}!`
    : "Welcome back!";

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h3">{greetingMessage}</Typography>
            </Grid>
            <Grid item xs={12}>
              <EditProfileForm user={user} />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="outlined"
                onClick={openManageReservations}
              >
                <Typography variant="body1">
                  Manage your reservations
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5">
                {`Manage your listings [ ${
                  user.ownedProperties?.length || 0
                } ]`}
              </Typography>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              {user.ownedProperties && (
                <PropertyContainer
                  properties={user.ownedProperties}
                  itemsPerRow={{ md: 12, lg: 6 }}
                ></PropertyContainer>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">{`Manage your favorited [ ${
                bookmarkedProperties?.length || 0
              } ]`}</Typography>

              <Divider />
            </Grid>
            <Grid item xs={12}>
              {bookmarkedProperties && (
                <PropertyContainer
                  properties={bookmarkedProperties}
                  itemsPerRow={{ md: 12, lg: 6 }}
                ></PropertyContainer>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfileUserInfo;
