import {createContext} from 'react'
import useSpotify  from './useSpotify'

export const contextApp = createContext(null)

export const ContextProvider = ({ children }) => {
    const {tracks, user, categories, playList, currentlyPlaying, setCategoryToken, categoryToken, setPlayListToken, playListToken, setSearchToken, searchToken, search} = useSpotify()

    const context = {
        tracks,
        user,
        categories,
        playList,
        currentlyPlaying,
        setCategoryToken,
        categoryToken,
        setPlayListToken,
        setSearchToken,
        searchToken,
        playListToken,
        search,
    }
    
    return (
        <contextApp.Provider value={context}>
            {children}
        </contextApp.Provider>
    )
}