import React, { useEffect, useState, useContext } from "react";
import AudioTrack from "./AudioTrack";
import useFavouritesSamples from "../hooks/useFavouritesSamples";
import GenericModal from "./GenericModal";
import { useModal } from "../hooks/useModal";
import Modal from "./Modals/Modal"

const ListOfChannels = ({ sampleList }) => {
    const [channelsStates, setChannelsStates] = useState([])
    const [loading, setLoading] = useState(true)
    const [channelList, setChannelList] = useState(null)
    const [favouritesList, setFavouritesList] = useState(null)
    const [sampleSelectorOpen, setSampleSelectorOpen] = useState(false)
    const [isOpenModalSampleSelector, openModalSampleSelector, closeModalSampleSelector] = useModal(false)

    const favouritesSamples = useFavouritesSamples()
    
    useEffect(() => {
      console.log("[ListOfChannels].[useEffect].channelList", channelList)
      console.log("favouritesSamples", favouritesList)
      if(sampleList !== null && channelList === null){
        setFavouritesList(favouritesSamples)
        setChannelList(sampleList)
        initChannelsStates(sampleList)
        setLoading(false)
      }
    }, [sampleList, channelList]);

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
      setChannelList(channelList.filter(value => value.id !== idChannel))
      setChannelsStates(channelsStates.filter(value => value.id !== idChannel))
    }

    const handleAddChannel = (itemId) => {
      console.log('Nueva pista')
      var updatedChannelList = channelList
      console.log(favouritesList)
      var newChannel = {
        id: itemId,
        sampleName: favouritesList.find(value => value.id === itemId).displayName,
        src: "http:fileserver.com/kick",
        duration: "6452",
        channelConfig: {
          states: {
              "solo": false,
              "muted": false,
              "rec": false
          },
          volume: 0.7,
          EQ: {
              low: 0.5,
              mid: 0.5,
              high: 0.5
          }
          
      }}
      console.log(newChannel)

      updatedChannelList.push(newChannel)
      
      let updatedChannelStates = channelsStates
      let newSampleStates = {
        id: newChannel.id,
        states: newChannel.channelConfig.states
      }
      updatedChannelStates.push(newSampleStates)
      
      setChannelList(updatedChannelList)
      setChannelsStates(updatedChannelStates)
      setSampleSelectorOpen(false)
    }
    
    const handleCloseSamplesSelector = () =>{
      setSampleSelectorOpen(false)
    }

    const getFavsAvailable = (allFavs) => {
      var listFilteredFavs = new Array;
      allFavs.map(fav => {
        if(channelList.find(value => value.id === fav.id) === undefined) listFilteredFavs.push({ id: fav.id, displayName: fav.displayName})
      })
      return listFilteredFavs
    }


    if(channelList === null || channelList === undefined) return

    if(favouritesList === null || favouritesList === undefined) return
    return (
      <>
        <Modal isOpen={isOpenModalSampleSelector} closeModal={closeModalSampleSelector}>
        <GenericModal 
        arrayList={getFavsAvailable(favouritesList)} 
        handleCloseSamplesSelector={handleCloseSamplesSelector}
        handleOnClickSelection={handleAddChannel}
        />
        </Modal>
        <div className="tracks-container">
          {
            channelList.map(sample => {
                return <AudioTrack
                    key={sample.id} 
                    sample={sample}
                    handleChannelStatesOnMute={handleChannelStatesOnMute}
                    handleChannelStatesOnSolo={handleChannelStatesOnSolo}
                    states={channelsStates.find(value => value.id === sample.id).states}
                    handleDeleteChannel={handleDeleteChannel}
                    />
            })
          }
          </div>
          <div>
            <button 
              onClick={() => openModalSampleSelector()}
              style={{ 
                width: '70px',
                height: '50px',
                margin: '15px'
            }}>+</button>
            </div>
          </>
        )
}

export default ListOfChannels;