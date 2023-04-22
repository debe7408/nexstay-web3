import { Container } from "@mui/material";
import PropertyType from "./PropertyType";
import PropertyLocation from "./PropertyLocation";
import SizingInfo from "./SizingInfo";

interface Props {}

const BecomeHostComponent: React.FC<Props> = () => {
  return (
    <>
      <Container maxWidth="lg">
        <PropertyType />
        <PropertyLocation />
        <SizingInfo />
      </Container>
    </>
  );
};

export default BecomeHostComponent;
