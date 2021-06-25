import {createContext} from 'react'
import useSpotify  from './useSpotify'

export const contextApp = createContext(null)

export const ContextProvider = ({ children }) => {
    const {tracks, user, categories, playList, setCategoryToken, setPlayListToken} = useSpotify()

    const context = {
        tracks,
        user,
        categories,
        playList,
        setCategoryToken,
        setPlayListToken,
    }
    
    return (
        <contextApp.Provider value={context}>
            {children}
        </contextApp.Provider>
    )
}