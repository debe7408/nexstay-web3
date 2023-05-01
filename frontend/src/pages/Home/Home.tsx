import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import PropertyContainer from "../../components/PropertyContainer";
import { getAllProperties } from "../../api/getProperty";
import { Property } from "../../types/property";

const Home = () => {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    fetchedProperties();
  }, []);

  const fetchedProperties = async () => {
    const { hasError, message, properties } = await getAllProperties();
    if (hasError || !properties) {
      console.log(message);
      return;
    }
    setProperties(properties);
  };

  return (
    <Container>
      <h1>Your journey starts here</h1>
      <PropertyContainer properties={properties}></PropertyContainer>
    </Container>
  );
};

export default Home;
