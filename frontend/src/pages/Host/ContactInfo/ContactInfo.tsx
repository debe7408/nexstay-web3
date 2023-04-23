import { Container, Grid } from "@mui/material";
import StyledBox from "../../../components/StyledBox";
import ContactInfoForm from "./ContactInfoForm";
import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle";
import StepperNavigation from "../components/StepperNavigation";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface Props {
  steps: string[];
  activeStep: number;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}
export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
}

const ContactInfo: React.FC<Props> = ({
  activeStep,
  steps,
  handleNextStep,
  handlePreviousStep,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(
      yup.object().shape({
        firstName: yup.string().required().min(2),
        lastName: yup.string().required().min(3),
        email: yup.string().required().email(),
        age: yup.number().required().min(18).max(99),
      })
    ),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    handleNextStep();
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
              {<ContactInfoForm register={register} errors={errors} />}
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

export default ContactInfo;
