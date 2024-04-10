import React, { useEffect, useState } from 'react';
import useFavouritesSamples from "../../hooks/useFavouritesSamples";

export default function SampleSelector({channelList, handleCloseSamplesSelector, handleOnClickSelection}) {
  const [itemSelected, setItemSelected] = useState(null)
  const [titleMsg, setTitleMsg] = useState(null)
  const [avaibleFavs, setAvaibleFavs] = useState(null)
  const favouritesSamples = useFavouritesSamples()

  useEffect(()=>{
    if(avaibleFavs === null) setAvaibleFavs(getFavsAvailable(favouritesSamples))

    if(avaibleFavs && avaibleFavs.length === 0){
      setTitleMsg("No hay muestras disponibles")
    }else{
      setTitleMsg("Selecciona una muestra para crear el canal")
      setAvaibleFavs(getFavsAvailable(favouritesSamples))
    }
  },[channelList])

  const handleCloseAction = () => {
    handleCloseSamplesSelector()
  }

  const handleSelectItem = (item) => {
    if(itemSelected === null || item !== itemSelected){
      setItemSelected(item)
    }else{
      setItemSelected(null)
    }
  }

  const handleApplySelection = () => {
    handleOnClickSelection(itemSelected)
    setItemSelected(null)
    setAvaibleFavs(getFavsAvailable(favouritesSamples))
  }

  const getFavsAvailable = (allFavs) => {
    var listFilteredFavs = new Array;
    if(!allFavs) return
    allFavs.map(fav => {
      if(channelList.find(value => value.id === fav.id) === undefined) listFilteredFavs.push({ id: fav.id, displayName: fav.displayName})
    })
    return listFilteredFavs
  }

  if(!channelList || avaibleFavs === null) return

  return (
      <>
        <div className='msg-card-container'>
          <h3 className='subtitle-text'>{titleMsg}</h3>
          <ul>
            { 
            avaibleFavs.map(item => {
              return  <li key={item.id} 
                onClick={()=>handleSelectItem(item)} 
                {... itemSelected && item.id === itemSelected.id ? {className: "selected"} : ""}
                >{item.displayName}
                </li>
                })
                }
            </ul>
          <div className='msg-buttons-container'>
            <button className='msg-button btn-positive' onClick={() => handleApplySelection()} {... itemSelected === null ? {disabled: true} : '' }>Aceptar</button>
            <button className='msg-button btn-negative' onClick={() => handleCloseAction()}>Cerrar</button>
          </div>
        </div>
      </>
    );
}
