import React, { useEffect, useState, useContext } from 'react';
import useFavouritesSamples from "../../hooks/useFavouritesSamples";
import ProjectContext from "../../contexts/ProjectContext"
import MasterAudioContext from '../../contexts/MasterAudioContext'

export default function SampleSelector({handleCloseSamplesSelector, openModalSampleSelector}) {
  const [itemSelected, setItemSelected] = useState(null)
  const [titleMsg, setTitleMsg] = useState(null)
  const [avaibleFavs, setAvaibleFavs] = useState(null)
  const {addChannelToList, getSoundList} = useContext(ProjectContext)
  const {playBackTracks} = useContext(MasterAudioContext)
  const favouritesSamples = useFavouritesSamples({})

  useEffect(()=>{
    console.log('[SampleSelector.js].[useEffect]')
    if(!avaibleFavs){
      console.log('[SampleSelector.js].[availableFavs]', avaibleFavs)
    }

    if(!openModalSampleSelector){
      console.log('[SampleSelector.js].[openModalSampleSelector]', openModalSampleSelector)
    }
    if(favouritesSamples !== undefined){
      setAvaibleFavs(getFavsAvailable(favouritesSamples))
      if(avaibleFavs === null || avaibleFavs.length === 0){
        setTitleMsg("No hay muestras disponibles")
      }else{
        setTitleMsg("Selecciona una muestra para crear el canal")
      }
    }
  },[openModalSampleSelector])

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
    playBackTracks('stop')
    addChannelToList(itemSelected)
    setItemSelected(null)
    handleCloseAction()
  }

  const getFavsAvailable = (favouritesSamples) => {
    var listFilteredFavs = new Array;
    console.log('getFavsAvailable.favouritesSamples',favouritesSamples)
    var channelList = getSoundList()
    console.log('getFavsAvailable.channelList',channelList)
    if(!favouritesSamples || channelList === null || channelList === undefined ) return
    favouritesSamples.map(fav => {
      if(channelList.find(value => value.id === fav.id) === undefined) listFilteredFavs.push(fav)
      })
    return listFilteredFavs
  }

  if(favouritesSamples === undefined || avaibleFavs === null) return
  //console.log('[SampleSelector.js].[linea46].avaibleFavs=', avaibleFavs)  

    return (
      <>
        <div className='msg-card-container'>
          <h3 className='subtitle-text'>{titleMsg}</h3>
          <ul>
            {
            avaibleFavs === undefined || avaibleFavs === null ?
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
