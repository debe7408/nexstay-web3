import { useEffect, useState } from "react";
import CustomProfileCard from "../../components/CustomProfileCard";
import { useSnackbar } from "notistack";
import { getSingleUserInfo } from "../../api/getUserInfo";
import { User } from "../../types/user";
import { Box, Grid, Container } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { selectLoginState } from "../../app/loginSlice";
import styled from "styled-components";
import ProfileHeader from "./components/ProfileHeader";
import ProfileUserInfo from "./components/ProfileUserInfo";

const Profile = () => {
  const [user, setUser] = useState<User>();
  const loginState = useAppSelector(selectLoginState);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const { hasError, message, user } = await getSingleUserInfo();

      if (hasError) {
        enqueueSnackbar(message, {
          variant: "error",
        });
        return;
      }

      setUser(user);
    };

    loginState && fetchUserInfo();
  }, [loginState]);

  return (
    <StyledContainer maxWidth="xl">
      {user && (
        <>
          <ProfileHeader
            bannerUrl={`https://source.unsplash.com/random/?profile,color,user,${user?.id}`}
            publicAddress={user.publicAddress}
          />
          <ProfileUserInfo user={user} />
        </>
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
  margin-top: 50px;
  margin-bottom: 50px;
`;

export default Profile;
