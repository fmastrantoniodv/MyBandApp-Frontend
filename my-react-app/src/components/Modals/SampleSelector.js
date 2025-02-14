import React, { useEffect, useState, useContext } from 'react';
import ProjectContext from "../../contexts/ProjectContext"
import MasterAudioContext from '../../contexts/MasterAudioContext'
import { useUser } from '../../contexts/UserContext';

export default function SampleSelector({handleCloseSamplesSelector, openModalSampleSelector}) {
  const [itemSelected, setItemSelected] = useState(null)
  const [titleMsg, setTitleMsg] = useState(null)
  const [avaibleFavs, setAvaibleFavs] = useState(null)
  const {addChannelToList, getSoundList} = useContext(ProjectContext)
  const {playBackTracks} = useContext(MasterAudioContext)
  const { user, collections } = useUser()

  useEffect(()=>{
    console.log('[SampleSelector.js].[useEffect]')
    if(!avaibleFavs){
      console.log('[SampleSelector.js].[availableFavs]', avaibleFavs)
    }

    if(!openModalSampleSelector){
      console.log('[SampleSelector.js].[openModalSampleSelector]', openModalSampleSelector)
    }
    if(user.favList !== undefined){
      setAvaibleFavs(getFavsAvailable(user.favList))
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

  const getCollectionsNameByCode = (collectionCode) => {
    console.log('[SampleSelector.jsx].SampleSelector.getCollectionsNameByCode.collectionCode=', collectionCode)
    var collectionsName = '';
    if(collections !== undefined){
        var collectionsItem = collections.find((collect)=> collect.collectionCode === collectionCode)
        console.log('[SampleSelector.jsx].SampleSelector.getCollectionsNameByCode.collectionsItem=', collectionsItem)
        if(collectionsItem !== undefined){
            collectionsName = collectionsItem.collectionName
        }
    }
    return collectionsName
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

  if(user.favList === undefined || avaibleFavs === null) return

    return (
      <>
        <div className='msg-card-container'>
          <h3 className='subtitle-text'>{titleMsg}</h3>
          <ul>
            {
            avaibleFavs === undefined || avaibleFavs === null ?
            'cargando' : 
            avaibleFavs.map(item => {
              console.log(item)
              return  <li key={item.id} 
                onClick={()=>handleSelectItem(item)} 
                {... itemSelected && item.id === itemSelected.id ? {className: "selected"} : ""}
                >
                  {item.sampleName}<span>[{getCollectionsNameByCode(item.collectionCode)}]</span> 
                </li>
                })
                }
            </ul>
          <div className='msg-buttons-container'>
            <button className='form-btn primary' onClick={() => handleApplySelection()} {... itemSelected === null ? {disabled: true} : '' }>Aceptar</button>
            <button className='form-btn secondary' onClick={() => handleCloseAction()}>Cerrar</button>
          </div>
        </div>
      </>
    );
}
