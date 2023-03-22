import styled from "styled-components";
import CustomProfileCard from "../components/CustomProfileCard";

const Profile = () => {
  return (
    <>
      <CustomProfileCard
        title="User Name"
        subtitle="This is your profile page"
        bannerImageSrc="https://source.unsplash.com/random"
        cardWidth="xl"
        body={""}
      ></CustomProfileCard>
    </>
  );
};

export default Profile;
