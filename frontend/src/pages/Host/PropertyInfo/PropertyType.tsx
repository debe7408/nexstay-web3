import React, { useState } from "react";
import { RadioGroup, Grid, Typography } from "@mui/material";
import availablePropertyTypes from "../../../constants/availablePropertyTypes";
import StyledBox from "../../../components/StyledBox";
import { themes } from "../../../constants/colors";
import CustomRadioButton from "../../../components/CustomRadioButton";

const PropertType = () => {
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
          <Grid item xs={12} md={12} lg={12}>
            <StyledBox textAlign="left">
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  color: { xs: `${themes.dark.dark_accent}`, md: "black" },
                }}
              >
                Which describes your property best?
              </Typography>
            </StyledBox>
          </Grid>
          {availablePropertyTypes.map((propertyType) => (
            <CustomRadioButton
              key={propertyType}
              propertyType={propertyType}
              selectedValue={selectedValue}
            />
          ))}
        </Grid>
      </RadioGroup>
    </>
  );
};

export default PropertType;
