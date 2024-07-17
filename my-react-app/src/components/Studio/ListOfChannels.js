import React, { useEffect, useState, useContext } from "react";
import AudioTrack from "./AudioTrack";
import ProjectContext from '../../contexts/ProjectContext'
import { useModal } from "../../hooks/useModal"
import Modal from "../../components/Modals/Modal"
import SampleSelector from "../Modals/SampleSelector"

const ListOfChannels = ({ }) => {
    const [soloChannelSelected, setSoloChannelSelected] = useState(null)
    const {getSoundList} = useContext(ProjectContext)
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
                width: '50px',
                height: '50px',
                margin: '20px'
            }}>+</button>
            </div>
          </>
        )
}

export default ListOfChannels;