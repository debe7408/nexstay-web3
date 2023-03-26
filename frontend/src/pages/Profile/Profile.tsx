import { useEffect, useState } from "react";
import styled from "styled-components";
import CustomProfileCard from "../../components/CustomProfileCard";
import { useSnackbar } from "notistack";
import { getSingleUserInfo } from "./getUserInfo";
import { User } from "../../types/user";
import { Box, Grid } from "@mui/material";

const Profile = () => {
  const [responseData, setResponseData] = useState<User>();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      const { hasError, message, user } = await getSingleUserInfo();

      if (hasError) {
        enqueueSnackbar(message, {
          variant: "error",
        });
        return;
      }

      setResponseData(user);
    };
    fetchData();
  });

  const title = responseData
    ? `${responseData.name} ${responseData.surname} `
    : "Log in to see your profile";

  return (
    <>
      <CustomProfileCard
        title={title}
        subtitle="This is your profile page"
        bannerImageSrc="https://source.unsplash.com/random"
        cardWidth="xl"
        body={
          responseData ? (
            <CustomDivBody data={responseData}></CustomDivBody>
          ) : (
            "body"
          )
        }
      ></CustomProfileCard>
    </>
  );
};

const CustomDivBody = ({ data }: { data: User }) => {
  return (
    <Grid container>
      <Box
        key={data.id}
        sx={{
          border: 1,
          margin: 1,
        }}
      >
        <p>{data.name}</p>
        <p>{data.email}</p>
        <p>{data.age}</p>
        <p>{data.banned}</p>
        <p>{data.type}</p>
        <p>{data.surname}</p>
        <p>{data.password}</p>
      </Box>
    </Grid>
  );
};

export default Profile;
