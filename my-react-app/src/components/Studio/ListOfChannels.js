import React, { useEffect, useState, useContext } from "react";
import AudioTrack from "./AudioTrack";
import MasterAudioContext from '../../contexts/MasterAudioContext'
import ProjectContext from '../../contexts/ProjectContext'
import { useModal } from "../../hooks/useModal"
import Modal from "../../components/Modals/Modal"
import SampleSelector from "../Modals/SampleSelector"

const ListOfChannels = ({ }) => {
    const [soloChannelSelected, setSoloChannelSelected] = useState(null)
    const { getSoundList } = useContext(ProjectContext)
    const [isOpenModalSampleSelector, openModalSampleSelector, closeModalSampleSelector] = useModal(false)

    useEffect(() => {
    }, []);

    const handleSoloChannel = (idChannel) => {
      if(soloChannelSelected === idChannel){
        setSoloChannelSelected(null)
      }else{
        setSoloChannelSelected(idChannel)
      }
    }

    const handleOnClickSelection = (item) => {
      console.log('[studio.jsx].[handleOnClickSelection].item',item)
      addChannelToList(item)
      console.log('[studio.jsx].[getSampleList].result',getSampleList())
      closeModalSampleSelector()
    }

    return (
      <>                
        <Modal isOpen={isOpenModalSampleSelector} closeModal={closeModalSampleSelector}>
          <SampleSelector 
            handleCloseSamplesSelector={closeModalSampleSelector}
            handleOnClickSelection={handleOnClickSelection}
          />
        </Modal>
        <div className="tracks-container">
          {
            getSoundList().map(sample => {
                return <AudioTrack
                    key={sample.id} 
                    sample={sample}
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