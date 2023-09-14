import React, { useEffect, useState } from "react";
import AudioTrack from "./AudioTrack";

export default function ListOfChannels ({ sampleList }) {
    const [channelsStates, setChannelsStates] = useState([])
    
    useEffect(() => {
        const channelsArray = channelsStates
        console.log(`[ListOfChannels].[useEffect].[sampleList:`)
        console.log(sampleList)
        sampleList.map(sample => {
            const newRowToContext = { id: sample.name, states: sample.soundStates }
            if(channelsArray.find(value => value.id === newRowToContext.id) === undefined)
            channelsArray.push(newRowToContext)
        })
        setChannelsStates(channelsArray)
        console.log('channelsStates')
        console.log(channelsStates)
    }, [sampleList]);

    const handleChannelStatesOnMute = (sampleParam) => {
        if(sampleParam.soundStates.muted === false){    
          sampleParam.waveform.setMute(true) 
          sampleParam.soundStates.muted = true
        }else{
          sampleParam.waveform.setMute(false)
          sampleParam.soundStates.muted = false
        }
        changeChannelStates()
        console.log('Mute '+sampleParam.name+' = '+sampleParam.soundStates.muted)
    }

    const handleChannelStatesOnSolo = (sampleParam) => {
      if(sampleParam.soundStates.solo === true){
        restartStates()
      }else{
        let resp = sampleList.findIndex(value => value.name === sampleParam.name)
        sampleList[resp].soundStates = {solo: true, muted: false, rec: false}
        sampleList[resp].waveform.setMute(false)
        sampleList.map(samplesOfList => {
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
      sampleList.map(sample => {
        sample.waveform.setMute(false)
        sample.soundStates.solo = false
        sample.soundStates.muted = false
        sample.soundStates.rec = false
      })
    }

    const changeChannelStates = () => {
        let updatedStates = []
        sampleList.map(sample => {
            let newRowToContext = { id: sample.name, states: sample.soundStates }
            updatedStates.push(newRowToContext)
        })
        setChannelsStates(updatedStates)
    }
    
    return (
        <div className="tracksContainer">
                {
                    sampleList.map(sample => {
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
