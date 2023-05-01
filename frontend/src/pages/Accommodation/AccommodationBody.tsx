import { Grid, Container } from "@mui/material";
import { useState, useEffect } from "react";
import { Property } from "../../types/property";
import styled from "styled-components";
import Header from "./components/Header";
import Picutres from "./components/Picutres";
import InfoSection from "./components/InfoSection";
import ReserveCard from "./components/ReserveCard";
import {
  deleteProperty,
  bookmakrProperty,
  unsaveProperty,
} from "../../api/manageProperty";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { checkIfBookmarked } from "../../api/getProperty";

interface Props {
  property: Property;
  editor: boolean;
}

const AccommodationBody: React.FC<Props> = ({ property, editor }) => {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const fetchIfBookmarked = async () => {
      const bookmarked = await checkIfBookmarked(property.property_id);

      setBookmarked(bookmarked);
    };

    fetchIfBookmarked();
  }, [property, bookmarked]);

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

  const handleOnBookmark = async () => {
    const { hasError, message } = await bookmakrProperty(property.property_id);

    if (hasError && message) {
      return enqueueSnackbar(message, {
        variant: "error",
      });
    }

    enqueueSnackbar(message || "Property bookmarked successfully!", {
      variant: "success",
    });

    navigate("/myProfile");
  };
  const handleOnUnsave = async () => {
    const { hasError, message } = await unsaveProperty(property.property_id);

    if (hasError && message) {
      return enqueueSnackbar(message, {
        variant: "error",
      });
    }

    enqueueSnackbar(message || "Property removed from bookmarks!", {
      variant: "success",
    });

    navigate("/myProfile");
  };

  return (
    <StyledContainer maxWidth="lg">
      <Header
        handleDelete={handleOnDelete}
        handleCopy={handleOnCopy}
        handleBookmark={handleOnBookmark}
        handleUnsave={handleOnUnsave}
        bookmarked={bookmarked}
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
