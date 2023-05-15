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

const DataNotFound = () => {
  return (
    <Wrapper>
      <Title variant="h2">This is awkward...</Title>
      <Typography variant="body1">
        The data you are searching for is not available.
      </Typography>
      <Typography variant="body2">
        Either this data does not exist or you're not authorized to see it.
      </Typography>
    </Wrapper>
  );
};

export default DataNotFound;
