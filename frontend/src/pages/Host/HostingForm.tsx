import { Container, Stepper, Step, StepLabel, Grid } from "@mui/material";
import { useState } from "react";
import BecomeHostComponent from "./BecomeHost";
import ContactInfoComponent from "./ContactInfo/ContactInfo";
import PropertyInfoComponent from "./PropertyInfo/PropertyInfo";
import ReviewInfoComponent from "./ReviewInfo/ReviewInfoComponent";
import { PropertyForm, PropertyInfoForm } from "../../types/property";
import { addProperty } from "../../api/manageProperty";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { fetchAndUpdateUserInfo } from "../../app/loginSlice";
import { useAppDispatch } from "../../app/hooks";

const steps = [
  "Start of a journey",
  "Contact information",
  "Property information",
  "Review and host",
];

const HostingFormComponent = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [propertyData, setPropertyData] = useState({} as PropertyInfoForm);

  const handleInitialPropertyData = (data: PropertyInfoForm) => {
    setPropertyData(data);
  };

  const handleFinalSubmit = async (data: PropertyForm) => {
    const { hasError, message } = await addProperty(data);
    if (hasError) {
      enqueueSnackbar(message, { variant: "error" });
      return;
    }
    enqueueSnackbar(message, { variant: "success" });

    dispatch(fetchAndUpdateUserInfo());
    navigate("/myProfile");
    return;
  };

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
          <ContactInfoComponent
            steps={steps}
            activeStep={activeStep}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
          />
        );
      case 2:
        return (
          <PropertyInfoComponent
            steps={steps}
            activeStep={activeStep}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
            handleSubmitData={handleInitialPropertyData}
          />
        );
      case 3:
        return (
          <ReviewInfoComponent
            steps={steps}
            activeStep={activeStep}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
            propertyData={propertyData}
            handlePropertySubmit={handleFinalSubmit}
          />
        );
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
