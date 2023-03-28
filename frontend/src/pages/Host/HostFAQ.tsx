import {
  Container,
  Grid,
  Typography,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { themes } from "../../constants/colors";
import { questions } from "../../constants/faqHosting";
import StyledBox from "../../components/StyledBox";

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
          <StyledBox
            customstyles={{
              justifyContent: "flex-start",
              alignItems: "flex-start",
              textAlign: "left",
            }}
          >
            <Typography variant="h4">Let's answer your questions</Typography>
          </StyledBox>
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
