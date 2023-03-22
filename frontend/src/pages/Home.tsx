import { Box, Button, Grid } from "@mui/material";
import React, { useState } from "react";
import axiosClient from "../axios/axiosClient";

const Home = () => {
  const [responseData, setResponseData] = useState<User>();

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
  const handleOnClick = async () => {
    await axiosClient
      .get("/users")
      .then((response) => {
        setResponseData(response.data);
      })
      .catch((err) => {
        console.log(err.response);
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
      <Button variant="contained" onClick={handleOnClick}>
        {" "}
        Hello World
      </Button>
      {responseData && CustomDivBody(responseData)}
    </>
  );
};

export default Home;
