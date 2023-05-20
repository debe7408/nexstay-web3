import { Grid, Container } from "@mui/material";
import { useState, useEffect } from "react";
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
import { PropertyWithOwner } from "../../types/property";
import ReportDialog from "./components/ReportDialog";

interface Props {
  property: PropertyWithOwner;
  editor: boolean;
}

const AccommodationBody: React.FC<Props> = ({ property, editor }) => {
  const [bookmarked, setBookmarked] = useState(false);
  const [openReportDialog, setOpenReportDialog] = useState(false);

  useEffect(() => {
    const fetchIfBookmarked = async () => {
      const bookmarked = await checkIfBookmarked(property.id);

      setBookmarked(bookmarked);
    };

    fetchIfBookmarked();
  }, [property, bookmarked]);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleOnDelete = async () => {
    const { hasError, message } = await deleteProperty(property.id);

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
      `${window.location.origin}/accommodation/${property.id}`
    );
    enqueueSnackbar("Link copied to clipboard!", {
      variant: "success",
    });
  };

  const handleOnBookmark = async () => {
    const { hasError, message } = await bookmakrProperty(property.id);

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
    const { hasError, message } = await unsaveProperty(property.id);

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

  const handleReport = () => {
    console.log("AsD");
    setOpenReportDialog(true);
  };

  return (
    <StyledContainer maxWidth="lg">
      <Header
        handleDelete={handleOnDelete}
        handleCopy={handleOnCopy}
        handleBookmark={handleOnBookmark}
        handleUnsave={handleOnUnsave}
        handleReport={handleReport}
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
      <ReportDialog
        propertyId={property.id}
        open={openReportDialog}
        handleClose={() => setOpenReportDialog(false)}
      />
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
  margin-top: 50px;
  margin-bottom: 50px;
  gap: 20px;
`;

export default AccommodationBody;
