import { useState } from "react";
import { TextField } from "@mui/material";
import PodcastPlayer from "./components/PodcastPlayer";
import MainSection from "./pages/MainSection";

function App() {
  const [searchText, setSearchText] = useState("");

  const handleKeyPress = (event) => {
    if (event.charCode === 13) {
      console.log("Search Submit:", searchText);
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
        <MainSection />
        <PodcastPlayer />
      </div>
    </>
  );
}

export default App;
