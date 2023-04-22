import { Grid, Box, Typography } from "@mui/material";
import SectionTitle from "../../../components/SectionTitle";
import styled from "styled-components";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useRef, useState } from "react";
interface Props {}

const PictureUpload: React.FC<Props> = () => {
  const [files, setFiles] = useState<FileList>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

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
      <StyledBox onClick={handleFileClick}>
        <StyledIcon />
        <Typography variant="body1">Upload your pictures here</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <input
            ref={fileInputRef}
            hidden
            accept="image/*"
            multiple
            type="file"
            onChange={handleFileChange}
          />
          <Typography variant="subtitle2">
            {files ? `Selected Files: ${files.length}` : "Choose a file"}
          </Typography>
        </Box>
      </StyledBox>
    </Grid>
  );
};

const StyledBox = styled(Box)({
  display: "flex",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  backgroundColor: "#ffff",
  borderRadius: "16px",
  boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.08)",
  padding: "30px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#F5F5F5",
  },
});

const StyledIcon = styled(AddAPhotoIcon)({
  fontSize: "64px",
  color: "#828282",
  marginBottom: "16px",
});

export default PictureUpload;
