import axios from "axios";

export const fetchSpotifyAuth = () => {
  try {
    return axios("https://accounts.spotify.com/api/token", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          btoa(
            process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID +
              ":" +
              process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET
          ),
      },
      data: "grant_type=client_credentials",
      method: "POST",
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchSpotifyMe = (userId, token) => {
  try {
    return axios(`https://api.spotify.com/v1/users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchSpotifyCategories = (token) => {
  try {
    return axios(
      `https://api.spotify.com/v1/browse/categories`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const fetchSpotifyPlayList = (categoryId, token) => {
  try {
    return axios(
      `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists?limit=10`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const fetchSpotifyTracks = (tracksId, token) => {
  try {
    return axios(
      `https://api.spotify.com/v1/playlists/${tracksId}?limit=10`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const fetchSpotifySearch = (search, token) => {
  try {
    return axios(
      `https://api.spotify.com/v1/search?q=${search}&type=track`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const fetchCurrentlyPlaying = (token) => {
  try {
    return axios(
      `https://api.spotify.com/v1/me/player/currently-playing?market=ES`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );
  } catch (error) {
    console.log(error);
  }
};
