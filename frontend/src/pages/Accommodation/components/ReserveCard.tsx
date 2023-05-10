import { Button, Typography, Skeleton, Grid } from "@mui/material";
import { Property } from "../../../types/property";
import styled from "styled-components";
import { themes } from "../../../constants/colors";
import { useNavigate } from "react-router-dom";

interface Props {
  property: Property;
}

const ReserveCard: React.FC<Props> = ({ property }) => {
  const navigate = useNavigate();

  const handleOpenReservation = () => {
    navigate(`/accommodation/reserve/${property.id || property.property_id}`);
  };

  return (
    <CustomCard container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="h5"> {`$${property.price} per night`}</Typography>
      </Grid>

      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleOpenReservation}
        >
          Reserve
        </Button>
      </Grid>
    </CustomCard>
  );
};

const CustomCard = styled(Grid)`
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 20px;
  background: linear-gradient(
    to bottom,
    ${themes.dark.main} 0%,
    ${themes.dark.dark_accent} 100%
  );
  color: ${themes.dark.text};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

export default ReserveCard;
