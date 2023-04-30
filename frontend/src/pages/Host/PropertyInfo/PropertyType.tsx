import React, { useState } from "react";
import { RadioGroup, Grid } from "@mui/material";
import availablePropertyTypes from "../../../constants/availablePropertyTypes";
import CustomRadioButton from "../components/CustomRadioButton";
import SectionTitle from "../../../components/SectionTitle";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import ErrorComponent from "../../../components/ErrorComponent";
import { PropertyInfoForm } from "../../../types/property";

interface Props {
  register: UseFormRegister<PropertyInfoForm>;
  errors: FieldErrors<PropertyInfoForm>;
}

const PropertType: React.FC<Props> = ({ register, errors }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue((event.target as HTMLInputElement).value);
  };

  return (
    <>
      <RadioGroup value={selectedValue} onChange={handleChange}>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "50px",
            paddingBottom: "20px",
            gap: "10px",
          }}
        >
          <SectionTitle title="Which describes your place the best?" />
          {availablePropertyTypes.map((propertyType) => (
            <CustomRadioButton
              key={propertyType}
              propertyType={propertyType}
              selectedValue={selectedValue}
              register={register}
            />
          ))}
        </Grid>
        {errors.type && <ErrorComponent />}
      </RadioGroup>
    </>
  );
};

export default PropertType;
