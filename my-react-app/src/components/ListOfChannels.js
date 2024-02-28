import React, { useEffect, useState, useContext } from "react";
import AudioTrack from "./AudioTrack";
import useFavouritesSamples from "../hooks/useFavouritesSamples";
import GenericModal from "./GenericModal";
import MasterAudioContext from '../contexts/MasterAudioContext'

const ListOfChannels = ({ sampleList, playState, handleStop }) => {
    const [channelsStates, setChannelsStates] = useState([])
    const [loading, setLoading] = useState(true)
    const [channelList, setChannelList] = useState(null)
    const [playing, setPlaying] = useState('false')
    const [favouritesList, setFavouritesList] = useState(null)
    const [sampleSelectorOpen, setSampleSelectorOpen] = useState(false)
    const [audioContext, setAudioContext] = useState(null);
    const [destinationNode, setDestinationNode] = useState(null);
    const {masterAudioCtx, mainGainNode, deleteSampleComponentFromList} = useContext(MasterAudioContext)
    
    const favouritesSamples = useFavouritesSamples()
    //const useAudioMerger = useAudioMerger()
    
    useEffect(() => {
      console.log("[ListOfChannels].[useEffect].channelList", channelList)
      setPlaying(playState)
      console.log("favouritesSamples", favouritesList)
      console.log("audioContext", audioContext)
      if(sampleList !== null && channelList === null){
        createDestinationExportNode(masterAudioCtx)
        setFavouritesList(favouritesSamples)
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
      deleteSampleComponentFromList(idChannel)
      console.log('ChannelList', channelList)
      console.log('ChannelStates', channelsStates)
    }

    const handleAddChannel = (itemId) => {
      console.log('Nueva pista')
      handleStop()
      setPlaying('false')
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

    const createDestinationExportNode = (audioCtxMaster) => {
      const context = audioCtxMaster
      setAudioContext(context);
      /*
      const destination = context.destination;
      setDestinationNode(destination);
      */
    }

    if(channelList === null || channelList === undefined) return

    if(favouritesList === null || favouritesList === undefined) return
    return (
      <>
      {
      sampleSelectorOpen && <GenericModal 
        arrayList={getFavsAvailable(favouritesList)} 
        handleCloseSamplesSelector={handleCloseSamplesSelector}
        handleOnClickSelection={handleAddChannel}
        />
      }

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
              onClick={() => setSampleSelectorOpen(true)}
              style={{ 
                width: '70px',
                height: '50px',
                margin: '15px'
            }}>+</button>
            <button 
              onClick={() => console.log(mainGainNode)}
              style={{ 
                width: '70px',
                height: '50px',
                margin: '15px'
            }}>console.log</button>
            
            </div>
          </>
        )
}

const getTrackList = () => {
  const [tracks, setTracks] = useState([]);

  setTracks((prevTracks) => [...prevTracks, audioBuffer]);

  return tracks;
}

export default ListOfChannels;