import { Grid, Box, Typography } from "@mui/material";
import SectionTitle from "../../../components/SectionTitle";
import styled from "styled-components";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useState } from "react";
import { FieldErrors, FieldError, UseFormRegister } from "react-hook-form";
import { PropertyInfoForm } from "../../../types/property";
import FileUpload from "../../../components/FileUpload";
interface Props {
  register: UseFormRegister<PropertyInfoForm>;
  errors: FieldErrors<PropertyInfoForm>;
}

const PictureUpload: React.FC<Props> = ({ errors, register }) => {
  const [files, setFiles] = useState<FileList>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFiles(files);
    }
  };

  return (
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
      <SectionTitle title="Upload pictures of your place" />
      <StyledBox errors={errors.pictures}>
        <StyledIcon />
        <Typography variant="body1">Upload your pictures here</Typography>
        <Typography variant="subtitle2">Please select 5 pictures</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}></Box>
        <FileUpload
          {...register("pictures")}
          onChange={handleFileChange}
        ></FileUpload>
      </StyledBox>
    </Grid>
  );
};

interface CustomBoxProps {
  errors?: FieldError;
}

const StyledBox = styled(Box)<CustomBoxProps>(({ errors }) => ({
  display: "flex",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  backgroundColor: "#100835",
  border: errors ? "3px solid red" : "",
  borderRadius: "10px",
  boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.08)",
  padding: "30px",
  cursor: "pointer",
  transition: "background-color 300ms ease-out",

  "&:hover": {
    backgroundColor: "rgba(47, 44, 64, 1)",
  },
}));

const StyledIcon = styled(AddAPhotoIcon)({
  fontSize: "64px",
  color: "#828282",
  marginBottom: "16px",
});

export default PictureUpload;
