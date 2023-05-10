import React from "react";
import { Typography, Button, Container } from "@mui/material";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const NotFoundWrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <NotFoundWrapper maxWidth={false}>
      <Typography variant="h3" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        Sorry, the page you are looking for does not exist.
      </Typography>
      <Button variant="contained" color="primary" onClick={goHome}>
        Go to Home Page
      </Button>
    </NotFoundWrapper>
  );
};

export default NotFound;
