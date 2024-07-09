import React, { useEffect, useState } from 'react';
import useFavouritesSamples from "../../hooks/useFavouritesSamples";

export default function SampleSelector({channelList, handleCloseSamplesSelector, handleOnClickSelection}) {
  const [itemSelected, setItemSelected] = useState(null)
  const [titleMsg, setTitleMsg] = useState(null)
  const [loading, setLoading] = useState(null)
  const favsSamples = useFavouritesSamples({channelList})
  const [avaibleFavs, setAvaibleFavs] = useState(null)
  const [favouritesSamples, setFavouritesSamples] = useState(null)

  useEffect(()=>{
    console.log('[SampleSelector.js].[useEffect]')
    console.log('[SampleSelector.js].[useEffect].favsSamples',favsSamples)
    console.log('[SampleSelector.js].[useEffect].avaibleFavs',avaibleFavs)
    console.log('[SampleSelector.js].[useEffect].favouritesSamples',favouritesSamples)
    setLoading(true)
    if(favsSamples === undefined) return
    setAvaibleFavs(favsSamples.avaibleFavs)
    if(favsSamples.avaibleFavs && favsSamples.avaibleFavs.length === 0){
      setTitleMsg("No hay muestras disponibles")
    }else{
      setTitleMsg("Selecciona una muestra para crear el canal")
    }
    setLoading(false)
    console.log('[SampleSelector].favouritesSamples',favsSamples.favouritesSamples)
    console.log('[SampleSelector].avaibleFavs',favsSamples.avaibleFavs)
  },[channelList, favsSamples])

  const handleCloseAction = () => {
    handleCloseSamplesSelector()
  }

  const handleSelectItem = (item) => {
    console.log('[handleSelectItem]',item)
    if(itemSelected === null || item !== itemSelected){
      setItemSelected(item)
    }else{
      setItemSelected(null)
    }
  }

  const handleApplySelection = () => {
    handleOnClickSelection(itemSelected)
    setItemSelected(null)
    /**
    setAvaibleFavs(getFavsAvailable(favouritesSamples))
     */
  }

    console.log('[SampleSelector.js].[linea46].avaibleFavs=', avaibleFavs)  
    if(channelList === undefined || avaibleFavs === null) return

    return (
      <>
        <div className='msg-card-container'>
          <h3 className='subtitle-text'>{titleMsg}</h3>
          <ul>
            {
            avaibleFavs === undefined || avaibleFavs === null || avaibleFavs.length === 0 ?
            'cargando' : 
            avaibleFavs.map(item => {
              return  <li key={item.id} 
                onClick={()=>handleSelectItem(item)} 
                {... itemSelected && item.id === itemSelected.id ? {className: "selected"} : ""}
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
