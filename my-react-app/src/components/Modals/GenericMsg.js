import React, { useEffect, useState } from 'react';
import useFavouritesSamples from "../../hooks/useFavouritesSamples";
import { getUserFavs } from '../../services/users/getUserFavs';

export default function GenericMsg({type, msg, handleCloseSamplesSelector, handleOnClickSelection}) {
  const [titleMsg, setTitleMsg] = useState(null)
  const [bodyMsg, setBodyMsg] = useState(msg)
  const [avaibleFavs, setAvaibleFavs] = useState(null)
  const [loading, setLoading] = useState(null)
  
  useEffect(()=>{
    console.log('[GenericMsg.js].[useEffect]')
    console.log('[GenericMsg.js].[useEffect].msg',msg)
    console.log('[GenericMsg.js].[useEffect].type',type)
    initGenericModal(type, msg)
  },[])

  const handleCloseAction = () => {
    handleCloseSamplesSelector()
  }

  const handleApplySelection = () => {
    handleOnClickSelection(itemSelected)
  }

  const initGenericModal = (type, msg) => {
    switch (type) {
      case 'ERROR':
        setTitleMsg("Error")
        break;
      default:
        setTitleMsg("Otro")
        break;
    }
    setBodyMsg(msg)
  }
  return (
    <>
      <div className='msg-card-container'>
        <h3 className='subtitle-text'>{titleMsg}</h3>
        <div>
          <span>{msg}</span>
        </div>
        <div className='msg-buttons-container'>
          <button className='msg-button btn-positive' onClick={() => handleApplySelection()}>Aceptar</button>
          <button className='msg-button btn-negative' onClick={() => handleCloseAction()}>Cerrar</button>
        </div>
      </div>
    </>
  );
}
