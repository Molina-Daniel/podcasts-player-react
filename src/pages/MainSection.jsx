import { Routes, Route } from "react-router-dom";

import PodcastDetails from "./PodcastDetails";
import PodcastSearch from "./PodcastSearch";

function MainSection({ podcasts = [] }) {
  return (
    <>
      <Routes>
        <Route path="/" element={<PodcastSearch podcasts={podcasts} />}></Route>
        <Route path="/podcast/:collectionId" element={<PodcastDetails />} />
      </Routes>
    </>
  );
}

export default MainSection;
