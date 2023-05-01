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
import { deleteProperty } from "../../api/manageProperty";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

interface Props {
  property: Property;
  editor: boolean;
}

const AccommodationBody: React.FC<Props> = ({ property, editor }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleOnDelete = async () => {
    const { hasError, message } = await deleteProperty(property.property_id);

    if (hasError && message) {
      enqueueSnackbar(message, {
        variant: "error",
      });
    }

    enqueueSnackbar(message || "Property deleted successfully!", {
      variant: "success",
    });

    navigate("/myProfile");
  };

  const handleOnCopy = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/accommodation/${property.property_id}`
    );
    enqueueSnackbar("Link copied to clipboard!", {
      variant: "success",
    });
  };

  return (
    <StyledContainer maxWidth="lg">
      <Header
        handleDelete={handleOnDelete}
        handleCopy={handleOnCopy}
        editor={editor}
        property={property}
      />
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
