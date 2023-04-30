import { Container, Grid } from "@mui/material";
import StyledBox from "../../../components/StyledBox";
import ContactInfoForm from "./ContactInfoForm";
import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle";
import StepperNavigation from "../components/StepperNavigation";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateContactInfo } from "../../../api/updateContactInfo";
import { ContactInfo } from "../../../types/contactInfo";
import { useSnackbar } from "notistack";
interface Props {
  steps: string[];
  activeStep: number;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

const ContactInfoComponent: React.FC<Props> = ({
  activeStep,
  steps,
  handleNextStep,
  handlePreviousStep,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInfo>({
    resolver: yupResolver(
      yup.object().shape({
        firstName: yup.string().required().min(2),
        lastName: yup.string().required().min(3),
        email: yup.string().required().email(),
        age: yup.number().required().min(20).max(90),
      })
    ),
  });

  const onSubmit = handleSubmit(async (formData, event) => {
    const { hasError } = await updateContactInfo(formData);

    if (!hasError) {
      enqueueSnackbar("Contact information updated", {
        variant: "success",
      });
      handleNextStep();
    } else {
      enqueueSnackbar("Contact could not be updated", {
        variant: "error",
      });
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <Container maxWidth="lg">
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "50px",
            paddingBottom: "20px",
          }}
        >
          <SectionTitle title="Let's setup your contact information first..." />
          <Grid item xs={12} md={12} lg={12}>
            <StyledBox>
              <ContactInfoForm register={register} errors={errors} />
            </StyledBox>
          </Grid>
          <StepperNavigation
            activeStep={activeStep}
            steps={steps}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
          />
        </Grid>
      </Container>
    </form>
  );
};

export default ContactInfoComponent;
