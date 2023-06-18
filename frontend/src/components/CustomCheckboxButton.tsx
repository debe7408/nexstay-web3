import styled from "styled-components";
import { FormControlLabel, Grid } from "@mui/material";
import { Favorite as FavoriteIcon } from "@mui/icons-material";
import Checkbox from "@mui/material/Checkbox";
import StyledBox from "./StyledBox";
import { themes } from "../constants/colors";

interface Props {
  amenity: string;
  checked: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomCheckboxButton: React.FC<Props> = ({
  amenity,
  checked,
  handleChange,
}) => {
  return (
    <Grid item xs={12} sm={4} md={3}>
      <StyledBox>
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={handleChange}
              name={amenity}
              icon={<></>}
              checkedIcon={<></>}
            />
          }
          label={
            <Box selected={checked}>
              <Icon />
              {amenity}
            </Box>
          }
        />
      </StyledBox>
    </Grid>
  );
};

export default CustomCheckboxButton;

const Box = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  width: 200px;
  border-radius: 10px;
  background-color: ${(props: { selected: boolean }) =>
    props.selected ? "#836de9" : "#08041b"}
  color: ${(props: { selected: boolean }) =>
    props.selected ? "#BFC695" : "#08041b"};
  border: ${(props: { selected: boolean }) =>
    props.selected ? `2px solid #BFC695` : `2px solid #08041b`};
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #BFC695;
    color: #000000;
    border: 2px solid #08041b; 
  }
`;

const Icon = styled(FavoriteIcon)`
  margin-right: 10px;
`;
