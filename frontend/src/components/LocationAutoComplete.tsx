import { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import getISO3166 from "i18n-iso-countries";
getISO3166.registerLocale(require("i18n-iso-countries/langs/en.json"));

const countries = getISO3166.getNames("en");

interface LocationAutoCompleteProps {
  selectedCountry: string | undefined;
  setSelectedCountry: (value: string | undefined) => void;
}

const LocationAutoComplete: React.FC<LocationAutoCompleteProps> = ({
  selectedCountry,
  setSelectedCountry,
}) => {
  const handleCountryChange = (event: any, newValue: any) => {
    setSelectedCountry(newValue);
  };

  return (
    <>
      <Autocomplete
        options={Object.values(countries)}
        value={selectedCountry}
        onChange={handleCountryChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose a country"
            variant="outlined"
            fullWidth
          />
        )}
      />
    </>
  );
};

export default LocationAutoComplete;
