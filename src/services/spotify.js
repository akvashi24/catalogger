import axios from "axios";
import { checkRefresh, logErrors } from "./api";

const spotifyURL = "https://api.spotify.com/v1/";

const spotify = axios.create({
  baseURL: spotifyURL,
});

spotify.defaults.headers.common["Content-Type"] = "application/json";

const getConfig = () => {
  checkRefresh();
  const accessToken = window.localStorage.getItem("accessToken");
  const config = { headers: { Authorization: `Bearer ${accessToken}` } };
  return config;
};

export const getCurrentlyPlaying = async (code) => {
  const config = getConfig();
  const path = spotifyURL + "me/player/currently-playing";
  const result = await spotify.get(path, config).catch((error) => {
    // TODO: (akv) this doesn't work if the endpoint doesn't exist
    logErrors(error);
    return false;
  });
  return result;
};

export const skipToNext = async () => {
  const config = getConfig();
  const path = spotifyURL + "me/player/next";
  const result = await spotify.post(path, {}, config).catch((error) => {
    // TODO: (akv) this doesn't work if the endpoint doesn't exist
    logErrors(error);
    return false;
  });
  return result;
};

export const getAllPlaylists = async (userId, limit) => {
  const config = getConfig();
  const path = spotifyURL + `users/${userId}/playlists?limit=${limit}`;
  const result = await spotify.get(path, config).catch((error) => {
    // TODO: (akv) this doesn't work if the endpoint doesn't exist
    logErrors(error);
    return false;
  });
  return result;
};

export const addSongToPlaylist = async (songIds, playlistId) => {
  const config = getConfig();
  const path = spotifyURL + `playlists/${playlistId}/tracks`;
  const result = await spotify.post(path, songIds, config).catch((error) => {
    // TODO: (akv) this doesn't work if the endpoint doesn't exist
    logErrors(error);
    return false;
  });
  return result;
};

export const deleteSongFromPlaylist = async (
  songIds,
  playlistId,
  snapshotId
) => {
  const config = getConfig();
  const path = spotifyURL + `playlists/${playlistId}/tracks`;
  config.data = { tracks: songIds, snapshot_id: snapshotId };
  const result = await spotify.delete(path, config).catch((error) => {
    // TODO: (akv) this doesn't work if the endpoint doesn't exist
    logErrors(error);
    return false;
  });
  return result;
};

export const getUserDetails = async () => {
  const config = getConfig();
  const path = spotifyURL + "me";
  const result = await spotify.get(path, config).catch((error) => {
    // TODO: (akv) this doesn't work if the endpoint doesn't exist
    logErrors(error);
    return false;
  });
  return result?.data;
};

export const playHeat = async () => {
  const config = getConfig();
  const path = spotifyURL + "me/player/play";
  const payload = {
    context_uri:
      "spotify:user:7832d6291d614118:playlist:4TvnzPNK0JQ1mOQyeLQgAG?si=8b02185844d04386",
  };
  const result = spotify.put(path, payload, config).catch((error) => {
    // TODO: (akv) this doesn't work if the endpoint doesn't exist
    logErrors(error);
    return false;
  });
  return result;
};
