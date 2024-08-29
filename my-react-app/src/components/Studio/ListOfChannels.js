import React, { useEffect, useState, useContext } from "react";
import AudioTrack from "./AudioTrack";
import ProjectContext from '../../contexts/ProjectContext'
import { useModal } from "../../hooks/useModal"
import Modal from "../../components/Modals/Modal"
import SampleSelector from "../Modals/SampleSelector"
import MasterAudioContext from '../../contexts/MasterAudioContext'

const ListOfChannels = ({ }) => {
    const [soloChannelSelected, setSoloChannelSelected] = useState(null)
    const {getSoundList} = useContext(ProjectContext)
    const [isOpenModalSampleSelector, openModalSampleSelector, closeModalSampleSelector] = useModal(false)
    const { onSoloChannel } = useContext(MasterAudioContext)

    useEffect(() => {
      console.log(`[ListOfChannels].[useEffect]`)
    }, []);

    const handleSoloChannel = (idChannel) => {
      console.log(`[ListOfChannels].[handleSoloChannel].idChannel=${idChannel}`)
      onSoloChannel(idChannel)
      if(soloChannelSelected === idChannel){
        setSoloChannelSelected(null)
      }else{
        setSoloChannelSelected(idChannel)
      }
      console.log(`[ListOfChannels].[handleSoloChannel].soloChannelSelected=${soloChannelSelected}`)
    }

    return (
      <>                
        <Modal isOpen={isOpenModalSampleSelector} closeModal={closeModalSampleSelector}>
          <SampleSelector 
            handleCloseSamplesSelector={closeModalSampleSelector}
            openModalSampleSelector={openModalSampleSelector}
          />
        </Modal>
        <div className="tracks-container">
          {
            getSoundList().map(sample => {
              console.log(`[ListOfChannels].[getSoundList.map].sample=${sample}`)
                return <AudioTrack
                    key={sample.id} 
                    sample={sample}
                    handleSoloChannel={handleSoloChannel}
                    />
            })
          }
          </div>
          <div>
            <button 
              onClick={() => openModalSampleSelector()}
              style={{ 
                width: '50px',
                height: '50px',
                margin: '20px'
            }}>+</button>
            </div>
          </>
        )
}

export default ListOfChannels;