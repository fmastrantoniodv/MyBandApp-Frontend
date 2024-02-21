import React, {useEffect, useState} from "react";

const Context = React.createContext({})

const AudioContext = window.AudioContext || window.webkitAudioContext;

export function MasterAudioContextProvider({children, value}){
    const [masterAudioCtx, setMasterAudioCtx] = useState(new AudioContext())
    const [counterChannels, setCounterChannels] = useState(1)
    const [mainGainNode, setMainGainNode] = useState(null)
    const [merger, setMerger] = useState(null)
    
    useEffect(()=>{
        console.log('[MasterAudioContextProvider].[useEffect].masterAudioCtx', masterAudioCtx)
        initAudioContexts()
        console.log('[MasterAudioContextProvider].[useEffect].counterChannels', counterChannels)
        setCounterChannels(counterChannels+1)
    },[masterAudioCtx])

    const initAudioContexts = () =>{
        var mainGainNode = masterAudioCtx.createGain()
        mainGainNode.connect(masterAudioCtx.destination)
        const mergerInit = masterAudioCtx.createChannelMerger(8);
        mergerInit.connect(mainGainNode);
        setMainGainNode(mainGainNode)
        setMerger(mergerInit)
    }

    const updateAudioCtx = (newAudioCtx) => {
        console.log('[MasterAudioContextProvider].updateAudioCtx().newAudioCtx=', newAudioCtx)
        setMasterAudioCtx(newAudioCtx)
    }

    const updateAudioCtxMerger = (merger) => {
        setMerger(merger)
    }

    return  <Context.Provider value={{
                masterAudioCtx,
                updateAudioCtx,
                counterChannels,
                mainGainNode,
                setMainGainNode,
                updateAudioCtxMerger,
                merger
            }}>{children}
            </Context.Provider>
}

export default Context