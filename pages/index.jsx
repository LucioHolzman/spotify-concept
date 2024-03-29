import { useState, useEffect, useCallback, useMemo, useContext } from "react";
import { contextApp } from "../context";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import {
  SpotifyCategoriesList,
  SpotifyCategorySelected,
} from "../components/SpotifyCategories";
import {
  SpotifyPlayLists,
  SpotifyPlayListSelected,
} from "../components/SpotifyPlayList";
import SpotifyTrack from "../components/SpotifyTrack";
import SpotifySearch from "../components/SpotifySearch";
import Spinner from "../components/Spinner";

export default function Home() {

  const { tracks } = useContext(contextApp);
  //------------Total---------------
  const total = useMemo(() => tracks.length, [tracks]);

  //------------Width---------------
  const [width, setWidth] = useState(350);

  //------------Height--------------
  const [height, setHeight] = useState(250);

  const { currentlyPlaying } = useContext(contextApp);
  const background = {
    "backgroundImage": `url(${currentlyPlaying.image?currentlyPlaying.image:''})`,
    "backgroundPosition": `center`,
    "backgroundRepeat": `no-repeat`
  }
  return (
    <div>
      <Head>
        <title>Galeria 3D</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.position} style={background}>
        <div className={styles.containerDimensions}>
          <div className={styles.containerInput}>
            <label className={styles.label} htmlFor="">
              Width
            </label>
            <input
              className={styles.numberInput}
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
            />
          </div>
          <div className={styles.containerInput}>
            <label className={styles.label} htmlFor="">
              Height
            </label>
            <input
              className={styles.numberInput}
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
            <SpotifyCategoriesList />
            <SpotifyPlayLists />
          </div>
        </div>
        {tracks.length === 0 ? (
          <Spinner />
        ) : (
          <>
            <div className={styles.categoryAndListSelected}>
              <div className={styles.categoryAndListSelectedElem}>
                <SpotifyCategorySelected />
              </div>
              <div className={styles.categoryAndListSelectedElem}>
                <SpotifySearch />
              </div>
              <div className={styles.categoryAndListSelectedElem}>
                <SpotifyPlayListSelected />
              </div>
            </div>
            <div className={styles.infoSong}>
              <div className="">
              <p>{currentlyPlaying.nameSong}</p>
              <p>{currentlyPlaying.nameAlbum}</p>
            </div>
            </div>
            
            <div className={styles.container}>
              <div className={styles.containerAllCarousel}>
                <div
                  className={styles.main}
                  style={{
                    "--total": total,
                    "--width-general": `${width}px`,
                    "--height-general": `${height}px`,
                  }}
                >
                  <SpotifyTrack />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
