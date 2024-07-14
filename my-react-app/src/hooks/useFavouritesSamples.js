import { useEffect, useState, useContext } from 'react';
import { getUserFavs } from '../services/users/getUserFavs';
import ProjectContext from "../contexts/ProjectContext"


const useFavouritesSamples = () => {
    const [favouritesSamples, setFavouritesSamples] = useState(null)
    const [loading, setLoading] = useState(true)
    const [avaibleFavs, setAvaibleFavs] = useState(null)
    const {getSoundList} = useContext(ProjectContext)
    const userId = '665b28e287fa373281f47938'
    
    useEffect(() => {
      if(favouritesSamples !== null) return
      getUserFavs(userId).then(res =>{
        console.log('[useFavouritesSamples.js].[useEffect].res=', res)
        if(res.status != 200) return
        console.log('[useFavouritesSamples.js].[useEffect].res.data=', res.data)
        setFavouritesSamples(res.data)
        setAvaibleFavs(getFavsAvailable(res.data))
        setLoading(false)
      })
    }, []);

    const getFavsAvailable = (allFavs) => {
      var listFilteredFavs = new Array;
      console.log('getFavsAvailable.allFavs',allFavs)
      var channelList = getSoundList()
      if(!allFavs || channelList === null || channelList === undefined ) return
      allFavs.map(fav => {
        if(channelList.find(value => value.id === fav.id) === undefined) listFilteredFavs.push(fav)
        })
        return listFilteredFavs
    }   

    if(loading) return
    console.log('[useFavouritesSamples.js].[useEffect].[preret].avaibleFavs=', avaibleFavs)
    return ({
      favouritesSamples,
      avaibleFavs
    }
  )}


  export default useFavouritesSamples;
    
