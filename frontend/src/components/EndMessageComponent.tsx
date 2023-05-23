import React from "react";
import { Box, Typography } from "@mui/material";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";

const EndMessage: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      marginTop="2rem"
    >
      <SentimentSatisfiedAltOutlinedIcon fontSize="large" color="primary" />
      <Typography variant="h5" component="h5" gutterBottom>
        You've reached the end!
      </Typography>
      <Typography variant="subtitle1" component="p">
        No more properties to show.
      </Typography>
    </Box>
  );
};

export default EndMessage;
