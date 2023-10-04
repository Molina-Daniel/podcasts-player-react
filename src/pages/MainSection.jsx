import { Routes, Route } from "react-router-dom";

import PodcastDetails from "./PodcastDetails";
import PodcastSearch from "./PodcastSearch";

function MainSection({ getPodcastEpisodes, playPodcastIndex }) {
  return (
    <>
      <Routes>
        <Route
          path="/podcasts-player-react/"
          element={<PodcastSearch />}
        ></Route>
        <Route
          path="/podcasts-player-react/podcast/:collectionId"
          element={
            <PodcastDetails
              getPodcastEpisodes={getPodcastEpisodes}
              playPodcastIndex={playPodcastIndex}
            />
          }
        />
      </Routes>
    </>
  );
}

export default MainSection;
