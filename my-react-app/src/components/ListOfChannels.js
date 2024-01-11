import React, { useEffect, useState } from "react";
import AudioTrack from "./AudioTrack";
import useModal from "../hooks/useModal";


export default function ListOfChannels ({ sampleList, playState }) {
    const [channelsStates, setChannelsStates] = useState([])
    const [loading, setLoading] = useState(true)
    const [channelList, setChannelList] = useState(null)
    const [playing, setPlaying] = useState('false')
    const modalComponent = useModal('')
    
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
      setChannelList(updateArrayChannelList)
    }

    const handleAddChannel = () => {
      console.log('Nueva pista')
      var updatedChannelList = channelList
      var newChannel = updatedChannelList[0]

      modalComponent.openModal('Esto es un pop up')
      return      
      updatedChannelList.push(newChannel)
      newChannel.id = newChannel.id + 'copia'
      console.log(newChannel.channelConfig.states)
      setChannelList(updatedChannelList)

      var updatedChannelStates = channelsStates
      var newSampleStates = {
        id: newChannel.id,
        states: newChannel.channelConfig.states
      }
      updatedChannelStates.push(newSampleStates)
      setChannelsStates(updatedChannelStates)
      console.log(channelsStates)
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
