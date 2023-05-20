import { Typography, Grid, Container, Button } from "@mui/material";
import { User } from "../../../types/user";
import PropertyContainer from "../../../components/PropertyContainer";
import Divider from "../../../components/DividerComponent";
import EditProfileForm from "./EditProfileForm";
import { useNavigate } from "react-router-dom";
import Listings from "./Listings";
import { Property } from "../../../types/property";
import Bookmarks from "./Bookmarks";

interface Props {
  user: User;
}

const ProfileUserInfo: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();

  const openManageReservations = () => {
    navigate("/myProfile/manage-reservations");
  };

  const greetingMessage = user.firstName
    ? `Welcome back, ${user.firstName}!`
    : "Welcome back!";

  return (
    <Container>
      <Grid container spacing={4}>
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
            <Listings userID={user.id} />
            <Bookmarks userID={user.id} />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfileUserInfo;
