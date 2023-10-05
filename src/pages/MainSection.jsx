import { Routes, Route } from "react-router-dom";

import PodcastDetails from "./PodcastDetails";
import PodcastSearch from "./PodcastSearch";

function MainSection() {
  return (
    <>
      <Routes>
        <Route
          path="/podcasts-player-react/"
          element={<PodcastSearch />}
        ></Route>
        <Route
          path="/podcasts-player-react/podcast/:collectionId"
          element={<PodcastDetails />}
        />
      </Routes>
    </>
  );
}

export default MainSection;
