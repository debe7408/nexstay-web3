import { Container } from "@mui/material";
import PropertyType from "./PropertyType";
import PropertyLocation from "./PropertyLocation";
import SizingInfo from "./SizingInfo";
import AmenitiesInfo from "./AmenitiesInfo";
import PictureUpload from "./PictureUpload";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import StepperNavigation from "../components/StepperNavigation";

interface Props {
  steps: string[];
  activeStep: number;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

export interface FormData {
  propertyType: string;
  propertyLocation: {
    country: string;
    city: string;
    address: string;
  };
  propertySize: {
    guests: number;
    beds: number;
    bathrooms: number;
  };
  amenities: string[];
  safetyAmenities: string[];
}

const BecomeHostComponent: React.FC<Props> = ({
  activeStep,
  steps,
  handleNextStep,
  handlePreviousStep,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(
      yup.object().shape({
        propertyType: yup.string().required(),
        propertyLocation: yup.object().shape({
          country: yup.string().required(),
          city: yup.string().required(),
          address: yup.string().required(),
        }),
        propertySize: yup.object().shape({
          guests: yup.number().required(),
          beds: yup.number().required(),
          bathrooms: yup.number().required(),
        }),
      })
    ),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    handleNextStep();
  });

  return (
    <form
      onSubmit={onSubmit}
      onError={(errors) => {
        console.log(errors);
      }}
    >
      <Container maxWidth="lg">
        <PropertyType register={register} errors={errors} />
        <PropertyLocation register={register} errors={errors} />
        <SizingInfo register={register} errors={errors} />
        <AmenitiesInfo setValue={setValue} />
        <PictureUpload />
        <StepperNavigation
          activeStep={activeStep}
          steps={steps}
          handleNextStep={handleNextStep}
          handlePreviousStep={handlePreviousStep}
        />
      </Container>
    </form>
  );
};

export default BecomeHostComponent;
