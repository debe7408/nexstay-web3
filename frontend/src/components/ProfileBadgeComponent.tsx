import { Badge, IconButton, Menu, MenuItem } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { login, selectLoginState, selectUser } from "../app/loginSlice";
import { web3Selectors } from "../app/web3Slice";
import { connectWeb3auth, disconnectWeb3auth } from "../web3/web3auth";
import { loginUser } from "../api/loginUser";
import { useSnackbar } from "notistack";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ProfileAvatar from "./Avatar";

const ProfileBadge = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { web3auth } = useAppSelector(web3Selectors);
  const user = useAppSelector(selectUser);
  const loggedIn = useAppSelector(selectLoginState);
  const dispatch = useAppDispatch();

  const handleOnExpand = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOnClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    disconnectWeb3auth(web3auth);
    handleOnClose();
  };

  const handleLogIn = async () => {
    const signerAddress = await connectWeb3auth(web3auth);

    const { hasError, message, token, user } = await loginUser(signerAddress);

    if (hasError || !token) {
      enqueueSnackbar(message, {
        variant: "error",
      });
      return;
    }

    enqueueSnackbar(message, {
      variant: "success",
    });
    dispatch(login({ token, user }));
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
          {user ? (
            <ProfileAvatar id={user.id} />
          ) : (
            <AccountCircleIcon
              sx={{
                width: "3rem",
                height: "3rem",
              }}
            />
          )}
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
      <MenuItem component={Link} to="/myProfile" onClick={props.onClick}>
        Profile
      </MenuItem>
      <MenuItem
        component={Link}
        to="/myProfile/manage-reservations"
        onClick={props.onClick}
      >
        Reservations
      </MenuItem>
      <MenuItem component={Link} to="/host/information" onClick={props.onClick}>
        Add property
      </MenuItem>
      <hr></hr>
      <MenuItem onClick={props.onLogOut}>Sign out</MenuItem>
    </>
  );
};

export default ProfileBadge;
