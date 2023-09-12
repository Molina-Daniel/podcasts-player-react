import { Routes, Route } from "react-router-dom";

import PodcastDetails from "./PodcastDetails";
import PodcastSearch from "./PodcastSearch";

function MainSection({ getPodcastDetails, podcasts = [] }) {
  return (
    <>
      <Routes>
        <Route path="/" element={<PodcastSearch podcasts={podcasts} />}></Route>
        <Route
          path="/podcast/:collectionId"
          element={<PodcastDetails getPodcastDetails={getPodcastDetails} />}
        />
      </Routes>
    </>
  );
}

export default MainSection;
