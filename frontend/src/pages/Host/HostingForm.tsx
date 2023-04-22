import {
  Container,
  Stepper,
  Step,
  StepLabel,
  Button,
  Grid,
  Box,
} from "@mui/material";
import { useState } from "react";
import BecomeHostComponent from "./BecomeHost";
import ContactInfo from "./ContactInfo/ContactInfo";
import PropertyInfo from "./PropertyInfo/PropertyInfo";

const steps = [
  "Start of a Journey",
  "Contact information",
  "Property information",
  "Last touches",
];
export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  labas: string;
}

const HostingFormComponent = () => {
  const [activeStep, setActiveStep] = useState(0);

  const formContent = (step: number) => {
    switch (step) {
      case 0:
        return <BecomeHostComponent />;
      case 1:
        return <ContactInfo />;
      case 2:
        return <PropertyInfo />;
      default:
        return <div>404: Not Found</div>;
    }
  };

  const handlePreviousStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleNextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <Container maxWidth="lg">
      {formContent(activeStep)}
      <Grid item xs={12}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button disabled={activeStep === 0} onClick={handlePreviousStep}>
            Back
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          {activeStep === steps.length - 1 ? (
            <Button type="submit">Submit</Button>
          ) : (
            <Button onClick={handleNextStep}>Next</Button>
          )}
        </Box>
      </Grid>
    </Container>
  );
};

export default HostingFormComponent;
