import React, { useEffect, useState } from 'react';
import { useModal } from '../../hooks/useModal';
import Modal from './Modal';

export default function GenericMsg({type, msg, buttonsConfig, open}) {
  const [titleMsg, setTitleMsg] = useState(null)
  const [bodyMsg, setBodyMsg] = useState(msg)
  const [isOpenGenericModal, openGenericModal, closeGenericModal] = useModal(false)

  useEffect(()=>{
    console.log('[GenericMsg.js].[useEffect]')
    console.log('[GenericMsg.js].[useEffect].msg',msg)
    console.log('[GenericMsg.js].[useEffect].type',type)
    initGenericModal(type, msg)
    if(open){
      openGenericModal()
    }else{
      closeGenericModal()
    }
  },[open])

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

  const ButtonsGroup = ({type, buttonsConfig}) => {
    const {positiveAction, negativeAction, positiveTextBtn, negativeTextBtn} = buttonsConfig
    
    const PositiveButton = ({actionToExec, textValue}) => <button className='msg-button btn-positive' onClick={() => {
      closeGenericModal()
      actionToExec()
    }}>{textValue}</button>
    
    const NegativeButton = ({actionToExec, textValue}) => <button className='msg-button btn-negative' onClick={() => {
      closeGenericModal()
      actionToExec()
    }}>{textValue}</button>
  
    if(type === 'ERROR'){
      return(
        <div className='msg-buttons-container'>
          <PositiveButton actionToExec={positiveAction} textValue={positiveTextBtn}/>
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

  return (
    <>
      <Modal isOpen={isOpenGenericModal} closeModal={closeGenericModal}>
        <div className='msg-card-container'>
          <h3 className='subtitle-text'>{titleMsg}</h3>
          <div className='msg-text-container'>
            <span>{msg}</span>
          </div>
          <ButtonsGroup type={type} buttonsConfig={buttonsConfig}/>
        </div>
      </Modal>
    </>
  );
}


