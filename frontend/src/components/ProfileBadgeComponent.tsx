import { Avatar, Badge, IconButton, Menu, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { themes } from "../constants/colors";

const ProfileBadge = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const authenticated = localStorage.getItem("authenticated");
    if (authenticated) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleOnExpand = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOnClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton size="small" onClick={handleOnExpand}>
        <Badge
          color={isLoggedIn ? "success" : "error"}
          variant="dot"
          sx={{
            "& .MuiBadge-badge": {
              width: 10,
              height: 10,
              borderRadius: "50%",
              border: `2px solid white`,
            },
          }}
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <StyledAvatar alt="user-profile">DB</StyledAvatar>
        </Badge>
      </IconButton>
      <Menu
        open={Boolean(anchorEl)}
        onClose={handleOnClose}
        anchorEl={anchorEl}
      >
        {isLoggedIn ? (
          <MenuItemsLoggedIn
            onClick={() => {
              handleOnClose();
            }}
          />
        ) : (
          <MenuItemsLoggedOut
            onClick={() => {
              handleOnClose();
            }}
          />
        )}
      </Menu>
    </>
  );
};

interface MenuItemsProps {
  onClick: () => void;
}

const MenuItemsLoggedOut = (props: MenuItemsProps) => {
  return (
    <>
      <MenuItem component={Link} to="/signin" onClick={props.onClick}>
        Log in
      </MenuItem>
      <MenuItem component={Link} to="/register" onClick={props.onClick}>
        Sign up
      </MenuItem>
    </>
  );
};

const MenuItemsLoggedIn = (props: MenuItemsProps) => {
  return (
    <>
      <MenuItem component={Link} to="/" onClick={props.onClick}>
        Home
      </MenuItem>
      <MenuItem component={Link} to="/profile" onClick={props.onClick}>
        Profile
      </MenuItem>
      <hr></hr>
      <MenuItem component={Link} to="/logout" onClick={props.onClick}>
        Log out
      </MenuItem>
    </>
  );
};

const StyledAvatar = styled(Avatar)`
  background-color: ${themes.dark.main};
  color: ${themes.dark.text};
  box-shadow: 0 0 0 2px ${themes.dark.light};
`;

export default ProfileBadge;
