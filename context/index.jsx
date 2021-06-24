import {createContext} from 'react'
import useSpotify  from './useSpotify'

export const contextApp = createContext(null)

export const ContextProvider = ({ children }) => {
    const {tracks, user, categories} = useSpotify()

    const context = {
        tracks,
        user,
        categories
    }
    
    return (
        <contextApp.Provider value={context}>
            {children}
        </contextApp.Provider>
    )
}