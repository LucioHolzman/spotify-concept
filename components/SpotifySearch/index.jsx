import { useContext } from "react";
import { contextApp } from "../../context";
import styles from '../../styles/SpotifyComponents.module.css'


const SpotifySearch = () => {

const { setSearch } = useContext(contextApp)
    return(
        <>
        <div className="">
            <input type="text" placeholder="Search" onChange={(e) => setSearch(e.target.value)}/>
        </div>
        </>
    )
}

export default SpotifySearch