import { Badge, IconButton, Menu, MenuItem } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { login, selectLoginState, selectUserId } from "../app/loginSlice";
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
  const userId = useAppSelector(selectUserId);
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

    const { hasError, message, token, userId } = await loginUser(signerAddress);

    if (hasError || !token) {
      if (message) {
        enqueueSnackbar(message, {
          variant: "error",
        });
      } else {
        enqueueSnackbar("Internal error. Please try again later.", {
          variant: "error",
        });
      }
      return;
    }

    enqueueSnackbar("Login successful.", {
      variant: "success",
    });
    dispatch(login({ token, userId }));
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
          {userId ? (
            <ProfileAvatar id={userId} />
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
      <MenuItem component={Link} to="/host/information" onClick={props.onClick}>
        Add property
      </MenuItem>
      <hr></hr>
      <MenuItem onClick={props.onLogOut}>Sign out</MenuItem>
    </>
  );
};

export default ProfileBadge;
