import { useState } from "react";
import { IconButton, InputBase, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

function SearchBar({ getPodcasts }) {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleKeyPress = (event) => {
    if (event.charCode === 13) {
      event.preventDefault();
      doSearch();
    }
  };

  const doSearch = () => {
    navigate(`/`);
    getPodcasts(searchText);
  };

  const cleanTextField = () => {
    setSearchText("");
  };

  return (
    <>
      <div className="px-5 py-7 flex">
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
            onKeyPress={handleKeyPress}
            sx={{ ml: 1, flex: 1, color: "secondary.main" }}
            placeholder="Find a podcast"
            inputProps={{ "aria-label": "Find a podcast" }}
            autoFocus={true}
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
