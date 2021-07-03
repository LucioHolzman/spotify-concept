import { useState, useEffect, useCallback } from "react";
import {
  fetchSpotifyAuth,
  fetchSpotifyMe,
  fetchSpotifySearch,
  fetchSpotifyCategories,
  fetchSpotifyPlayList,
  fetchSpotifyTracks,
  fetchCurrentlyPlaying,
} from "../../services/spotify.service";

import { useDebounce } from "use-debounce";

const useSpotify = () => {
  const [token, setToken] = useState("");

  const [userId, setUserId] = useState(process.env.NEXT_PUBLIC_SPOTIFY_USER_ID);

  const [categories, setCategories] = useState([]);

  const [categoryToken, setCategoryToken] = useState(2);

  const [currentlyPlaying, setCurrentlyPlaying] = useState({
    image: "",
    nameAlbum: "",
    nameSong: "",
  });


  const [playList, setPlayList] = useState([]);

  const [playListToken, setPlayListToken] = useState(1);

  const [tracks, setTracks] = useState([]);

  const [search, setSearch] = useState("");

  const [searchToken, setSearchToken] = useState("");

  const [user, setUser] = useState({
    name: "",
    profileImg: "",
    followers: null,
  });

  const [searchTokenDebounce] = useDebounce(searchToken, 1000);

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

  const spotifyCategories = useCallback(async () => {
    try {
      const categoriesRes = await fetchSpotifyCategories(token);
      const categoriesRe = categoriesRes.data.categories.items;
      setCategories(categoriesRe);
    } catch (error) {
      console.log(error);
    }
  }, [token, fetchSpotifyCategories]);

  const spotifyPlayList = useCallback(async () => {
    try {
      const playlistRes = await fetchSpotifyPlayList(
        categories[categoryToken].id,
        token
      );
      const playlistRe = playlistRes.data.playlists.items;
      setPlayList(playlistRe);
    } catch (error) {
      console.log(error);
    }
  }, [token, fetchSpotifyPlayList, categories, categoryToken]);

  const spotifyTracks = useCallback(async () => {
    try {
      const tracksRes = await fetchSpotifyTracks(
        playList[playListToken].id,
        token
      );
      const tracksRe = tracksRes.data.tracks.items;
      setTracks(tracksRe.slice(0, 10));
    } catch (error) {
      console.log(error);
    }
  }, [token, fetchSpotifyTracks, playList, playListToken]);

  const spotifySearch = useCallback(async () => {
    try {
      const searchRes = await fetchSpotifySearch(searchTokenDebounce, token);
      const searchRe = searchRes.data.tracks.items;
      setSearch(searchRe);
    } catch (error) {
      console.log(error);
    }
  }, [searchTokenDebounce, token, fetchSpotifySearch]);

  const currentPlaying = useCallback(async () => {
    try {
      const currentlyPlayingRes = await fetchCurrentlyPlaying(token);
      console.log(currentlyPlayingRes);
      setCurrentlyPlaying({
        image: currentlyPlayingRes.data.item.album.images[0].url,
        nameAlbum: currentlyPlayingRes.data.item.album.name,
        nameSong: currentlyPlayingRes.data.item.name,
      });
    } catch (error) {
      console.log(error);
    }
  }, [token, setCurrentlyPlaying, fetchCurrentlyPlaying]);

  useEffect(() => {
    auth();
  }, []);

  useEffect(() => {
    if (token) {
      spotifyCategories();
    }
  }, [token]);

  useEffect(() => {
    if (token && currentlyPlaying.length ) {
      currentPlaying();
    }
  }, [token, currentlyPlaying]);

  useEffect(() => {
    if (token && searchToken.length !== 0) {
      spotifySearch();
    }
  }, [token, searchTokenDebounce]);

  useEffect(() => {
    if (categories.length) {
      spotifyPlayList();
    }
  }, [categories, categoryToken, playListToken]);

  useEffect(() => {
    if (playList.length) {
      spotifyTracks();
    }
  }, [searchToken, playList, playListToken]);

  return {
    tracks,
    user,
    playList,
    currentlyPlaying,
    categories,
    setCategoryToken,
    categoryToken,
    setPlayListToken,
    playListToken,
    setSearchToken,
    searchToken,
    search,
  };
};
export default useSpotify;
