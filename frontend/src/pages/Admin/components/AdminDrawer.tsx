import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Toolbar,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Group as GroupIcon,
  Home as HomeIcon,
  Flag as FlagIcon,
  EventNote as EventIcon,
} from "@mui/icons-material";
import styled from "styled-components";

interface Props {
  handleSwitchTab: (tabIndex: number) => void;
}

const AdminDrawer: React.FC<Props> = ({ handleSwitchTab }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <StyledIconButton color="inherit" onClick={handleDrawerToggle}>
        <MenuIcon />
      </StyledIconButton>
      <StyledDrawer open={isDrawerOpen} onClose={handleDrawerToggle}>
        <StyledToolbar>
          <StyledIconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <CloseIcon />
          </StyledIconButton>
        </StyledToolbar>
        <List subheader={<ListSubheader>Management overview</ListSubheader>}>
          <ListItemButton onClick={() => handleSwitchTab(0)} key={"Users"}>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary={"Users"} secondary={`Manage Users`} />
          </ListItemButton>

          <ListItemButton onClick={() => handleSwitchTab(1)} key={"Properties"}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText
              primary={"Properties"}
              secondary={`Manage Properties`}
            />
          </ListItemButton>

          <ListItemButton
            onClick={() => handleSwitchTab(2)}
            key={"Reservations"}
          >
            <ListItemIcon>
              <EventIcon />
            </ListItemIcon>
            <ListItemText
              primary={"Reservations"}
              secondary={`Manage Reservations`}
            />
          </ListItemButton>

          <ListItemButton onClick={() => handleSwitchTab(3)} key={"Tickets"}>
            <ListItemIcon>
              <FlagIcon />
            </ListItemIcon>
            <ListItemText primary={"Tickets"} secondary={`Manage Tickets`} />
          </ListItemButton>
        </List>
      </StyledDrawer>
    </>
  );
};

const StyledDrawer = styled(Drawer)`
  & .MuiDrawer-paper {
    min-width: 240px;
  }
`;

const StyledToolbar = styled(Toolbar)`
  justify-content: space-between;
`;

const StyledIconButton = styled(IconButton)`
  width: fit-content;
`;

export default AdminDrawer;
