import { useCallback, useEffect, useState } from "react";
import { Grid, Container } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import PropertyContainer from "../../components/PropertyContainer";
import LoadingComponent from "../../components/PropertyLoadingComponent";
import { getPropertiesPerPage } from "../../api/getProperty";
import { Property } from "../../types/property";
import EndMessage from "../../components/EndMessageComponent";
import LocationAutoComplete from "../../components/LocationAutoComplete";

const Home = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchedProperties = useCallback(async () => {
    const { message, properties, error } = await getPropertiesPerPage(page);
    if (error || !properties) {
      return;
    }

    if (properties.length === 0) {
      setHasMore(false);
      return;
    }

    setProperties((prevProperties) => [...prevProperties, ...properties]);
  }, [page]);

  useEffect(() => {
    fetchedProperties();
  }, [page, fetchedProperties]);

  useEffect(() => {
    setProperties([]);
    setPage(1);
    setHasMore(true);
  }, [selectedCountry]);

  return (
    <Container>
      <Grid
        container
        spacing={2}
        sx={{
          minHeight: "100vh",
        }}
      >
        <Grid item xs={12}>
          <h1>Welcome. Your journey starts here</h1>
        </Grid>
        <Grid item xs={12}>
          <LocationAutoComplete
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
          />
        </Grid>

        <Grid item xs={12}>
          <InfiniteScroll
            dataLength={properties.length}
            next={() => setPage((prevPage) => prevPage + 1)}
            hasMore={hasMore}
            loader={<LoadingComponent />}
            endMessage={<EndMessage />}
          >
            <PropertyContainer properties={properties}></PropertyContainer>
          </InfiniteScroll>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
