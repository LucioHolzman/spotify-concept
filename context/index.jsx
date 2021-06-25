import {createContext} from 'react'
import useSpotify  from './useSpotify'

export const contextApp = createContext(null)

export const ContextProvider = ({ children }) => {
    const {tracks, user, categories, playList, setCategoryToken, categoryToken, setPlayListToken, playListToken, setSearch, search} = useSpotify()

    const context = {
        tracks,
        user,
        categories,
        playList,
        setCategoryToken,
        categoryToken,
        setPlayListToken,
        setSearch,
        search,
        playListToken,
    }
    
    return (
        <contextApp.Provider value={context}>
            {children}
        </contextApp.Provider>
    )
}