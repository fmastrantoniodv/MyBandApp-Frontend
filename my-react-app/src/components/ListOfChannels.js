import React, { useEffect, useState } from "react";
import AudioTrack from "./AudioTrack";

export default function ListOfChannels ({ sampleList }) {
    const [channelsStates, setChannelsStates] = useState([])
    const [loading, setLoading] = useState(true)
    const [channelList, setChannelList] = useState(null)
    
    useEffect(() => {
      console.log("[ListOfChannels].[useEffect].sampleList", sampleList)
      if(sampleList !== null){
        setChannelList(sampleList)
        initChannelsStates(sampleList)
        setLoading(false)
      }
    }, [sampleList]);

    const handleChannelStatesOnMute = (sampleComponent) => {
      console.log("Mute: ", sampleComponent)
      let newStates = {}
        if(sampleComponent.isMuted === false){    
          newStates= {muted: true, solo: false, rec: false}
        }else{
          newStates = {muted: true, solo: false, rec: false}
        }
        changeChannelStates(newStates)
        //console.log('Mute '+sampleObj.name+' = '+sampleObj.soundStates.muted)
      
    }

    const handleChannelStatesOnSolo = (sampleParam) => {
      if(sampleParam.soundStates.solo === true){
        restartStates()
      }else{
        let resp = channelList.findIndex(value => value.name === sampleParam.name)
        channelList[resp].soundStates = {solo: true, muted: false, rec: false}
        channelList[resp].waveform.setMute(false)
        channelList.map(samplesOfList => {
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
      channelList.map(sample => {
        sample.waveform.setMute(false)
        sample.soundStates.solo = false
        sample.soundStates.muted = false
        sample.soundStates.rec = false
      })
    }

    const changeChannelStates = () => {
        let updatedStates = []
        channelList.map(sample => {
            let newRowToContext = { id: sample.id, states: sample.channelConfig.states }
            updatedStates.push(newRowToContext)
        })
        setChannelsStates(updatedStates)
    }

    const initChannelsStates = (sampleList) => {
      let newStatesArray = []
      sampleList.map(sample => {
        let itemJson = {
          id: sample.id,
          states: sample.channelConfig.states
        }
        newStatesArray.push(itemJson)
      })
      setChannelsStates(newStatesArray)
      console.log('newStatesArray: ',newStatesArray)
    }

    if(!channelList) return

    return (
        <div className="tracksContainer">
                {
                    channelList.map(sample => {
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
