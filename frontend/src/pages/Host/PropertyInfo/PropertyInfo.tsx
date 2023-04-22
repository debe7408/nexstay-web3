import { Container } from "@mui/material";
import PropertyType from "./PropertyType";
import PropertyLocation from "./PropertyLocation";
import SizingInfo from "./SizingInfo";
import AmenitiesInfo from "./AmenitiesInfo";
import PictureUpload from "./PictureUpload";

interface Props {}

const BecomeHostComponent: React.FC<Props> = () => {
  return (
    <>
      <Container maxWidth="lg">
        <PropertyType />
        <PropertyLocation />
        <SizingInfo />
        <AmenitiesInfo />
        <PictureUpload />
      </Container>
    </>
  );
};

export default BecomeHostComponent;
