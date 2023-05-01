import { Grid } from "@mui/material";
import { Property } from "../../../types/property";
import styled from "styled-components";

interface Props {
  property: Property;
}

const Picutres: React.FC<Props> = ({ property }) => {
  return (
    <Grid container spacing={1} marginTop={2}>
      <Grid item xs={12} md={6}>
        <Image src={`https://source.unsplash.com/random/?city,night`} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <SmallImage
              src={`https://source.unsplash.com/random/?city,night`}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <SmallImage
              src={`https://source.unsplash.com/random/?city,night`}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <SmallImage
              src={`https://source.unsplash.com/random/?city,night`}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <SmallImage
              src={`https://source.unsplash.com/random/?city,night`}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const Image = styled.img`
  width: 100%;
  height: 365px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
  }
`;

const SmallImage = styled(Image)`
  height: 175px;
`;

export default Picutres;
