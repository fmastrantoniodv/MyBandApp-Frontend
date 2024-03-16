import React, {useEffect, useState} from "react";
import exportToWavFile from '../functions/exportToWavFile'

const Context = React.createContext({})

const AudioContext = window.AudioContext || window.webkitAudioContext;

export function MasterAudioContextProvider({children, value}){
    const [masterAudioCtx, setMasterAudioCtx] = useState(new AudioContext())
    const [mainGainNode, setMainGainNode] = useState(masterAudioCtx.createGain())
    const [trackList, setTrackList] = useState([])

    useEffect(()=>{
        console.log('[MasterAudioContextProvider].[useEffect].trackList', trackList)
    },[trackList])

    const addTrackToList = ( newTrack ) => {
        setTrackList(prevState => [...prevState, newTrack])
    }

    const getTrack = ( trackId ) => {
        return trackList.find(value => value.mediaContainer.id === trackId)
    }

    const deleteTrack = ( trackId ) => {
        setTrackList(trackList.filter(value => value.mediaContainer.id !== trackId))
    } 

    const exportWavFile = () => {
        var arrayBuffersToExport = [];
        trackList.map(track => {
            console.log(track)
            arrayBuffersToExport.push(track.backend.buffer)
        })
        exportToWavFile(arrayBuffersToExport)
    }

    return  <Context.Provider value={{
                masterAudioCtx,
                mainGainNode,
                setMainGainNode,             
                exportWavFile,
                getTrack,
                addTrackToList,
                deleteTrack
            }}>{children}
            </Context.Provider>
}

export default Context