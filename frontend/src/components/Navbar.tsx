import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Logo from "../assets/logo.svg";
import styled from "styled-components";
import { themes } from "../constants/colors";

const Navbar: React.FC = () => {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          <Link to="/">
            <img src={Logo} alt="Logo" height="20" />
          </Link>
        </Typography>
        <Button color="inherit" component={Link} to="/about">
          About
        </Button>
        <Typography variant="h6" style={{ flexGrow: 1 }}></Typography>
        <Button color="inherit" component={Link} to="/register">
          Register
        </Button>
        <Button color="inherit" component={Link} to="/signin">
          Login
        </Button>
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
