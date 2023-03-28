import {
  Container,
  Stepper,
  Step,
  StepLabel,
  Button,
  Grid,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const steps = ["Step 0", "Step 1", "Step 2", "Step 3"];
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const HostingFormComponent = () => {
  const [activeStep, setActiveStep] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleOnSubmit = (data: FormData) => {
    console.log(data);
  };

  const handleNextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handlePreviousStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Container maxWidth="lg">
      <Grid item xs={12}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <form onSubmit={handleSubmit(handleOnSubmit)}></form>
      </Grid>
    </Container>
  );
};

export default HostingFormComponent;
