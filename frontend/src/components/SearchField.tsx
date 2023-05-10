import { Box, InputBase, alpha } from "@mui/material";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

const SearchFieldComponent: React.FC<Props> = ({
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search by location…"
        inputProps={{ "aria-label": "search" }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </Search>
  );
};

export default SearchFieldComponent;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "10px",
  backgroundColor: alpha("rgba(48, 47, 104)", 0.15),
  "&:hover": {
    backgroundColor: alpha("rgba(48, 47, 104)", 0.25),
  },
  transition: "width 0.2s ease-in-out",
  marginLeft: 0,
  width: "25%",
  border: "1px solid rgba(48, 47, 104, 0.25)",

  "&:focus-within": {
    width: "100%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: "0px 10px",
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: "10px 10px 10px 0px",
    paddingLeft: `calc(2.5em)`,
    width: "100%",
  },
}));
