import { Container, Grid } from "@mui/material";
import StepperNavigation from "../components/StepperNavigation";
import SectionTitle from "../../../components/SectionTitle";
import ReviewTable from "../../../components/ReviewTable";
import ReviewInfoForm from "./ReviewInfoForm";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { PropertyForm, PropertyInfoForm } from "../../../types/property";

interface Props {
  steps: string[];
  activeStep: number;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  propertyData: PropertyInfoForm;
  handlePropertySubmit: (data: PropertyForm) => void;
}

const ReviewInfoComponent: React.FC<Props> = ({
  activeStep,
  steps,
  handleNextStep,
  handlePreviousStep,
  handlePropertySubmit,
  propertyData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PropertyForm>({
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required().min(10),
        price: yup.number().integer().required().min(1),
        description: yup.string().required().min(20).max(100),
      })
    ),
  });

  const onSubmit = handleSubmit(async (formData, event) => {
    const completeData: PropertyForm = {
      ...propertyData,
      ...formData,
      booking_status: true,
    };
    handlePropertySubmit(completeData);
  });

  return (
    <form onSubmit={onSubmit}>
      <Container>
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
          <SectionTitle title="Review info..." />
          <ReviewTable data={propertyData} />
          <SectionTitle title="Final touches!" />
          <ReviewInfoForm register={register} errors={errors} />

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

export default ReviewInfoComponent;
