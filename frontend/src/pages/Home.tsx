import { Box, Button, Grid } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import axiosClient from "../axios/axiosClient";
import { useAppSelector } from "../app/hooks";
import { selectEmailAddress } from "../app/loginSlice";

const Home = () => {
  const [responseData, setResponseData] = useState<User>();
  const emailAddress = useAppSelector(selectEmailAddress);

  type User = [
    {
      id: number;
      name: string;
      email: string;
      age: number;
      banned: boolean;
      type: string;
      surname: string;
      password: string;
    }
  ];
  const handleFetchAllUsers = async () => {
    await axiosClient
      .get("/users")
      .then((response) => {
        setResponseData(response.data);
        enqueueSnackbar("Data fetched", {
          variant: "success",
        });
      })
      .catch((error) => {
        if (!error.response) {
          enqueueSnackbar("Internal error. Please try again later.", {
            variant: "error",
          });
          return;
        }
        enqueueSnackbar(error.response.data.message, {
          variant: "error",
        });
      });
  };

  const handleFetchUserInfo = async () => {
    await axiosClient
      .post("/getUserInfo", { email: emailAddress })
      .then((response) => {
        setResponseData([response.data]);
        enqueueSnackbar("Data fetched", {
          variant: "success",
        });
      })
      .catch((error) => {
        if (!error.response) {
          enqueueSnackbar("Internal error. Please try again later.", {
            variant: "error",
          });
          return;
        }
        enqueueSnackbar(error.response.data, {
          variant: "error",
        });
      });
  };

  const CustomDivBody = (data: User) => {
    return (
      <Grid container>
        {data.map((user) => (
          <Box
            key={user.id}
            sx={{
              border: 1,
              margin: 1,
            }}
          >
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.age}</p>
            <p>{user.banned}</p>
            <p>{user.type}</p>
            <p>{user.surname}</p>
            <p>{user.password}</p>
          </Box>
        ))}
      </Grid>
    );
  };

  return (
    <>
      <h1>Home</h1>
      <Button variant="contained" onClick={handleFetchAllUsers}>
        Get all users info
      </Button>
      <Button variant="contained" onClick={handleFetchUserInfo}>
        Get user info
      </Button>
      {responseData && CustomDivBody(responseData)}
    </>
  );
};

export default Home;
