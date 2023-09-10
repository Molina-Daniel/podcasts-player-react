import { useState } from "react";
import { TextField } from "@mui/material";
import axios from "axios";

import PodcastPlayer from "./components/PodcastPlayer";
import MainSection from "./pages/MainSection";

function App() {
  const [searchText, setSearchText] = useState("");
  const [podcasts, setPodcasts] = useState([]);

  const getPodcasts = async (term) => {
    const apiUrl = `https://itunes.apple.com/search?term=${term}&entity=podcast&limit=10`;
    try {
      const response = await axios.get(apiUrl);
      console.log("data: ", response);
      setPodcasts(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.charCode === 13) {
      console.log("Search Submit:", searchText);
      getPodcasts(searchText);
    }
  };

  return (
    <>
      <div className="w-10/12 max-w-4xl text-center m-auto relative">
        <div className="px-5 py-7">
          <TextField
            value={searchText}
            placeholder="Find a podcast"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            onKeyPress={handleKeyPress}
            id="search-input"
            variant="outlined"
            fullWidth
          />
        </div>
        <MainSection podcasts={podcasts} />
        <PodcastPlayer />
      </div>
    </>
  );
}

export default App;
