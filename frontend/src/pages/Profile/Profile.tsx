import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { getSingleUserInfo } from "../../api/getUserInfo";
import { getBookmarkedProperties } from "../../api/getProperty";
import { User } from "../../types/user";
import { Container } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { selectLoginState } from "../../app/loginSlice";
import styled from "styled-components";
import ProfileHeader from "./components/ProfileHeader";
import ProfileUserInfo from "./components/ProfileUserInfo";
import { Property } from "../../types/property";

const Profile = () => {
  const [user, setUser] = useState<User>();
  const [bookmarked, setBookmarked] = useState<Property[]>([]);
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
    const fetchBookmarked = async () => {
      const { hasError, message, properties } = await getBookmarkedProperties();

      if (hasError || !properties) {
        enqueueSnackbar(message, {
          variant: "error",
        });
        return;
      }

      setBookmarked(properties);
    };

    loginState && fetchUserInfo();
    loginState && fetchBookmarked();
  }, [loginState]);

  return (
    <StyledContainer maxWidth="xl">
      {user && (
        <>
          <ProfileHeader
            bannerUrl={`https://source.unsplash.com/random/?profile,color,user,${user?.id}`}
            userId={user?.id}
          />
          <ProfileUserInfo user={user} bookmarkedProperties={bookmarked} />
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
