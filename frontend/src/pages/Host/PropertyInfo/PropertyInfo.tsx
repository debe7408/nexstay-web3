import { Container } from "@mui/material";
import PropertyType from "./PropertyType";
import PropertyLocation from "./PropertyLocation";

interface Props {}

const BecomeHostComponent: React.FC<Props> = () => {
  return (
    <>
      <Container maxWidth="lg">
        <PropertyType />
        <PropertyLocation />
      </Container>
    </>
  );
};

export default BecomeHostComponent;
