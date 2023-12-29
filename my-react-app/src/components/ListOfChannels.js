import React, { useEffect, useState } from "react";
import AudioTrack from "./AudioTrack";


export default function ListOfChannels ({ sampleList, playState }) {
    const [channelsStates, setChannelsStates] = useState([])
    const [loading, setLoading] = useState(true)
    const [channelList, setChannelList] = useState(null)
    const [playing, setPlaying] = useState('false')
    
    useEffect(() => {
      console.log("[ListOfChannels].[useEffect].channelList", channelList)
      setPlaying(playState)

      if(sampleList !== null && channelList === null){
        setChannelList(sampleList)
        initChannelsStates(sampleList)
        setLoading(false)
      }
    }, [sampleList, playState, channelList]);

    const handleChannelStatesOnMute = (sampleID) => {
      console.log("Mute: id="+sampleID)
      console.log(sampleID)
      console.log(channelsStates)
      let newStates = {}
      if(channelsStates.find(value => value.id === sampleID).states.muted === false){    
        newStates = {muted: true, solo: false, rec: false}
      }else{
        newStates = {muted: false, solo: false, rec: false}
      }
      changeChannelStates(sampleID,newStates)
    }

    const handleChannelStatesOnSolo = (sampleID) => {
      console.log('[HandleSolo]', sampleID)
      let selectedSampleStates = channelsStates.find(value => value.id === sampleID) 
      console.log('[HandleSolo].[selectedSampleStates]=', selectedSampleStates)
      if(selectedSampleStates.states.solo === true){
        restartStates()
      }else{
        let updatedStates = []
        channelsStates.map(sampleStates => {
          if(sampleStates.id === sampleID){
            updatedStates.push({ id: sampleStates.id, states: {solo: true, muted: false, rec: false} })
          }else{
            updatedStates.push({ id: sampleStates.id, states: {solo: false, muted: true, rec: false} })
          }
        })
        setChannelsStates(updatedStates)  
      }
      console.log('Solo '+sampleID)
    }

    const restartStates = () => {
        let updatedStates = []
        channelsStates.map(sampleStates => {
            updatedStates.push({ id: sampleStates.id, states: {solo: false, muted: false, rec: false} })
        })
        setChannelsStates(updatedStates)  
    }

    const changeChannelStates = (idSample , newStates) => {
        console.log('[changeChannelStates]', idSample, newStates)
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
      let updateArrayChannelStates = channelsStates.filter(value => value.id !== idChannel)
      setChannelList(updateArrayChannelList)
      setChannelsStates(updateArrayChannelStates)
      console.log('ChannelList', channelList)
      console.log('ChannelStates', channelsStates)
    }

    const handleAddChannel = () => {
      console.log('Nueva pista')
      let updatedChannelList = [...channelList]
      var newChannel = {
        id: "sample1",
        channelConfig: {
          states: {solo: false, muted: false, rec: false},
          volume: 0.7,
          EQ: {low: 0.5, mid: 0.5, high: 0.5},
        },
        duration: null,
        sampleName: "Pianola",
        src: null
      }

      updatedChannelList.push(newChannel)
      
      let updatedChannelStates = channelsStates
      let newSampleStates = {
        id: newChannel.id,
        states: newChannel.channelConfig.states
      }
      updatedChannelStates.push(newSampleStates)

      setChannelList(updatedChannelList)
      setChannelsStates(updatedChannelStates)
    }

    if(channelList === null || channelList === undefined) return

    return (
      <>
        <div className="tracks-container">
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
          <div>
            <button 
              onClick={() => handleAddChannel()}
              style={{ 
                width: '70px',
                height: '50px',
                margin: '15px'
            }}>+</button>
            </div>
          </>
        )
}
