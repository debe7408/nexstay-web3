import { Grid, FormGroup, Divider } from "@mui/material";
import SectionTitle from "../../../components/SectionTitle";
import { safetyAmenities, amenities } from "../../../constants/amenities";
import CustomCheckboxButton from "../../../components/CustomCheckboxButton";
import { useState, useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";
import { PropertyInfoForm } from "../../../types/property";
interface Props {
  setValue: UseFormSetValue<PropertyInfoForm>;
}

const AmenitiesInfo: React.FC<Props> = ({ setValue }) => {
  const [selectedValues, setSelectedValues] = useState({
    amenities: amenities.map(() => ({
      checked: false,
    })),
    safetyAmenities: safetyAmenities.map(() => ({
      checked: false,
    })),
  });

  useEffect(() => {
    setValue(
      "amenities",
      amenities.filter((_, i) => selectedValues.amenities[i].checked)
    );
    setValue(
      "safety_amenities",
      safetyAmenities.filter(
        (_, i) => selectedValues.safetyAmenities[i].checked
      )
    );
  }, [selectedValues, setSelectedValues]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const index = amenities.indexOf(name);
    setSelectedValues({
      ...selectedValues,
      amenities: [
        ...selectedValues.amenities.slice(0, index),
        { checked },
        ...selectedValues.amenities.slice(index + 1),
      ],
    });
  };
  const handleSafetyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const index = safetyAmenities.indexOf(name);
    setSelectedValues({
      ...selectedValues,
      safetyAmenities: [
        ...selectedValues.safetyAmenities.slice(0, index),
        { checked },
        ...selectedValues.safetyAmenities.slice(index + 1),
      ],
    });
  };

  return (
    <FormGroup>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "20px",
          paddingBottom: "20px",
          gap: "10px",
        }}
      >
        <SectionTitle title="What amenities does your place offer?" />
        {amenities.map((amenity, index) => (
          <CustomCheckboxButton
            key={amenity}
            amenity={amenity}
            checked={selectedValues.amenities[index].checked}
            handleChange={handleChange}
          />
        ))}

        <Divider
          sx={{ width: "100%", marginTop: "20px", marginBottom: "20px" }}
        />
        <SectionTitle title="What safety amenities does your place offer?" />
        {safetyAmenities.map((amenity, index) => (
          <CustomCheckboxButton
            key={amenity}
            amenity={amenity}
            checked={selectedValues.safetyAmenities[index].checked}
            handleChange={handleSafetyChange}
          />
        ))}
      </Grid>
    </FormGroup>
  );
};

export default AmenitiesInfo;
