import { useState } from "react";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { Typography } from "@mui/material";

import MainSection from "./pages/MainSection";
import SearchBar from "./components/SearchBar";
import AudioPlayer from "./components/AudioPlayer/AudioPlayer";
import { useStore } from "./store/store";

function App() {
  const [episodes, setEpisodes] = useState([]);
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [newEpisodes, setNewEpisodes] = useState([]);

  const podcasts = useStore((state) => state.podcasts);

  const getPodcastEpisodes = async (collectionId) => {
    const apiUrl = `https://itunes.apple.com/lookup?id=${collectionId}&media=podcast&entity=podcastEpisode&limit=10`;
    const proxy = `https://proxy.cors.sh/`;
    try {
      const response = await axios.get(proxy + apiUrl, {
        headers: {
          "x-cors-api-key": "temp_aceba4c3f059202e9c54df3355580672",
        },
      });
      const podcastEpisodes = response.data.results.slice(
        1,
        response.data.results.length
      );
      episodes.length > 0
        ? setNewEpisodes(podcastEpisodes)
        : setEpisodes(podcastEpisodes);
      return response.data;
    } catch (error) {
      console.log("Error fetching podcast episodes: ", error);
    }
  };

  const playPodcastIndex = (index) => {
    if (newEpisodes.length > 0) {
      setEpisodes(newEpisodes);
    }
    setIndex(index);
    if (!isPlaying) {
      togglePlayPause();
    }
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <>
      <div className="w-10/12 max-w-4xl text-center m-auto relative">
        <BrowserRouter>
          <SearchBar />
          <MainSection
            getPodcastEpisodes={getPodcastEpisodes}
            playPodcastIndex={playPodcastIndex}
          />
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

          <AudioPlayer {...{ episodes, index, isPlaying, togglePlayPause }} />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
