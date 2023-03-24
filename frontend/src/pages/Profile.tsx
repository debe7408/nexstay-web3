import styled from "styled-components";
import CustomProfileCard from "../components/CustomProfileCard";
import { useAppSelector } from "../app/hooks";
import { selectEmailAddress } from "../app/loginSlice";

const Profile = () => {
  const emailAddress = useAppSelector(selectEmailAddress);

  return (
    <>
      <CustomProfileCard
        title={emailAddress || "Log in to see your profile"}
        subtitle="This is your profile page"
        bannerImageSrc="https://source.unsplash.com/random"
        cardWidth="xl"
        body={""}
      ></CustomProfileCard>
    </>
  );
};

export default Profile;
