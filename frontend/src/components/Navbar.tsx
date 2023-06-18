import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import ProfileBadge from "./ProfileBadgeComponent";
import NetworkChip from "./NetworkChip";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { ColorModeContext } from "..";

const Navbar: React.FC = () => {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();

  const navigate = useNavigate();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="h6"
          onClick={() => navigate("/")}
          sx={{
            cursor: "pointer",
          }}
        >
          NEXSTAY
        </Typography>
        {theme.palette.mode === "light" ? (
          <IconButton onClick={colorMode.toggleColorMode}>
            <LightModeIcon />
          </IconButton>
        ) : (
          <IconButton onClick={colorMode.toggleColorMode}>
            <DarkModeIcon />
          </IconButton>
        )}

        <Typography variant="h6" style={{ flexGrow: 1 }}></Typography>

        <Typography variant="h6" style={{ flexGrow: 1 }}></Typography>
        <NetworkChip />
        <ProfileBadge />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
