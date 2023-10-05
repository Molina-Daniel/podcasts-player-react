import { BrowserRouter } from "react-router-dom";
import { Typography } from "@mui/material";

import MainSection from "./pages/MainSection";
import SearchBar from "./components/SearchBar";
import AudioPlayer from "./components/AudioPlayer/AudioPlayer";
import { useStore } from "./store/store";

function App() {
  const { podcasts } = useStore();

  return (
    <>
      <div className="w-10/12 max-w-4xl text-center m-auto relative">
        <BrowserRouter>
          <SearchBar />
          <MainSection />
          {podcasts.length <= 0 && (
            <div>
              <Typography
                component="h1"
                variant="h5"
                sx={{
                  color: "primary.main",
                  fontWeight: "bold",
                  m: "1rem",
                }}
              >
                Search for a podcast ⬆️
              </Typography>
              <Typography
                component="h1"
                variant="h4"
                sx={{
                  color: "primary.main",
                  fontWeight: "bold",
                  m: "1rem",
                  mt: "5rem",
                }}
              >
                Discover and listen to your favorite podcasts, all in one place.
              </Typography>
            </div>
          )}

          <AudioPlayer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
