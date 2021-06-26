import { useContext, useEffect } from "react";
import { contextApp } from "../../context";

import styles from "../../styles/SpotifyComponents.module.css"

export const SpotifyPlayLists = () => {
  const { playList, setPlayListToken } = useContext(contextApp);

  return (
    <>
      <ul className={styles.ulSpotifyPlayList}>
        {playList.length !== 0 ? (
          playList.map((elem, index) => (
            <li className={styles.liSpotifyPlayList} key={elem.id}>
              <a className={styles.aSpotifyPlayList} href="#" onClick={() => setPlayListToken(index)}>
                <img className={styles.imgSpotifyPlayList} src={elem.images[0].url} alt="" />
                <p>{elem.name.charAt(0).toUpperCase() + elem.name.slice(1)}</p>
              </a>
            </li>
          ))
        ) : (
          <p>Loading..</p>
        )}
      </ul>
    </>
  );
};

export const SpotifyPlayListSelected = () => {
  const { playList, playListToken } = useContext(contextApp);
  return (
    <>
    
      <ul className={styles.ulSpotifyPlayList}>
            <li className={styles.liSpotifyPlayList} key={playList[playListToken].id}>
              <a  href="#" className={styles.contentSpotifyPlayListSelected} >
                  <h4>Playlist</h4>
                  <img className={styles.imgSpotifyPlayListSelected} src={playList[playListToken].images[0].url} alt="" />
                  <p>{playList[playListToken].name.charAt(0).toUpperCase() + playList[playListToken].name.slice(1)}</p>
              </a>
            </li>
      </ul>
    </>
  );
};
