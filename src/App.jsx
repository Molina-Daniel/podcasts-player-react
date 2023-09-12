import { useState } from "react";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";

import MainSection from "./pages/MainSection";
import SearchBar from "./components/SearchBar";
import AudioPlayer from "./components/AudioPlayer/AudioPlayer";

function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [episodes, setEpisodes] = useState([]);

  const getPodcasts = async (term) => {
    const apiUrl = `https://itunes.apple.com/search?term=${term}&entity=podcast&limit=10`;
    try {
      const response = await axios.get(apiUrl);
      console.log("Poscasts data fetch: ", response);
      setPodcasts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPodcastDetails = async (collectionId) => {
    const apiUrl = `https://itunes.apple.com/lookup?id=${collectionId}&media=podcast&entity=podcastEpisode&limit=10`;
    try {
      const response = await axios.get(apiUrl);
      console.log("PodcastDetails fetch: ", response);
      const podcastEpisodes = response.data.results.slice(
        1,
        response.data.results.length
      );
      setEpisodes(podcastEpisodes);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-10/12 max-w-4xl text-center m-auto relative">
        <BrowserRouter>
          <SearchBar getPodcasts={getPodcasts} />
          <MainSection
            podcasts={podcasts}
            getPodcastDetails={getPodcastDetails}
          />
          <AudioPlayer episodes={episodes} />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
