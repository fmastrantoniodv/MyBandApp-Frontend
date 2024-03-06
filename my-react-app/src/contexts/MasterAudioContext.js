import React, {useEffect, useState} from "react";
import exportToWavFile from '../functions/exportToWavFile'

const Context = React.createContext({})

const AudioContext = window.AudioContext || window.webkitAudioContext;

export function MasterAudioContextProvider({children, value}){
    const [masterAudioCtx, setMasterAudioCtx] = useState(new AudioContext())
    const [mainGainNode, setMainGainNode] = useState(masterAudioCtx.createGain())
    const [arrayBuffers, setArrayBuffers] = useState([])
    const [trackList, setTrackList] = useState([])

    useEffect(()=>{
        console.log('[MasterAudioContextProvider].[useEffect].arrayBuffers', arrayBuffers)
        console.log('[MasterAudioContextProvider].[useEffect].trackList', trackList)
    },[arrayBuffers, trackList])

    const addArrayBuffers = ( arrayBuffer, soundID ) => {
        console.log("[MasterAudioContext].updateArrayBuffers.arrayBuffer=", arrayBuffers)
        setArrayBuffers(prevState => [...prevState, {id: soundID, arrayBuffer}])
    }

    const removeArrayBuffers = ( soundID ) => {
        console.log("[MasterAudioContext].updateArrayBuffers.arrayBuffer=", arrayBuffers)
        setArrayBuffers(arrayBuffers.filter(value => value.id !== soundID))
    }

    const updateArrayBuffer = ( soundID, arrayBuffer ) => {
        console.log("[MasterAudioContext].updateArrayBuffer.arrayBuffer=", arrayBuffer)
        console.log("[MasterAudioContext].updateArrayBuffer.soundID=", soundID)
    }

    const addTrackToList = ( newTrack ) => {
        setTrackList(prevState => [...prevState, newTrack])
    }

    const exportWavFile = () => {
        var arrayBuffersToExport = [];
        arrayBuffers.map(value => arrayBuffersToExport.push(value.arrayBuffer))
        var url = window.URL.createObjectURL(exportToWavFile(arrayBuffersToExport).blob)
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
                addArrayBuffers,
                arrayBuffers,
                exportWavFile,
                removeArrayBuffers,
                updateArrayBuffer,
                trackList,
                addTrackToList 
            }}>{children}
            </Context.Provider>
}

export default Context