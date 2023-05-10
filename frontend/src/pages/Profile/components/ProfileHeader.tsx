import { Grid, Box } from "@mui/material";
import ProfileAvatar from "../../../components/Avatar";

interface Props {
  bannerUrl: string;
  userId: number;
}

const ProfileHeader: React.FC<Props> = ({ bannerUrl, userId }) => {
  return (
    <Grid container>
      <Box
        sx={{
          backgroundImage: `url(${bannerUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "250px",
          width: "100%",
          position: "static",
          borderRadius: "10px",
        }}
      />
      <Box
        sx={{
          position: "relative",
          left: "10%",
          top: { sm: "-80px", md: "-80px" },
        }}
      >
        <ProfileAvatar id={userId} customHeight="8rem" customWidth="8rem" />
      </Box>
    </Grid>
  );
};

export default ProfileHeader;