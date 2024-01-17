import React, { useEffect, useState } from 'react';

export default function GenericModal({arrayList, handleCloseSamplesSelector, handleOnClickSelection}) {
  const [arrayListState, setArrayListState] = useState()

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
    console.log(itemId)
    handleOnClickSelection(itemId)
  }

  if(arrayListState === undefined){
    return <span>No encontramos lista</span>
  }else{
    return (
      <>
      <div className='modal-container'>
        <div className='msg-card-container'>
          <ul>
            { 
              arrayListState.map(item => {
                return <li onClick={()=>handleSelectItem(item.id)}>{item.displayName}</li>
              })
            
            }
            </ul>
            <button onClick={() => handleCloseAction()}>Cerrar</button>
        </div>
      </div>
      </>
    );
  }

  
}
