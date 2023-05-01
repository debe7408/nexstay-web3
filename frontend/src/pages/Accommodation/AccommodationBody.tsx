import {
  Box,
  Grid,
  Typography,
  Skeleton,
  Container,
  Card,
  Avatar,
  Button,
} from "@mui/material";
import { Property } from "../../types/property";
import { themes } from "../../constants/colors";
import styled from "styled-components";
import Header from "./components/Header";
import Picutres from "./components/Picutres";
import InfoSection from "./components/InfoSection";
import ReserveCard from "./components/ReserveCard";

interface Props {
  property: Property;
}

const AccommodationBody: React.FC<Props> = ({ property }) => {
  return (
    <StyledContainer maxWidth="lg">
      <Header property={property} />
      <Picutres property={property} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <InfoSection property={property} />
        </Grid>
        <Grid item xs={12} md={4}>
          <ReserveCard property={property} />
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
  margin-top: 50px;
  margin-bottom: 50px;
  gap: 20px;
`;

export default AccommodationBody;
