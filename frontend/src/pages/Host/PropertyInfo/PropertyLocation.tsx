import { Grid } from "@mui/material";
import StyledBox from "../../../components/StyledBox";
import MapsComponent from "../../../components/Maps";
import AddressForm from "./AddressForm";
import SectionTitle from "../../../components/SectionTitle";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { PropertyInfoForm } from "../../../types/property";
interface Props {
  register: UseFormRegister<PropertyInfoForm>;
  errors: FieldErrors<PropertyInfoForm>;
}

const containerStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "10px",
};

const center = {
  lat: 54.73154104932955,
  lng: 25.26221793326186,
};

const PropertType: React.FC<Props> = ({ register, errors }) => {
  return (
    <>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "20px",
          gap: "10px",
        }}
      >
        <SectionTitle title="Where is your place located?" />

        <Grid item xs={12} md={12} lg={12}>
          <StyledBox>
            <MapsComponent containerStyle={containerStyle} center={center} />
          </StyledBox>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <StyledBox>
            <AddressForm register={register} errors={errors} />
          </StyledBox>
        </Grid>
      </Grid>
    </>
  );
};

export default PropertType;
