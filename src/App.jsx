import React from "react";
import { useState } from "react";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";

import MainSection from "./pages/MainSection";
import SearchBar from "./components/SearchBar";
import AudioPlayer from "./components/AudioPlayer/AudioPlayer";

function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [newEpisodes, setNewEpisodes] = useState([]);

  const getPodcasts = async (term) => {
    const apiUrl = `https://itunes.apple.com/search?term=${term}&entity=podcast&limit=10`;
    try {
      const response = await axios.get(apiUrl);
      setPodcasts(response.data);
    } catch (error) {
      console.log("Error fetching podcasts: ", error);
    }
  };

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
          <SearchBar getPodcasts={getPodcasts} />
          <MainSection
            podcasts={podcasts}
            getPodcastEpisodes={getPodcastEpisodes}
            playPodcastIndex={playPodcastIndex}
          />
          <AudioPlayer {...{ episodes, index, isPlaying, togglePlayPause }} />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
