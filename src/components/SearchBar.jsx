import { useState } from "react";
import { IconButton, InputBase, Paper } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useStore } from "../store/store";

function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const { getPodcasts } = useStore();

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && searchText !== "") {
      event.preventDefault();
      doSearch();
    }
  };

  const doSearch = () => {
    if (searchText !== "") {
      navigate(`podcasts-player-react/`);
      getPodcasts(searchText);
    }
  };

  const cleanTextField = () => {
    setSearchText("");
  };

  return (
    <>
      <div className="px-5 py-7 flex">
        {location.pathname != "/podcasts-player-react/" && (
          <IconButton
            type="button"
            sx={{
              p: "10px",
              color: "primary.main",
              bgcolor: "#1A1A1A",
              borderRadius: "15px",
              mr: "10px",
            }}
            aria-label="back arrow"
            onClick={() => navigate(-1)}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
        )}
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            borderRadius: "15px",
            bgcolor: "#1A1A1A",
          }}
        >
          <IconButton
            type="button"
            sx={{
              p: "10px",
              color: "primary.main",
            }}
            aria-label="search"
            onClick={doSearch}
          >
            <SearchIcon />
          </IconButton>
          <InputBase
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            onKeyDown={handleKeyPress}
            sx={{ ml: 1, flex: 1, color: "secondary.main" }}
            placeholder="Find a podcast, eg: react"
            inputProps={{ "aria-label": "Find a podcast" }}
            autoFocus={true}
            required={true}
          />
          {searchText && (
            <IconButton
              type="button"
              sx={{ p: "10px", color: "primary.main" }}
              aria-label="search"
              onClick={cleanTextField}
            >
              <ClearIcon />
            </IconButton>
          )}
        </Paper>
      </div>
    </>
  );
}

export default SearchBar;
