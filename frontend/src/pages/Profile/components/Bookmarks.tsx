import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Grid, Typography } from "@mui/material";
import Divider from "../../../components/DividerComponent";
import { Property } from "../../../types/property";
import PropertyContainer from "../../../components/PropertyContainer";
import { getBookmarkedProperties } from "../../../api/getProperty";

interface Props {
  userID: string | number;
}

const Bookmarks: React.FC<Props> = ({ userID }) => {
  const [bookmarkedProperties, setBookmarkedProperties] = useState<Property[]>(
    []
  );
  const fetchBookmarked = useCallback(async () => {
    const { error, properties } = await getBookmarkedProperties();

    if (error || !properties) {
      return;
    }

    setBookmarkedProperties(properties);
  }, [userID]);

  useEffect(() => {
    fetchBookmarked();
  }, [userID]);

  return (
    <Container>
      <Grid item xs={12}>
        <Typography variant="h5">{`Your favorites [ ${
          bookmarkedProperties?.length || 0
        } ]`}</Typography>

        <Divider />
      </Grid>
      <Grid item xs={12}>
        {bookmarkedProperties && (
          <PropertyContainer
            properties={bookmarkedProperties}
            itemsPerRow={{ md: 12, lg: 6 }}
          ></PropertyContainer>
        )}
      </Grid>
    </Container>
  );
};

export default Bookmarks;

const Container = styled.div`
  width: 100%;
`;
