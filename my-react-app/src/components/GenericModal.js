import React, { useEffect, useState } from 'react';

export default function GenericModal({arrayList, handleCloseSamplesSelector, handleOnClickSelection}) {
  const [arrayListState, setArrayListState] = useState()
  const [itemSelected, setItemSelected] = useState(null)

  useEffect(()=>{
    console.log("arrayListState",arrayListState)
    if(arrayListState !== undefined) return
    setArrayListState(arrayList)
  },[arrayListState])

  const handleCloseAction = () => {
    console.log("se cierra pu")
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
  }

  if(arrayListState === undefined){
    return <span>No encontramos lista</span>
  }else{
    return (
      <>
      <div className='modal-container'>
        <div className='msg-card-container'>
          <h3 className='subtitle-text'>Selecciona una muestra para crear el canal</h3>
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
            <button className='msg-button' onClick={() => handleApplySelection()} {... itemSelected === null ? {disabled: true} : '' }>Aceptar</button>
            <button className='msg-button' onClick={() => handleCloseAction()}>Cerrar</button>
          </div>
        </div>
      </div>
      </>
    );
  }

  
}
