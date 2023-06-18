import styled from "styled-components";
import { Radio, FormControlLabel, Grid, Paper } from "@mui/material";
import { Favorite as FavoriteIcon } from "@mui/icons-material";
import StyledBox from "../../../components/StyledBox";
import { UseFormRegister } from "react-hook-form";
import { PropertyInfoForm } from "../../../types/property";

interface Props {
  propertyType: string;
  selectedValue: string;
  register: UseFormRegister<PropertyInfoForm>;
}

const CustomRadioButton: React.FC<Props> = ({
  propertyType,
  selectedValue,
  register,
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
          {...register("type")}
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
