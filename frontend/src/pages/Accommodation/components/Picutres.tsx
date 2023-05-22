import { Grid, Dialog, IconButton } from "@mui/material";
import styled from "styled-components";
import { PropertyWithOwner } from "../../../types/property";
import { useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface Props {
  property: PropertyWithOwner;
}

const Picutres: React.FC<Props> = ({ property }) => {
  const [open, setOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(-1);

  const handleClickOpen = (index: number) => {
    setSelectedImageIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNextImage = () => {
    setSelectedImageIndex(
      (prevIndex) => (prevIndex + 1) % property.picture_paths.length
    );
  };

  const handlePreviousImage = () => {
    setSelectedImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + property.picture_paths.length) %
        property.picture_paths.length
    );
  };

  return (
    <Grid container spacing={1} marginTop={2}>
      <Dialog open={open} onClose={handleClose}>
        <IconButton
          sx={{
            position: "absolute",
            left: 8,
            top: "50%",
            transform: "translateY(-50%)",
            color: "white",
            border: "3px solid black",
          }}
          onClick={handlePreviousImage}
        >
          <ArrowBackIcon />
        </IconButton>
        {property && property.picture_paths && (
          <ExpandedImage
            src={`${process.env.REACT_APP_BASE_API_URL}/images/${property.picture_paths[selectedImageIndex]}`}
          />
        )}
        <IconButton
          sx={{
            position: "absolute",
            right: 8,
            top: "50%",
            transform: "translateY(-50%)",
            color: "white",
            border: "3px solid black",
          }}
          onClick={handleNextImage}
        >
          <ArrowForwardIcon />
        </IconButton>
      </Dialog>
      <Grid item xs={12} md={6}>
        {property && property.picture_paths && (
          <Image
            src={`${process.env.REACT_APP_BASE_API_URL}/images/${property.picture_paths[0]}`}
            onClick={() => handleClickOpen(0)}
          />
        )}
      </Grid>
      <Grid item xs={12} md={6}>
        {property && property.picture_paths && (
          <Grid container spacing={1}>
            {property.picture_paths.map((path, index) => {
              if (index === 0) return null;
              return (
                <Grid item key={index} xs={6}>
                  <SmallImage
                    src={`${process.env.REACT_APP_BASE_API_URL}/images/${path}`}
                    onClick={() => handleClickOpen(index)}
                  />
                </Grid>
              );
            })}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

const Image = styled.img`
  width: 100%;
  height: 365px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
  }
`;

const SmallImage = styled(Image)`
  height: 175px;
`;

const ExpandedImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  max-height: 80vh;
`;

export default Picutres;
