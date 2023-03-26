import Navbar from "./components/Navbar";
import { initAxiosClient } from "./axios/axiosClient";
import { useEffect, useState } from "react";
import Routes from "./components/RouteComponent";
import { useAppSelector } from "./app/hooks";
import { selectAuthToken } from "./app/loginSlice";
import { useMediaQuery } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styled from "styled-components";

export default function App() {
  const authorizationToken = useAppSelector(selectAuthToken);
  const matches = useMediaQuery("(min-width:600px)");
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    initAxiosClient(authorizationToken);
  }, [authorizationToken]);

  return (
    <>
      <Navbar></Navbar>
      <Routes></Routes>
      {!matches && (
        <StyledBottomNavigation value={value} onChange={handleChange}>
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction label="Explore" icon={<ExploreIcon />} />
          <BottomNavigationAction label="Profle" icon={<FavoriteIcon />} />
        </StyledBottomNavigation>
      )}
    </>
  );
}

const StyledBottomNavigation = styled(BottomNavigation)`
  position: fixed;
  bottom: 0;
  width: 100%;
`;
