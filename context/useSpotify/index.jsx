import { useState, useEffect, useCallback } from "react";
import {
  fetchSpotifyAuth,
  fetchSpotifyMe,
  fetchUserProfile,
  fetchSpotifyCategories,
  fetchSpotifyPlayList,
  fetchSpotifyTracks,
} from "../../services/spotify.service";

const useSpotify = () => {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState(process.env.NEXT_PUBLIC_SPOTIFY_USER_ID);
  const [tracks, setTracks] = useState([]);


  const [categories, setCategories] = useState([]);
  const [categoryToken, setCategoryToken] = useState(1);

  const [playList, setPlayList] = useState([]);
  const [playListToken, setPlayListToken] = useState(1);

  const [user, setUser] = useState({
    name: "",
    profileImg: "",
    followers: null,
  });

  const auth = useCallback(async () => {
    try {
      const tokenResponse = await fetchSpotifyAuth();
      setToken(tokenResponse.data.access_token);
    } catch (error) {
      console.log(error.response);
    }
  }, [fetchSpotifyAuth]);

  const spotifyMe = useCallback(async () => {
    try {
      const meRes = await fetchSpotifyMe(userId, token);
      const name = meRes.data.display_name;
      const profileImg = meRes.data.images;
      const followers = meRes.data.followers.total;
      setUser({ name, profileImg, followers });
    } catch (error) {
      console.log(error);
    }
  }, [token, fetchSpotifyMe]);

  const UserProfile = useCallback(async () => {
    try {
      const userRes = await fetchUserProfile(userId, token);
      console.log(userRes);
    } catch (error) {
      console.log(error);
    }
  }, [token, userId, fetchUserProfile]);

  const spotifyCategories = useCallback(async () => {
    try {
      const categoriesRes = await fetchSpotifyCategories(token);
      const categoriesRe = (categoriesRes.data.categories.items);
      setCategories(categoriesRe);
    } catch (error) {
      console.log(error);
    }
  }, [token, fetchSpotifyCategories]);



  const spotifyPlayList = useCallback(async () => {
    try {
      const playlistRes = await fetchSpotifyPlayList(categories[categoryToken].id, token);
      console.log(playlistRes);
      const playlistRe = playlistRes.data.playlists.items
      setPlayList(playlistRe);
    } catch (error) {
      console.log(error);
    }
  }, [token, fetchSpotifyPlayList, categories, categoryToken]);



  const spotifyTracks = useCallback(async () => {
    try {
      const tracksRes = await fetchSpotifyTracks(playList[playListToken].id, token);
      console.log(tracksRes);
      const tracksRe = tracksRes.data.tracks.items;
      setTracks(tracksRe.slice(0,10));
    } catch (error) {
      console.log(error);
    }
  }, [token, fetchSpotifyTracks, playList, playListToken]);

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
  }, [categories, categoryToken]);

  useEffect(() => {
    if (playList.length) {
      spotifyTracks();
    }
  }, [playList, playListToken]);

  return {tracks, user, playList, categories, setCategoryToken, setPlayListToken};
};
export default useSpotify;
