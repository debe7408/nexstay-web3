import { Avatar, Badge, IconButton, Menu, MenuItem } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { themes } from "../constants/colors";
import { useAppSelector } from "../app/hooks";
import { selectLoginState } from "../app/loginSlice";
import { web3authSelector } from "../app/web3Slice";
import { connectWeb3auth, disconnectWeb3auth } from "../web3/web3auth";

const ProfileBadge = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const web3AuthInstance = useAppSelector(web3authSelector);
  const loggedIn = useAppSelector(selectLoginState);

  const handleOnExpand = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOnClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    disconnectWeb3auth(web3AuthInstance);
    handleOnClose();
  };

  const handleLogIn = async () => {
    await connectWeb3auth(web3AuthInstance);
    handleOnClose();
  };

  return (
    <>
      <IconButton size="small" onClick={handleOnExpand}>
        <Badge
          color={loggedIn ? "success" : "error"}
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
        {loggedIn ? (
          <MenuItemsLoggedIn
            onClick={() => {
              handleOnClose();
            }}
            onLogOut={handleLogOut}
          />
        ) : (
          <MenuItemsLoggedOut
            onClick={() => {
              handleOnClose();
            }}
            onLogin={async () => await handleLogIn()}
          />
        )}
      </Menu>
    </>
  );
};

interface MenuItemsProps {
  onClick: () => void;
  onLogOut?: () => void;
  onLogin?: () => void;
}

const MenuItemsLoggedOut = (props: MenuItemsProps) => {
  return (
    <>
      <MenuItem onClick={props.onLogin}>Sign in</MenuItem>
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
      <MenuItem component={Link} to="/host/information" onClick={props.onClick}>
        Become a Host
      </MenuItem>
      <hr></hr>
      <MenuItem onClick={props.onLogOut}>Sign out</MenuItem>
    </>
  );
};

const StyledAvatar = styled(Avatar)`
  background-color: ${themes.dark.main};
  color: ${themes.dark.text};
  box-shadow: 0 0 0 2px ${themes.dark.light};
`;

export default ProfileBadge;
