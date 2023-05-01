import { Grid, Typography, Avatar } from "@mui/material";
import { Property } from "../../../types/property";
import styled from "styled-components";
import { useState } from "react";
import Divider from "../../../components/DividerComponent";

interface Props {
  property: Property;
}

const InfoSection: React.FC<Props> = ({ property }) => {
  return (
    <Grid container spacing={1} marginTop={3}>
      <BasicInfo property={property} />
      <Divider />
      <Description property={property} />
      <Divider />
      <AmentiyInfo property={property} />
    </Grid>
  );
};

const BasicInfo: React.FC<Props> = ({ property }) => {
  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <Typography variant="h6">{`Entire ${property.type} hosed by Deividas`}</Typography>
        <Typography variant="body1">
          {` ${property.guests} Guests · ${property.beds} Beds · ${property.bathrooms} Bathrooms`}
        </Typography>
      </Grid>
      <AvatarGrid item xs={12} md={6}>
        <StyledAvatar />
      </AvatarGrid>
    </Grid>
  );
};

const Description: React.FC<Props> = ({ property }) => {
  const [truncated, setTruncated] = useState(true);

  const handleShowMore = () => {
    setTruncated(!truncated);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h6">About this place</Typography>
        <Typography variant="body1">
          {truncated && property.description
            ? property.description.substring(0, 200)
            : property.description}
        </Typography>
        <ShowMore onClick={handleShowMore}>
          {truncated ? "Show more >" : "Show less"}
        </ShowMore>
      </Grid>
    </Grid>
  );
};

const AmentiyInfo: React.FC<Props> = ({ property }) => {
  if (!!!property.amenities || !!!property.safety_amenities)
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">
            Currently, this place does not offer amenities
          </Typography>
        </Grid>
      </Grid>
    );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">This place has these amenities</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="overline">Basic amenities</Typography>
            {property.amenities?.map((amenity) => {
              return (
                <Typography key={amenity} variant="body1">
                  · {amenity}
                </Typography>
              );
            })}
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="overline">Safety amenities</Typography>
            {property.safety_amenities?.map((amenity) => {
              return (
                <Typography key={amenity} variant="body1">
                  · {amenity}
                </Typography>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const AvatarGrid = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledAvatar = styled(Avatar)`
  width: 60px;
  height: 60px;
  border: 1px solid white;
  box-shadow: 0 10px 8px rgba(0, 0, 0, 0.1);
`;

const ShowMore = styled.div`
  margin-top: 10px;
  font-weight: 5px;
  text-decoration: underline;
  font-size: 15px;
  cursor: pointer;
`;

export default InfoSection;
