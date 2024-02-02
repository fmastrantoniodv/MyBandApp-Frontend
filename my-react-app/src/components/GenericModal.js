import React, { useEffect, useState } from 'react';

export default function GenericModal({arrayList, handleCloseSamplesSelector, handleOnClickSelection}) {
  const [arrayListState, setArrayListState] = useState()
  const [itemSelected, setItemSelected] = useState(null)
  const [titleMsg, setTitleMsg] = useState(null)

  useEffect(()=>{
    setTitleMsg("Selecciona una muestra para crear el canal")
    if(arrayListState !== undefined) return
    setTitleMsg("No hay muestras disponibles")
    setArrayListState(arrayList)
    changeClassHtmlTag("open")
  },[arrayList])

  const handleCloseAction = () => {
    changeClassHtmlTag("close")
    handleCloseSamplesSelector()
  }

  const handleSelectItem = (itemId) => {
    if(itemSelected === null || itemId !== itemSelected){
      setItemSelected(itemId)
    }else{
      setItemSelected(null)
    }
  }

  const handleApplySelection = () => {
    handleOnClickSelection(itemSelected)
    changeClassHtmlTag("close")
  }

  const changeClassHtmlTag = ( state ) => {
    var htmlTag = document.getElementsByTagName("html")
    state === 'open' ? htmlTag[0].className = 'background-modal-open' : htmlTag[0].removeAttribute('class')
  }

  if(arrayListState === undefined){
    return
  }else{
    
    return (
      <>
      <div className='modal-container'>
        <div className='msg-card-container'>
          <h3 className='subtitle-text'>{titleMsg}</h3>
          <ul>
            { 
              arrayListState.map(item => {
                return <li key={item.id} 
                onClick={()=>handleSelectItem(item.id)} 
                {... item.id === itemSelected ? {className: "selected"} : ""}
                >
                  {item.displayName}</li>
              })
            
            }
            </ul>
          <div className='msg-buttons-container'>
            <button className='msg-button btn-positive' onClick={() => handleApplySelection()} {... itemSelected === null ? {disabled: true} : '' }>Aceptar</button>
            <button className='msg-button btn-negative' onClick={() => handleCloseAction()}>Cerrar</button>
          </div>
        </div>
      </div>
      </>
    );
  }

  
}
