import React, { useEffect, useState } from "react";
import AudioTrack from "./AudioTrack";
import useSettings from "../hooks/useSettings";

export default function ListOfChannels ({ sampleList }) {
    const [channelsStates, setChannelsStates] = useState([])
    const [loading, setLoading] = useState(true)
    const { settings, saveSettings } = useSettings();
    console.log(settings.soundsList)
    const [sampleListState, setSampleListState] = useState(sampleList)
    
    useEffect(() => {
        const channelsArray = channelsStates
        sampleListState.map(sample => {
            const newRowToContext = { id: sample.name, states: sample.soundStates }
            if(channelsArray.find(value => value.id === newRowToContext.id) === undefined)
            channelsArray.push(newRowToContext)
        })
        setChannelsStates(channelsArray)
        setLoading(false)        
    }, [sampleListState, settings]);

    const handleChannelStatesOnMute = (sampleObj) => {
        if(sampleObj.soundStates.muted === false){    
          sampleObj.waveform.setMute(true) 
          sampleObj.soundStates.muted = true
        }else{
          sampleObj.waveform.setMute(false)
          sampleObj.soundStates.muted = false
        }
        changeChannelStates()
        console.log('Mute '+sampleObj.name+' = '+sampleObj.soundStates.muted)
    }

    const handleChannelStatesOnSolo = (sampleParam) => {
      if(sampleParam.soundStates.solo === true){
        restartStates()
      }else{
        let resp = sampleListState.findIndex(value => value.name === sampleParam.name)
        sampleListState[resp].soundStates = {solo: true, muted: false, rec: false}
        sampleListState[resp].waveform.setMute(false)
        sampleListState.map(samplesOfList => {
          if(samplesOfList.name !== sampleParam.name){
            samplesOfList.soundStates = {solo: false, muted: true, rec: false}
            samplesOfList.waveform.setMute(true)
          }
        })
      }
      changeChannelStates()
      console.log('Solo '+sampleParam.name+' = '+sampleParam.soundStates.solo)
    }

    const restartStates = () => {
      sampleListState.map(sample => {
        sample.waveform.setMute(false)
        sample.soundStates.solo = false
        sample.soundStates.muted = false
        sample.soundStates.rec = false
      })
    }

    const changeChannelStates = () => {
        let updatedStates = []
        sampleListState.map(sample => {
            let newRowToContext = { id: sample.name, states: sample.soundStates }
            updatedStates.push(newRowToContext)
        })
        setChannelsStates(updatedStates)
    }

    return (
        <div className="tracksContainer">

                {
                    sampleListState.map(sample => {
                      return <AudioTrack 
                        key={sample.name} 
                        sample={sample}
                        handleChannelStatesOnMute={handleChannelStatesOnMute}
                        handleChannelStatesOnSolo={handleChannelStatesOnSolo}
                        states={channelsStates.find(value => value.id === sample.name)}
                        />
                    })
    
                }
            </div>
    
        )
}
