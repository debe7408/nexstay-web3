import { useState, useEffect, useCallback } from "react";
import { Grid, Typography } from "@mui/material";
import styled from "styled-components";
import PropertyContainer from "../../../components/PropertyContainer";
import Divider from "../../../components/DividerComponent";
import { getUserProperties } from "../../../api/userAPI";
import { Property } from "../../../types/property";

interface Props {
  userID: string | number;
}
const Listings: React.FC<Props> = ({ userID }) => {
  const [ownedProperties, setOwnedProperties] = useState<Property[]>([]);

  const fetchUserListings = useCallback(async () => {
    const { properties, error } = await getUserProperties();

    if (error || !properties) {
      return;
    }

    setOwnedProperties(properties);
  }, [userID]);

  useEffect(() => {
    fetchUserListings();
  }, [userID]);

  return (
    <Container>
      <Grid item xs={12}>
        <Typography variant="h5">
          {`Manage your listings [ ${ownedProperties?.length || 0} ]`}
        </Typography>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        {ownedProperties && (
          <PropertyContainer
            properties={ownedProperties}
            itemsPerRow={{ md: 12, lg: 6 }}
          ></PropertyContainer>
        )}
      </Grid>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

export default Listings;
