import React, { useEffect, useState } from 'react';
import useFavouritesSamples from "../../hooks/useFavouritesSamples";
import { getUserFavsServ } from '../../services/usersServ';

export default function GenericMsg({type, msg, handleCloseModal, buttonsConfig}) {
  const [titleMsg, setTitleMsg] = useState(null)
  const [bodyMsg, setBodyMsg] = useState(msg)

  useEffect(()=>{
    console.log('[GenericMsg.js].[useEffect]')
    console.log('[GenericMsg.js].[useEffect].msg',msg)
    console.log('[GenericMsg.js].[useEffect].type',type)
    initGenericModal(type, msg)
  },[])

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
        <div className='msg-text-container'>
          <span>{msg}</span>
        </div>
        <ButtonsGroup type={type} buttonsConfig={buttonsConfig} handleCloseModal={handleCloseModal}/>
      </div>
    </>
  );
}

const ButtonsGroup = ({type, buttonsConfig,handleCloseModal}) => {
  const {positiveAction, negativeAction, positiveTextBtn, negativeTextBtn} = buttonsConfig
  
  const PositiveButton = ({actionToExec, textValue}) => <button className='msg-button btn-positive' onClick={() => {
    handleCloseModal()
    actionToExec()
  }}>{textValue}</button>
  
  const NegativeButton = ({actionToExec, textValue}) => <button className='msg-button btn-negative' onClick={() => {
    handleCloseModal()
    actionToExec()
  }}>{textValue}</button>

  if(type === 'ERRORes'){
    return(
      <div className='msg-buttons-container'>
        <PositiveButton actionToExec={negativeAction} textValue={positiveTextBtn}/>
      </div>
    )
  }else{
    return(
      <div className='msg-buttons-container'>
        <PositiveButton actionToExec={positiveAction} textValue={positiveTextBtn}/>
        <NegativeButton actionToExec={negativeAction} textValue={negativeTextBtn}/>
      </div>
    )
  }
}
