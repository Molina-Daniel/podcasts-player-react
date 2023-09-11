import { useState } from "react";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";

import PodcastPlayer from "./components/PodcastPlayer";
import MainSection from "./pages/MainSection";
import SearchBar from "./components/SearchBar";

function App() {
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

  return (
    <>
      <div className="w-10/12 max-w-4xl text-center m-auto relative">
        <BrowserRouter>
          <SearchBar getPodcasts={getPodcasts} />
          <MainSection podcasts={podcasts} />
          <PodcastPlayer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
