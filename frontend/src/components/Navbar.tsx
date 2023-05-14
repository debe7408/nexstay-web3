import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Logo from "../assets/logo.svg";
import styled from "styled-components";
import { themes } from "../constants/colors";
import ProfileBadge from "./ProfileBadgeComponent";
import NetworkChip from "./NetworkChip";

const Navbar: React.FC = () => {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          <Link to="/">
            <img src={Logo} alt="Logo" height="20" />
          </Link>
        </Typography>
        <Typography variant="h6" style={{ flexGrow: 1 }}></Typography>
        <Typography variant="h6" style={{ flexGrow: 1 }}></Typography>
        <NetworkChip />
        <ProfileBadge />
      </Toolbar>
    </StyledAppBar>
  );
};

const StyledAppBar = styled(AppBar)`
  background: linear-gradient(
    to right,
    ${themes.dark.main} 0%,
    ${themes.dark.dark_accent} 100%
  );
`;

export default Navbar;
