import styled from "styled-components";
import { Grid, Typography } from "@mui/material";
import { Property } from "../../../types/property";
import SaveIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/IosShare";
import DeleteIcon from "@mui/icons-material/DeleteOutline";

interface Props {
  property: Property;
  editor: boolean;
  handleDelete: () => void;
  handleCopy: () => void;
}

const Header: React.FC<Props> = ({
  property,
  editor,
  handleDelete,
  handleCopy,
}) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Title variant="h4">{property.name}</Title>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <SubtitleBox>
              <Subtitle>2 Reviews</Subtitle>
              <Subtitle>{`${property.city}, ${property.country}`}</Subtitle>
            </SubtitleBox>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <SubtitleBox>
              {editor && (
                <IconBox color="red" onClick={handleDelete}>
                  <DeleteIcon />
                  <Subtitle>Delete</Subtitle>
                </IconBox>
              )}
              <IconBox>
                <SaveIcon />
                <Subtitle>Save</Subtitle>
              </IconBox>
              <IconBox onClick={handleCopy}>
                <ShareIcon />
                <Subtitle>Share</Subtitle>
              </IconBox>
            </SubtitleBox>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Header;

const Title = styled(Typography)`
  font-weight: bold;
`;

const Subtitle = styled.div`
  font-weight: bold;
  text-decoration: underline;
  font-size: 13px;
`;

const SubtitleBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;
`;

const IconBox = styled.div<{ color?: string }>`
  display: flex;
  flex-direction: row;
  color: ${({ color }) => color && color};
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  cursor: pointer;
`;
