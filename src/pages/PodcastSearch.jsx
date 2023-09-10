function PodcastSearch({ podcasts = [] }) {
  return (
    <>
      <h1>Podcast Search</h1>
      <div>
        <ul role="list" className="divide-y divide-gray-100">
          {podcasts.map((podcast) => (
            <li
              key={podcast.trackId}
              className="flex justify-between gap-x-6 py-5"
            >
              <div className="flex min-w-0 gap-x-4">
                <img
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  src={podcast.imageUrl}
                  alt=""
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {podcast.collectionName}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {podcast.artistName}
                  </p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">
                  {podcast.primaryGenreName}
                </p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Last seen{" "}
                  <time dateTime={podcast.releaseDate}>
                    {podcast.releaseDate}
                  </time>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default PodcastSearch;
