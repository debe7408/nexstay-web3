import { Typography, Grid, Container } from "@mui/material";
import { User } from "../../../types/user";
import PropertyContainer from "../../../components/PropertyContainer";
import Divider from "../../../components/DividerComponent";
import EditProfileForm from "./EditProfileForm";
import { Property } from "../../../types/property";

interface Props {
  user: User;
  bookmarkedProperties?: Property[];
}

const ProfileUserInfo: React.FC<Props> = ({ user, bookmarkedProperties }) => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h3">{`Welcome back, ${user.firstName}!`}</Typography>
            </Grid>
            <Grid item xs={12}>
              <EditProfileForm user={user} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5">Manage your listings</Typography>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              {user.ownedProperties ? (
                <PropertyContainer
                  properties={user.ownedProperties}
                  itemsPerRow={{ md: 12, lg: 6 }}
                ></PropertyContainer>
              ) : (
                <Typography variant="h3">
                  You don't have any properties yet
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">Manage your bookings</Typography>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">Manage your favorited</Typography>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              {bookmarkedProperties ? (
                <PropertyContainer
                  properties={bookmarkedProperties}
                  itemsPerRow={{ md: 12, lg: 6 }}
                ></PropertyContainer>
              ) : (
                <Typography variant="h3">
                  You don't have any properties yet
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfileUserInfo;
