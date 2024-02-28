import React, {useEffect, useState} from "react";

const Context = React.createContext({})

const AudioContext = window.AudioContext || window.webkitAudioContext;

export function MasterAudioContextProvider({children, value}){
    const [masterAudioCtx, setMasterAudioCtx] = useState(new AudioContext())
    const [counterChannels, setCounterChannels] = useState(1)
    const [mainGainNode, setMainGainNode] = useState(null)
    const [merger, setMerger] = useState(null)
    const [sampleComponentList, setSampleComponentList] = useState([])
    
    useEffect(()=>{
        console.log('[MasterAudioContextProvider].[useEffect].masterAudioCtx', masterAudioCtx)
        initAudioContexts()
        console.log('[MasterAudioContextProvider].[useEffect].counterChannels', counterChannels)
        console.log('[MasterAudioContextProvider].[useEffect].sampleComponentList',sampleComponentList)
    },[sampleComponentList])

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

    const addSampleComponentToList = ( sampleComponent ) => {
        console.log("[MasterAudioContext].addSampleComponentToList.samepleComponent=", sampleComponent)
        setSampleComponentList(prevState => [...prevState, sampleComponent])
    }

    const deleteSampleComponentFromList = (id) => {
        var index = sampleComponentList.findIndex(value => value.id === id)
        setSampleComponentList([
            ...sampleComponentList.slice(0, index),
            ...sampleComponentList.slice(index+1),
        ])
    }
    
    function exportWAV(type, before, after){
        var rate = 22050;
        if (!before) { before = 0; }
        if (!after) { after = 0; }

        var channel = 0,
            buffers = [];
        for (channel = 0; channel < numChannels; channel++){
            buffers.push(mergeBuffers(recBuffers[channel], recLength));
        }

        var i = 0,
            offset = 0,
            newbuffers = [];

        for (channel = 0; channel < numChannels; channel += 1) {
            offset = 0;
            newbuffers[channel] = new Float32Array(before + recLength + after);
            if (before > 0) {
                for (i = 0; i < before; i += 1) {
                    newbuffers[channel].set([0], offset);
                    offset += 1;
                }
            }
            newbuffers[channel].set(buffers[channel], offset);
            offset += buffers[channel].length;
            if (after > 0) {
                for (i = 0; i < after; i += 1) {
                    newbuffers[channel].set([0], offset);
                    offset += 1;
                }
            }
        }

        if (numChannels === 2){
            var interleaved = interleave(newbuffers[0], newbuffers[1]);
        } else {
            var interleaved = newbuffers[0];
        }

        var downsampledBuffer = downsampleBuffer(interleaved, rate);
        var dataview = encodeWAV(downsampledBuffer, rate);
        var audioBlob = new Blob([dataview], { type: type });

        this.postMessage(audioBlob);
    }

    return  <Context.Provider value={{
                masterAudioCtx,
                updateAudioCtx,
                counterChannels,
                mainGainNode,
                setMainGainNode,
                updateAudioCtxMerger,
                merger,
                addSampleComponentToList,
                deleteSampleComponentFromList
            }}>{children}
            </Context.Provider>
}

export default Context