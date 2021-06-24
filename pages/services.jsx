import Navigation from "../components/Navigation";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
const Services = () => {
  const [token, setToken] = useState("");

  const [userId, setUserId] = useState(process.env.NEXT_PUBLIC_SPOTIFY_USER_ID);
  const [tracks, setTracks] = useState([]);

  const [user, setUser] = useState({
    name: '',
    profileImg: '',
    followers: null
  })

  const fetchSpotifyAuth = useCallback(async () => {
    try {
      const tokenResponse = await axios(
        "https://accounts.spotify.com/api/token",
        {
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
        }
      );
      console.log(tokenResponse);
      const tokn = tokenResponse.data.access_token;
      setToken(tokn);
      fetchSpotifyMe(tokn);
      fetchSpotifyCategories(tokn);
    } catch (error) {
      console.log(error.response);
    }
  }, []);

  const fetchSpotifyMe = useCallback(async( token) => {
    try {
      const meRes = await axios(`https://api.spotify.com/v1/users/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization' : 'Bearer ' + token
        }
      })
      const name = meRes.data.display_name
      const profileImg = meRes.data.images
      const followers = meRes.data.followers.total
      setUser({name, profileImg, followers})
    } catch (error) {
      console.log(error.response)
    }
  }, [userId, setUser, user])

  const fetchSpotifyCategories = useCallback(async (token) => {
    try {
      const categoriesRes = await axios(
        `https://api.spotify.com/v1/browse/categories`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(categoriesRes);
      const categories = categoriesRes.data.categories.items[1].id;
      fetchSpotifyPlayList(categories, token);
    } catch (error) {
      console.log(error.response);
    }
  }, []);

  const fetchSpotifyPlayList = useCallback(async (categoryId, token) => {
    try {
      const playlistRes = await axios(
        `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists?limit=10`,
        {
          method: "GET",
          headers: { Authorization: "Bearer " + token },
        }
      );
      console.log(playlistRes);
      const playList = playlistRes.data.playlists.items[10].id;
      fetchSpotifyTracks(playList, token);
    } catch (error) {
      console.log(error.response);
    }
  }, []);

  const fetchSpotifyTracks = useCallback(async (tracksId, token) => {
    try {
      const tracksRes = await axios(
        `https://api.spotify.com/v1/playlists/${tracksId}?limit=10`,
        {
          method: "GET",
          headers: { Authorization: "Bearer " + token },
        }
      );
      console.log(tracksRes);
      const tracksRe = tracksRes.data.tracks.items;
      setTracks(tracksRe);
    } catch (error) {
      console.log(error.response);
    }
  }, [tracks]);

  useEffect(() => {
    fetchSpotifyAuth();
  }, []);
  return (
    <>
      <h1>Services</h1>
      <Navigation />
      <div className="container">

      {
      tracks.map(elem => (
            <iframe
              key={elem.track.id}
              src={`https://open.spotify.com/embed/track/${elem.track.id}`}
              width="100%"
              height="80"
              frameBorder="0"
              allowtransparency="true"
              allow="encrypted-media"
            ></iframe>
            ))
      }   
      </div>
      <div className="container-user">
        
      {
        Object.keys(user).map(elem => {
        !user[elem] ? <p>No hay usuario</p>
      :<div className="content">
      <p>{user[elem].name}</p>
      <img src={user[elem].profileImg} alt=""/>
      <p>{user[elem].followers}</p>
      <p>No existe un usuario</p>
      </div>
      })
    }
      
      </div>
    </>

  );
};

export default Services;
