import { useEffect, useState } from "react";
import CustomProfileCard from "../../components/CustomProfileCard";
import { useSnackbar } from "notistack";
import { getSingleUserInfo } from "../../api/getUserInfo";
import { User } from "../../types/user";
import { Box, Button, Grid } from "@mui/material";
import { addProperty } from "../../api/addProperty";
import { useAppSelector } from "../../app/hooks";
import { selectLoginState } from "../../app/loginSlice";

const Profile = () => {
  const [responseData, setResponseData] = useState<User>();
  const loginState = useAppSelector(selectLoginState);

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
    loginState && fetchData();
  });

  const handleAddProperty = async () => {
    const { hasError, message } = await addProperty();

    if (hasError) {
      enqueueSnackbar(message, {
        variant: "error",
      });
      return;
    }

    enqueueSnackbar("Property added!", {
      variant: "success",
    });
  };

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
            <>
              <CustomDivBody data={responseData}></CustomDivBody>
              <Button onClick={async () => await handleAddProperty()}>
                add new
              </Button>
            </>
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
        <p>{data.publicAddress}</p>
      </Box>
    </Grid>
  );
};

export default Profile;
