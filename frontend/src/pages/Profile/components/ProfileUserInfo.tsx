import { Typography, Box, Grid, Container } from "@mui/material";
import styled from "styled-components";
import { User } from "../../../types/user";
import PropertyContainer from "../../../components/PropertyContainer";
import PropertyBox from "../../../components/PropertyBox";

interface Props {
  user: User;
}

const ProfileUserInfo: React.FC<Props> = ({ user }) => {
  return (
    <Container>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Typography variant="h3">{`Welcome back, ${user.firstName}`}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          {user.ownedProperties ? (
            <PropertyContainer
              properties={user.ownedProperties}
            ></PropertyContainer>
          ) : (
            <Typography variant="h3">
              You don't have any properties yet
            </Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfileUserInfo;
