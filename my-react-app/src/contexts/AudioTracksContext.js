import React, { useState } from "react";

const AudioTracksContext = React.createContext({})

export function AudioTracksCtxProvider ({children}){   
    const [tracks, setTracks] = useState([])

    return <AudioTracksContext.Provider value={{tracks, setTracks}}>
        {children}
    </AudioTracksContext.Provider>
}

export default AudioTracksContext