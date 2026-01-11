import axios from "axios";
import { getAccessToken } from "../auth/spotifyAuth.js";
import { SongModel } from "../models/SongModel.js";

export const searchSongByName = async (songName) => {
  let token = await getAccessToken();

  try {
    const response = await axios.get("https://api.spotify.com/v1/search", {
      headers: { Authorization: `Bearer ${token}` },
      params: { q: songName, type: "track", limit: 1 },
    });

    const tracks = response.data.tracks.items;
    if (tracks.length === 0) return [];

    const songs = tracks.map((track) => {
      return new SongModel({
        id: track.id,
        name: track.artists?.[0]?.name || "Unknown Artist",
        lenght: track.duration_ms,
        title: track.name,
      });
    });

    return songs;
  } catch (error) {
    if (error.response?.status === 401) {
      console.log("🔁 Token expirado — regenerando...");
      token = await getAccessToken(true);
      return searchSongByName(songName);
    }
    console.error(error.response?.data || error.message);
    throw error;
  }
};
