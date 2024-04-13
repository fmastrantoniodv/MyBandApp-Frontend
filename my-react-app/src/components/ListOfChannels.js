import React, { useEffect, useState, useContext } from "react";
import AudioTrack from "./AudioTrack";
import SampleSelector from "./Modals/SampleSelector";
import { useModal } from "../hooks/useModal";
import Modal from "./Modals/Modal"

const ListOfChannels = ({ sampleList }) => {
    const [loading, setLoading] = useState(true)
    const [channelList, setChannelList] = useState(null)
    const [isOpenModalSampleSelector, openModalSampleSelector, closeModalSampleSelector] = useModal(false)
    const [soloChannelSelected, setSoloChannelSelected] = useState(null)
    
    useEffect(() => {
      console.log("[ListOfChannels].[useEffect].channelList", channelList)
      if(sampleList !== null && channelList === null){
        setChannelList(sampleList)
        setLoading(false)
      }
    }, [sampleList, channelList]);

    const handleSoloChannel = (idChannel) => {
      if(soloChannelSelected === idChannel){
        setSoloChannelSelected(null)
      }else{
        setSoloChannelSelected(idChannel)
      }
    }

    const handleDeleteChannel = ( idChannel ) => {
      setChannelList(channelList.filter(value => value.id !== idChannel))      
    }

    const handleAddChannel = (item) => {
      console.log('Nueva pista')
      var updatedChannelList = channelList
      var newChannel = {
        id: item.id,
        sampleName: item.displayName,
        src: "http:fileserver.com/kick",
        duration: "6452",
        channelConfig: {
          states: {
              "solo": false,
              "muted": false
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
      
      setChannelList(updatedChannelList)
      closeModalSampleSelector()
    }

    if(channelList === null || channelList === undefined) return

    return (
      <>
        <Modal isOpen={isOpenModalSampleSelector} closeModal={closeModalSampleSelector}>
          <SampleSelector 
            channelList={channelList} 
            handleCloseSamplesSelector={closeModalSampleSelector}
            handleOnClickSelection={handleAddChannel}
          />
        </Modal>
        <div className="tracks-container">
          {
            channelList.map(sample => {
                return <AudioTrack
                    key={sample.id} 
                    sample={sample}
                    handleDeleteChannel={handleDeleteChannel}
                    soloChannelSelectedState={soloChannelSelected}
                    handleSoloChannel={handleSoloChannel}
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