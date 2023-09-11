import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function PodcastDetails() {
  const { collectionId } = useParams();
  const [podcastData, setPodcastData] = useState();

  const getPodcastData = async (collectionId) => {
    const apiUrl = `https://itunes.apple.com/lookup?id=${collectionId}&media=podcast&entity=podcastEpisode&limit=10`;
    const response = await axios.get(apiUrl);
    console.log("PodcastDetails fetch: ", response);
    return response.data;
  };

  useEffect(() => {
    console.log(`/podcast/${collectionId}`);
    const fetchPodcastData = async () => {
      getPodcastData(collectionId).then((data) => setPodcastData(data.results));
    };
    fetchPodcastData();
  }, [collectionId]);

  let podcastInfo, episodesList;

  if (podcastData) {
    console.log("podcastData: ", podcastData);
    podcastInfo = podcastData[0];
    episodesList = podcastData.slice(1, podcastData.length);
    console.log("podcastInfo: ", podcastInfo);
    console.log("podcastList: ", episodesList);
  }

  return (
    <>
      <h1>Podcast Details</h1>
      {podcastData ? (
        <div className="bg-slate-700">
          <img
            src={podcastInfo.artworkUrl600}
            className="w-2/6 mx-auto rounded-2xl"
            alt={podcastInfo.artworkUrl600}
          />
          <h1 className="text-center text-white text-5xl pt-5 font-semibold">
            {podcastInfo.collectionName}
          </h1>
          <ul role="list" className="divide-y divide-gray-100">
            {episodesList.map((episode) => (
              <li
                key={episode.trackId}
                className="flex justify-between gap-x-6 py-5"
              >
                <div className="flex min-w-0 gap-x-4">
                  <img
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                    src={episode.artworkUrl160}
                    alt=""
                  />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {episode.trackName}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {podcastInfo.artistName}
                    </p>
                  </div>
                </div>
                <div className="hidden shrink sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    {episode.shortDescription}
                  </p>
                </div>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Last seen{" "}
                  <time dateTime={episode.releaseDate}>
                    {episode.releaseDate}
                  </time>
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <h1>No Data</h1>
      )}
    </>
  );
}

export default PodcastDetails;
