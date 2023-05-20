import { useEffect, useState, useCallback } from "react";
import { useSnackbar } from "notistack";
import { getBookmarkedProperties } from "../../api/getProperty";
import { Container } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../app/loginSlice";
import styled from "styled-components";
import ProfileHeader from "./components/ProfileHeader";
import ProfileUserInfo from "./components/ProfileUserInfo";
import { Property } from "../../types/property";

const Profile = () => {
  const [bookmarked, setBookmarked] = useState<Property[]>([]);
  const userInfo = useAppSelector(selectUser);
  const { enqueueSnackbar } = useSnackbar();

  const fetchBookmarked = useCallback(async () => {
    const { error, message, properties } = await getBookmarkedProperties();

    if (error || !properties) {
      enqueueSnackbar(message, {
        variant: "error",
      });
      return;
    }

    setBookmarked(properties);
  }, [userInfo]);

  useEffect(() => {
    fetchBookmarked();
  }, [userInfo]);

  return (
    <StyledContainer maxWidth="xl">
      {userInfo && (
        <>
          <ProfileHeader
            bannerUrl={`https://source.unsplash.com/random/?profile,color,user,${userInfo.id}`}
            userId={userInfo.id}
          />
          <ProfileUserInfo user={userInfo} bookmarkedProperties={bookmarked} />
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
