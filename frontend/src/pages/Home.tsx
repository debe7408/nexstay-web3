import { Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const Home = () => {
  const [responseData, setResponseData] = useState(null);

  const handleOnClick = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api");
      setResponseData(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Home</h1>
      <Button variant="contained" onClick={handleOnClick}>
        {" "}
        Hello World
      </Button>
      {responseData && <p>{responseData}</p>}
    </>
  );
};

export default Home;
