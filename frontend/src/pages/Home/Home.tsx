import { useCallback, useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import PropertyContainer from "../../components/PropertyContainer";
import LoadingComponent from "../../components/PropertyLoadingComponent";
import SearchFieldComponent from "../../components/SearchField";
import { getPropertiesPerPage } from "../../api/getProperty";
import { Property } from "../../types/property";
import EndMessage from "../../components/EndMessageComponent";

const Home = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
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
          <SearchFieldComponent
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
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
