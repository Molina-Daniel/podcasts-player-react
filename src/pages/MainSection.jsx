import React from "react";
import { Routes, Route } from "react-router-dom";

import PodcastDetails from "./PodcastDetails";
import PodcastSearch from "./PodcastSearch";

function MainSection({ getPodcastEpisodes, playPodcastIndex, podcasts = [] }) {
  return (
    <>
      <Routes>
        <Route path="/" element={<PodcastSearch podcasts={podcasts} />}></Route>
        <Route
          path="/podcast/:collectionId"
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
