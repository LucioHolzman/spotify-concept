import { useContext } from "react";
import { contextApp } from "../../context";
import styles from '../../styles/SpotifyComponents.module.css'

const SpotifySearch = () => {

const { searchToken, setSearchToken } = useContext(contextApp)

    console.log(searchToken);
    return(
        <>
        <div className="">
            <input type="text" className={styles.inputSpotifySearch} placeholder="Search" onChange={(e) => setSearchToken(e.target.value)}/>
        </div>
        </>
    )
}

export default SpotifySearch