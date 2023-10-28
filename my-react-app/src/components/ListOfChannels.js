import React, { useEffect, useState } from "react";
import AudioTrack from "./AudioTrack";

export default function ListOfChannels ({ sampleList, playState }) {
    const [channelsStates, setChannelsStates] = useState([])
    const [loading, setLoading] = useState(true)
    const [channelList, setChannelList] = useState(null)
    const [playing, setPlaying] = useState('false')
    
    useEffect(() => {
      console.log("[ListOfChannels].[useEffect].sampleList", sampleList)
      setPlaying(playState)

      if(sampleList !== null && channelList === null){
        setChannelList(sampleList)
        initChannelsStates(sampleList)
        setLoading(false)
      }
    }, [sampleList, playState, channelList]);

    const handleChannelStatesOnMute = (sampleComponent) => {
      console.log("Mute: id="+sampleComponent.mediaContainer.id+",sampleComponent=", sampleComponent)
      console.log(sampleComponent.mediaContainer.id)
      let newStates = {}
      if(sampleComponent.isMuted === false){    
        newStates = {muted: true, solo: false, rec: false}
        sampleComponent.setMute(true)
      }else{
        newStates = {muted: false, solo: false, rec: false}
        sampleComponent.setMute(false)
      }
      changeChannelStates(sampleComponent.mediaContainer.id,newStates)
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

    const changeChannelStates = (idSample , newStates) => {
        let updatedStates = []
        channelsStates.map(sampleStates => {
          let newRowToContext;
            if(idSample === sampleStates.id){
              newRowToContext = { id: sampleStates.id, states: newStates }
            }else{
              newRowToContext = { id: sampleStates.id, states: sampleStates.states }
            }
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

    const handleDeleteChannel = ( idChannel ) => {
      let updateArrayChannelList = channelList.filter(value => value.id !== idChannel)
      setChannelList(updateArrayChannelList)
    }

    if(channelList === null || channelList === undefined) return

    return (
        <div className="tracksContainer">
                {
                    channelList.map(sample => {
                        return <AudioTrack 
                            key={sample.id} 
                            sample={sample}
                            handleChannelStatesOnMute={handleChannelStatesOnMute}
                            handleChannelStatesOnSolo={handleChannelStatesOnSolo}
                            states={channelsStates.find(value => value.id === sample.id).states}
                            playing={playing}
                            handleDeleteChannel={handleDeleteChannel}
                            />
                    })
    
                }
          </div>
        )
}
