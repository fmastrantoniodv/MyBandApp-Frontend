import React, { useEffect, useState } from 'react';
import useFavouritesSamples from "../../hooks/useFavouritesSamples";

export default function SampleSelector({channelList, handleCloseSamplesSelector, handleOnClickSelection}) {
  const [itemSelected, setItemSelected] = useState(null)
  const [titleMsg, setTitleMsg] = useState(null)
  const [avaibleFavs, setAvaibleFavs] = useState(null)
  const favouritesSamples = useFavouritesSamples()

  
  useEffect(()=>{
    if(favouritesSamples === null) return
    console.log('[SampleSelector].favouritesSamples',favouritesSamples)
    if(avaibleFavs === null) setAvaibleFavs(getFavsAvailable(favouritesSamples))

    if(avaibleFavs && avaibleFavs.length === 0){
      setTitleMsg("No hay muestras disponibles")
    }else{
      setTitleMsg("Selecciona una muestra para crear el canal")
      setAvaibleFavs(getFavsAvailable(favouritesSamples))
    }
  },[favouritesSamples,channelList])

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
      if(channelList.find(value => value.sampleId === fav.sampleId) === undefined) listFilteredFavs.push({ sampleId: fav.sampleId, sampleName: fav.sampleName})
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
              return  <li key={item.sampleId} 
                onClick={()=>handleSelectItem(item)} 
                {... itemSelected && item.sampleId === itemSelected.sampleId ? {className: "selected"} : ""}
                >{item.sampleName}
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
