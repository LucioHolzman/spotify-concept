import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  fetchSpotifyAuth,
  fetchSpotifyMe,
  fetchSpotifyCategories,
  fetchSpotifyPlayList,
  fetchSpotifyTracks,
} from "../../services/spotify.service";

const useSpotify = () => {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState(process.env.NEXT_PUBLIC_SPOTIFY_USER_ID);
  const [tracks, setTracks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [playList, setPlayList] = useState([]);
  const [user, setUser] = useState({
    name: "",
    profileImg: "",
    followers: null,
  });

  const auth = useCallback(async () => {
    try {
      const tokenResponse = await fetchSpotifyAuth();
      console.log(tokenResponse);
      setToken(tokenResponse.data.access_token);
    } catch (error) {
      console.log(error.response);
    }
  }, [fetchSpotifyAuth]);

  const spotifyMe = useCallback(async () => {
    try {
      const meRes = await fetchSpotifyMe(userId, token);
      console.log(meRes);
      const name = meRes.data.display_name;
      const profileImg = meRes.data.images;
      const followers = meRes.data.followers.total;
      setUser({ name, profileImg, followers });
    } catch (error) {
      console.log(error);
    }
  }, [fetchSpotifyMe]);

  const spotifyCategories = useCallback(async () => {
    try {
      const categoriesRes = await fetchSpotifyCategories(token);
      console.log(categoriesRes.data.categories.items);
      setCategories(categoriesRes.data.categories.items);
    } catch (error) {
      console.log(error);
    }
  }, [token, fetchSpotifyCategories]);

  const spotifyPlayList = useCallback(async () => {
    try {
      const playlistRes = await fetchSpotifyPlayList(categories[17].id, token);
      console.log(playlistRes.data.playlists.items);
      setPlayList(playlistRes.data.playlists.items);
    } catch (error) {
      console.log(error);
    }
  }, [token, fetchSpotifyPlayList, categories]);

  const spotifyTracks = useCallback(async () => {
    try {
      const tracksRes = await fetchSpotifyTracks(playList[1].id, token);
      const tracksRe = tracksRes.data.tracks.items;
      setTracks(tracksRe);
    } catch (error) {
      console.log(error);
    }
  }, [token, fetchSpotifyTracks, playList]);

  useEffect(() => {
    auth();
  }, []);

  useEffect(() => {
    if (token) {
      spotifyCategories();
    }
  }, [token]);

  useEffect(() => {
    if (categories.length) {
      spotifyPlayList();
    }
  }, [categories]);

  useEffect(() => {
    if (playList.length) {
      spotifyTracks();
    }
  }, [playList]);

  return tracks, user, categories;
};
export default useSpotify;
