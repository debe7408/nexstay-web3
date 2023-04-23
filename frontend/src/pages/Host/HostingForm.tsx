import { Container, Stepper, Step, StepLabel, Grid } from "@mui/material";
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

const HostingFormComponent = () => {
  const [activeStep, setActiveStep] = useState(0);

  const stepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <BecomeHostComponent
            steps={steps}
            activeStep={activeStep}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
          />
        );
      case 1:
        return (
          <ContactInfo
            steps={steps}
            activeStep={activeStep}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
          />
        );
      case 2:
        return (
          <PropertyInfo
            steps={steps}
            activeStep={activeStep}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
          />
        );
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
      {stepContent(activeStep)}
      <Grid item xs={12}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Grid>
    </Container>
  );
};

export default HostingFormComponent;
