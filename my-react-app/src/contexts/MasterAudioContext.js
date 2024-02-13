import React, {useEffect, useState} from "react";

const Context = React.createContext({})

export function MasterAudioContextProvider({children, value}){
    const [masterAudioCtx, setMasterAudioCtx] = useState(null)
    const [counter, setCounter] = useState(1)

    useEffect(()=>{
        console.log('[MasterAudioContextProvider].[useEffect].value',value.audioCtxMaster)
        if(masterAudioCtx === null || !masterAudioCtx){
            setMasterAudioCtx(value.audioCtxMaster)
            console.log('[MasterAudioContextProvider].[useEffect].masterAudioCtx',masterAudioCtx)
        }
        setCounter(counter+1)
    },[value, masterAudioCtx, setMasterAudioCtx])

    return <Context.Provider value={{
        masterAudioCtx,
        setMasterAudioCtx,
        counter
    }}>
        {children}
    </Context.Provider>
}

export default Context