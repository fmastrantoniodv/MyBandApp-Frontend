import React, { useEffect, useState, useContext } from "react";
import AudioTrack from "./AudioTrack";
import MasterAudioContext from '../../contexts/MasterAudioContext'

const ListOfChannels = ({ sampleList, openModalSampleSelector, handleDeleteChannel }) => {
    const [channelList, setChannelList] = useState(null)
    const [soloChannelSelected, setSoloChannelSelected] = useState(null)
    const { playBackTracks } = useContext(MasterAudioContext)
    
    useEffect(() => {
      console.log("[ListOfChannels].[useEffect].sampleList", sampleList)
        setChannelList(sampleList)
    }, [sampleList, channelList]);

    const handleSoloChannel = (idChannel) => {
      if(soloChannelSelected === idChannel){
        setSoloChannelSelected(null)
      }else{
        setSoloChannelSelected(idChannel)
      }
    }
/** */
    console.log('[ListOfChannels].pre.channelList=', channelList)
    if(channelList === null || channelList === undefined) return
    console.log('[ListOfChannels].post.channelList=', channelList)
    return (
      <>
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