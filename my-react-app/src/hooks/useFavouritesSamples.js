import { useEffect, useState } from 'react';
import { getUserFavs } from '../services/users/getUserFavs';

const useFavouritesSamples = ({ channelList }) => {
    const [favouritesSamples, setFavouritesSamples] = useState(null)
    const [loading, setLoading] = useState(true)
    const [avaibleFavs, setAvaibleFavs] = useState(null)
    const userId = '665b28e287fa373281f47938'
    
    useEffect(() => {
      if(favouritesSamples !== null) return
      getUserFavs(userId).then(res =>{
        console.log('[useFavouritesSamples.js].[useEffect].res=', res)
        if(res.status != 200) return
        console.log('[useFavouritesSamples.js].[useEffect].res.data=', res.data)
        setFavouritesSamples(res.data)
        setAvaibleFavs(getFavsAvailable(res.data, channelList))
        setLoading(false)
      })
    }, []);

    if(loading) return
    console.log('[useFavouritesSamples.js].[useEffect].[preret].avaibleFavs=', avaibleFavs)
    return ({
      favouritesSamples,
      avaibleFavs
    }
  )}

  const getFavsAvailable = (allFavs, channelList) => {
    var listFilteredFavs = new Array;
    console.log('getFavsAvailable.allFavs',allFavs)
    if(!allFavs || channelList === undefined) return
    allFavs.map(fav => {
      if(channelList.find(value => value.id === fav.id) === undefined) listFilteredFavs.push(fav)
      })
      return listFilteredFavs
  }   

  export default useFavouritesSamples;
    
