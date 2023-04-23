import { Grid, Box, Button } from "@mui/material";

interface Props {
  activeStep: number;
  steps: string[];
  handlePreviousStep: () => void;
  handleNextStep: () => void;
}

const StepperNavigation: React.FC<Props> = ({
  activeStep,
  steps,
  handlePreviousStep,
  handleNextStep,
}) => {
  return (
    <Grid item xs={12}>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button disabled={activeStep === 0} onClick={handlePreviousStep}>
          Back
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        {activeStep === 0 ? (
          <Button onClick={handleNextStep}>Next</Button>
        ) : (
          <Button type="submit">
            {activeStep === steps.length - 1 ? "Submit" : "Next"}
          </Button>
        )}
      </Box>
    </Grid>
  );
};

export default StepperNavigation;
