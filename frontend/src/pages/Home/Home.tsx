import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import PropertyContainer from "../../components/PropertyContainer";
import { getAllProperties } from "../../api/getProperty";
import { Property } from "../../types/property";
import SearchFieldComponent from "../../components/SearchField";
import { Grid } from "@mui/material";

const Home = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

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
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1>Your journey starts here</h1>
        </Grid>
        <Grid item xs={12}>
          <SearchFieldComponent
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </Grid>

        <Grid item xs={12}>
          <PropertyContainer
            properties={
              searchTerm.length > 0
                ? properties.filter(
                    (property) =>
                      property.country
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      property.city
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                  )
                : properties
            }
          ></PropertyContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
