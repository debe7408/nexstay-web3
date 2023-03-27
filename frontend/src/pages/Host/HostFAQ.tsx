import {
  Container,
  Grid,
  Typography,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "styled-components";
import { themes } from "../../constants/colors";
import { questions } from "../../constants/faqHosting";

const HostFAQComponent = () => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        backgroundColor: `${themes.dark.main}`,
        color: `${themes.dark.dark_accent}`,
        paddingTop: "50px",
        paddingBottom: "50px",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <CustomBox>
            <Typography variant="h4">Let's answer your questions</Typography>
          </CustomBox>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Stack spacing={1}>
            {questions.map((question, index) => (
              <Accordion key={index}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  id={`questionSummary${index}`}
                >
                  <Typography variant="h6">{question.summary} </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1">{question.details}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HostFAQComponent;

const CustomBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: flex-start;
`;
