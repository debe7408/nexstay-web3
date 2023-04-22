import { Grid, Typography } from "@mui/material";
import { themes } from "../constants/colors";
import StyledBox from "./StyledBox";

interface Props {
  title: string;
}

const SectionTitle: React.FC<Props> = ({ title }): JSX.Element => {
  return (
    <Grid item xs={12} md={12} lg={12}>
      <StyledBox textAlign="left">
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: { xs: `${themes.dark.dark_accent}`, md: "black" },
          }}
        >
          {title}
        </Typography>
      </StyledBox>
    </Grid>
  );
};

export default SectionTitle;
