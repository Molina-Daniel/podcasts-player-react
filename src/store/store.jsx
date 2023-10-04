import { create } from "zustand";
import axios from "axios";

export const useStore = create((set) => ({
  podcasts: [],
  getPodcasts: async (term) => {
    const apiUrl = `https://itunes.apple.com/search?term=${term}&entity=podcast&limit=10`;
    try {
      const response = await axios.get(apiUrl);
      set((state) => (state.podcasts = response.data));
    } catch (error) {
      console.log("Error fetching podcasts: ", error);
    }
  },
}));
