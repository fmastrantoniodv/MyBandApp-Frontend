import React, {useEffect, useState} from "react";
import exportToWavFile from '../functions/exportToWavFile'

const Context = React.createContext({})

const AudioContext = window.AudioContext || window.webkitAudioContext;

export function MasterAudioContextProvider({children, value}){
    const [masterAudioCtx, setMasterAudioCtx] = useState(new AudioContext())
    const [mainGainNode, setMainGainNode] = useState(masterAudioCtx.createGain())
    const [arrayBuffers, setArrayBuffers] = useState([])

    useEffect(()=>{
        console.log('[MasterAudioContextProvider].[useEffect].arrayBuffers', arrayBuffers)
    },[arrayBuffers])

    const updateArrayBuffers = ( arrayBuffer ) => {
        console.log("[MasterAudioContext].updateArrayBuffers.arrayBuffer=", arrayBuffers)
        setArrayBuffers(prevState => [...prevState, arrayBuffer])
    }

    const exportWavFile = () => {
    var url = window.URL.createObjectURL(exportToWavFile(arrayBuffers).blob)
    var anchor = document.createElement('a')
    document.body.appendChild(anchor)
    anchor.style = 'display: none'
    anchor.href = url
    anchor.download = 'audio.wav'
    anchor.click()
    window.URL.revokeObjectURL(url)
    }

    return  <Context.Provider value={{
                masterAudioCtx,
                mainGainNode,
                setMainGainNode,
                updateArrayBuffers,
                arrayBuffers,
                exportWavFile
            }}>{children}
            </Context.Provider>
}

export default Context