import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";

export const useStore = create(
  persist(
    (set, get) => ({
      podcasts: [],
      episodes: [],
      newEpisodes: [],
      index: 0,
      isPlaying: false,
      isNewPodcast: true,
      isPlayingCurrentPodcast: false,
      currentCollectionId: "",
      newCollectionId: "",
      getPodcasts: async (term) => {
        const apiUrl = `https://itunes.apple.com/search?term=${term}&entity=podcast&limit=10`;
        try {
          const response = await axios.get(apiUrl);
          set((state) => ({ ...state, podcasts: response.data }));
        } catch (error) {
          console.log("Error fetching podcasts: ", error);
        }
      },
      getPodcastEpisodes: async (collectionId) => {
        const apiUrl = `https://itunes.apple.com/lookup?id=${collectionId}&media=podcast&entity=podcastEpisode&limit=10`;
        const proxy = `https://proxy.cors.sh/`;
        try {
          const response = await axios.get(proxy + apiUrl, {
            headers: {
              "x-cors-api-key": "temp_aceba4c3f059202e9c54df3355580672",
            },
          });
          const podcastEpisodes = response.data.results.slice(
            1,
            response.data.results.length
          );
          const { episodes, currentCollectionId } = get();

          if (episodes.length <= 0) {
            set((state) => ({
              ...state,
              episodes: podcastEpisodes,
              currentCollectionId: collectionId,
              isNewPodcast: false,
            }));
          }

          if (episodes.length > 0 && collectionId !== currentCollectionId) {
            set((state) => ({
              ...state,
              newEpisodes: podcastEpisodes,
              newCollectionId: collectionId,
              isNewPodcast: true,
            }));
          }

          if (episodes.length > 0 && collectionId === currentCollectionId) {
            set((state) => ({
              ...state,
              isNewPodcast: false,
              newEpisodes: [],
            }));
          }

          return response.data;
        } catch (error) {
          console.log("Error fetching podcast episodes: ", error);
        }
      },
      playPodcastIndex: (index) => {
        const { newEpisodes, isPlaying, togglePlayPause, newCollectionId } =
          get();

        set((state) => ({ ...state, index }));

        if (newEpisodes.length > 0) {
          set((state) => ({ ...state, episodes: newEpisodes }));
          set((state) => ({ ...state, newEpisodes: [] }));
          set((state) => ({ ...state, isNewPodcast: false }));
          set((state) => ({ ...state, currentCollectionId: newCollectionId }));
        }

        if (!isPlaying) {
          togglePlayPause();
        }
      },
      togglePlayPause: () => {
        const { checkPodcastPlayButton } = get();

        set((state) => ({ ...state, isPlaying: !state.isPlaying }));
        checkPodcastPlayButton();
      },
      checkPodcastPlayButton: () => {
        const { isNewPodcast, isPlaying } = get();

        isNewPodcast
          ? set((state) => ({ ...state, isPlayingCurrentPodcast: false }))
          : set((state) => ({ ...state, isPlayingCurrentPodcast: isPlaying }));
      },
    }),
    {
      name: "podcasts-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
