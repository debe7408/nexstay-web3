import { Container } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../app/loginSlice";
import styled from "styled-components";
import ProfileHeader from "./components/ProfileHeader";
import ProfileUserInfo from "./components/ProfileUserInfo";

const Profile = () => {
  const userInfo = useAppSelector(selectUser);

  return (
    <StyledContainer maxWidth="xl">
      {userInfo && (
        <>
          <ProfileHeader
            bannerUrl={`https://source.unsplash.com/random/?profile,color,user,${userInfo.id}`}
            userId={userInfo.id}
          />
          <ProfileUserInfo user={userInfo} />
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
