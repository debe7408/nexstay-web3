import { Grid, Container, Box, Typography, Avatar } from "@mui/material";

interface Props {
  bannerUrl: string;
  avatarUrl: string;
}

const ProfileHeader: React.FC<Props> = ({ bannerUrl, avatarUrl }) => {
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
        <Avatar
          src={avatarUrl}
          sx={{
            width: { sm: "150px", md: "150px" },
            height: { sm: "150px", md: "150px" },
            border: "5px solid black",
          }}
        />
      </Box>
    </Grid>
  );
};

export default ProfileHeader;
