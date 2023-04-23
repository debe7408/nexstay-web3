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
  border-radius: 8px;
  background-color: ${(props: { selected: boolean }) =>
    props.selected ? themes.dark.main : "white"};
  color: ${(props: { selected: boolean }) =>
    props.selected ? themes.dark.text : "black"};
  border: ${(props: { selected: boolean }) =>
    props.selected
      ? `2px solid ${themes.dark.main}`
      : `2px solid ${themes.light.dark_accent}`};
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${(props: { selected: boolean }) =>
      props.selected ? themes.dark.main : themes.dark.main};
    border: ${(props: { selected: boolean }) =>
      props.selected
        ? `2px solid ${themes.dark.main}`
        : `2px solid ${themes.light.dark_accent}`};
  }
`;

const Icon = styled(FavoriteIcon)`
  margin-right: 10px;
`;
