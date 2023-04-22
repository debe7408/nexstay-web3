import styled from "styled-components";
import { Radio, FormControlLabel, Grid } from "@mui/material";
import { Favorite as FavoriteIcon } from "@mui/icons-material";
import StyledBox from "./StyledBox";
import { themes } from "../constants/colors";

interface Props {
  propertyType: string;
  selectedValue: string;
}

const CustomRadioButton: React.FC<Props> = ({
  propertyType,
  selectedValue,
}) => {
  return (
    <Grid item xs={12} sm={4} md={3}>
      <StyledBox>
        <FormControlLabel
          key={propertyType}
          value={propertyType}
          control={<Radio color="primary" icon={<></>} checkedIcon={<></>} />}
          label={
            <Box selected={selectedValue === propertyType}>
              <Icon />
              {propertyType}
            </Box>
          }
        />
      </StyledBox>
    </Grid>
  );
};

export default CustomRadioButton;

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
    background-color: ${themes.dark.main};
    color: ${themes.dark.text};
    border: 2px solid ${themes.dark.main};
  }
`;

const Icon = styled(FavoriteIcon)`
  margin-right: 10px;
`;
