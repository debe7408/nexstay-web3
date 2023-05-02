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
import { PropertyInfoForm } from "../../../types/property";

interface Props {
  steps: string[];
  activeStep: number;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  handleSubmitData: (data: PropertyInfoForm) => void;
}

const PropertyInfoComponent: React.FC<Props> = ({
  activeStep,
  steps,
  handleNextStep,
  handlePreviousStep,
  handleSubmitData,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PropertyInfoForm>({
    resolver: yupResolver(
      yup.object().shape({
        type: yup.string().required(),
        location: yup.object().shape({
          country: yup.string().required(),
          city: yup.string().required(),
          address: yup.string().required(),
        }),
        size: yup.object().shape({
          guests: yup.number().required(),
          beds: yup.number().required(),
          bathrooms: yup.number().required(),
        }),
        pictures: yup
          .mixed()
          .test(
            "fileList",
            "Please upload at least one image file",
            (value) => value instanceof FileList && value.length > 0
          )
          .required(),
      })
    ),
  });

  const onSubmit = handleSubmit((data) => {
    handleSubmitData(data);
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
        <PictureUpload errors={errors} register={register} />
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

export default PropertyInfoComponent;
