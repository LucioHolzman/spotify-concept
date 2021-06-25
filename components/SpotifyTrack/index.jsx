import { useContext } from "react";
import { contextApp } from "../../context";
import styles from '../../styles/Home.module.css'

const SpotifyTrack = () => {

const { tracks } = useContext(contextApp)
  console.log(tracks.length);
    return(
        <>
        { tracks.length !== 0 ?
        tracks.map((elem, index) => (
          <span key={elem.track.id} style={{"--i": index}} className={styles.card}>
          <iframe
                src={`https://open.spotify.com/embed/track/${elem.track.id}`}
                width="100%"
                height="100%"
                frameBorder="0"
                allowtransparency="true"
                allow="encrypted-media"
                ></iframe>
                </span>
        )): <p>Loading..</p>
      }
        </>
    )
}

export default SpotifyTrack