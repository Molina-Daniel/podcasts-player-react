import PodcastDetails from "./PodcastDetails";
import PodcastSearch from "./PodcastSearch";

function MainSection({ podcasts = [] }) {
  return (
    <>
      <PodcastSearch podcasts={podcasts} />
      <PodcastDetails />
    </>
  );
}

export default MainSection;
