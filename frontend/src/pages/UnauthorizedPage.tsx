import styled from "styled-components";
import { Box, Typography } from "@mui/material";

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Title = styled(Typography)`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const UnauthorizedPage = () => {
  return (
    <Wrapper>
      <Title variant="h2">Protected Content</Title>
      <Typography variant="body1">
        This content is protected. You need to be logged in to view it.
      </Typography>
    </Wrapper>
  );
};

export default UnauthorizedPage;
